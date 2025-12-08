
import { contentData, MainSection, Section, SubSection } from '@/data/contentData';

export interface ItemLookupResult {
  item: SubSection;
  section: Section;
  mainSection: MainSection;
}

/**
 * Finds an item by its ID across all content data
 * Returns the item along with its parent section and main section
 */
export function findItemById(id: string): ItemLookupResult | null {
  for (const mainSection of contentData) {
    for (const section of mainSection.sections) {
      for (const subsection of section.subsections) {
        if (subsection.id === id) {
          return {
            item: subsection,
            section,
            mainSection,
          };
        }
      }
    }
  }
  return null;
}

/**
 * Determines if an item is a founding document
 */
export function isFoundingDocument(id: string): boolean {
  const foundingDocs = [
    'declaration',
    'articles',
    'constitution',
    'bill-of-rights',
    'federalist-papers',
  ];
  return foundingDocs.includes(id);
}

/**
 * Gets the appropriate route for an item (detail or document)
 */
export function getItemRoute(id: string): string {
  return isFoundingDocument(id) ? `/document/${id}` : `/detail/${id}`;
}
