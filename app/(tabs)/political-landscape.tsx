import React from "react";
import { getSectionById } from "@/data/contentData";
import { SectionList } from "@/components/SectionList";

export default function PoliticalLandscapeScreen() {
  const section = getSectionById("political-landscape");

  if (!section) {
    return null;
  }

  return <SectionList mainSection={section} showCustomHeader={false} />;
}
