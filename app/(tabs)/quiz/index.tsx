import React, { useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import { Stack } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { generateRandomQuiz, QuizQuestion } from "@/data/quizData";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeInDown,
  ZoomIn,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

/**
 * Quiz Screen Component
 * Interactive civics quiz with explanations and scoring
 */
export default function QuizScreen() {
  const { colors, shadows } = useTheme();
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() =>
    generateRandomQuiz(10)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isQuizComplete = currentQuestionIndex >= quizQuestions.length;

  /**
   * Handle answer selection with haptic feedback
   */
  const handleAnswerSelect = useCallback((index: number) => {
    if (selectedAnswer !== null) return;

    const isCorrect = index === currentQuestion.correctIndex;
    
    try {
      if (Platform.OS !== 'web') {
        if (isCorrect) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }

    setSelectedAnswer(index);
    setShowExplanation(true);

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
  }, [selectedAnswer, currentQuestion, score, answeredQuestions, currentQuestionIndex]);

  /**
   * Handle next question with haptic feedback
   */
  const handleNext = useCallback(() => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }, [currentQuestionIndex]);

  /**
   * Handle quiz restart with haptic feedback
   */
  const handleRestart = useCallback(() => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    
    setQuizQuestions(generateRandomQuiz(10));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions([]);
  }, []);

  /**
   * Render quiz completion screen
   */
  if (isQuizComplete) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const isPerfect = score === quizQuestions.length;
    const isGood = percentage >= 70;

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            style={styles.completionContainer}
            entering={FadeIn.duration(600)}
          >
            <Animated.View
              style={[
                styles.scoreCircle,
                { 
                  backgroundColor: colors.primary + '20',
                  borderColor: colors.primary,
                  ...shadows.medium,
                },
              ]}
              entering={ZoomIn.duration(600).springify()}
            >
              <Text style={[styles.scoreText, { color: colors.primary }]}>
                {score}
              </Text>
              <Text style={[styles.scoreDivider, { color: colors.primary }]}>
                /
              </Text>
              <Text
                style={[styles.scoreTotalText, { color: colors.primary }]}
              >
                {quizQuestions.length}
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(300).springify()}>
              <Text style={[styles.completionTitle, { color: colors.text }]}>
                {isPerfect ? "Perfect Score! 🎉" : isGood ? "Great Job! 👏" : "Quiz Complete!"}
              </Text>
              <Text
                style={[
                  styles.completionPercentage,
                  { color: colors.primary },
                ]}
              >
                {percentage}%
              </Text>
              <Text
                style={[
                  styles.completionMessage,
                  { color: colors.textSecondary },
                ]}
              >
                You answered {score} out of {quizQuestions.length} questions
                correctly.
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(500).springify()}>
              <TouchableOpacity
                style={[
                  styles.restartButton,
                  { 
                    backgroundColor: colors.primary,
                    ...shadows.small,
                  },
                ]}
                onPress={handleRestart}
                activeOpacity={0.8}
                accessibilityLabel="Restart quiz with new questions"
                accessibilityRole="button"
              >
                <IconSymbol
                  ios_icon_name="arrow.clockwise"
                  android_material_icon_name="refresh"
                  size={20}
                  color="#FFFFFF"
                />
                <Text style={styles.restartButtonText}>New Quiz</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          <AppFooter />
        </ScrollView>
      </View>
    );
  }

  /**
   * Render active quiz
   */
  return (
    <>
      <Stack.Screen
        options={{
          title: "Civics Quiz",
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with Progress */}
          <Animated.View 
            style={styles.header}
            entering={FadeInDown.delay(50).springify()}
          >
            <Text
              style={[styles.title, { color: colors.text }]}
              accessibilityRole="header"
            >
              Civics Quiz
            </Text>
            <View style={styles.progressContainer}>
              <Text
                style={[
                  styles.progressText,
                  { color: colors.textSecondary },
                ]}
              >
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </Text>
              <View
                style={[
                  styles.progressBar,
                  { backgroundColor: colors.highlight },
                ]}
              >
                <Animated.View
                  style={[
                    styles.progressFill,
                    {
                      backgroundColor: colors.primary,
                      width: `${
                        ((currentQuestionIndex + 1) / quizQuestions.length) *
                        100
                      }%`,
                    },
                  ]}
                />
              </View>
            </View>
          </Animated.View>

          {/* Question Card */}
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
          >
            <View
              style={[
                styles.questionCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.primary + "15",
                  ...shadows.small,
                },
              ]}
            >
              <Text style={[styles.questionText, { color: colors.text }]}>
                {currentQuestion.question}
              </Text>
            </View>
          </Animated.View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(150 + index * 50).springify()}
              >
                <OptionButton
                  option={option}
                  index={index}
                  colors={colors}
                  shadows={shadows}
                  selectedAnswer={selectedAnswer}
                  correctIndex={currentQuestion.correctIndex}
                  onPress={() => handleAnswerSelect(index)}
                />
              </Animated.View>
            ))}
          </View>

          {/* Explanation */}
          {showExplanation && currentQuestion.explanation && (
            <Animated.View entering={FadeInDown.delay(200).springify()}>
              <View
                style={[
                  styles.explanationCard,
                  {
                    backgroundColor: colors.card,
                    borderColor:
                      selectedAnswer === currentQuestion.correctIndex
                        ? colors.primary
                        : colors.accent,
                    ...shadows.small,
                  },
                ]}
              >
                <View style={styles.explanationHeader}>
                  <IconSymbol
                    ios_icon_name={
                      selectedAnswer === currentQuestion.correctIndex
                        ? "checkmark.circle.fill"
                        : "xmark.circle.fill"
                    }
                    android_material_icon_name={
                      selectedAnswer === currentQuestion.correctIndex
                        ? "check_circle"
                        : "cancel"
                    }
                    size={24}
                    color={
                      selectedAnswer === currentQuestion.correctIndex
                        ? colors.primary
                        : colors.accent
                    }
                  />
                  <Text
                    style={[
                      styles.explanationTitle,
                      {
                        color:
                          selectedAnswer === currentQuestion.correctIndex
                            ? colors.primary
                            : colors.accent,
                      },
                    ]}
                  >
                    {selectedAnswer === currentQuestion.correctIndex
                      ? "Correct!"
                      : "Incorrect"}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.explanationText,
                    { color: colors.textSecondary },
                  ]}
                >
                  {currentQuestion.explanation}
                </Text>
              </View>
            </Animated.View>
          )}

          {/* Next Button */}
          {selectedAnswer !== null && (
            <Animated.View entering={FadeInDown.delay(250).springify()}>
              <TouchableOpacity
                style={[
                  styles.nextButton, 
                  { 
                    backgroundColor: colors.primary,
                    ...shadows.small,
                  }
                ]}
                onPress={handleNext}
                activeOpacity={0.8}
                accessibilityLabel="Next question"
                accessibilityRole="button"
              >
                <Text style={styles.nextButtonText}>Next Question</Text>
                <IconSymbol
                  ios_icon_name="arrow.right"
                  android_material_icon_name="arrow_forward"
                  size={20}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </Animated.View>
          )}

          <AppFooter />
        </ScrollView>
      </View>
    </>
  );
}

