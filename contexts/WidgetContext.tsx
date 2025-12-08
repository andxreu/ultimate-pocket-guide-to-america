// contexts/WidgetContext.tsx
import React, { createContext, useCallback, useContext, useEffect } from "react";
import { ExtensionStorage } from "@bacons/apple-targets";

// Replace with your actual App Group ID from Apple Developer
// Example: group.com.yourcompany.ultimatepocketguide
const storage = new ExtensionStorage("group.com.amateurxhuman.ultimatepocketguidetoamerica");

interface WidgetContextType {
  refreshWidget: () => void;
}

const WidgetContext = createContext<WidgetContextType | null>(null);

export function WidgetProvider({ children }: { children: React.ReactNode }) {
  // Optional: Trigger widget refresh when app becomes active
  useEffect(() => {
    const timer = setTimeout(() => {
      ExtensionStorage.reloadWidget();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const refreshWidget = useCallback(() => {
    try {
      ExtensionStorage.reloadWidget();
    } catch (error) {
      if (__DEV__) {
        console.log("Widget refresh failed (normal if no widget installed):", error);
      }
    }
  }, []);

  return (
    <WidgetContext.Provider value={{ refreshWidget }}>
      {children}
    </WidgetContext.Provider>
  );
}

export const useWidget = (): WidgetContextType => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error("useWidget must be used within a WidgetProvider");
  }
  return context;
};