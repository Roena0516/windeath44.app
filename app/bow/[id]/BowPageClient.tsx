'use client';

import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WindowHeader from '@/components/layout/WindowHeader';
import MemorialBtn from '@/components/ui/MemorialBtn';
import { colors, fonts } from '@/lib/styles/theme';
import { getBowCount, submitBow, getBowChiefs, BowChief } from '@/lib/api/bow';
import { getMemorial, MemorialData } from '@/lib/api/memorialGet';
import { getCharacter, CharacterData } from '@/lib/api/character';
import Cookies from 'js-cookie';
import { TableImage as TableImageAsset } from '@/assets';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WindowContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  border: 2.572px solid ${colors.primary};
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  padding: 8.572px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  width: 100%;
  background-color: ${colors.lightprimary};
  border: 2.572px solid ${colors.stroke};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentInner = styled.div`
  flex: 1;
  width: 100%;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow-y: auto;
`;

const BowCountSection = styled.div`
  font-family: ${fonts.primary};
  font-size: 20px;
  line-height: normal;
  color: #2e2e2e;

  p {
    margin: 0;
  }
`;

const AltarSection = styled.div`
  width: 100%;
  height: 288px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

const AltarImagesWrapper = styled.div`
  position: relative;
  width: 372px;
  height: 274px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CandleLeft = styled.img`
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 64px;
  height: 120px;
  z-index: 2;
`;

const CandleRight = styled.img`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 64px;
  height: 120px;
  z-index: 2;
`;

const CharacterFrame = styled.div`
  position: absolute;
  left: 50%;
  top: calc(50% - 51.083px);
  transform: translate(-50%, -50%);
  width: 150.278px;
  height: 185.544px;
  z-index: 4;
  overflow: hidden;
`;

const CharacterImageBorder = styled.div`
  position: absolute;
  width: 150.664px;
  height: 186.51px;
  left: 0;
  top: -0.08px;
  background-color: white;
  border: 14.374px solid black;
  overflow: hidden;
`;

const CharacterImage = styled.img`
  width: 267.658px;
  height: 186.51px;
  position: absolute;
  left: -54.22px;
  top: 0.07px;
  object-fit: cover;
  object-position: 50% 50%;
`;

const FlowerDecoration = styled.img`
  position: absolute;
  width: 372px;
  height: 274px;
  left: 50%;
  top: calc(50% + 3.28px);
  transform: translate(-50%, -50%);
  z-index: 3;
  pointer-events: none;
`;

const TableImage = styled.img`
  position: absolute;
  width: 372px;
  height: 274px;
  left: 50%;
  top: calc(50% + 3.28px);
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const BowButtonWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: calc(50% + 76.009px);
  transform: translate(-50%, -50%);
  z-index: 5;
`;

const MournersSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

const MournersTitle = styled.div`
  font-family: ${fonts.primary};
  font-size: 20px;
  color: #2e2e2e;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MournersList = styled.div`
  width: 100%;
  background-color: white;
  overflow: hidden;
  box-shadow: inset -1px -1px 0px 0px #ffffff,
    inset 1px 1px 0px 0px ${colors.black},
    inset -2px -2px 0px 0px ${colors.darkprimary},
    inset 2px 2px 0px 0px ${colors.darkprimary};
`;

const MournersInner = styled.div`
  width: 100%;
  background-color: #cccccc;
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const MournerItem = styled.div`
  width: 100%;
  background-color: white;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
`;

const MournerRankAndAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MournerRank = styled.p`
  font-family: ${fonts.primary};
  font-weight: bold;
  font-size: 18px;
  color: ${colors.stroke};
  width: 30px;
  margin: 0;
  flex-shrink: 0;
`;

const MournerAvatar = styled.div<{ imgUrl?: string }>`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  background-image: ${(props) => (props.imgUrl ? `url(${props.imgUrl})` : 'none')};
  background-size: cover;
  background-position: center;
  background-color: ${(props) => (props.imgUrl ? 'transparent' : colors.lightprimary)};
  border: ${(props) => (props.imgUrl ? 'none' : `1px solid ${colors.stroke}`)};
`;

const MournerInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
`;

const MournerNameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MournerName = styled.p`
  font-family: ${fonts.primary};
  font-size: 14px;
  color: ${colors.darkdark};
  margin: 0;
`;

const MournerBadge = styled.p`
  font-family: ${fonts.primary};
  font-size: 12px;
  color: ${colors.black};
  margin: 0;
`;

const MournerCount = styled.p`
  font-family: ${fonts.primary};
  font-size: 12px;
  color: ${colors.black};
  margin: 0;
