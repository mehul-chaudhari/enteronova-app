import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useSessionStore } from '../../src/state/sessionStore';

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useSessionStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Wait for session to load before redirecting
    if (isLoading) return;
    
    // Redirect unauthenticated users to login
    if (!isAuthenticated && segments.length > 0 && segments[0] === '(app)') {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, isLoading, segments, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="survey/[id]" />
      <Stack.Screen name="device" />
    </Stack>
  );
}

