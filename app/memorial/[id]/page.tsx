'use client';

import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import WindowHeader from '@/components/layout/WindowHeader';
import { colors, fonts } from '@/lib/styles/theme';
import { getMemorial, MemorialData } from '@/lib/api/memorialGet';
import { getCharacter, CharacterData } from '@/lib/api/character';
import { getAnimation } from '@/lib/api/animation';
import { getMemorialComments, MemorialComment } from '@/lib/api/memorialComments';
import { parseMemorialContent, extractTableOfContents } from '@/lib/utils/parseMemorialContent';

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
  overflow: hidden;
`;

const ContentInner = styled.div`
  flex: 1;
  width: 100%;
  padding: 6px;
  display: flex;
  overflow: hidden;
`;

const ScrollableArea = styled.div`
  flex: 1;
  width: 100%;
  background-color: ${colors.white};
  box-shadow: inset -1px -1px 0px 0px #ffffff,
    inset 1px 1px 0px 0px ${colors.black},
    inset -2px -2px 0px 0px ${colors.darkprimary},
    inset 2px 2px 0px 0px ${colors.darkprimary};
  display: flex;
  overflow: hidden;
`;

const ScrollContent = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px 16px;
  min-height: 0;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.secondary};
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.lightprimary};
    box-shadow: inset -1px -1px 0px 0px ${colors.black},
      inset 1px 1px 0px 0px #ffffff,
      inset -2px -2px 0px 0px ${colors.darkprimary},
      inset 2px 2px 0px 0px ${colors.secondary};
  }

  &::-webkit-scrollbar-button:start:decrement,
  &::-webkit-scrollbar-button:end:increment {
    height: 27px;
    background: ${colors.lightprimary};
    display: block;
  }
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  width: 100%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const Title = styled.h1`
  font-family: ${fonts.primary};
  font-size: 32px;
  font-weight: normal;
  color: ${colors.black};
  margin: 0;
  line-height: normal;
`;

const Subtitle = styled.p`
  font-family: ${fonts.primary};
  font-size: 14px;
  color: ${colors.black};
  margin: 0;
  line-height: normal;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px 0;
`;

const ProfileSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  padding: 4px 0;
`;

const PictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const Ribbon = styled.img`
  position: absolute;
  top: 0;
  width: 194px;
  z-index: 1;
  pointer-events: none;
`;

const Picture = styled.div<{ imgUrl?: string }>`
  width: 194px;
  height: 237.229px;
  border: 18px solid ${colors.black};
  background: ${colors.white};
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

const CharacterName = styled.p`
  font-family: ${fonts.primary};
  font-size: 24px;
  color: ${colors.black};
  text-align: center;
  margin: 0;
  line-height: normal;
`;

const InformationTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.stroke};
  gap: -1px;
`;

const TableRow = styled.div`
  width: 100%;
  display: flex;
  gap: -1px;
  margin-bottom: -1px;
`;

const TableLabel = styled.div`
  width: 100px;
  padding: 4px;
  background-color: ${colors.lightprimary};
  border: 1px solid ${colors.stroke};
  font-family: ${fonts.primary};
  font-size: 14px;
  color: #fd51a7;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: normal;
  flex-shrink: 0;
`;

const TableValue = styled.div`
  flex: 1;
  padding: 4px;
  border: 1px solid ${colors.stroke};
  font-family: ${fonts.primary};
  font-size: 14px;
  color: ${colors.black};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: normal;
`;

const QuoteSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Quote = styled.h2`
  position: relative;
  height: fit-content;
  align-self: stretch;
  color: #4a4a4a;
  font-family: 'Galmuri11', serif;
  font-size: 28px;
  font-style: italic;
  font-weight: 500;
  line-height: 1.5;
  background-color: #f0f0f0;
  padding: 30px 40px;
  border-left: 5px solid #e774dd;
  border-radius: 5px;
  margin: 10px 0;

  &::before {
    content: '"';
    position: absolute;
    top: 10px;
    left: 5px;
    font-size: 40px;
    color: #e774dd;
  }

  &::after {
    content: '"';
    position: absolute;
    bottom: -10px;
    font-size: 40px;
    color: #e774dd;
  }
`;

const IndexContainer = styled.div`
  border: 1px solid ${colors.stroke};
  padding: 12px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const IndexTitle = styled.p`
  font-family: ${fonts.primary};
  font-size: 24px;
  color: ${colors.black};
  margin: 0;
  line-height: normal;
