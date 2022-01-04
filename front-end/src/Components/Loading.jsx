import React from "react";
import styled from "styled-components";
import LoadingSrc from "../img/food_loading.gif";

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const LoadingImg = styled.img``;

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingImg src={LoadingSrc} alt="로딩 이미지" />
    </LoadingContainer>
  );
};

export default Loading;
