/* eslint-disable */
// @ts-nocheck
// This file is used ONLY by Natively.dev for live editing.
// It has zero impact on your published app performance or bundle size.

import { cloneElement, PropsWithChildren, useContext } from "react";
import { EditableContext } from "./withEditableWrapper_";
import { Platform } from "react-native";

export type ElementTypes = "Text" | "View" | "TouchableOpacity" | "Icon";

const isPrimitive = (item: any): boolean => {
  if (Array.isArray(item)) return item.every(isPrimitive);
  if (typeof item === "object" && item !== null) return Object.values(item).every(isPrimitive);
  return typeof item === "string" || typeof item === "number" || typeof item === "boolean";
};

export const getType = (el: any): ElementTypes | undefined => {
  if (!el?.type) return undefined;

  const displayName = el.type.render?.displayName || el.type.displayName || el.type.name;
  const typeName = el.type.type?.displayName;

  if (displayName === "Text") return "Text";
  if (displayName === "View") return "View";
  if (displayName === "Icon" || el.type.name === "IconSymbol") return "Icon";
  if (typeName === "TouchableOpacity" || displayName === "TouchableOpacity") return "TouchableOpacity";

  return undefined;
};

const toArray = <T,>(obj: T | T[]): T[] => (Array.isArray(obj) ? obj : [obj]);

export default function EditableElement_({ children }: PropsWithChildren<any>) {
  const context = useContext(EditableContext);
  if (!context || Platform.OS !== "web") {
    return children;
  }

  const {
    editModeEnabled,
    selected,
    hovered,
    onElementClick,
    attributes: overwrittenProps,
    pushHovered,
    popHovered,
  } = context;

  if (!editModeEnabled) return children;

  const { props } = children;
  const type = getType(children);
  const __sourceLocation = props?.__sourceLocation;
  const __trace = props?.__trace || [];
  const id = __trace.join("");

  const attributes = overwrittenProps[id] ?? {};
  const isSelected = selected === id;
  const isHovered = hovered === id;

  const outlineStyle = isSelected
    ? { outline: "2px solid #0066FF" }
    : isHovered
    ? { outline: "2px dashed #0066FF" }
    : {};

  const handleClick = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    onElementClick({
      sourceLocation: __sourceLocation,
      id,
      type,
      trace: __trace,
      props: {
        style: { ...props.style },
        children: isPrimitive(props.children) ? props.children : undefined,
      },
    });
  };

  const editProps = {
    onMouseOver: () => pushHovered(id),
    onMouseLeave: () => popHovered(id),
    onClick: handleClick,
    onPress: handleClick,
  };

  const baseStyle = [...toArray(props.style || {}), outlineStyle, attributes.style || {}];

  switch (type) {
    case "Text":
    case "View":
    case "TouchableOpacity":
    case "Icon":
      return cloneElement(children, {
        ...props,
        ...editProps,
        style: baseStyle,
        children: attributes.children ?? children.props.children,
      });
    default:
      return children;
  }
}