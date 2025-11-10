'use client';

import styled from '@emotion/styled';
import { colors, shadows, fonts } from '@/lib/styles/theme';

interface WhiteboardProps {
  children: React.ReactNode;
  padding?: string;
  gap?: string;
}

const StyledWhiteboard = styled.div<{ padding?: string; gap?: string }>`
  position: relative;
  width: 100%;
  background-color: ${colors.white};
  padding: ${(props) => props.padding || '16px'};
  box-shadow: ${shadows.inset};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap || '0'};
`;

export default function Whiteboard({ children, padding, gap }: WhiteboardProps) {
  return (
    <StyledWhiteboard padding={padding} gap={gap}>
      {children}
    </StyledWhiteboard>
  );
}
