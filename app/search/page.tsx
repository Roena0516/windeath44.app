'use client';

import styled from '@emotion/styled';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import WindowHeader from '@/components/layout/WindowHeader';
import Input from '@/components/ui/Input';
import Dropdown from '@/components/ui/Dropdown';
import SearchResultItem from '@/components/common/SearchResultItem';
import { colors, fonts } from '@/lib/styles/theme';
import {
  fetchIntegratedCharactersOffset,
  fetchAnimesPage,
  Character,
  AnimeItem,
} from '@/lib/api/anime';
import { fetchMemorials, MemorialItem } from '@/lib/api/memorial';

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
  padding: 15px 16px 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: hidden;
`;

const SearchSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
`;

const ResultSection = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
`;

const FilterBox = styled.div`
  width: 100%;
  background-color: ${colors.lightprimary};
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: inset -1px -1px 0px 0px ${colors.black},
    inset 1px 1px 0px 0px #ffffff,
    inset -2px -2px 0px 0px ${colors.darkprimary},
    inset 2px 2px 0px 0px ${colors.secondary};
`;

const ResultsContainer = styled.div`
  flex: 1;
  width: 100%;
  background-color: #ffeefd;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: inset -1px -1px 0px 0px #ffffff,
    inset 1px 1px 0px 0px ${colors.black},
    inset -2px -2px 0px 0px ${colors.darkprimary},
    inset 2px 2px 0px 0px ${colors.darkprimary};
`;

const ResultsList = styled.div`
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

const PaginationWrapper = styled.div`
  width: 100%;
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const PageButton = styled.button<{ selected?: boolean }>`
  width: 32px;
  height: 32px;
  background-color: ${colors.lightprimary};
  border: none;
  font-family: ${fonts.primary};
  font-size: 16px;
  color: ${colors.black};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) =>
    props.selected
      ? `inset -1px -1px 0px 0px ${colors.black}, inset 1px 1px 0px 0px #ffffff, inset -2px -2px 0px 0px ${colors.darkprimary}, inset 2px 2px 0px 0px ${colors.secondary}`
      : `inset -1px -1px 0px 0px #ffffff, inset 1px 1px 0px 0px ${colors.black}, inset -2px -2px 0px 0px ${colors.secondary}, inset 2px 2px 0px 0px ${colors.darkprimary}`};

  &:hover {
    background-color: ${colors.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageDots = styled.span`
  font-family: ${fonts.primary};
  font-size: 16.5px;
  color: #7c547b;
`;

const Statusbar = styled.div`
  width: 100%;
  height: auto;
  background-color: ${colors.darkprimary};
  padding: 2px 4.5px;
  display: flex;
  align-items: center;
  position: relative;
  box-shadow: inset -1.5px -1.5px 0px 0px #ffffff, inset 1.5px 1.5px 0px 0px #808080;
`;

const StatusContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4.5px;
`;

const StatusIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const StatusText = styled.p`
  font-family: ${fonts.primary};
  font-size: 16.5px;
  line-height: 15px;
  color: ${colors.black};
`;

const DragIcon = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 19.5px;
  height: 19.5px;

  img {
    width: 100%;
    height: 100%;
  }
`;

// Debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setDebouncedValue(value);
      setIsFirstRender(false);
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, isFirstRender]);

  return debouncedValue;
};

