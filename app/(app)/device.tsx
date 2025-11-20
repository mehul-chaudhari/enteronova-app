import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Button } from '../../src/components/Button';
import { deviceService } from '../../src/services/deviceService';
import type { DeviceReading } from '../../src/types/api';

export default function DeviceScreen() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [readings, setReadings] = useState<DeviceReading[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    // Check initial connection status
    setIsConnected(deviceService.isConnected());

    // Cleanup on unmount
    return () => {
      if (isStreaming) {
        deviceService.stopStreaming();
      }
      if (isConnected) {
        deviceService.disconnect();
      }
    };
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await deviceService.connect();
      setIsConnected(true);
    } catch (error) {
      console.error('Connection error:', error);
      // TODO: Show error alert
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    if (isStreaming) {
      deviceService.stopStreaming();
      setIsStreaming(false);
    }
    try {
      await deviceService.disconnect();
      setIsConnected(false);
      setReadings([]);
    } catch (error) {
      console.error('Disconnection error:', error);
    }
  };

  const handleStartStreaming = async () => {
    try {
      await deviceService.startStreaming((reading) => {
        setReadings((prev) => [reading, ...prev].slice(0, 50)); // Keep last 50 readings
      });
      setIsStreaming(true);
    } catch (error) {
      console.error('Streaming error:', error);
      // TODO: Show error alert
    }
  };

  const handleStopStreaming = () => {
    deviceService.stopStreaming();
    setIsStreaming(false);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const renderReading = ({ item }: { item: DeviceReading }) => (
    <View style={styles.readingItem}>
      <View style={styles.readingContent}>
        <Text style={styles.readingValue}>
          {item.value.toFixed(2)} {item.unit || ''}
        </Text>
        <Text style={styles.readingTime}>{formatTimestamp(item.timestamp)}</Text>
      </View>
    </View>
  );

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Device</Text>
        <Text style={styles.subtitle}>Connect and monitor your device</Text>
      </View>

      <View style={styles.connectionSection}>
        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <View style={[styles.statusIndicator, isConnected && styles.statusConnected]} />
            <Text style={styles.statusText}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </Text>
          </View>
        </View>

        {!isConnected ? (
          <Button
            title={isConnecting ? 'Connecting...' : 'Connect Device'}
            onPress={handleConnect}
            loading={isConnecting}
            disabled={isConnecting}
          />
        ) : (
          <View style={styles.controls}>
            {!isStreaming ? (
              <Button
                title="Start Streaming"
                onPress={handleStartStreaming}
                style={styles.controlButton}
              />
            ) : (
              <Button
                title="Stop Streaming"
                onPress={handleStopStreaming}
                variant="outline"
                style={styles.controlButton}
              />
            )}
            <Button
              title="Disconnect"
              onPress={handleDisconnect}
              variant="outline"
              style={styles.controlButton}
            />
          </View>
        )}
      </View>

      {isStreaming && (
        <View style={styles.readingsSection}>
          <Text style={styles.sectionTitle}>Recent Readings</Text>
          {readings.length > 0 ? (
            <FlatList
              data={readings}
              renderItem={renderReading}
              keyExtractor={(item, index) => `${item.timestamp}-${index}`}
              style={styles.readingsList}
              contentContainerStyle={styles.readingsContent}
            />
          ) : (
            <View style={styles.emptyReadings}>
              <Text style={styles.emptyText}>Waiting for readings...</Text>
            </View>
          )}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  connectionSection: {
    marginBottom: 32,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
    marginRight: 12,
  },
  statusConnected: {
    backgroundColor: '#34C759',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  controls: {
    gap: 12,
  },
  controlButton: {
    marginBottom: 0,
  },
  readingsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  readingsList: {
    flex: 1,
  },
  readingsContent: {
    paddingBottom: 20,
  },
  readingItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  readingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readingValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  readingTime: {
    fontSize: 14,
    color: '#666',
  },
  emptyReadings: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
});