`;

export default function BowPageClient({ memorialId }: { memorialId: number }) {
  const router = useRouter();

  const [bowCount, setBowCount] = useState<number>(0);
  const [chiefs, setChiefs] = useState<BowChief[]>([]);
  const [memorialData, setMemorialData] = useState<MemorialData | null>(null);
  const [character, setCharacter] = useState<CharacterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const userId = Cookies.get('userId');
    setCurrentUserId(userId || null);

    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch bow count
        const bowCountRes = await getBowCount(memorialId);
        setBowCount(bowCountRes.data);

        // Fetch memorial data
        const memorialRes = await getMemorial(memorialId);
        setMemorialData(memorialRes.data);

        // Fetch character data
        if (memorialRes.data.characterId) {
          const characterRes = await getCharacter(memorialRes.data.characterId);
          setCharacter(characterRes.data);
        }

        // Fetch chiefs
        const chiefsRes = await getBowChiefs(memorialId);
        setChiefs(chiefsRes);
      } catch (error) {
        console.error('Failed to fetch bow page data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [memorialId]);

  const handleBow = async () => {
    const token = Cookies.get('access_token');

    if (!token) {
      alert('게스트는 절을 할 수 없습니다.\n로그인 후 사용 가능합니다.');
      router.push('/login');
      return;
    }

    try {
      await submitBow(memorialId);
      setBowCount((prev) => prev + 1);

      // Refresh chiefs list
      const chiefsRes = await getBowChiefs(memorialId);
      setChiefs(chiefsRes);

      alert('절을 올렸습니다.');
    } catch (error: any) {
      if (error.response?.status === 400 || error.response?.status === 409) {
        alert('절을 하지 못했습니다.\n절을 한 번 한 후 24시간이 지나야 다시 할 수 있습니다.');
      } else {
        alert('절을 하는 중 문제가 발생했습니다.\n잠시 후 다시 시도해 주세요.');
      }
    }
  };

  if (isLoading || !character) {
    return (
      <Container>
        <WindowContainer>
          <ContentWrapper>
            <WindowHeader />
            <MainContent>
              <ContentInner>
                <div style={{ textAlign: 'center', padding: '20px' }}>불러오는 중...</div>
              </ContentInner>
            </MainContent>
          </ContentWrapper>
        </WindowContainer>
      </Container>
    );
  }

  return (
    <Container>
      <WindowContainer>
        <ContentWrapper>
          <WindowHeader />
          <MainContent>
            <ContentInner>
              <BowCountSection>
                <p>절 하고 간 사람</p>
                <p>{bowCount}명</p>
              </BowCountSection>

              <AltarSection>
                <AltarImagesWrapper>
                  <TableImage src={TableImageAsset.src} alt="table" />
                  <CharacterFrame>
                    <CharacterImageBorder>
                      <CharacterImage src={character.imageUrl} alt={character.name} />
                    </CharacterImageBorder>
                  </CharacterFrame>
                  <FlowerDecoration
                    src="http://localhost:3845/assets/c7f5df363da0ee4283decb5df2ac795da9233e87.png"
                    alt="flowers"
                  />
                  <BowButtonWrapper>
                    <MemorialBtn name="절" onClick={handleBow} type="submit" active={true} />
                  </BowButtonWrapper>
                </AltarImagesWrapper>
              </AltarSection>

              <MournersSection>
                <MournersTitle>조문객 명단</MournersTitle>
                <MournersList>
                  <MournersInner>
                    {chiefs.slice(0, 3).map((chief, index) => (
                      <MournerItem key={chief.userId}>
                        <MournerRankAndAvatar>
                          <MournerRank>#{index + 1}</MournerRank>
                          <MournerAvatar imgUrl={chief.profileImageUrl} />
                        </MournerRankAndAvatar>
                        <MournerInfo>
                          <MournerNameSection>
                            <MournerName>{chief.name}</MournerName>
                            <MournerBadge>(상주)</MournerBadge>
                          </MournerNameSection>
                          <MournerCount>{chief.bowCount}회</MournerCount>
                        </MournerInfo>
                      </MournerItem>
                    ))}
                  </MournersInner>
                </MournersList>

                {chiefs.length > 3 && currentUserId && (
                  <MournersList>
                    <MournersInner>
                      {chiefs
                        .slice(3)
                        .filter((chief) => chief.userId === currentUserId)
                        .map((chief) => {
                          const actualRank = chiefs.findIndex((c) => c.userId === chief.userId) + 1;
                          return (
                            <MournerItem key={chief.userId}>
                              <MournerRankAndAvatar>
                                <MournerRank>#{actualRank}</MournerRank>
                                <MournerAvatar imgUrl={chief.profileImageUrl} />
                              </MournerRankAndAvatar>
                              <MournerInfo>
                                <MournerNameSection>
                                  <MournerName>{chief.name}</MournerName>
                                </MournerNameSection>
                                <MournerCount>{chief.bowCount}회</MournerCount>
                              </MournerInfo>
                            </MournerItem>
                          );
                        })}
                    </MournersInner>
                  </MournersList>
                )}
              </MournersSection>
            </ContentInner>
          </MainContent>
        </ContentWrapper>
      </WindowContainer>
    </Container>
  );
}
