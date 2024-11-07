// import express from 'express';
// import * as http from 'http';
// import * as WebSocket from 'ws';

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// app.use(express.json());

// // Handle WebSocket connections
// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   // Listen for messages from clients
//   ws.on('message', (message: string) => {
//     console.log('Received Log:', Buffer.from(message).toString('utf-8'));
//   });
// });

// // Start the server
// const port = 3007;
// server.listen(port, () => {
//   console.log(`Standalone Logger listening at http://localhost:${port}`);
// });
import express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as fs from 'fs';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Listen for messages from clients
  ws.on('message', (message: string) => {
    const logMessage = Buffer.from(message).toString('utf-8');
    console.log('Received Log:', logMessage);

    // Write the log message to a file
    writeLogToFile(logMessage);
  });
});

// Function to write log messages to a file
const writeLogToFile = (logMessage: string) => {
  const logFilePath = 'log.txt';

  // Append the log message to the file
  fs.appendFile(logFilePath, logMessage + '\n', (err) => {
    if (err) {
      console.error('Error writing log to file:', err);
    } else {
      console.log('Log written to file:', logMessage);
    }
  });
};

// Start the server
const port = 3007;
server.listen(port, () => {
  console.log(`Standalone Logger listening at http://localhost:${port}`);
});
