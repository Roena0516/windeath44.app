'use client';

import styled from '@emotion/styled';
import { useState } from 'react';
import { colors, fonts } from '@/lib/styles/theme';

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const DropdownWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
`;

const Label = styled.label`
  font-family: ${fonts.primary};
  font-size: 16px;
  color: ${colors.black};
  line-height: normal;
`;

const BlackBorder = styled.div`
  width: 100%;
  height: 32px;
  background-color: #000;
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-color: #fff;
  padding: 1px 1px 0 0;
`;

const WhiteInner = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  margin: 0 0 0 1px;
  width: 100%;
  height: 100%;
  font-family: ${fonts.primary};
  padding: 0;
  outline: none;
  border-color: ${colors.darkprimary};
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  cursor: pointer;
`;

const OptionText = styled.div`
  margin: auto 4px;
  font-size: 14px;
  color: ${colors.black};
`;

const ArrowButtonWrapper = styled.button`
  height: 90%;
  margin: 1px;
  border: none;
  display: flex;
  background: transparent;
  padding: 0;
  cursor: pointer;
`;

const ArrowButton = styled.div`
  display: flex;
  width: 24px;
  height: 100%;
  padding: 0 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${colors.lightprimary};
  box-shadow: inset -1px -1px 0px 0px ${colors.black},
    inset 1px 1px 0px 0px #ffffff,
    inset -2px -2px 0px 0px ${colors.darkprimary},
    inset 2px 2px 0px 0px ${colors.secondary};
  color: ${colors.black};
  border: none;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 1000;
`;

const OptionsList = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-width: 2px;
  border-style: solid;
  border-color: ${colors.black};
  box-sizing: border-box;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Option = styled.div`
  padding: 8px 12px;
  font-family: ${fonts.primary};
  font-size: 14px;
  color: ${colors.black};
  cursor: pointer;

  &:hover {
    background-color: #efefef;
  }
`;

export default function Dropdown({ label, value, options, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <DropdownWrapper>
      <Label>{label}:</Label>
      <BlackBorder>
        <WhiteInner onClick={() => setIsOpen(!isOpen)}>
          <OptionText>{value}</OptionText>
          <ArrowButtonWrapper type="button">
            <ArrowButton>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={isOpen ? 'M4 11L9 6L14 11' : 'M4 7L9 12L14 7'}
                  stroke={colors.black}
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            </ArrowButton>
          </ArrowButtonWrapper>
        </WhiteInner>
      </BlackBorder>
      {isOpen && (
        <OptionsContainer>
          <OptionsList>
            {options.map((option) => (
              <Option key={option} onClick={() => handleSelect(option)}>
                {option}
              </Option>
            ))}
          </OptionsList>
        </OptionsContainer>
      )}
    </DropdownWrapper>
  );
}
