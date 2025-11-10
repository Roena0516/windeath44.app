'use client';

import styled from '@emotion/styled';
import { colors, fonts, shadows } from '@/lib/styles/theme';

interface RankingItem {
  rank: number;
  name: string;
  count: number;
}

interface RankingListProps {
  items: RankingItem[];
}

const Container = styled.div`
  width: 100%;
  background-color: ${colors.white};
  position: relative;
  box-shadow: ${shadows.inset};
  overflow: hidden;
`;

const ItemsWrapper = styled.div`
  width: 100%;
  background-color: ${colors.gray};
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const RankItem = styled.div<{ isFirst?: boolean }>`
  width: 100%;
  background-color: ${colors.white};
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: ${(props) => (props.isFirst ? 'center' : 'flex-start')};
`;

const RankNumberWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  flex-shrink: 0;
`;

const RankNumber = styled.p`
  font-family: 'Galmuri11Bold', ${fonts.primary};
  font-weight: bold;
  font-size: 18px;
  color: ${colors.stroke};
  margin: 0;
  line-height: normal;
`;

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
`;

const CharacterName = styled.p`
  font-family: ${fonts.primary};
  font-size: 14px;
  color: ${colors.darkdark};
  white-space: nowrap;
  margin: 0;
  line-height: normal;
`;

const BowCount = styled.p`
  font-family: ${fonts.primary};
  font-size: 12px;
  color: ${colors.black};
  white-space: nowrap;
  margin: 0;
  line-height: normal;
`;

export default function RankingList({ items }: RankingListProps) {
  return (
    <Container>
      <ItemsWrapper>
        {items.map((item, index) => (
          <RankItem key={item.rank} isFirst={index === 0}>
            <RankNumberWrapper>
              <RankNumber>#{item.rank}</RankNumber>
            </RankNumberWrapper>
            <ItemContent>
              <CharacterName>{item.name}</CharacterName>
              <BowCount>{item.count}회</BowCount>
            </ItemContent>
          </RankItem>
        ))}
      </ItemsWrapper>
    </Container>
  );
}
