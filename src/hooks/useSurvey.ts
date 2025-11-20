import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSurveyById, submitSurveyAnswers } from '../api/surveys';
import type { SurveyAnswer } from '../types/api';

export function useSurvey(id: string) {
  return useQuery({
    queryKey: ['survey', id],
    queryFn: () => getSurveyById(id),
    enabled: !!id,
  });
}

export function useSubmitSurvey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ surveyId, answers }: { surveyId: string; answers: SurveyAnswer[] }) =>
      submitSurveyAnswers(surveyId, answers),
    onSuccess: () => {
      // Invalidate surveys list to refresh
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
    },
  });
}