`;

const IndexList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 16px;
`;

const IndexItem = styled.p`
  font-family: ${fonts.primary};
  font-size: 20px;
  color: ${colors.black};
  margin: 0;
  line-height: normal;

  span.number {
    color: ${colors.stroke};
  }
`;

const BowButton = styled.button`
  width: 260px;
  height: 60px;
  background-color: ${colors.lightprimary};
  border: none;
  font-family: ${fonts.primary};
  font-size: 24px;
  color: ${colors.black};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  box-shadow: inset -1px -1px 0px 0px ${colors.black},
    inset 1px 1px 0px 0px #ffffff,
    inset -2px -2px 0px 0px ${colors.darkprimary},
    inset 2px 2px 0px 0px ${colors.secondary};

  &:hover {
    background-color: ${colors.secondary};
  }

  &:active {
    box-shadow: inset 1px 1px 0px 0px ${colors.black},
      inset -1px -1px 0px 0px #ffffff,
      inset 2px 2px 0px 0px ${colors.darkprimary},
      inset -2px -2px 0px 0px ${colors.secondary};
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.primary};
  font-size: 16px;
  color: ${colors.black};
`;

const CommentSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.primary};
  font-size: 32px;
  color: ${colors.black};
  margin: 0;
  line-height: normal;
`;

const CommentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 12px;
`;

const CommentsInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: rgba(0, 0, 0, 0.2);
  padding: 1px 0;
`;

const CommentInputContainer = styled.div`
  width: 100%;
  background: #ffebfd;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CommentForm = styled.form`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const CommentInput = styled.input`
  flex: 1;
  font-family: ${fonts.primary};
  font-size: 12px;
  background: transparent;
  border: none;
  outline: none;
  color: ${colors.black};

  &::placeholder {
    color: ${colors.darkprimary};
  }
`;

const CharCount = styled.span`
  font-family: ${fonts.primary};
  font-size: 10px;
  color: ${colors.darkprimary};
  white-space: nowrap;
`;

const CommentItem = styled.div<{ $isReply?: boolean }>`
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background: #fff;
  ${(props) =>
    props.$isReply &&
    `
        padding-left: 58px;
        background: #f9f9f9;
    `}
`;

const ProfileImg = styled.div<{ imgUrl?: string }>`
  width: 48px;
  height: 48px;
  background-image: ${(props) => (props.imgUrl ? `url(${props.imgUrl})` : 'none')};
  background-size: cover;
  background-position: center;
  background-color: ${(props) => (props.imgUrl ? 'transparent' : colors.lightprimary)};
  border: ${(props) => (props.imgUrl ? 'none' : `1px solid ${colors.stroke}`)};
  flex-shrink: 0;
`;

const TextBox = styled.div`
  display: flex;
  padding: 0 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

const NickNameContainer = styled.div`
  display: flex;
  padding: 6px 0px;
  align-items: flex-end;
  gap: 8px;
`;

