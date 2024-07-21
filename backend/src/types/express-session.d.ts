import 'express-session';

// Define a new interface that extends the existing `SessionData` interface
declare module 'express-session' {
  interface SessionData {
    userSession?: string; // Add the custom property here
  }
}
