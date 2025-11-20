import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

interface ScreenProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: object;
}

export function Screen({ children, scrollable = false, style }: ScreenProps) {
  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, style]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
});

