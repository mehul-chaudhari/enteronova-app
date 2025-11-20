import type { DeviceReading } from '../types/api';
import { DEVICE_CONFIG } from '../config/env';

// TODO: Import BLE library when ready
// import { BleManager, Device } from 'react-native-ble-plx';

export interface DeviceService {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  startStreaming(callback: (reading: DeviceReading) => void): Promise<void>;
  stopStreaming(): Promise<void>;
}

class MockDeviceService implements DeviceService {
  private connected = false;
  private streaming = false;
  private streamInterval: NodeJS.Timeout | null = null;
  private callback: ((reading: DeviceReading) => void) | null = null;

  async connect(): Promise<void> {
    // TODO: Implement actual BLE connection using react-native-ble-plx
    // Example flow:
    // 1. Initialize BleManager
    // 2. Scan for devices matching DEVICE_CONFIG.DEVICE_NAME or SERVICE_UUID
    // 3. Connect to the device
    // 4. Discover services and characteristics
    // 5. Set connected = true
    
    return new Promise((resolve) => {
      setTimeout(() => {
        this.connected = true;
        console.log('Mock device connected');
        resolve();
      }, 1500);
    });
  }

  async disconnect(): Promise<void> {
    // TODO: Implement actual BLE disconnection
    // 1. Stop streaming if active
    // 2. Disconnect from device
    // 3. Clean up BleManager if needed
    
    this.stopStreaming();
    this.connected = false;
    console.log('Mock device disconnected');
  }

  isConnected(): boolean {
    return this.connected;
  }

  async startStreaming(callback: (reading: DeviceReading) => void): Promise<void> {
    if (!this.connected) {
      throw new Error('Device not connected');
    }

    if (this.streaming) {
      throw new Error('Already streaming');
    }

    this.callback = callback;
    this.streaming = true;

    // TODO: Implement actual BLE notification subscription
    // Example flow:
    // 1. Subscribe to characteristic notifications using device.monitorCharacteristicForService()
    // 2. Parse incoming data and convert to DeviceReading format
    // 3. Call callback with parsed reading

    // Mock implementation: simulate readings every 2 seconds
    this.streamInterval = setInterval(() => {
      if (this.callback) {
        const reading: DeviceReading = {
          timestamp: new Date().toISOString(),
          value: Math.random() * 100, // Mock value
          unit: 'units',
        };
        this.callback(reading);
      }
    }, 2000);
  }

  stopStreaming(): void {
    // TODO: Cancel BLE notification subscription
    // device.cancelTransaction() or similar
    
    if (this.streamInterval) {
      clearInterval(this.streamInterval);
      this.streamInterval = null;
    }
    this.streaming = false;
    this.callback = null;
  }
}

// Export singleton instance
export const deviceService: DeviceService = new MockDeviceService();

