import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useSessionStore } from '../../src/state/sessionStore';

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useSessionStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Wait for session to load before redirecting
    if (isLoading) return;
    
    // Redirect authenticated users away from auth screens
    if (isAuthenticated && segments.length > 0 && segments[0] === '(auth)') {
      router.replace('/(app)');
    }
  }, [isAuthenticated, isLoading, segments, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}

