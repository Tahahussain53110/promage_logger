import WebSocket from 'ws';

let ws: WebSocket | null = null;

const initializeWebSocket = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log("WebSocket initialization started...");
    ws = new WebSocket('ws://localhost:3007');

    // Handle WebSocket events
    ws.on('open', () => {
      console.log('WebSocket connection opened.');
      resolve();
    });

    ws.on('close', (code, reason) => {
      console.log(`WebSocket connection closed with code ${code} and reason: ${reason}`);
      // Do not automatically attempt reconnection here
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      // Do not reject the promise here to prevent crashing the application
      // reject(error);
    });

    ws.on('message', (message) => {
      console.log('WebSocket message received:', message);
    });

    ws.on('ping', () => {
      console.log('WebSocket ping received.');
    });

    ws.on('pong', () => {
      console.log('WebSocket pong received.');
    });
  });
};




export const Send = async (eventType: string) => {
  await initializeWebSocket();
  try {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(eventType);
    } else {
      console.error('WebSocket is not open. Message not sent.');
    }
  } catch (error) {
    console.error('Failed to initialize WebSocket:', error);
  }
};
