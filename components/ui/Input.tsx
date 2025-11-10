'use client';

import styled from '@emotion/styled';
import { colors, shadows, fonts } from '@/lib/styles/theme';

interface InputProps {
  label?: string;
  type?: 'text' | 'password' | 'email';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  required?: boolean;
  maxLength?: number;
}

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-family: ${fonts.primary};
  font-size: 16px;
  color: ${colors.black};
  line-height: normal;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 32px;
  background-color: ${colors.white};
  border: none;
  padding: 0 8px;
  font-family: ${fonts.primary};
  font-size: 14px;
  color: ${colors.black};
  box-shadow: ${shadows.inset};
  outline: none;

  &::placeholder {
    color: #999;
  }
`;

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  name,
  required = false,
  maxLength,
}: InputProps) {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <StyledInput
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        required={required}
        maxLength={maxLength}
      />
    </InputWrapper>
  );
}
