// app/(tabs)/civic-literacy.tsx
import React from "react";
import { getSectionById } from "@/data/contentData";
import { SectionList } from "@/components/SectionList";
import { useTheme } from "@/contexts/ThemeContext";

export default function CivicLiteracyScreen() {
  const { colors } = useTheme();
  const section = getSectionById("civic-literacy");

  // Safety + graceful fallback
  if (!section) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: "600" }}>
          Section not found
        </Text>
      </View>
    );
  }

  return <SectionList mainSection={section} showCustomHeader={false} />;
}