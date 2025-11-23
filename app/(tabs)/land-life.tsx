
import React from "react";
import { Stack } from "expo-router";
import { getSectionById } from "@/data/contentData";
import { SectionList } from "@/components/SectionList";

export default function LandLifeScreen() {
  const section = getSectionById("land-life");
  
  if (!section) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Land and Life",
          headerShown: false,
        }}
      />
      <SectionList mainSection={section} />
    </>
  );
}
