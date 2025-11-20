import { useQuery } from '@tanstack/react-query';
import { getSurveys } from '../api/surveys';

export function useSurveys() {
  return useQuery({
    queryKey: ['surveys'],
    queryFn: getSurveys,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

