// app/(tabs)/quiz/index.tsx
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import { Stack } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { generateRandomQuiz, QuizQuestion } from "@/data/quizData";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

export default function QuizScreen() {
  const { colors, isDark } = useTheme();
  const [questions] = useState<QuizQuestion[]>(() => generateRandomQuiz(10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);

  const current = questions[currentIndex];
  const isLast = currentIndex >= questions.length - 1;
  const isComplete = currentIndex >= questions.length;

  const handleAnswer = useCallback((index: number) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
    if (index === current.correctIndex) {
      setScore(s => s + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }, [current.correctIndex, revealed]);

  const nextQuestion = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentIndex(i => i + 1);
    setSelected(null);
    setRevealed(false);
  }, []);

  const restart = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCurrentIndex(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
  }, []);

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const emoji = percentage >= 90 ? "trophy" : percentage >= 70 ? "star.fill" : percentage >= 50 ? "hand.thumbsup.fill" : "brain";

    return (
      <>
        <Stack.Screen options={{ title: "Quiz Complete!" }} />
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <FlatList
            data={[]}
            ListHeaderComponent={
              <View style={styles.completion}>
                <Animated.View entering={FadeIn.duration(800)}>
                  <IconSymbol ios_icon_name={emoji} android_material_icon_name="emoji_events" size={100} color={colors.primary} />
                </Animated.View>

                <Text style={[styles.completionScore, { color: colors.text }]}>
                  {score} / {questions.length}
                </Text>
                <Text style={[styles.completionPercent, { color: colors.primary }]}>
                  {percentage}%
                </Text>

                <Text style={[styles.completionTitle, { color: colors.text }]}>
                  {percentage >= 90 ? "Outstanding!" : percentage >= 70 ? "Great Job!" : percentage >= 50 ? "Nice Effort!" : "Keep Learning!"}
                </Text>

                <TouchableOpacity style={[styles.restartBtn, { backgroundColor: colors.primary }]} onPress={restart}>
                  <IconSymbol ios_icon_name="arrow.clockwise" android_material_icon_name="refresh" size={22} color="#FFF" />
                  <Text style={styles.restartText}>New Quiz</Text>
                </TouchableOpacity>
              </View>
            }
            ListFooterComponent={<AppFooter />}
            contentContainerStyle={{ paddingBottom: 120 }}
          />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Civics Quiz" }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={current.options}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={styles.scrollContent}
          ListHeaderComponent={
            <>
              {/* Progress */}
              <View style={styles.progressContainer}>
                <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                  Question {currentIndex + 1} of {questions.length}
                </Text>
                <View style={styles.progressBar}>
                  <Animated.View
                    style={[
                      styles.progressFill,
                      {
                        backgroundColor: colors.primary,
                        width: `${((currentIndex + 1) / questions.length) * 100}%`,
                      },
                    ]}
                  />
                </View>
              </View>

              {/* Question Card */}
              <BlurView intensity={isDark ? 90 : 110} tint={isDark ? "dark" : "light"} style={styles.questionCard}>
                <Text style={[styles.question, { color: colors.text }]}>{current.question}</Text>
              </BlurView>
            </>
          }
          renderItem={({ item, index }) => (
            <Option
              text={item}
              index={index}
              isSelected={selected === index}
              isCorrect={index === current.correctIndex}
              revealed={revealed}
              colors={colors}
              isDark={isDark}
              onPress={() => handleAnswer(index)}
            />
          )}
          ListFooterComponent={
            <>
              {/* Explanation */}
              {revealed && current.explanation && (
                <Animated.View entering={FadeIn} style={styles.explanation}>
                  <BlurView intensity={isDark ? 80 : 100} tint={isDark ? "dark" : "light"} style={styles.explanationInner}>
                    <IconSymbol
                      ios_icon_name={selected === current.correctIndex ? "checkmark.circle.fill" : "xmark.circle.fill"}
                      android_material_icon_name={selected === current.correctIndex ? "check_circle" : "cancel"}
                      size={28}
                      color={selected === current.correctIndex ? colors.primary : colors.accent}
                    />
                    <Text style={[styles.explanationTitle, { color: selected === current.correctIndex ? colors.primary : colors.accent }]}>
                      {selected === current.correctIndex ? "Correct!" : "Incorrect"}
                    </Text>
                    <Text style={[styles.explanationText, { color: colors.textSecondary }]}>{current.explanation}</Text>
                  </BlurView>
                </Animated.View>
              )}

              {/* Next Button */}
              {revealed && (
                <TouchableOpacity style={[styles.nextBtn, { backgroundColor: colors.primary }]} onPress={nextQuestion}>
                  <Text style={styles.nextText}>{isLast ? "See Results" : "Next Question"}</Text>
                  <IconSymbol ios_icon_name="arrow.right" android_material_icon_name="arrow_forward" size={20} color="#FFF" />
                </TouchableOpacity>
              )}
              <AppFooter />
            </>
          }
        />
      </View>
    </>
  );
}

