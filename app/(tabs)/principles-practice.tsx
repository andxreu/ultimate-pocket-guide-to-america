import React from "react";
import { getSectionById } from "@/data/contentData";
import { SectionList } from "@/components/SectionList";

export default function PrinciplesPracticeScreen() {
  const section = getSectionById("principles-practice");

  if (!section) {
    return null;
  }

  return <SectionList mainSection={section} showCustomHeader={false} />;
}
