'use client';

import styled from '@emotion/styled';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WindowHeader from '@/components/layout/WindowHeader';
import MemorialBtn from '@/components/ui/MemorialBtn';
import Input from '@/components/ui/Input';
import { colors, fonts } from '@/lib/styles/theme';
import { logIn } from '@/lib/api/auth';
import { WindeathLogo } from '@/assets';

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

const LogoSection = styled.div`
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

const Divider = styled.div`
  width: 100%;
  height: 4px;
  background-color: #ffeefd;
  border: 2px solid ${colors.secondary};
  flex-shrink: 0;
`;

const FormSection = styled.div`
  flex: 1;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;

const FormFields = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 0;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 8px;
`;

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await logIn({ id: username, password });
      // 로그인 성공 시 메인 페이지로 이동
      router.push('/');
    } catch (err) {
      setError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    // TODO: 회원가입 페이지로 이동
    router.push('/signup');
  };

  return (
    <Container>
      <WindowContainer>
        <ContentWrapper>
          <WindowHeader />
          <MainContent>
            <LogoSection>
              <img src={WindeathLogo.src} alt="Windeath 44" />
            </LogoSection>
            <Divider />
            <FormSection>
              <FormFields>
                <Input
                  label="아이디:"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  required
                />
                <Input
                  label="비밀번호:"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  required
                />
              </FormFields>
              <ButtonGroup>
                <MemorialBtn
                  name="회원가입"
                  onClick={handleSignup}
                  type="submit"
                  active={true}
                  width="120px"
                  height="40px"
                  fontSize="18px"
                />
                <MemorialBtn
                  name="확인"
                  onClick={handleLogin}
                  type="submit"
                  active={true}
                  width="120px"
                  height="40px"
                  fontSize="18px"
                />
              </ButtonGroup>
            </FormSection>
          </MainContent>
        </ContentWrapper>
      </WindowContainer>
    </Container>
  );
}
