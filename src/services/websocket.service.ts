import { io, Socket } from 'socket.io-client';
import { RacingIncident } from '~/features/incident/types/incident';
import { config } from '~/utils/config';

type EventMap = {
  incidentCreated: (incident: RacingIncident) => void;
  incidentUpdated: (incident: RacingIncident) => void;
  incidentDeleted: (incidentId: string) => void;
};

class WebSocketService {
  private socket: Socket | null = null;
  private listeners: Map<keyof EventMap, Set<EventMap[keyof EventMap]>> = new Map();

  connect() {
    if (!this.socket) {
      this.socket = io(config.wsUrl);
      this.socket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });

      // Set up incident event listeners
      this.socket.on('incidentCreated', (incident: RacingIncident) => {
        this.notifyListeners('incidentCreated', incident);
      });

      this.socket.on('incidentUpdated', (incident: RacingIncident) => {
        this.notifyListeners('incidentUpdated', incident);
      });

      this.socket.on('incidentDeleted', (incidentId: string) => {
        this.notifyListeners('incidentDeleted', incidentId);
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  addListener<T extends keyof EventMap>(event: T, callback: EventMap[T]) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    const listeners = this.listeners.get(event) as Set<EventMap[T]>;
    listeners.add(callback);
  }

  removeListener<T extends keyof EventMap>(event: T, callback: EventMap[T]) {
    const listeners = this.listeners.get(event) as Set<EventMap[T]>;
    listeners?.delete(callback);
  }

  private notifyListeners(event: 'incidentCreated' | 'incidentUpdated', data: RacingIncident): void;
  private notifyListeners(event: 'incidentDeleted', data: string): void;
  private notifyListeners(event: keyof EventMap, data: RacingIncident | string) {
    const listeners = this.listeners.get(event);
    listeners?.forEach((callback) => {
      (callback as (data: RacingIncident | string) => void)(data);
    });
  }
}

export const webSocketService = new WebSocketService();
