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

export const ContentInner = styled.div`
  flex: 1;
  width: 100%;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow-y: auto;
`;

export const BowCountSection = styled.div`
  font-family: ${fonts.primary};
  font-size: 20px;
  line-height: normal;
  color: #2e2e2e;

  p {
    margin: 0;
  }
`;

export const AltarSection = styled.div`
  width: 100%;
  height: 288px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

export const AltarImagesWrapper = styled.div`
  position: relative;
  width: 372px;
  height: 274px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CandleLeft = styled.img`
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 64px;
  height: 120px;
  z-index: 2;
`;

export const CandleRight = styled.img`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 64px;
  height: 120px;
  z-index: 2;
`;

export const CharacterFrame = styled.div`
  position: absolute;
  left: 50%;
  top: calc(50% - 51.083px);
  transform: translate(-50%, -50%);
  width: 150.278px;
  height: 185.544px;
  z-index: 4;
  overflow: hidden;
`;

export const CharacterImageBorder = styled.div`
  position: absolute;
  width: 150.664px;
  height: 186.51px;
  left: 0;
  top: -0.08px;
  background-color: white;
  border: 14.374px solid black;
  overflow: hidden;
`;

export const CharacterImage = styled.img`
  width: 267.658px;
  height: 186.51px;
  position: absolute;
  left: -54.22px;
  top: 0.07px;
  object-fit: cover;
  object-position: 50% 50%;
`;

export const FlowerDecoration = styled.img`
  position: absolute;
  width: 372px;
  height: 274px;
  left: 50%;
  top: calc(50% + 3.28px);
  transform: translate(-50%, -50%);
  z-index: 3;
  pointer-events: none;
`;

export const TableImage = styled.img`
  position: absolute;
  width: 372px;
  height: 274px;
  left: 50%;
  top: calc(50% + 3.28px);
  transform: translate(-50%, -50%);
  z-index: 1;
`;

export const BowButtonWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: calc(50% + 76.009px);
  transform: translate(-50%, -50%);
  z-index: 5;
`;

export const MournersSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

export const MournersTitle = styled.div`
  font-family: ${fonts.primary};
  font-size: 20px;
  color: #2e2e2e;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MournersList = styled.div`
  width: 100%;
  background-color: white;
  overflow: hidden;
  box-shadow: inset -1px -1px 0px 0px #ffffff,
    inset 1px 1px 0px 0px ${colors.black},
    inset -2px -2px 0px 0px ${colors.darkprimary},
    inset 2px 2px 0px 0px ${colors.darkprimary};
`;

export const MournersInner = styled.div`
  width: 100%;
  background-color: #cccccc;
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export const MournerItem = styled.div`
  width: 100%;
  background-color: white;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
`;

export const MournerRankAndAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const MournerRank = styled.p`
  font-family: ${fonts.primary};
  font-weight: bold;
  font-size: 18px;
  color: ${colors.stroke};
  width: 30px;
  margin: 0;
  flex-shrink: 0;
`;

export const MournerAvatar = styled.div<{ imgUrl?: string }>`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  background-image: ${(props) => (props.imgUrl ? `url(${props.imgUrl})` : 'none')};
  background-size: cover;
  background-position: center;
  background-color: ${(props) => (props.imgUrl ? 'transparent' : colors.lightprimary)};
  border: ${(props) => (props.imgUrl ? 'none' : `1px solid ${colors.stroke}`)};
`;

export const MournerInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
`;

export const MournerNameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const MournerName = styled.p`
  font-family: ${fonts.primary};
  font-size: 14px;
  color: ${colors.darkdark};
  margin: 0;
`;

export const MournerBadge = styled.p`
  font-family: ${fonts.primary};
  font-size: 12px;
  color: ${colors.black};
  margin: 0;
`;

export const MournerCount = styled.p`
  font-family: ${fonts.primary};
  font-size: 12px;
  color: ${colors.black};
  margin: 0;
`;
