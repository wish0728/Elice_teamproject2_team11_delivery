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

export const EmptyDiv = styled.div``;
