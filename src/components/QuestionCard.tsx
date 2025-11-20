import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { SurveyQuestion, SurveyAnswer } from '../types/api';
import { TextInput } from './TextInput';
import { Button } from './Button';

interface QuestionCardProps {
  question: SurveyQuestion;
  value?: string | number | string[];
  onChange: (value: string | number | string[]) => void;
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const [textValue, setTextValue] = useState<string>(
    typeof value === 'string' ? value : ''
  );
  const [numericValue, setNumericValue] = useState<string>(
    typeof value === 'number' ? value.toString() : ''
  );

  const handleTextChange = (text: string) => {
    setTextValue(text);
    onChange(text);
  };

  const handleNumericChange = (text: string) => {
    setNumericValue(text);
    const num = parseFloat(text);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  const handleSingleChoice = (option: string) => {
    onChange(option);
  };

  const handleMultipleChoice = (option: string) => {
    const current = Array.isArray(value) ? value : [];
    const newValue = current.includes(option)
      ? current.filter((v) => v !== option)
      : [...current, option];
    onChange(newValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.text}</Text>

      {question.type === 'text' && (
        <TextInput
          value={textValue}
          onChangeText={handleTextChange}
          placeholder="Enter your answer"
          multiline
          numberOfLines={4}
        />
      )}

      {question.type === 'numeric' && (
        <TextInput
          value={numericValue}
          onChangeText={handleNumericChange}
          placeholder="Enter a number"
          keyboardType="numeric"
        />
      )}

      {question.type === 'single_choice' && question.options && (
        <View style={styles.optionsContainer}>
          {question.options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                value === option && styles.optionSelected,
              ]}
              onPress={() => handleSingleChoice(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  value === option && styles.optionTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {question.type === 'multiple_choice' && question.options && (
        <View style={styles.optionsContainer}>
          {question.options.map((option) => {
            const isSelected = Array.isArray(value) && value.includes(option);
            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.option,
                  styles.multipleOption,
                  isSelected && styles.optionSelected,
                ]}
                onPress={() => handleMultipleChoice(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {isSelected && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 8,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#F9F9F9',
  },
  multipleOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 15,
    color: '#333',
  },
  optionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

