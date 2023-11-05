"use client";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const GlobalStyleProvider = ({ children }: Props) => {
  return <GlobalStyles>{children}</GlobalStyles>;
};

export default GlobalStyleProvider;
const GlobalStyles = styled.div`
  padding: 2.5rem;
  display: flex;
  gap: 2.5rem;
  height: 100%;
`;
