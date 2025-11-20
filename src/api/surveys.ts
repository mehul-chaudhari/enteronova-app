// import { apiClient } from './client'; // TODO: Uncomment when implementing real API
import type { Survey, SurveyAnswer } from '../types/api';

/**
 * Get all available surveys
 * TODO: Replace with actual API endpoint
 */
export async function getSurveys(): Promise<Survey[]> {
  // TODO: Replace with actual API call
  // const response = await apiClient.get<Survey[]>('/surveys');
  // return response.data;
  
  // Mock data for now
  return new Promise<Survey[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Daily Health Check',
          description: 'Please answer a few questions about your health today',
          questions: [
            {
              id: 'q1',
              text: 'How are you feeling today?',
              type: 'single_choice',
              options: ['Great', 'Good', 'Okay', 'Poor'],
            },
            {
              id: 'q2',
              text: 'Rate your pain level (1-10)',
              type: 'numeric',
            },
            {
              id: 'q3',
              text: 'Any additional notes?',
              type: 'text',
            },
          ],
        },
        {
          id: '2',
          title: 'Weekly Assessment',
          description: 'Weekly health assessment survey',
          questions: [
            {
              id: 'q1',
              text: 'Which symptoms have you experienced this week?',
              type: 'multiple_choice',
              options: ['Headache', 'Nausea', 'Fatigue', 'Dizziness', 'None'],
            },
            {
              id: 'q2',
              text: 'How many days did you exercise this week?',
              type: 'numeric',
            },
          ],
        },
      ]);
    }, 800);
  });
}

/**
 * Get a specific survey by ID
 * TODO: Replace with actual API endpoint
 */
export async function getSurveyById(id: string): Promise<Survey> {
  // TODO: Replace with actual API call
  // const response = await apiClient.get<Survey>(`/surveys/${id}`);
  // return response.data;
  
  // Mock data for now
  return new Promise<Survey>((resolve, reject) => {
    setTimeout(() => {
      const surveys: Survey[] = [
        {
          id: '1',
          title: 'Daily Health Check',
          description: 'Please answer a few questions about your health today',
          questions: [
            {
              id: 'q1',
              text: 'How are you feeling today?',
              type: 'single_choice',
              options: ['Great', 'Good', 'Okay', 'Poor'],
            },
            {
              id: 'q2',
              text: 'Rate your pain level (1-10)',
              type: 'numeric',
            },
            {
              id: 'q3',
              text: 'Any additional notes?',
              type: 'text',
            },
          ],
        },
        {
          id: '2',
          title: 'Weekly Assessment',
          description: 'Weekly health assessment survey',
          questions: [
            {
              id: 'q1',
              text: 'Which symptoms have you experienced this week?',
              type: 'multiple_choice',
              options: ['Headache', 'Nausea', 'Fatigue', 'Dizziness', 'None'],
            },
            {
              id: 'q2',
              text: 'How many days did you exercise this week?',
              type: 'numeric',
            },
          ],
        },
      ];
      
      const survey = surveys.find((s: Survey) => s.id === id);
      if (survey) {
        resolve(survey);
      } else {
        reject(new Error(`Survey with id ${id} not found`));
      }
    }, 500);
  });
}

/**
 * Submit answers for a survey
 * TODO: Replace with actual API endpoint
 */
export async function submitSurveyAnswers(
  surveyId: string,
  answers: SurveyAnswer[]
): Promise<void> {
  // TODO: Replace with actual API call
  // await apiClient.post(`/surveys/${surveyId}/answers`, { answers });
  
  // Mock implementation
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log('Submitting answers for survey', surveyId, answers);
      resolve();
    }, 1000);
  });
}

