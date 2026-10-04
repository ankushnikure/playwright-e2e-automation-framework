import dotenv from 'dotenv';

const ENV = process.env.ENV || 'qa';

const result = dotenv.config({ path: `.env.${ENV}` });

if (result.error) {
    throw new Error(`Could not load .env.${ENV}: ${result.error.message}`);
}

const { BASE_URL, EMAIL, PASSWORD } = process.env;

if (!BASE_URL || !EMAIL || !PASSWORD) {
    throw new Error(`Required variable is missing in .env.${ENV}`);
}

export const env = {
    baseUrl: BASE_URL,
    email: EMAIL,
    password: PASSWORD
};