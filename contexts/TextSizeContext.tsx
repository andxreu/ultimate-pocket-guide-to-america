import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Available text size options
 */
export type TextSize = 'small' | 'default' | 'large' | 'extra-large';

/**
 * Text size context type
 */
interface TextSizeContextType {
  /** Current text size setting */
  textSize: TextSize;
  /** Update text size and persist to storage */
  setTextSize: (size: TextSize) => Promise<void>;
  /** Get multiplier for current text size */
  getTextSizeMultiplier: () => number;
  /** Calculate font size based on base size and current multiplier */
  getFontSize: (baseSize: number) => number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const TEXT_SIZE_STORAGE_KEY = 'app_text_size_preference';

/**
 * Text size multipliers for accessibility
 * 
 * @constant
 */
export const TEXT_SIZE_MULTIPLIERS: Record<TextSize, number> = {
  'small': 0.85,
  'default': 1.0,
  'large': 1.15,
  'extra-large': 1.3,
} as const;

// ============================================================================
// CONTEXT
// ============================================================================

const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined);

/**
 * Text Size Provider Component
 * 
 * Manages app-wide text size preferences for accessibility.
 * 
 * Features:
 * - 4 text size options (small, default, large, extra-large)
 * - Persistent across app sessions
 * - Multiplier-based scaling (0.85x to 1.3x)
 * - Utility functions for easy font size calculation
 * - Optimistic updates
 * - Prevents flash while loading
 * 
 * Text Size Options:
 * - **Small**: 0.85x multiplier (85% of base size)
 * - **Default**: 1.0x multiplier (100% of base size)
 * - **Large**: 1.15x multiplier (115% of base size)
 * - **Extra Large**: 1.3x multiplier (130% of base size)
 * 
 * @example
 * ```tsx
 * <TextSizeProvider>
 *   <App />
 * </TextSizeProvider>
 * ```
 */
export function TextSizeProvider({ children }: { children: ReactNode }) {
  const [textSize, setTextSizeState] = useState<TextSize>('default');
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Load saved text size preference on mount
   */
  useEffect(() => {
    loadTextSizePreference();
  }, []);

  /**
   * Load text size preference from AsyncStorage
   */
  const loadTextSizePreference = async () => {
    try {
      const savedSize = await AsyncStorage.getItem(TEXT_SIZE_STORAGE_KEY);
      
      // Validate saved size is a valid TextSize
      if (
        savedSize && 
        (savedSize === 'small' || 
         savedSize === 'default' || 
         savedSize === 'large' || 
         savedSize === 'extra-large')
      ) {
        setTextSizeState(savedSize as TextSize);
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Error loading text size preference:', error);
      }
      // Default to 'default' on error
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update text size and persist to storage
   * 
   * @param newSize - New text size to apply
   * @returns Promise that resolves when saved
   * @throws Error if storage operation fails
   * 
   * Note: Updates UI optimistically even if save fails
   */
  const setTextSize = useCallback(async (newSize: TextSize): Promise<void> => {
    try {
      await AsyncStorage.setItem(TEXT_SIZE_STORAGE_KEY, newSize);
      setTextSizeState(newSize);
    } catch (error) {
      if (__DEV__) {
        console.error('Error saving text size preference:', error);
      }
      // Still update UI even if save fails (optimistic update)
      setTextSizeState(newSize);
      throw error; // Re-throw so caller knows save failed
    }
  }, []);

  /**
   * Get current text size multiplier
   * 
   * @returns Multiplier for current text size (0.85 to 1.3)
   * 
   * @example
   * ```tsx
   * const multiplier = getTextSizeMultiplier(); // 1.15 if 'large'
   * ```
   */
  const getTextSizeMultiplier = useCallback(() => {
    return TEXT_SIZE_MULTIPLIERS[textSize];
  }, [textSize]);

  /**
   * Calculate font size based on base size and current multiplier
   * 
   * @param baseSize - Base font size in pixels
   * @returns Calculated font size with multiplier applied
   * 
   * @example
   * ```tsx
   * const fontSize = getFontSize(16); // 18.4 if text size is 'large'
   * ```
   */
  const getFontSize = useCallback((baseSize: number): number => {
    return baseSize * TEXT_SIZE_MULTIPLIERS[textSize];
  }, [textSize]);

  /**
   * Memoize context value to prevent unnecessary re-renders
   */
  const contextValue = useMemo(
    () => ({
      textSize,
      setTextSize,
      getTextSizeMultiplier,
      getFontSize,
    }),
    [textSize, setTextSize, getTextSizeMultiplier, getFontSize]
  );

  // Show nothing while loading (prevents flash of wrong text size)
  if (isLoading) {
    return null;
  }

  return (
    <TextSizeContext.Provider value={contextValue}>
      {children}
    </TextSizeContext.Provider>
  );
}

/**
 * Hook to access text size context
 * 
 * @returns TextSizeContextType object with text size state and methods
 * @throws Error if used outside TextSizeProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { textSize, getFontSize } = useTextSize();
 *   
 *   return (
 *     <Text style={{ fontSize: getFontSize(16) }}>
 *       Current size: {textSize}
 *     </Text>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * function SettingsScreen() {
 *   const { textSize, setTextSize } = useTextSize();
 *   
 *   return (
 *     <View>
 *       {(['small', 'default', 'large', 'extra-large'] as TextSize[]).map(size => (
 *         <Button
 *           key={size}
 *           onPress={() => setTextSize(size)}
 *           selected={textSize === size}
 *         >
 *           {size}
 *         </Button>
 *       ))}
 *     </View>
 *   );
 * }
 * ```
 */
export function useTextSize(): TextSizeContextType {
  const context = useContext(TextSizeContext);
  
  if (!context) {
    throw new Error('useTextSize must be used within TextSizeProvider');
  }
  
  return context;
}