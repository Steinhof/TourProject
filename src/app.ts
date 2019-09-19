import express from 'express';
import path from 'path';
import compression from 'compression';

/* Create express server */
const app = express();

// Middleware
app.use(compression());

// Static files
app.use(express.static(path.resolve(__dirname, 'public')));

export default app;
