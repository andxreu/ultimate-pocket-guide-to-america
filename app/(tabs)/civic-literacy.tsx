
import React from "react";
import { getSectionById } from "@/data/contentData";
import { SectionList } from "@/components/SectionList";

export default function CivicLiteracyScreen() {
  const section = getSectionById("civic-literacy");
  
  if (!section) {
    return null;
  }

  return <SectionList mainSection={section} />;
}
