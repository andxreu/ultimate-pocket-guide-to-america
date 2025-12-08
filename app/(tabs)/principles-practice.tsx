// app/(tabs)/principles-practice.tsx
import React from "react";
import { getSectionById } from "@/data/contentData";
import { SectionList } from "@/components/SectionList";
import { useTheme } from "@/contexts/ThemeContext";

export default function PrinciplesPracticeScreen() {
  const { colors } = useTheme();
  const section = getSectionById("principles-practice");
  if (!section) return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  return <SectionList mainSection={section} showCustomHeader={false} />;
}