import 'dotenv/config';

if (!process.env.JWT_PASSWORD) {
    throw new Error('JWT_PASSWORD environment variable is required');
}

export const JWT_PASSWORD = process.env.JWT_PASSWORD 