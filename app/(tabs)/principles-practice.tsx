
import React from "react";
import { Stack } from "expo-router";
import { getSectionById } from "@/data/contentData";
import { SectionList } from "@/components/SectionList";

export default function PrinciplesPracticeScreen() {
  const section = getSectionById("principles-practice");
  
  if (!section) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Principles in Practice",
          headerShown: false,
        }}
      />
      <SectionList mainSection={section} />
    </>
  );
}
