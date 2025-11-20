import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen } from '../../../src/components/Screen';
import { QuestionCard } from '../../../src/components/QuestionCard';
import { Button } from '../../../src/components/Button';
import { useSurvey, useSubmitSurvey } from '../../../src/hooks/useSurvey';
import type { SurveyAnswer } from '../../../src/types/api';

export default function SurveyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: survey, isLoading, error } = useSurvey(id);
  const submitMutation = useSubmitSurvey();

  const [answers, setAnswers] = useState<Record<string, string | number | string[]>>({});

  const handleAnswerChange = (questionId: string, value: string | number | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!survey) return;

    // Validate all questions are answered
    const unansweredQuestions = survey.questions.filter(
      (q) => !answers[q.id] || (Array.isArray(answers[q.id]) && answers[q.id].length === 0)
    );

    if (unansweredQuestions.length > 0) {
      Alert.alert(
        'Incomplete Survey',
        'Please answer all questions before submitting.',
        [{ text: 'OK' }]
      );
      return;
    }

    const surveyAnswers: SurveyAnswer[] = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value,
    }));

    try {
      await submitMutation.mutateAsync({
        surveyId: id,
        answers: surveyAnswers,
      });

      Alert.alert(
        'Success',
        'Your survey has been submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (err) {
      Alert.alert('Error', 'Failed to submit survey. Please try again.');
      console.error('Submit error:', err);
    }
  };

  if (isLoading) {
    return (
      <Screen style={styles.centerContent}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading survey...</Text>
      </Screen>
    );
  }

  if (error || !survey) {
    return (
      <Screen style={styles.centerContent}>
        <Text style={styles.errorText}>Failed to load survey</Text>
        <Text style={styles.errorSubtext}>Please try again later</Text>
      </Screen>
    );
  }

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <Text style={styles.title}>{survey.title}</Text>
        {survey.description && (
          <Text style={styles.description}>{survey.description}</Text>
        )}
      </View>

      <View style={styles.questionsContainer}>
        {survey.questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChange={(value) => handleAnswerChange(question.id, value)}
          />
        ))}
      </View>

      <Button
        title="Submit Survey"
        onPress={handleSubmit}
        loading={submitMutation.isPending}
        style={styles.submitButton}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  questionsContainer: {
    marginBottom: 24,
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF3B30',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
  },
});

