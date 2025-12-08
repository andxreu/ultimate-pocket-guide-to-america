/* eslint-disable */
// @ts-nocheck
// This file is used ONLY by Natively.dev for live editing.
// It has ZERO impact on your published app.

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ElementTypes } from "./EditableElement_";
import { Platform } from "react-native";

type ElementProps = {
  type: ElementTypes;
  sourceLocation: string;
  attributes: any;
  id: string;
  trace: string[];
  props: any;
};

type EditableContextType = {
  onElementClick: (props: ElementProps) => void;
  editModeEnabled: boolean;
  attributes: Record<string, any>;
  selected: string | undefined;
  setSelected: (id: string | undefined) => void;
  hovered: string | undefined;
  pushHovered: (id: string) => void;
  popHovered: (id: string) => void;
};

export const EditableContext = createContext<EditableContextType>({} as any);

const EditablePage = ({ children }: PropsWithChildren) => {
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [selected, setSelected] = useState<string>();
  const [hoveredStack, setHoveredStack] = useState<string[]>([]);
  const [origin, setOrigin] = useState<string | null>(null);
  const [overwrittenProps, setOverwrittenProps] = useState<Record<string, any>>({});

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const handler = (event: MessageEvent) => {
      const { type, data } = event.data ?? {};

      if (event.origin) setOrigin(event.origin);

      switch (type) {
        case "element_editor_enable":
          setEditModeEnabled(true);
          break;
        case "element_editor_disable":
          setEditModeEnabled(false);
          break;
        case "override_props":
          setOverwrittenProps(prev => ({
            ...prev,
            [data.id]: { ...(prev[data.id] ?? {}), ...data.props },
          }));
          break;
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const postMessage = useCallback(
    (message: any) => {
      if (origin && window.parent) {
        window.parent.postMessage(message, origin);
      }
    },
    [origin]
  );

  const onElementClick = useCallback((props: ElementProps) => {
    setSelected(props.id);
    postMessage({ type: "element_clicked", element: props });
  }, [postMessage]);

  const hovered = hoveredStack[hoveredStack.length - 1];

  const pushHovered = useCallback((id: string) => {
    setHoveredStack(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const popHovered = useCallback((id: string) => {
    setHoveredStack(prev => prev.filter(v => v !== id));
  }, []);

  return (
    <EditableContext.Provider
      value={{
        onElementClick,
        editModeEnabled,
        attributes: overwrittenProps,
        selected,
        setSelected,
        hovered,
        pushHovered,
        popHovered,
      }}
    >
      {children}
    </EditableContext.Provider>
  );
};

export default function withEditableWrapper_<P extends PropsWithChildren>(
  Comp: React.ComponentType<P>
) {
  return function Wrapped(props: P) {
    if (Platform.OS !== "web") {
      return <Comp {...props} />;
    }
    return (
      <EditablePage>
        <Comp {...props} />
      </EditablePage>
    );
  };
}