'use client';

import styled from '@emotion/styled';
import { colors, shadows, fonts } from '@/lib/styles/theme';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
}

const StyledButton = styled.button<{ fullWidth?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 9px 24px;
  background-color: ${colors.lightprimary};
  font-family: ${fonts.primary};
  font-size: 18px;
  line-height: 15px;
  color: ${colors.black};
  text-align: center;
  white-space: nowrap;
  border: none;
  cursor: pointer;
  box-shadow: ${shadows.button};
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};

  &:hover {
    background-color: ${colors.secondary};
  }

  &:active {
    box-shadow: inset 1px 1px 0px 0px ${colors.black},
      inset -1px -1px 0px 0px #ffffff, inset 2px 2px 0px 0px ${colors.darkprimary},
      inset -2px -2px 0px 0px ${colors.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {children}
    </StyledButton>
  );
}
