import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: ${(props) => props.theme.bgColor};
`;

//셀렉트를 위한
export const Select = styled.select`
  padding: 5px;
  border-radius: 5px;
  margin-right: 8px;
  width: 130px;
`;

export const Option = styled.option`
  border-radius: 5px;
`;

export const EmptyDiv = styled.div``;

export const MenuWrapperHeader = styled.div`
  font-weight: 600;
  font-size: 18px;
  width: 100%;
  border-bottom: 1px solid rgba(188, 188, 188, 0.4);
  margin-bottom: 10px;
`;

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid black;
  padding: 1.125rem;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.wrapColor};
`;
