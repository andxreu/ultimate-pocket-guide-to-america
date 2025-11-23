
import React from "react";
import { Stack } from "expo-router";
import { getSectionById } from "@/data/contentData";
import { SectionList } from "@/components/SectionList";

export default function CivicLiteracyScreen() {
  const section = getSectionById("civic-literacy");
  
  if (!section) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Civic Literacy",
          headerShown: false,
        }}
      />
      <SectionList mainSection={section} />
    </>
  );
}
