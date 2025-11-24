
import React from "react";
import { getSectionById } from "@/data/contentData";
import { SectionList } from "@/components/SectionList";

export default function FoundationsScreen() {
  const section = getSectionById("foundations");
  
  if (!section) {
    return null;
  }

  return <SectionList mainSection={section} />;
}
