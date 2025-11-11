'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import WindowHeader from '@/components/layout/WindowHeader';
import MemorialBtn from '@/components/ui/MemorialBtn';
import Whiteboard from '@/components/ui/Whiteboard';
import RankingList from '@/components/common/RankingList';
import { colors, fonts } from '@/lib/styles/theme';

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
  padding: 20px 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const InnerContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 8px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MainTitle = styled.h1`
  font-family: ${fonts.primary};
  font-size: 32px;
  font-weight: normal;
  color: ${colors.black};
  margin: 0;
  line-height: normal;
`;

const Version = styled.p`
  font-family: ${fonts.primary};
  font-size: 18px;
  color: ${colors.black};
  margin: 0;
  width: 115px;
  line-height: normal;
`;

const ScrollableSection = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  justify-content: center;
`;

const DescriptionText = styled.div`
  font-family: ${fonts.primary};
  font-size: 16px;
  color: ${colors.black};
  line-height: normal;
  width: 100%;

  p {
    margin: 0 0 12px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActionsSection = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 36px;
  justify-content: center;
`;

const TodaySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.primary};
  font-size: 20px;
  font-weight: normal;
  color: ${colors.black};
  margin: 0;
  line-height: normal;
`;

// Mock data for today's memorials
const todayRankings = [
  { rank: 1, name: '힘멜', count: 1234 },
  { rank: 2, name: '손오공', count: 196 },
  { rank: 3, name: '이타치', count: 169 },
];

export default function Home() {
  const router = useRouter();

  const handleSearch = () => {
    router.push('/search');
  };

  const handleFavorites = () => {
    console.log('즐겨찾기');
    // TODO: 즐겨찾기 페이지로 이동
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <Container>
      <WindowContainer>
        <ContentWrapper>
          <WindowHeader />
          <MainContent>
            <InnerContent>
              <TitleSection>
                <MainTitle>최애의 사인</MainTitle>
                <Version>ver 0.0.1</Version>
              </TitleSection>

              <ScrollableSection>
                <Whiteboard padding="16px">
                  <DescriptionText>
                    <p>
                      최애의 사인은 작품 내에서 사망한 애니메이션 캐릭터를 추모하는
                      공간입니다.
                    </p>
                    <p>아래의 버튼을 눌러 계속 진행할 수 있습니다.</p>
                  </DescriptionText>
                </Whiteboard>

                <ActionsSection>
                  <ButtonGroup>
                    <MemorialBtn
                      name="추모관 검색"
                      onClick={handleSearch}
                      type="submit"
                      active={true}
                      width="100%"
                    />
                    <MemorialBtn
                      name="즐겨찾기"
                      onClick={handleFavorites}
                      type="submit"
                      active={true}
                      width="100%"
                    />
                    <MemorialBtn
                      name="로그인"
                      onClick={handleLogin}
                      type="submit"
                      active={true}
                      width="100%"
                    />
                  </ButtonGroup>

                  <TodaySection>
                    <SectionTitle>오늘의 추모관</SectionTitle>
                    <RankingList items={todayRankings} />
                  </TodaySection>
                </ActionsSection>
              </ScrollableSection>
            </InnerContent>
          </MainContent>
        </ContentWrapper>
      </WindowContainer>
    </Container>
  );
}