function Option({
  text,
  index,
  isSelected,
  isCorrect,
  revealed,
  colors,
  isDark,
  onPress,
}: {
  text: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  revealed: boolean;
  colors: any;
  isDark: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleIn = () => {
    if (!revealed) scale.value = withSpring(0.97);
  };
  const handleOut = () => {
    scale.value = withSpring(1);
  };

  let bg = colors.card;
  let border = colors.primary + "15";

  if (revealed) {
    if (isCorrect) {
      bg = colors.primary + "20";
      border = colors.primary;
    } else if (isSelected) {
      bg = colors.accent + "20";
      border = colors.accent;
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} onPressIn={handleIn} onPressOut={handleOut} disabled={revealed}>
      <Animated.View style={[styles.option, { backgroundColor: bg, borderColor: border }, animatedStyle]}>
        <BlurView intensity={isDark ? 80 : 100} tint={isDark ? "dark" : "light"} style={styles.optionInner}>
          <View style={[styles.optionLetter, { backgroundColor: revealed && isCorrect ? colors.primary : colors.highlight }]}>
            <Text style={[styles.letterText, { color: revealed && isCorrect ? "#FFF" : colors.primary }]}>
              {String.fromCharCode(65 + index)}
            </Text>
          </View>
          <Text style={[styles.optionText, { color: colors.text }]}>{text}</Text>
          {revealed && isCorrect && (
            <IconSymbol ios_icon_name="checkmark.circle.fill" android_material_icon_name="check_circle" size={28} color={colors.primary} />
          )}
          {revealed && isSelected && !isCorrect && (
            <IconSymbol ios_icon_name="xmark.circle.fill" android_material_icon_name="cancel" size={28} color={colors.accent} />
          )}
        </BlurView>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingTop: 32, paddingHorizontal: 16, paddingBottom: 120 },
  progressContainer: { marginBottom: 24 },
  progressText: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  progressBar: { height: 8, backgroundColor: "#333", borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 4 },
  questionCard: { padding: 24, borderRadius: 20, marginBottom: 24, overflow: "hidden" },
  question: { fontSize: 19, fontWeight: "700", lineHeight: 28, textAlign: "center" },
  option: { borderRadius: 20, borderWidth: 2, marginBottom: 12, overflow: "hidden" },
  optionInner: { flexDirection: "row", padding: 18, alignItems: "center", gap: 16 },
  optionLetter: { width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  letterText: { fontSize: 16, fontWeight: "900" },
  optionText: { flex: 1, fontSize: 16.5, lineHeight: 24 },
  explanation: { marginTop: 12, marginBottom: 24 },
  explanationInner: { padding: 20, borderRadius: 20, borderWidth: 2, overflow: "hidden" },
  explanationTitle: { fontSize: 18, fontWeight: "700", marginLeft: 8 },
  explanationText: { fontSize: 15.5, lineHeight: 24, marginTop: 8 },
  nextBtn: { flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 18, borderRadius: 20, gap: 12, marginTop: 12 },
  nextText: { color: "#FFF", fontSize: 17, fontWeight: "700" },
  completion: { alignItems: "center", paddingVertical: 60 },
  completionScore: { fontSize: 56, fontWeight: "900", marginTop: 20 },
  completionPercent: { fontSize: 72, fontWeight: "900", marginTop: -10 },
  completionTitle: { fontSize: 28, fontWeight: "800", marginTop: 16, textAlign: "center" },
  restartBtn: { flexDirection: "row", alignItems: "center", paddingHorizontal: 32, paddingVertical: 18, borderRadius: 20, gap: 12, marginTop: 32 },
  restartText: { color: "#FFF", fontSize: 18, fontWeight: "700" },
});