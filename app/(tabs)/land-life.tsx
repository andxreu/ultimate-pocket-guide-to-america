// app/(tabs)/land-life.tsx
import React from "react";
import { getSectionById } from "@/data/contentData";
import { SectionList } from "@/components/SectionList";
import { useTheme } from "@/contexts/ThemeContext";

export default function LandLifeScreen() {
  const { colors } = useTheme();
  const section = getSectionById("land-life");
  if (!section) return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  return <SectionList mainSection={section} showCustomHeader={false} />;
}