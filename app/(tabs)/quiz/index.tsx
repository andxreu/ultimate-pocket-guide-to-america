import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
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
} from "react-native-reanimated";

export default function QuizScreen() {
  const { colors } = useTheme();
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

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    setShowExplanation(true);

    if (index === currentQuestion.correctIndex) {
      setScore(score + 1);
    }

    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleRestart = () => {
    setQuizQuestions(generateRandomQuiz(10));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  if (isQuizComplete) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.completionContainer}>
            <View
              style={[
                styles.scoreCircle,
                { backgroundColor: colors.highlight },
              ]}
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
            </View>

            <Text style={[styles.completionTitle, { color: colors.text }]}>
              Quiz Complete!
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

            <TouchableOpacity
              style={[
                styles.restartButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={handleRestart}
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
          </View>

          <AppFooter />
        </ScrollView>
      </View>
    );
  }

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
          <View style={styles.header}>
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
                <View
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
          </View>

          <View
            style={[
              styles.questionCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.primary + "15",
              },
            ]}
          >
            <Text style={[styles.questionText, { color: colors.text }]}>
              {currentQuestion.question}
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <OptionButton
                key={index}
                option={option}
                index={index}
                colors={colors}
                selectedAnswer={selectedAnswer}
                correctIndex={currentQuestion.correctIndex}
                onPress={() => handleAnswerSelect(index)}
              />
            ))}
          </View>

          {showExplanation && currentQuestion.explanation && (
            <View
              style={[
                styles.explanationCard,
                {
                  backgroundColor: colors.card,
                  borderColor:
                    selectedAnswer === currentQuestion.correctIndex
                      ? colors.primary
                      : colors.accent,
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
          )}

          {selectedAnswer !== null && (
            <TouchableOpacity
              style={[styles.nextButton, { backgroundColor: colors.primary }]}
              onPress={handleNext}
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
          )}

          <AppFooter />
        </ScrollView>
      </View>
    </>
  );
}

function OptionButton({
  option,
  index,
  colors,
  selectedAnswer,
  correctIndex,
  onPress,
}: {
  option: string;
  index: number;
  colors: any;
  selectedAnswer: number | null;
  correctIndex: number;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    if (selectedAnswer === null) {
      scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
      opacity.value = withSpring(0.8, { damping: 15, stiffness: 300 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    opacity.value = withSpring(1, { damping: 15, stiffness: 300 });
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
    >
      <Animated.View
        style={[
          styles.optionButton,
          {
            backgroundColor,
            borderColor,
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
        <Text style={[styles.optionText, { color: colors.text }]}>
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
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
    lineHeight: 43.5,
  },
  progressContainer: {
    gap: 8,
  },
  progressText: {
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18.85,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  questionCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  questionText: {
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 24.65,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    minHeight: 44,
    gap: 12,
  },
  optionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  optionNumberText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20.3,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21.75,
  },
  explanationCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  explanationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 23.2,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 20.3,
  },
  nextButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 20,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 23.2,
  },
  completionContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    flexDirection: "row",
  },
  scoreText: {
    fontSize: 36,
    fontWeight: "bold",
    lineHeight: 52.2,
  },
  scoreDivider: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 34.8,
    marginHorizontal: 4,
  },
  scoreTotalText: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 34.8,
  },
  completionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    lineHeight: 40.6,
  },
  completionMessage: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 21.75,
  },
  restartButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  restartButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 23.2,
  },
});