const CommentUser = styled.p`
  color: var(--DarkPrimary, #dcafdd);
  font-family: ${fonts.primary};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

const CommentText = styled.p`
  color: var(--Black, #2e2e2e);
  font-family: ${fonts.primary};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  width: 100%;
  margin: 0;
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding-top: 4px;
  justify-content: space-between;
  width: 100%;
`;

const LikeButton = styled.button<{ $isLiked?: boolean }>`
  background: none;
  border: none;
  color: ${(props) => (props.$isLiked ? 'var(--off, #fd51a7)' : 'var(--Stroke, #e774dd)')};
  font-family: ${fonts.primary};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

const ReplyButton = styled.button`
  background: none;
  border: none;
  color: var(--Stroke, #e774dd);
  font-family: ${fonts.primary};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  padding: 4px 0 0 0;
  margin: 0;
  &:hover {
    text-decoration: underline;
  }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: var(--Stroke, #e774dd);
  font-family: ${fonts.primary};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  padding: 0;
  margin: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--Stroke, #e774dd);
  font-family: ${fonts.primary};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  padding: 0;
  margin: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const LoadMoreButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: ${colors.white};
  border: none;
  font-family: ${fonts.primary};
  font-size: 12px;
  color: ${colors.stroke};
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const ArticleSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ArticleContent = styled.div`
  width: 100%;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: ${fonts.primary};
  font-size: 20px;
  color: ${colors.black};
  line-height: 1.6;

  p {
    margin: 0;
  }

  h2 {
    margin: 32px 0 16px;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default function MemorialPage() {
  const router = useRouter();
  const params = useParams();
  const memorialId = params?.id as string;

  const [memorialData, setMemorialData] = useState<MemorialData | null>(null);
  const [characterData, setCharacterData] = useState<CharacterData | null>(null);
  const [animeName, setAnimeName] = useState<string>('');
  const [tableOfContents, setTableOfContents] = useState<string[]>([]);
  const [comments, setComments] = useState<MemorialComment[]>([]);
  const [hasNextComment, setHasNextComment] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!memorialId) return;

      try {
        setIsLoading(true);
        setError(null);

        // Fetch memorial data
        const memorialResponse = await getMemorial(Number(memorialId));
        setMemorialData(memorialResponse.data);

        // Extract table of contents from memorial content
        const toc = extractTableOfContents(memorialResponse.data.content);
        setTableOfContents(toc);

        // Fetch character data
        const characterResponse = await getCharacter(memorialResponse.data.characterId);
        setCharacterData(characterResponse.data);

        // Fetch anime name
        const animeResponse = await getAnimation(characterResponse.data.animeId);
        setAnimeName(animeResponse.data.name);

        // Fetch comments
        const commentsResponse = await getMemorialComments({
          memorialId: Number(memorialId),
          size: 10,
        });
        setComments(commentsResponse.data.data);
        setHasNextComment(commentsResponse.data.hasNext);

        // Get current user info (optional - for edit/delete permissions)
        try {
          const { getAccessToken } = await import('@/lib/api/auth');
          const token = getAccessToken();
          if (token) {
            // TODO: Implement getCurrentUser API call
            // For now, set to null
            setCurrentUserId(null);
          }
        } catch (err) {
          console.log('User not logged in');
        }
      } catch (err) {
        console.error('Error fetching memorial data:', err);
        setError('추모관 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [memorialId]);

  const handleLoadMoreComments = async () => {
    if (comments.length === 0) return;
    const lastCommentId = comments[comments.length - 1].commentId;

    try {
      const commentsResponse = await getMemorialComments({
        memorialId: Number(memorialId),
        cursorId: lastCommentId,
        size: 10,
      });
      setComments((prev) => [...prev, ...commentsResponse.data.data]);
      setHasNextComment(commentsResponse.data.hasNext);
    } catch (err) {
      console.error('Error loading more comments:', err);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    // TODO: Implement comment submission
    console.log('Submit comment:', commentContent);
    setCommentContent('');
  };

  const handleBowClick = () => {
    // TODO: Navigate to bow page or implement bow functionality
    console.log('절 하러가기 clicked for memorial:', memorialId);
  };

  if (isLoading) {
    return (
      <Container>
        <WindowContainer>
          <ContentWrapper>
            <WindowHeader />
            <MainContent>
              <ContentInner>
                <ScrollableArea>
                  <LoadingContainer>불러오는 중...</LoadingContainer>
                </ScrollableArea>
              </ContentInner>
            </MainContent>
          </ContentWrapper>
        </WindowContainer>
      </Container>
    );
  }

  if (error || !memorialData || !characterData) {
    return (
      <Container>
        <WindowContainer>
          <ContentWrapper>
            <WindowHeader />
            <MainContent>
              <ContentInner>
                <ScrollableArea>
                  <LoadingContainer>{error || '추모관을 찾을 수 없습니다.'}</LoadingContainer>
                </ScrollableArea>
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
              <ScrollableArea>
                <ScrollContent>
                  <Section>
                    <Header>
                      <TextContainer>
                        <Title>{characterData.name}</Title>
                        <Subtitle>최근 수정: {memorialData.updatedAt}</Subtitle>
                      </TextContainer>
                    </Header>

                    <ContentContainer>
                      <ProfileSection>
                        <PictureContainer>
                          <Ribbon src="/assets/memorial_ribbon.svg" alt="ribbon" />
                          <Picture imgUrl={characterData.imageUrl} />
                          <CharacterName>{characterData.name}</CharacterName>
                        </PictureContainer>

                        <InformationTable>
                          <TableRow>
                            <TableLabel>나이</TableLabel>
                            <TableValue>향년 {characterData.age}세</TableValue>
                          </TableRow>
                          <TableRow>
                            <TableLabel>사망 날짜</TableLabel>
                            <TableValue>{characterData.deathOfDay}</TableValue>
                          </TableRow>
                          <TableRow>
                            <TableLabel>사인</TableLabel>
                            <TableValue>{characterData.deathReason}</TableValue>
                          </TableRow>
                          <TableRow>
                            <TableLabel>상세 사인</TableLabel>
                            <TableValue>{characterData.causeOfDeathDetails || '-'}</TableValue>
                          </TableRow>
                          <TableRow>
                            <TableLabel>애니메이션</TableLabel>
                            <TableValue>{animeName}</TableValue>
                          </TableRow>
                        </InformationTable>
                      </ProfileSection>

                      <QuoteSection>
                        <Quote>{characterData.saying}</Quote>
                        <IndexContainer>
                          <IndexTitle>목차</IndexTitle>
                          <IndexList>
                            {tableOfContents.map((item, idx) => (
                              <IndexItem key={idx}>
                                <span className="number">{idx + 1}.</span> {item}
                              </IndexItem>
                            ))}
                          </IndexList>
                        </IndexContainer>
                      </QuoteSection>
                    </ContentContainer>
                  </Section>

                  <BowButton onClick={handleBowClick}>절 하러가기</BowButton>

                  <CommentSection>
                    <SectionTitle>추모글</SectionTitle>
                    <CommentsContainer>
                      <CommentsInner>
                        <CommentInputContainer>
                          <CommentForm onSubmit={handleCommentSubmit}>
                            <CommentInput
                              type="text"
                              value={commentContent}
                              onChange={(e) => setCommentContent(e.target.value)}
                              placeholder="추모글을 입력하세요."
                              maxLength={250}
                            />
                            <CharCount>{commentContent.length}/250</CharCount>
                          </CommentForm>
                        </CommentInputContainer>

                        {comments.map((comment) => {
                          const isOwner = currentUserId === comment.userId;
                          return (
                            <div key={comment.commentId}>
                              <CommentItem>
                                <ProfileImg imgUrl={comment.profileImageUrl} />
                                <TextBox>
                                  <NickNameContainer>
                                    <CommentUser>@{comment.userId}</CommentUser>
                                  </NickNameContainer>
                                  <CommentText>{comment.content}</CommentText>
                                  <ActionButtonGroup>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                      <LikeButton $isLiked={comment.isLiked}>
                                        {comment.isLiked ? '♥' : '♡'} {comment.likes}
                                      </LikeButton>
                                      <ReplyButton>답글 입력</ReplyButton>
                                    </div>
                                    {isOwner && (
                                      <div style={{ display: 'flex', gap: '8px' }}>
                                        <EditButton>수정</EditButton>
                                        <DeleteButton>삭제</DeleteButton>
                                      </div>
                                    )}
                                  </ActionButtonGroup>
                                </TextBox>
                              </CommentItem>
                              {comment.children?.map((child) => {
                                const isChildOwner = currentUserId === child.userId;
                                return (
                                  <CommentItem key={child.commentId} $isReply>
                                    <ProfileImg imgUrl={child.profileImageUrl} />
                                    <TextBox>
                                      <NickNameContainer>
                                        <CommentUser>@{child.userId}</CommentUser>
                                      </NickNameContainer>
                                      <CommentText>{child.content}</CommentText>
                                      <ActionButtonGroup>
                                        <LikeButton $isLiked={child.isLiked}>
                                          {child.isLiked ? '♥' : '♡'} {child.likes}
                                        </LikeButton>
                                        {isChildOwner && (
                                          <div style={{ display: 'flex', gap: '8px' }}>
                                            <EditButton>수정</EditButton>
                                            <DeleteButton>삭제</DeleteButton>
                                          </div>
                                        )}
                                      </ActionButtonGroup>
                                    </TextBox>
                                  </CommentItem>
                                );
                              })}
                            </div>
                          );
                        })}

                        {hasNextComment && (
                          <LoadMoreButton onClick={handleLoadMoreComments}>더보기</LoadMoreButton>
                        )}
                      </CommentsInner>
                    </CommentsContainer>
                  </CommentSection>

                  <ArticleSection>
                    <ArticleContent>{parseMemorialContent(memorialData.content)}</ArticleContent>
                  </ArticleSection>
                </ScrollContent>
              </ScrollableArea>
            </ContentInner>
          </MainContent>
        </ContentWrapper>
      </WindowContainer>
    </Container>
  );
}
