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
