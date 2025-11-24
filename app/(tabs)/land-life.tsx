
import React from "react";
import { getSectionById } from "@/data/contentData";
import { SectionList } from "@/components/SectionList";

export default function LandLifeScreen() {
  const section = getSectionById("land-life");
  
  if (!section) {
    return null;
  }

  return <SectionList mainSection={section} />;
}