/**
 * Option Button Component
 * Animated button for quiz answer selection
 */
function OptionButton({
  option,
  index,
  colors,
  shadows,
  selectedAnswer,
  correctIndex,
  onPress,
}: {
  option: string;
  index: number;
  colors: any;
  shadows: any;
  selectedAnswer: number | null;
  correctIndex: number;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (selectedAnswer === null) {
      scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const isSelected = selectedAnswer === index;
  const isCorrect = index === correctIndex;
  const showResult = selectedAnswer !== null;

  let backgroundColor = colors.card;
  let borderColor = colors.primary + "15";

  if (showResult) {
    if (isSelected && isCorrect) {
      backgroundColor = colors.primary + "20";
      borderColor = colors.primary;
    } else if (isSelected && !isCorrect) {
      backgroundColor = colors.accent + "20";
      borderColor = colors.accent;
    } else if (isCorrect) {
      backgroundColor = colors.primary + "10";
      borderColor = colors.primary;
    }
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={selectedAnswer !== null}
      accessibilityLabel={`Option ${index + 1}: ${option}`}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected, disabled: selectedAnswer !== null }}
    >
      <Animated.View
        style={[
          styles.optionButton,
          {
            backgroundColor,
            borderColor,
            ...shadows.small,
          },
          animatedStyle,
        ]}
      >
        <View
          style={[
            styles.optionNumber,
            {
              backgroundColor: showResult
                ? isCorrect
                  ? colors.primary
                  : isSelected
                  ? colors.accent
                  : colors.highlight
                : colors.highlight,
            },
          ]}
        >
          <Text
            style={[
              styles.optionNumberText,
              {
                color: showResult
                  ? isCorrect || isSelected
                    ? "#FFFFFF"
                    : colors.primary
                  : colors.primary,
              },
            ]}
          >
            {String.fromCharCode(65 + index)}
          </Text>
        </View>
        <Text 
          style={[styles.optionText, { color: colors.text }]}
          numberOfLines={3}
        >
          {option}
        </Text>
        {showResult && isCorrect && (
          <IconSymbol
            ios_icon_name="checkmark.circle.fill"
            android_material_icon_name="check_circle"
            size={24}
            color={colors.primary}
          />
        )}
        {showResult && isSelected && !isCorrect && (
          <IconSymbol
            ios_icon_name="xmark.circle.fill"
            android_material_icon_name="cancel"
            size={24}
            color={colors.accent}
          />
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? 32 : 24,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 16,
    lineHeight: 40,
    letterSpacing: 0.3,
  },
  progressContainer: {
    gap: 8,
  },
  progressText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  questionCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 26,
    letterSpacing: 0.3,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 2,
    minHeight: 64,
    gap: 14,
  },
  optionNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  optionNumberText: {
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  explanationCard: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 20,
  },
  explanationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  explanationTitle: {
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  explanationText: {
    fontSize: 15,
    lineHeight: 22,
  },
  nextButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    gap: 10,
    marginBottom: 20,
    minHeight: 56,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  completionContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    flexDirection: "row",
  },
  scoreText: {
    fontSize: 40,
    fontWeight: "800",
    lineHeight: 52,
    letterSpacing: 0.5,
  },
  scoreDivider: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
    marginHorizontal: 4,
  },
  scoreTotalText: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
  },
  completionTitle: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8,
    lineHeight: 40,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  completionPercentage: {
    fontSize: 56,
    fontWeight: "900",
    lineHeight: 64,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -1,
  },
  completionMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  restartButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
    minHeight: 56,
  },
  restartButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 24,
    letterSpacing: 0.3,
  },
});