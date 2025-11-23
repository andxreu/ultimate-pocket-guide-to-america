
import React from "react";
import { Stack } from "expo-router";
import { getSectionById } from "@/data/contentData";
import { SectionList } from "@/components/SectionList";

export default function PoliticalLandscapeScreen() {
  const section = getSectionById("political-landscape");
  
  if (!section) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Political Landscape",
          headerShown: false,
        }}
      />
      <SectionList mainSection={section} />
    </>
  );
}