export default function SearchPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [ani, setAni] = useState('없음');
  const [fillDeath, setFillDeath] = useState('모두');

  const debouncedName = useDebounce(name, 500);
  const debouncedAni = useDebounce(ani, 500);

  const [pageNumber, setPageNumber] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [size] = useState(5);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [memorials, setMemorials] = useState<MemorialItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [animesResp, setAnimesResp] = useState<any>(null);

  const deathReason = [
    '모두',
    '자연사(自然死)',
    '병사(病死)',
    '자살(自殺)',
    '타살(他殺)',
    '돌연사(突然死)',
    '불명사(不明死)',
  ];

  const animeOptions = ['없음']; // Will be populated from API if needed

  // Parameter normalization
  const deathParam = useMemo(() => (fillDeath === '모두' ? undefined : fillDeath), [fillDeath]);
  const nameParam = useMemo(
    () => (debouncedName.trim() ? debouncedName.trim() : undefined),
    [debouncedName],
  );
  const aniParam = useMemo(
    () => (debouncedAni !== '없음' && debouncedAni.trim() ? debouncedAni.trim() : undefined),
    [debouncedAni],
  );

  // Fetch animes when ani parameter changes
  useEffect(() => {
    let aborted = false;
    const run = async () => {
      if (!aniParam) {
        setAnimesResp(null);
        return;
      }
      try {
        const resp = await fetchAnimesPage({ size: size, animeName: aniParam });
        if (!aborted) setAnimesResp(resp);
      } catch (e) {
        console.error('Failed to fetch animes:', e);
      }
    };
    run();

    return () => {
      aborted = true;
    };
  }, [aniParam, size]);

  const animeIdParam = useMemo<string[] | undefined>(() => {
    if (!aniParam) return undefined;
    const values = (animesResp?.data?.data as AnimeItem[] | undefined) ?? [];
    if (!values.length) return [];
    const ids = values.map((v) => v?.animeId).filter((id): id is number => typeof id === 'number');
    return ids.length ? ids.map(String) : [];
  }, [animesResp, aniParam]);

  // Fetch characters
  useEffect(() => {
    let aborted = false;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const integrated = await fetchIntegratedCharactersOffset({
          name: nameParam,
          animeId: animeIdParam,
          deathReason: deathParam,
          size: size,
          page: pageNumber - 1,
          memorialState: 'MEMORIALIZING',
        });

        if (!aborted) {
          const values = integrated?.data?.values || [];
          const total = integrated?.data?.total || 0;
          setCharacters(values);
          setMaxPage(total ? Math.ceil(total / size) : 1);

          // Fetch memorials for these characters
          const characterIds = values
            .map((c) => c?.characterId)
            .filter((id): id is number => typeof id === 'number');

          if (characterIds.length > 0) {
            const memorialsResp = await fetchMemorials({
              orderBy: 'recently-updated',
              page: 1,
              characters: characterIds,
            });
            if (!aborted) {
              setMemorials(memorialsResp?.data?.values || []);
            }
          } else {
            setMemorials([]);
          }
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        if (!aborted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      aborted = true;
    };
  }, [nameParam, animeIdParam, deathParam, pageNumber, size]);

  // Filter characters that have memorials
  const charactersWithMemorials = useMemo(() => {
    return characters.filter((character) => {
      const relatedMemorials = memorials.filter(
        (memorial) => memorial.characterId === character.characterId,
      );
      return relatedMemorials.length > 0;
    });
  }, [characters, memorials]);

  const handleCharacterClick = (character: Character) => {
    const relatedMemorials = memorials.filter(
      (memorial) => memorial.characterId === character.characterId,
    );
    if (relatedMemorials.length > 0) {
      router.push(`/memorial/${relatedMemorials[0].memorialId}`);
    }
  };

  return (
    <Container>
      <WindowContainer>
        <ContentWrapper>
          <WindowHeader />
          <MainContent>
            <ContentInner>
              <SearchSection>
                <FilterBox>
                  <Input
                    label="이름"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Dropdown
                    label="애니메이션"
                    value={ani}
                    options={animeOptions}
                    onChange={setAni}
                  />
                  <Dropdown
                    label="사인"
                    value={fillDeath}
                    options={deathReason}
                    onChange={setFillDeath}
                  />
                </FilterBox>
              </SearchSection>

              <ResultSection>
                <ResultsContainer>
                  <ResultsList>
                    {isLoading ? (
                      <div style={{ padding: '20px', textAlign: 'center' }}>불러오는 중...</div>
                    ) : (
                      charactersWithMemorials.map((character) => (
                        <SearchResultItem
                          key={character.characterId}
                          imageUrl={character.imageUrl || ''}
                          name={character.name}
                          animeName={character.animeName || ''}
                          genres={character.genres || []}
                          onClick={() => handleCharacterClick(character)}
                        />
                      ))
                    )}
                  </ResultsList>
                  <PaginationWrapper>
                    <PageButton
                      selected={pageNumber === 1}
                      onClick={() => setPageNumber(1)}
                    >
                      1
                    </PageButton>
                    <PageDots>...</PageDots>
                    {pageNumber > 1 && (
                      <PageButton onClick={() => setPageNumber(pageNumber - 1)}>
                        {pageNumber - 1}
                      </PageButton>
                    )}
                    {pageNumber !== 1 && pageNumber !== maxPage && (
                      <PageButton selected onClick={() => setPageNumber(pageNumber)}>
                        {pageNumber}
                      </PageButton>
                    )}
                    {pageNumber < maxPage && (
                      <PageButton onClick={() => setPageNumber(pageNumber + 1)}>
                        {pageNumber + 1}
                      </PageButton>
                    )}
                    <PageDots>...</PageDots>
                    <PageButton
                      selected={pageNumber === maxPage}
                      onClick={() => setPageNumber(maxPage)}
                    >
                      {maxPage}
                    </PageButton>
                  </PaginationWrapper>
                </ResultsContainer>
              </ResultSection>
            </ContentInner>
            <Statusbar>
              <StatusContent>
                <StatusIcon>
                  <img src="http://localhost:3845/assets/e64598e892cbd0c8dc889d7ac0a91cfc9dcc5add.png" alt="folder" />
                </StatusIcon>
                <StatusText>{charactersWithMemorials.length} 개체</StatusText>
              </StatusContent>
              <DragIcon>
                <img src="http://localhost:3845/assets/8da958fefff244cdf7c2ec10fc8ed2ee069747b6.svg" alt="drag" />
              </DragIcon>
            </Statusbar>
          </MainContent>
        </ContentWrapper>
      </WindowContainer>
    </Container>
  );
}
