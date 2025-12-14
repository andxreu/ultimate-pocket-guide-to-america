
import React, { useMemo, useCallback } from "react";
import { Stack } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { contentData } from "@/data/contentData";
import { IconSymbol } from "@/components/IconSymbol";
import QuickAccessGrid from "@/components/QuickAccessGrid";

// Updated hero image to use the uploaded asset
const HERO_IMAGE = require("@/assets/images/d4ded13e-953f-43c6-b97c-4fe496414321.png");

const AMERICAN_FACTS: string[] = [
  "The United States Constitution is the oldest written national constitution still in use.",
  "Yellowstone, established in 1872, is widely considered the first national park in the world.",
  "The Library of Congress is the largest library on Earth, with millions of books, recordings, and maps.",
  "In 1903, the Wright brothers flew the first powered airplane at Kitty Hawk, North Carolina.",
  "The Interstate Highway System spans over 46,000 miles, connecting nearly every major U.S. city.",
  "NASA, founded in 1958, has sent humans to the Moon and robotic probes to every planet in the solar system.",
  "The U.S. has 63 national parks, protecting landscapes from the Everglades to Denali.",
  "Thomas Edison held over 1,000 patents, including the phonograph and a practical electric light bulb.",
  "The U.S. has more than 95,000 miles of shoreline along oceans, gulfs, and the Great Lakes.",
  "American women secured the constitutional right to vote in 1920 with the 19th Amendment.",
  "The Statue of Liberty was a gift from France in 1886, symbolizing freedom and democracy.",
  "The Bill of Rights was ratified in 1791, guaranteeing fundamental freedoms to all Americans.",
  "The U.S. dollar is the world's primary reserve currency, used in international trade.",
  "Mount Rushmore features the carved faces of four presidents: Washington, Jefferson, Roosevelt, and Lincoln.",
  "The Golden Gate Bridge in San Francisco was completed in 1937 and was the longest suspension bridge at the time.",
  "The first American satellite, Explorer 1, was launched in 1958, marking the U.S. entry into the Space Race.",
  "The Smithsonian Institution is the world's largest museum, education, and research complex.",
  "The U.S. has the world's largest economy by nominal GDP.",
  "Benjamin Franklin helped draft the Declaration of Independence and invented bifocal glasses and the lightning rod.",
  "The Grand Canyon is over 277 miles long and up to 18 miles wide, carved by the Colorado River.",
  "The U.S. Postal Service delivers to every address in the nation, over 160 million locations.",
  "The first public library in America was founded in 1731 by Benjamin Franklin in Philadelphia.",
  "The U.S. has more Nobel Prize winners than any other country.",
  "The American flag has had 27 different versions since 1777, with the current 50-star design adopted in 1960.",
  "The Liberty Bell in Philadelphia is an iconic symbol of American independence.",
  "The U.S. military is the most powerful in the world, with bases in over 70 countries.",
  "The first American newspaper was published in Boston in 1690.",
  "The U.S. has the world's third-largest population, after China and India.",
  "The Mississippi River is the second-longest river in North America, flowing 2,340 miles.",
  "The U.S. invented the internet, originally developed as ARPANET in the 1960s.",
  "The first American college, Harvard University, was founded in 1636.",
  "The U.S. has won more Olympic medals than any other country in history.",
  "The Hoover Dam, completed in 1936, provides power to Nevada, Arizona, and California.",
  "The U.S. has the world's largest air force and navy.",
  "The first American astronaut in space was Alan Shepard in 1961.",
  "The U.S. has the most airports in the world, with over 13,000.",
  "The first American zoo opened in Philadelphia in 1874.",
  "The U.S. has the world's largest railway network, spanning over 140,000 miles.",
  "The first American patent was issued in 1790 for a new method of making potash.",
  "The U.S. has the most billionaires of any country in the world.",
  "The first American public school was established in Boston in 1635.",
  "The U.S. has the world's largest coal reserves.",
  "The first American lighthouse was built in Boston Harbor in 1716.",
  "The U.S. has the most universities ranked in the global top 100.",
  "The first American stock exchange was established in Philadelphia in 1790.",
  "The U.S. has the world's largest oil reserves outside the Middle East.",
  "The first American fire department was established in New York City in 1648.",
  "The U.S. has the most diverse geography of any country, from deserts to rainforests.",
  "The first American hospital was founded in Philadelphia in 1751.",
  "The U.S. has the world's largest entertainment industry, centered in Hollywood.",
];

