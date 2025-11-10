// API endpoint configuration
// Reference: OSHI_NO_SAIN/src/config/index.ts

const protocol = 'https://';
const server = process.env.NEXT_PUBLIC_SERVER || 'api.example.com';

export const endpoints = {
  auth: `${protocol}${server}/auth`,
  user: `${protocol}${server}/users`,
  memorial: `${protocol}${server}/memorials`,
  memorialTracing: `${protocol}${server}/memorial-tracing`,
  memorialApplication: `${protocol}${server}/applications`,
  anime: `${protocol}${server}/animes`,
  chatbot: `${protocol}${server}/chatbots`,
  notification: `${protocol}${server}/notifications`,
};
