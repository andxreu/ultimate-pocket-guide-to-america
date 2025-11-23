
import React from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { contentData } from "@/data/contentData";
import { IconSymbol } from "@/components/IconSymbol";
import { HeaderRightButton, HeaderLeftButton } from "@/components/HeaderButtons";
import { AppFooter } from "@/components/AppFooter";

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
            <Text
              style={[styles.title, { color: colors.text }]}
              accessibilityRole="header"
            >
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
                  style={[
                    styles.sectionCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: "rgba(255, 255, 255, 0.06)",
                    },
                  ]}
                  onPress={() => navigateToSection(section.id)}
                  activeOpacity={0.7}
                  accessibilityLabel={`Navigate to ${section.title}`}
                  accessibilityRole="button"
                >
                  <View style={[styles.iconContainer, { backgroundColor: colors.highlight }]}>
                    <IconSymbol
                      ios_icon_name={icons.ios}
                      android_material_icon_name={icons.android}
                      size={28}
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

          <AppFooter />
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
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 28,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 37.7,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 21.75,
    paddingHorizontal: 20,
  },
  sectionsContainer: {
    gap: 12,
  },
  sectionCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 24.65,
  },
  sectionDescription: {
    fontSize: 13,
    lineHeight: 18.85,
  },
});
