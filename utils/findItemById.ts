
/**
 * Item Route and Lookup Utilities
 * 
 * Provides helper functions for:
 * - Generating routes for content items
 * - Finding items across content sections
 * - Determining item types
 * 
 * @module utils/findItemById
 */

import { contentData, type SubSection, type Section, type MainSection } from '@/data/contentData';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * List of founding document IDs
 * 
 * These documents use the `/document/[id]` route instead of `/detail/[id]`
 * 
 * @constant
 */
export const FOUNDING_DOCUMENTS = [
  'declaration',
  'articles',
  'constitution',
  'bill-of-rights',
  'federalist-papers',
] as const;

/**
 * Type for founding document IDs
 */
export type FoundingDocumentId = typeof FOUNDING_DOCUMENTS[number];

// ============================================================================
// ROUTE GENERATION
// ============================================================================

/**
 * Get the route for a specific item by ID
 * 
 * Determines whether an item should route to `/document/[id]` (for founding documents)
 * or `/detail/[id]` (for all other content).
 * 
 * @param id - The unique item identifier
 * @returns The route path for the item
 * 
 * @example
 * ```tsx
 * const route = getItemRoute('constitution');
 * // Returns: '/document/constitution'
 * 
 * const route = getItemRoute('branches-of-government');
 * // Returns: '/detail/branches-of-government'
 * ```
 * 
 * @example
 * ```tsx
 * // In a component
 * import { getItemRoute } from '@/utils/findItemById';
 * import { useRouter } from 'expo-router';
 * 
 * function ItemCard({ item }) {
 *   const router = useRouter();
 *   
 *   const handlePress = () => {
 *     const route = getItemRoute(item.id);
 *     router.push(route);
 *   };
 *   
 *   return <TouchableOpacity onPress={handlePress}>...</TouchableOpacity>;
 * }
 * ```
 */
export function getItemRoute(id: string): string {
  // Check if it's a founding document
  if (FOUNDING_DOCUMENTS.includes(id as FoundingDocumentId)) {
    return `/document/${id}`;
  }
  
  // Default to detail route for all other content
  return `/detail/${id}`;
}

/**
 * Check if an item is a founding document
 * 
 * @param id - The item identifier to check
 * @returns true if item is a founding document, false otherwise
 * 
 * @example
 * ```tsx
 * const isDocument = isFoundingDocument('constitution'); // true
 * const isDocument = isFoundingDocument('electoral-college'); // false
 * ```
 */
export function isFoundingDocument(id: string): boolean {
  return FOUNDING_DOCUMENTS.includes(id as FoundingDocumentId);
}

/**
 * Get the route type for an item
 * 
 * @param id - The item identifier
 * @returns 'document' for founding documents, 'detail' for other content
 * 
 * @example
 * ```tsx
 * const type = getRouteType('bill-of-rights'); // 'document'
 * const type = getRouteType('separation-of-powers'); // 'detail'
 * ```
 */
export function getRouteType(id: string): 'document' | 'detail' {
  return isFoundingDocument(id) ? 'document' : 'detail';
}

// ============================================================================
// ITEM LOOKUP
// ============================================================================

/**
 * Result type for findItemById
 */
export interface FindItemResult {
  /** The found subsection item */
  item: SubSection;
  /** The section containing the item */
  section: Section;
  /** The main section containing the item */
  mainSection: MainSection;
}

/**
 * Find an item by ID across all content sections
 * 
 * Searches through the entire content hierarchy to find a matching item.
 * Returns the item along with its parent section and main section for context.
 * 
 * @param id - The item ID to find
 * @returns FindItemResult if found, null otherwise
 * 
 * @example
 * ```tsx
 * const result = findItemById('constitution');
 * if (result) {
 *   console.log(result.item.title); // "The Constitution"
 *   console.log(result.section.title); // "Founding Documents"
 *   console.log(result.mainSection.title); // "Civic Literacy"
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // In a component
 * function ItemDetail({ itemId }) {
 *   const result = findItemById(itemId);
 *   
 *   if (!result) {
 *     return <NotFound />;
 *   }
 *   
 *   return (
 *     <View>
 *       <Text>{result.mainSection.title} › {result.section.title}</Text>
 *       <Text>{result.item.title}</Text>
 *       <Text>{result.item.content}</Text>
 *     </View>
 *   );
 * }
 * ```
 */
export function findItemById(id: string): FindItemResult | null {
  if (!id || typeof id !== 'string') {
    return null;
  }

  try {
    for (const mainSection of contentData) {
      if (!mainSection || !mainSection.sections) continue;
      
      for (const section of mainSection.sections) {
        if (!section || !section.subsections) continue;
        
        for (const subsection of section.subsections) {
          if (subsection && subsection.id === id) {
            return {
              item: subsection,
              section: section,
              mainSection: mainSection,
            };
          }
        }
      }
    }
  } catch (error) {
    if (__DEV__) {
      console.error('Error in findItemById:', error);
    }
  }
  
  return null;
}

/**
 * Get the full route path with error handling
 * 
 * Safe version of getItemRoute that handles invalid IDs.
 * 
 * @param id - The item identifier
 * @param fallback - Fallback route if ID is invalid
 * @returns Route path or fallback
 * 
 * @example
 * ```tsx
 * const route = getItemRouteSafe('constitution', '/');
 * // Returns: '/document/constitution'
 * 
 * const route = getItemRouteSafe('', '/');
 * // Returns: '/' (fallback)
 * ```
 */
export function getItemRouteSafe(id: string, fallback: string = '/'): string {
  if (!id || typeof id !== 'string') {
    return fallback;
  }
  
  return getItemRoute(id);
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard to check if a string is a valid founding document ID
 * 
 * @param id - Value to check
 * @returns true if id is a FoundingDocumentId
 */
export function isValidFoundingDocumentId(id: string): id is FoundingDocumentId {
  return FOUNDING_DOCUMENTS.includes(id as FoundingDocumentId);
}
