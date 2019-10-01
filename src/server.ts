import dotenv from 'dotenv';

// Import app module files
import app from './app';
import logger from './config/logger';

// Environment injection
dotenv.config();

console.log(process.env.SERVER_PORT);

/**
 * Server start
 */
const PORT = parseInt(process.env.SERVER_PORT as string, 10) || 8000;

app.listen(PORT, () => {
    logger.info(`Server running at port ${PORT}`);
});
