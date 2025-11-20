export type User = {
  id: string;
  email: string;
  name: string;
};

export type SurveyQuestionType = 'single_choice' | 'multiple_choice' | 'text' | 'numeric';

export type SurveyQuestion = {
  id: string;
  text: string;
  type: SurveyQuestionType;
  options?: string[]; // for choice questions
};

export type Survey = {
  id: string;
  title: string;
  description?: string;
  questions: SurveyQuestion[];
};

export type SurveyAnswer = {
  questionId: string;
  value: string | number | string[];
};

export type DeviceReading = {
  timestamp: string;
  value: number;
  unit?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken?: string;
  user: User;
};

