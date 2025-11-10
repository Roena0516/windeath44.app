// API endpoint configuration
// Reference: OSHI_NO_SAIN/src/config/index.ts

const protocol = 'https://';
const server = process.env.NEXT_PUBLIC_SERVER || 'api.example.com';

export const auth = `${protocol}${server}/auth`;
export const user = `${protocol}${server}/users`;
export const memorial = `${protocol}${server}/memorials`;
export const memorialTracing = `${protocol}${server}/memorial-tracing`;
export const memorial_application = `${protocol}${server}/applications`;
export const anime = `${protocol}${server}/animes`;
export const chatbot = `${protocol}${server}/chatbots`;
export const notification = `${protocol}${server}/notifications`;
