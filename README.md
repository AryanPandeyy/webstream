# WebStream Project README

## Project Overview

WebStream is a live streaming solution that allows users to broadcast their content from a web browser to an RTMP URL. This project utilizes WebSocket and Socket.IO on the backend to capture user input from the frontend and seamlessly feed it to FFmpeg for real-time streaming.

## Features

- Live streaming from a web browser to an RTMP URL.
- Utilizes WebSocket and Socket.IO for efficient communication between frontend and backend.
- Seamless integration with FFmpeg for high-quality streaming.

## Prerequisites

- Node.js and npm installed on your system.

## Installation

1. Clone this repository: `git clone [repository_url]`
2. Navigate to the project directory: `cd WebStream`

## Usage

1. Start the backend server: `node dist/index.js`
2. Open your web browser and navigate to the provided URL (default: `http://localhost:3000`).
3. Include your RTMP_URL in server.ts and dont forget to run `tsc`.
4. Watch the live stream on your chosen RTMP destination.

## Backend Architecture

- Backend built with Node.js and Express.js.
- WebSocket and Socket.IO used for bidirectional communication.
- FFmpeg integrated to handle encoding and streaming to an RTMP URL.

## Frontend Integration

- React used for frontend interface.
- Socket.IO client library used to establish a connection with the backend.

## Configuration

- Adjust RTMP URLs, WebSocket ports, and other settings as needed.

## Contribution

Contributions are welcome! If you'd like to improve or extend this project, feel free to submit a pull request.
