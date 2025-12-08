// utils/findItemById.ts
import { contentData, MainSection, Section, SubSection } from "@/data/contentData";

export interface ItemLookupResult {
  item: SubSection;
  section: Section;
  mainSection: MainSection;
}

const FOUNDING_DOCUMENTS = new Set([
  "declaration",
  "articles",
  "constitution",
  "bill-of-rights",
  "federalist-papers",
]);

/**
 * Finds an item by ID across all content data
 Returns the item + its hierarchy for breadcrumbs, headers, etc.
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
 * Fast check if an item is one of the Founding Documents
 */
export function isFoundingDocument(id: string): boolean {
  return FOUNDING_DOCUMENTS.has(id);
}

/**
 * Returns correct route based on item type
 */
export function getItemRoute(id: string): string {
  return isFoundingDocument(id) ? `/document/${id}` : `/detail/${id}`;
}

/**
 * Bonus: Get breadcrumb trail as array (e.g. ["Foundations", "Principles", "Democracy"])
 */
export function getBreadcrumb(id: string): string[] | null {
  const result = findItemById(id);
  if (!result) return null;
  return [result.mainSection.title, result.section.title, result.item.title];
}