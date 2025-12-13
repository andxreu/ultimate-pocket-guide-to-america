/**
 * Content Data Management
 * 
 * Central hub for all app content including:
 * - Founding documents
 * - Civic literacy topics
 * - Political landscape information
 * - Principles and practice
 * - Land and life geography
 * - American history
 * 
 * Provides unified access to all content sections with helper functions
 * for lookup and navigation.
 * 
 * @module data/contentData
 */

import { foundationsData } from './foundationsData';
import { civicliteracyData } from './civicliteracyData';
import { politicallandscapeData } from './politicallandscapeData';
import { principlespracticeData } from './principlespracticeData';
import { landlifeData } from './landlifeData';
import { historyData } from './historyData';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Subsection - Individual content item
 * 
 * Represents a single article, document, or topic within a section.
 */
export interface SubSection {
  /** Unique identifier for the subsection */
  id: string;
  /** Display title */
  title: string;
  /** Main content/description */
  content: string;
  /** Optional full text content (for documents) */
  fullText?: string;
  /** Optional context/background information */
  context?: string;
  /** Optional image URL */
  imageUrl?: string;
}

/**
 * Section - Group of related subsections
 * 
 * Organizes related content items under a common category.
 */
export interface Section {
  /** Unique identifier for the section */
  id: string;
  /** Display title */
  title: string;
  /** Section description */
  description: string;
  /** Array of subsections within this section */
  subsections: SubSection[];
}

/**
 * Main Section - Top-level content category
 * 
 * Represents a major category of content accessible from the main navigation.
 */
export interface MainSection {
  /** Unique identifier for the main section */
  id: string;
  /** Display title */
  title: string;
  /** Icon name for visual representation */
  icon: string;
  /** Section description */
  description: string;
  /** Array of sections within this main section */
  sections: Section[];
}

// ============================================================================
// CONTENT DATA
// ============================================================================

/**
 * Unified content array — ALL app content
 * 
 * This is the single source of truth for all content in the app.
 * All features (SectionList, Detail pages, Search, etc.) access content through this array.
 * 
 * Content Sections:
 * 1. **Foundations** - Founding documents and core principles
 * 2. **Civic Literacy** - Understanding American government
 * 3. **Political Landscape** - Modern political system
 * 4. **Principles & Practice** - Core values in action
 * 5. **Land & Life** - Geography and culture
 * 6. **History** - Key historical periods and events
 * 
 * @constant
 */
export const contentData: MainSection[] = [
  foundationsData,
  civicliteracyData,
  politicallandscapeData,
  principlespracticeData,
  landlifeData,
  historyData,
];

/**
 * Alias for contentData
 * 
 * @deprecated Use `contentData` instead
 * Kept for backward compatibility with existing code.
 */
export const allContentData: MainSection[] = contentData;

// ============================================================================
// LOOKUP FUNCTIONS
// ============================================================================

/**
 * Look up a main section by ID
 * 
 * @param sectionId - The unique identifier of the main section
 * @returns The matching MainSection or undefined if not found
 * 
 * @example
 * ```tsx
 * const foundations = getSectionById('foundations');
 * if (foundations) {
 *   console.log(foundations.title); // "Foundations"
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // In a component
 * function SectionScreen({ route }) {
 *   const { sectionId } = route.params;
 *   const section = getSectionById(sectionId);
 *   
 *   if (!section) {
 *     return <NotFound />;
 *   }
 *   
 *   return <SectionList mainSection={section} />;
 * }
 * ```
 */
export function getSectionById(sectionId: string): MainSection | undefined {
  return contentData.find((section) => section.id === sectionId);
}

/**
 * Look up a subsection by hierarchical IDs
 * 
 * Traverses the content hierarchy to find a specific subsection.
 * 
 * @param mainSectionId - The main section ID (e.g., 'foundations')
 * @param sectionId - The section ID within the main section
 * @param subsectionId - The subsection ID within the section
 * @returns The matching SubSection or undefined if not found
 * 
 * @example
 * ```tsx
 * const article = getSubSectionById(
 *   'civic-literacy',
 *   'branches',
 *   'executive-branch'
 * );
 * 
 * if (article) {
 *   console.log(article.title);
 *   console.log(article.content);
 * }
 * ```
 */
export function getSubSectionById(
  mainSectionId: string,
  sectionId: string,
  subsectionId: string
): SubSection | undefined {
  const mainSection = getSectionById(mainSectionId);
  if (!mainSection) return undefined;
  
  const section = mainSection.sections.find((s) => s.id === sectionId);
  if (!section) return undefined;
  
  return section.subsections.find((ss) => ss.id === subsectionId);
}

/**
 * Get all subsections from a main section
 * 
 * Flattens the hierarchy to return all subsections within a main section.
 * Useful for search, filtering, or displaying all items from a category.
 * 
 * @param mainSectionId - The main section ID
 * @returns Array of all subsections in the main section
 * 
 * @example
 * ```tsx
 * const allFoundations = getAllSubSections('foundations');
 * console.log(`Total items: ${allFoundations.length}`);
 * ```
 */
export function getAllSubSections(mainSectionId: string): SubSection[] {
  const mainSection = getSectionById(mainSectionId);
  if (!mainSection) return [];
  
  return mainSection.sections.flatMap(section => section.subsections);
}

/**
 * Search content across all sections
 * 
 * Performs a case-insensitive search across titles and content.
 * Returns subsections that match the search query.
 * 
 * @param query - Search query string
 * @returns Array of matching subsections with section context
 * 
 * @example
 * ```tsx
 * const results = searchContent('constitution');
 * results.forEach(result => {
 *   console.log(result.subsection.title);
 *   console.log(result.mainSectionId);
 * });
 * ```
 */
export function searchContent(query: string): Array<{
  subsection: SubSection;
  mainSectionId: string;
  sectionId: string;
}> {
  const results: Array<{
    subsection: SubSection;
    mainSectionId: string;
    sectionId: string;
  }> = [];
  
  const lowerQuery = query.toLowerCase();
  
  contentData.forEach(mainSection => {
    mainSection.sections.forEach(section => {
      section.subsections.forEach(subsection => {
        if (
          subsection.title.toLowerCase().includes(lowerQuery) ||
          subsection.content.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            subsection,
            mainSectionId: mainSection.id,
            sectionId: section.id,
          });
        }
      });
    });
  });
  
  return results;
}

/**
 * Get total count of all content items
 * 
 * @returns Total number of subsections across all sections
 * 
 * @example
 * ```tsx
 * const total = getTotalContentCount();
 * console.log(`App contains ${total} articles`);
 * ```
 */
export function getTotalContentCount(): number {
  return contentData.reduce(
    (total, mainSection) =>
      total + mainSection.sections.reduce(
        (sectionTotal, section) => sectionTotal + section.subsections.length,
        0
      ),
    0
  );
}

// ============================================================================
// SECTION IDS
// ============================================================================

/**
 * Main section IDs for type safety and autocomplete
 * 
 * @constant
 */
export const MAIN_SECTION_IDS = {
  FOUNDATIONS: 'foundations',
  CIVIC_LITERACY: 'civic-literacy',
  POLITICAL_LANDSCAPE: 'political-landscape',
  PRINCIPLES_PRACTICE: 'principles-practice',
  LAND_LIFE: 'land-life',
  HISTORY: 'history',
} as const;

/**
 * Type for main section IDs
 */
export type MainSectionId = typeof MAIN_SECTION_IDS[keyof typeof MAIN_SECTION_IDS];