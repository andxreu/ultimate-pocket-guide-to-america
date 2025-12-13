import * as React from "react";
import { createContext, useCallback, useContext } from "react";
import { ExtensionStorage } from "@bacons/apple-targets";

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * App Group ID for sharing data between app and widget
 * 
 * IMPORTANT: Replace with your actual App Group ID
 * Format: group.com.<your_username>.<your_app_name>
 */
const APP_GROUP_ID = "group.com.<user_name>.<app_name>";

/**
 * Initialize storage with App Group ID
 * Enables data sharing between main app and iOS widgets
 */
const storage = new ExtensionStorage(APP_GROUP_ID);

// ============================================================================
// TYPES
// ============================================================================

/**
 * Widget context type
 */
type WidgetContextType = {
  /** Manually refresh the widget UI */
  refreshWidget: () => void;
};

// ============================================================================
// CONTEXT
// ============================================================================

const WidgetContext = createContext<WidgetContextType | null>(null);

/**
 * Widget Provider Component
 * 
 * Manages iOS widget state and provides refresh functionality.
 * 
 * Features:
 * - Automatic widget refresh on mount
 * - Manual refresh capability
 * - Shared storage with iOS widgets via App Groups
 * - Widget state management
 * 
 * Setup Requirements:
 * 1. Configure App Group in Xcode capabilities
 * 2. Update APP_GROUP_ID constant with your group ID
 * 3. Add widget extension to your iOS project
 * 4. Use ExtensionStorage to share data with widget
 * 
 * @example
 * ```tsx
 * <WidgetProvider>
 *   <App />
 * </WidgetProvider>
 * ```
 * 
 * @see https://github.com/EvanBacon/apple-targets for setup
 */
export function WidgetProvider({ children }: { children: React.ReactNode }) {
  /**
   * Refresh widget on mount
   * Can be configured to update based on specific state changes
   */
  React.useEffect(() => {
    // Optional: Reset widget state
    // Uncomment to clear widget data:
    // storage.set("widget_state", null);
    
    // Refresh widget to show latest data
    ExtensionStorage.reloadWidget();
  }, []);

  /**
   * Manually refresh widget
   * 
   * Call this function whenever you want to update the widget UI
   * with new data from the main app.
   * 
   * @example
   * ```tsx
   * const { refreshWidget } = useWidget();
   * 
   * const handleDataUpdate = () => {
   *   // Update app data
   *   updateData(newData);
   *   
   *   // Refresh widget to show new data
   *   refreshWidget();
   * };
   * ```
   */
  const refreshWidget = useCallback(() => {
    ExtensionStorage.reloadWidget();
  }, []);

  return (
    <WidgetContext.Provider value={{ refreshWidget }}>
      {children}
    </WidgetContext.Provider>
  );
}

/**
 * Hook to access widget context
 * 
 * @returns WidgetContextType object with widget refresh function
 * @throws Error if used outside WidgetProvider
 * 
 * @example
 * ```tsx
 * function FavoritesScreen() {
 *   const { refreshWidget } = useWidget();
 *   const { addFavorite } = useFavorites();
 *   
 *   const handleAddFavorite = async (id: string) => {
 *     await addFavorite(id);
 *     
 *     // Update widget to show new favorite
 *     refreshWidget();
 *   };
 *   
 *   return <View>...</View>;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * function SettingsScreen() {
 *   const { refreshWidget } = useWidget();
 *   
 *   const handleClearData = async () => {
 *     await clearAllData();
 *     
 *     // Refresh widget to reflect cleared state
 *     refreshWidget();
 *   };
 *   
 *   return <View>...</View>;
 * }
 * ```
 */
export const useWidget = () => {
  const context = useContext(WidgetContext);
  
  if (!context) {
    throw new Error("useWidget must be used within a WidgetProvider");
  }
  
  return context;
};

/**
 * Export storage instance for direct access if needed
 * 
 * Use this to manually read/write widget data.
 * 
 * @example
 * ```tsx
 * import { widgetStorage } from '@/contexts/WidgetContext';
 * 
 * // Write data for widget
 * widgetStorage.set('favorites', JSON.stringify(favoritesList));
 * 
 * // Read data in widget
 * const favorites = widgetStorage.get('favorites');
 * ```
 */
export const widgetStorage = storage;

/**
 * Export App Group ID constant
 * Useful for documentation and troubleshooting
 */
export { APP_GROUP_ID };