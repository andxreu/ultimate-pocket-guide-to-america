
import React from "react";
import { Stack } from "expo-router";
import { getSectionById } from "@/data/contentData";
import { SectionList } from "@/components/SectionList";

export default function FoundationsScreen() {
  const section = getSectionById("foundations");
  
  if (!section) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Foundations",
          headerShown: false,
        }}
      />
      <SectionList mainSection={section} />
    </>
  );
}
