import axios from 'axios';
import { user, auth } from './config';

interface SignUpParams {
  name: string;
  userId: string;
  email: string;
  password: string;
}

interface EmailValidationParams {
  email: string;
}

interface VerifyEmailParams {
  email: string;
  authorizationCode: string;
}

export const signUp = async ({
  name,
  userId,
  email,
  password,
}: SignUpParams): Promise<boolean> => {
  const data = {
    userId,
    email,
    name,
    password,
  };
  try {
    await axios.post(`${user}/register`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return true;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export const emailValidationRequest = async ({
  email,
}: EmailValidationParams): Promise<boolean> => {
  try {
    await axios.post(
      `${auth}/email`,
      { email },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return true;
  } catch (error: any) {
    throw error;
  }
};

export const verifyEmailCode = async ({
  email,
  authorizationCode,
}: VerifyEmailParams): Promise<boolean> => {
  const data = {
    authorizationCode,
    email,
  };
  try {
    await axios.patch(`${auth}/email/valid`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return true;
  } catch (error) {
    throw error;
  }
};