const getIconName = (icon: string) => {
  const iconMap: { [key: string]: { ios: string; android: string } } = {
    book: { ios: "book.fill", android: "book" },
    school: { ios: "graduationcap.fill", android: "school" },
    flag: { ios: "flag.fill", android: "flag" },
    balance: { ios: "scale.3d", android: "balance" },
    globe: { ios: "globe.americas.fill", android: "public" },
    "balance-scale": { ios: "scale.3d", android: "balance" },
  };

  return iconMap[icon] || { ios: "questionmark.circle", android: "help" };
};

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [fact, setFact] = React.useState(() => {
    const idx = Math.floor(Math.random() * AMERICAN_FACTS.length);
    return AMERICAN_FACTS[idx];
  });

  const shuffleFact = useCallback(() => {
    const idx = Math.floor(Math.random() * AMERICAN_FACTS.length);
    setFact(AMERICAN_FACTS[idx]);
  }, []);

  const navigateToSection = useCallback(
    (sectionId: string) => {
      router.push(`/(tabs)/${sectionId}` as any);
    },
    [router]
  );

  const sectionCards = useMemo(() => {
    return contentData.map((section, index) => {
      const icons = getIconName(section.icon);
      return (
        <TouchableOpacity
          key={section.id}
          style={[
            styles.sectionCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.primary + "10",
            },
          ]}
          onPress={() => navigateToSection(section.id)}
          activeOpacity={0.7}
          accessibilityLabel={`Navigate to ${section.title}`}
          accessibilityRole="button"
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: colors.highlight },
            ]}
          >
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
            <Text
              style={[
                styles.sectionDescription,
                { color: colors.textSecondary },
              ]}
            >
              {section.description}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  }, [colors, navigateToSection]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Image
              source={HERO_IMAGE}
              style={styles.heroImage}
              resizeMode="contain"
              accessible={true}
              accessibilityLabel="American flag representing the Pocket Guide to America"
            />
          </View>

          <View
            style={[
              styles.factCard,
              { backgroundColor: colors.card, borderColor: colors.primary + "20" },
            ]}
          >
            <View style={styles.factHeader}>
              <Text style={[styles.factLabel, { color: colors.textSecondary }]}>
                Did you know?
              </Text>
              <TouchableOpacity
                onPress={shuffleFact}
                style={styles.shuffleButton}
                accessibilityLabel="Get a new fact"
                accessibilityRole="button"
              >
                <IconSymbol
                  ios_icon_name="arrow.clockwise"
                  android_material_icon_name="refresh"
                  size={16}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.factText, { color: colors.text }]}>{fact}</Text>
          </View>

          <View style={styles.sectionsHeaderRow}>
            <Text
              style={[
                styles.sectionsHeaderText,
                { color: colors.textSecondary },
              ]}
            >
              Explore the guide
            </Text>
          </View>

          <View style={styles.sectionsContainer}>{sectionCards}</View>

          <QuickAccessGrid />
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
    marginBottom: 16,
    alignItems: "center",
  },
  heroImage: {
    width: "100%",
    height: 280,
  },
  factCard: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  factHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  factLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    lineHeight: 17.4,
  },
  shuffleButton: {
    padding: 4,
    minWidth: 32,
    minHeight: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  factText: {
    fontSize: 14,
    lineHeight: 20.3,
  },
  sectionsHeaderRow: {
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionsHeaderText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    lineHeight: 17.4,
  },
  sectionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  sectionCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
