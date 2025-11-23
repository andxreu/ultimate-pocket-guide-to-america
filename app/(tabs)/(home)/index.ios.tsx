
import React from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { contentData } from "@/data/contentData";
import { IconSymbol } from "@/components/IconSymbol";
import { HeaderRightButton, HeaderLeftButton } from "@/components/HeaderButtons";

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const getIconName = (icon: string) => {
    const iconMap: { [key: string]: { ios: string; android: string } } = {
      book: { ios: "book.fill", android: "book" },
      school: { ios: "graduationcap.fill", android: "school" },
      flag: { ios: "flag.fill", android: "flag" },
      "balance-scale": { ios: "scale.3d", android: "balance" },
      globe: { ios: "globe.americas.fill", android: "public" }
    };
    return iconMap[icon] || { ios: "circle.fill", android: "circle" };
  };

  const navigateToSection = (sectionId: string) => {
    router.push(`/(tabs)/${sectionId}` as any);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <HeaderRightButton />,
          headerLeft: () => <HeaderLeftButton />,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Ultimate Pocket Guide to America
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Explore the foundations, principles, and heritage of American democracy
            </Text>
          </View>

          <View style={styles.sectionsContainer}>
            {contentData.map((section, index) => {
              const icons = getIconName(section.icon);
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.sectionCard, { backgroundColor: colors.card }]}
                  onPress={() => navigateToSection(section.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconContainer, { backgroundColor: colors.highlight }]}>
                    <IconSymbol
                      ios_icon_name={icons.ios}
                      android_material_icon_name={icons.android}
                      size={32}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                      {section.title}
                    </Text>
                    <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
                      {section.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  sectionsContainer: {
    gap: 16,
  },
  sectionCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
