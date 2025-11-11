'use client';

import styled from '@emotion/styled';
import { colors, fonts } from '@/lib/styles/theme';

const Btn = styled.button<{ width?: string; height?: string; fontSize?: string }>`
  display: flex;
  width: ${({ width }) => width || '180px'};
  height: ${({ height }) => height || '42px'};
  padding: 9px 0;
  justify-content: center;
  align-items: center;
  background: ${colors.lightprimary};
  box-shadow: -1px -1px 0px 0px ${colors.black} inset, 1px 1px 0px 0px #fff inset,
    -2px -2px 0px 0px ${colors.darkprimary} inset, 2px 2px 0px 0px ${colors.secondary} inset;
  color: ${colors.black};
  border: none;
  text-align: center;
  font-family: ${fonts.primary};
  font-size: ${({ fontSize }) => fontSize || '20px'};
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  cursor: pointer;
`;

const SelectedBtn = styled.button<{ width?: string; height?: string; fontSize?: string }>`
  display: flex;
  width: ${({ width }) => width || '180px'};
  height: ${({ height }) => height || '42px'};
  padding: 9px 0;
  justify-content: center;
  align-items: center;
  background: ${colors.lightprimary};
  box-shadow: -1px -1px 0px 0px #fff inset, 1px 1px 0px 0px ${colors.black} inset,
    -2px -2px 0px 0px ${colors.secondary} inset, 2px 2px 0px 0px ${colors.darkprimary} inset;
  color: ${colors.black};
  text-align: center;
  font-family: ${fonts.primary};
  font-size: ${({ fontSize }) => fontSize || '20px'};
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  border: none;
  cursor: pointer;
`;

const SubmitDefault = styled.button<{ width?: string; height?: string; fontSize?: string }>`
  display: flex;
  width: ${({ width }) => width || '180px'};
  height: ${({ height }) => height || '42px'};
  padding: 9px 0;
  justify-content: center;
  align-items: center;
  background: ${colors.lightprimary};
  box-shadow: -1px -1px 0px 0px ${colors.black} inset, 1px 1px 0px 0px #fff inset,
    -2px -2px 0px 0px ${colors.darkprimary} inset, 2px 2px 0px 0px ${colors.secondary} inset;
  color: ${colors.darkprimary};
  text-align: center;
  font-family: ${fonts.primary};
  font-size: ${({ fontSize }) => fontSize || '20px'};
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  border: none;
  cursor: pointer;
`;

const SubmitActive = styled.button<{ width?: string; height?: string; fontSize?: string }>`
  width: ${({ width }) => width || '180px'};
  height: ${({ height }) => height || '42px'};
  padding: 9px 0;
  justify-content: center;
  align-items: center;
  background: ${colors.lightprimary};
  box-shadow: -1px -1px 0px 0px ${colors.black} inset, 1px 1px 0px 0px #fff inset,
    -2px -2px 0px 0px ${colors.darkprimary} inset, 2px 2px 0px 0px ${colors.secondary} inset;
  color: ${colors.black};
  text-align: center;
  font-family: ${fonts.primary};
  font-size: ${({ fontSize }) => fontSize || '20px'};
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  border: none;
  cursor: pointer;
  display: flex;
`;

const HiddenBtn = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width || '64px'};
  height: ${({ height }) => height || '64px'};
`;

interface MemorialBtnProps {
  name: string;
  selected?: boolean;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void);
  type?: string;
  active?: boolean;
  width?: string;
  height?: string;
  fontSize?: string;
}

const MemorialBtn = ({
  name,
  selected = false,
  onClick,
  type = 'none',
  active,
  width,
  height,
  fontSize = '20px',
}: MemorialBtnProps) => {
  if (type === 'hidden') {
    return <HiddenBtn width={width} height={height} />;
  }
  if (type === 'submit') {
    return !active ? (
      <SubmitDefault width={width} height={height} fontSize={fontSize}>
        {name}
      </SubmitDefault>
    ) : (
      <SubmitActive onClick={onClick} width={width} height={height} fontSize={fontSize}>
        {name}
      </SubmitActive>
    );
  } else if (type === 'menu') {
    return !selected ? (
      <Btn onClick={onClick} width={width} height={height} fontSize={fontSize}>
        {name}
      </Btn>
    ) : (
      <SelectedBtn width={width} height={height} fontSize={fontSize}>
        {name}
      </SelectedBtn>
    );
  }

  return null;
};

export default MemorialBtn;
