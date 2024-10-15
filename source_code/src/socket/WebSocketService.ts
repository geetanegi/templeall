// src/WebSocketService.ts

type MessageCallback = (data: any) => void;

// WebSocketService.ts

class WebSocketService {
    private url: string;
    private connection: WebSocket | null = null;
    private listeners: { [key: string]: MessageCallback[] } = {};

    constructor(url: string) {
        this.url = url;
    }

    connect(): void {
        if (this.connection) return; // Prevent multiple connections

        this.connection = new WebSocket(this.url);

        this.connection.onopen = () => {
            console.log('WebSocket connected');
        };

        this.connection.onclose = () => {
            console.log('WebSocket disconnected');
            this.connection = null; // Set connection to null on close
        };

        this.connection.onerror = (error) => {
            console.error('WebSocket error', error);
        };

        this.connection.onmessage = (message) => {
            this.handleMessage(message);
        };
    }

    private handleMessage(message: MessageEvent): void {
        const data = JSON.parse(message.data);
        const { type } = data;

        if (this.listeners[type]) {
            this.listeners[type].forEach((callback) => callback(data));
        }
    }

    subscribe(type: string, callback: MessageCallback): void {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    }

    unsubscribe(type: string, callback: MessageCallback): void {
        if (this.listeners[type]) {
            this.listeners[type] = this.listeners[type].filter(cb => cb !== callback);
        }
    }

    send(message: any): void {
        if (this.connection && this.connection.readyState === WebSocket.OPEN) {
            this.connection.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not open. Unable to send message.');
        }
    }

    disconnect(): void {
        if (this.connection) {
            this.connection.close();
            this.connection = null; // Set to null on disconnect
        }
    }
}

export default WebSocketService;