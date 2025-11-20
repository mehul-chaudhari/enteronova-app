import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/Screen';
import { useSurveys } from '../../src/hooks/useSurveys';
import type { Survey } from '../../src/types/api';

export default function HomeScreen() {
  const router = useRouter();
  const { data: surveys, isLoading, error } = useSurveys();

  const handleSurveyPress = (surveyId: string) => {
    router.push(`/(app)/survey/${surveyId}`);
  };

  const renderSurveyItem = ({ item }: { item: Survey }) => (
    <TouchableOpacity
      style={styles.surveyCard}
      onPress={() => handleSurveyPress(item.id)}
      activeOpacity={0.7}
    >
      <Text style={styles.surveyTitle}>{item.title}</Text>
      {item.description && (
        <Text style={styles.surveyDescription} numberOfLines={2}>
          {item.description}
        </Text>
      )}
      <Text style={styles.questionCount}>
        {item.questions.length} question{item.questions.length !== 1 ? 's' : ''}
      </Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <Screen style={styles.centerContent}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading surveys...</Text>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen style={styles.centerContent}>
        <Text style={styles.errorText}>Failed to load surveys</Text>
        <Text style={styles.errorSubtext}>Please try again later</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Surveys</Text>
        <Text style={styles.headerSubtitle}>Complete your health assessments</Text>
      </View>

      {surveys && surveys.length > 0 ? (
        <FlatList
          data={surveys}
          renderItem={renderSurveyItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.centerContent}>
          <Text style={styles.emptyText}>No surveys available</Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    paddingBottom: 20,
  },
  surveyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  surveyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  surveyDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  questionCount: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
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
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

