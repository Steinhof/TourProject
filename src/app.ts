import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';

/* Create express server */
const app = express();

// Middleware
app.use(compression());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());

// Static files
app.use(express.static(path.resolve(__dirname, 'public')));

export default app;
