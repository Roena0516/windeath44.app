import styled from '@emotion/styled';
import { colors, fonts } from '@/lib/styles/theme';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WindowContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  border: 2.572px solid ${colors.primary};
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  padding: 8.572px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: hidden;
`;

export const MainContent = styled.div`
  flex: 1;
  width: 100%;
  background-color: ${colors.lightprimary};
  border: 2.572px solid ${colors.stroke};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const LogoSection = styled.div`
  width: 100%;
  height: 108px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 4px;
  background-color: #ffeefd;
  border: 2px solid ${colors.secondary};
  flex-shrink: 0;
`;

export const FormSection = styled.div`
  flex: 1;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;

export const FormFields = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 0;
`;

export const InputRow = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
  align-items: flex-end;
`;

export const TimerBox = styled.div`
  width: 60px;
  height: 32px;
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.primary};
  font-size: 14px;
  color: ${colors.black};
  box-shadow: inset -1px -1px 0px 0px #ffffff,
    inset 1px 1px 0px 0px ${colors.black},
    inset -2px -2px 0px 0px ${colors.darkprimary},
    inset 2px 2px 0px 0px ${colors.darkprimary};
  flex-shrink: 0;
`;

export const SmallButton = styled.button`
  width: 100px;
  height: 32px;
  background-color: ${colors.lightprimary};
  border: none;
  font-family: ${fonts.primary};
  font-size: 14px;
  line-height: 15px;
  color: ${colors.black};
  cursor: pointer;
  box-shadow: inset -1px -1px 0px 0px ${colors.black},
    inset 1px 1px 0px 0px #ffffff,
    inset -2px -2px 0px 0px ${colors.darkprimary},
    inset 2px 2px 0px 0px ${colors.secondary};
  flex-shrink: 0;

  &:hover {
    background-color: ${colors.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 8px;
`;

export const StyledButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
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
  box-shadow: inset -1px -1px 0px 0px ${colors.black},
    inset 1px 1px 0px 0px #ffffff,
    inset -2px -2px 0px 0px ${colors.darkprimary},
    inset 2px 2px 0px 0px ${colors.secondary};

  &:hover {
    background-color: ${colors.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(StyledButton)`
  box-shadow: inset -1px -1px 0px 0px ${colors.black},
    inset 1px 1px 0px 0px ${colors.black},
    inset -3px -3px 0px 0px ${colors.black},
    inset 2px 2px 0px 0px #ffffff,
    inset -4px -4px 0px 0px ${colors.darkprimary},
    inset 3px 3px 0px 0px ${colors.secondary};
`;
