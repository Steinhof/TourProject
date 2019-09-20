import dotenv from 'dotenv';

/*
 * Import app module files
 */
import app from './app';
import logger from './config/logger';

/*
 * Environment injection
 */
dotenv.config({ path: './config/' });

/*
 * Server start
 */
const HOSTNAME = process.env.SERVER_HOST || 'localhost';
const PORT = parseInt(process.env.SERVER_PORT as string, 10) || 3000;
const serverAddress = `http://${HOSTNAME}:${PORT}`;

app.listen(PORT, HOSTNAME, () => {
    logger.info(`Server running at ${serverAddress}/`);
});
