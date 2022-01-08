import React, { useEffect, useState } from "react";
import styled from "styled-components";
import deliveryApi from "../apis/delivery";
import { Container, Option, Select } from "../Components/common";
import Menu from "../Components/Menu";
import MenuHeader from "../Components/MenuHeader";
import MyResponsiveBar from "../Components/MyResponsiveBar";
import { AREAS, DETAIL_AREAS } from "../constants/delivery_data";

const OthertownContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.titleColor};
  overflow: scroll;
`;

const OthertownBody = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 5;
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

const OthertownMenu = styled(Menu)`
  flex-grow: 1;
  padding: 10px;
  box-sizing: border-box;
`;

const MainContents = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  flex-grow: 4;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 300px;
  overflow: scroll;
  z-index: 99;
  box-sizing: border-box;
`;

const SelectMessage = styled.div`
  margin-left: 20px;
  width: 100px;
`;

const ContentsArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 500px;
`;

const GrapArea = styled.div`
  flex-grow: 1;
`;

const SubmitBtn = styled.button``;

const Othertown = () => {
  const [myTownValue, setMyTownValue] = useState(""); //우리 동네 입력값
  const [otherTownValue, setOtherTownValue] = useState("");

  const [myArea, setMyArea] = useState(""); //우리 동네 첫번째 Select 도/시 선택시 값이 담길 변수
  const [myDetailArea, setMyDetailArea] = useState([]); //우리동네 area가 결정되면 우리동네 두번째 Select에 값 담기 위한 변수
  const [myDAreaValue, setMyDAreaValue] = useState(""); //우리동네 두번째 Select의 값
  const [myApiRes, setMyApiRes] = useState([]); //myTown api 통신 값 담을 변수

  const [otherArea, setOtherArea] = useState(""); // 다른동네 첫번째 Select 도/시 선택시 값이 담길 변수
  const [otherDetailArea, setOtherDetailArea] = useState([]); // 다른동네 area가 결정되면 다른동네 두번째 Select에 값 담기 위한 변수
  const [otherDAreaValue, setOtherDAreaValue] = useState(""); // 다른동네 두번째 Select의 값
  const [otherApiRes, setOtherApiRes] = useState([]); //otherTown api 통신 값

  const standardBy = "by_time"; //데이터 받아오는 기준 (default : 시간)

  useEffect(() => {
    //우리동네 첫번째 Select가 초기화 될경우
    if (myArea === "") {
      //두번째 Select도 초기화
      console.log("초기화");
      setMyDetailArea([]);
      return;
    }

    if (myArea !== "") {
      console.log(myArea);
      DETAIL_AREAS.find((element) => {
        if (element.id == myArea) {
          setMyDetailArea(element.value); //두번째 Select를 위한 값 설정
        }
      });
      console.log(myDetailArea);
      return;
    }
  }, [myArea]);

  useEffect(() => {
    //다른 동네
    if (otherArea === "") {
      setOtherDetailArea([]);
      return;
    }

    if (otherArea !== "") {
      DETAIL_AREAS.find((element) => {
        if (element.id == otherArea) {
          setOtherDetailArea(element.value); //두번째 Select를 위한 값 설정
        }
      });
      return;
    }
  }, [otherArea]);

  useEffect(() => {
    //todo : 우리 동네와 다른 동네가 서로 안겹치도록 설정

    console.log("todo 확인");
  }, []);

  useEffect(() => {
    console.log(myApiRes, otherApiRes);
  }, [myApiRes, otherApiRes]);

  //우리동네 첫번째 셀렉트 변화 감지
  const changeMyFirstSelect = (e) => {
    setMyArea(e.target.value);
  };

  //우리동네 두번째 셀렉트 변화 감지
  const changeMySecondSelect = (e) => {
    setMyDAreaValue(e.target.value);
  };

  //다른동네 첫번째 셀렉트 변화 감지
  const changeOtherFirstSelect = (e) => {
    setOtherArea(e.target.value);
  };

  //다른동네 두번째 셀렉트 변화 감지
  const changeOtherSecondSelect = (e) => {
    setOtherDAreaValue(e.target.value);
  };

  //비교하기 버튼
  const onSubmitClick = () => {
    //첫번째 셀렉트가 입력이 안된경우
    if (myArea === "") {
      alert("우리동네 도/시를 선택해주세요!");
      return;
    }
    if (myDAreaValue === "") {
      alert("우리동네 군/구를 선택해주세요!");
      return;
    }
    if (otherArea === "") {
      alert("다른동네 도/시를 선택해주세요!");
      return;
    }
    if (otherDAreaValue === "") {
      alert("다른동네 군/구를 선택해주세요!");
      return;
    }
    myApiExecute();
    otherApiExecute();
  };

  //api
  const myApiExecute = async () => {
    try {
      //로딩 처리 (추후 시간을 재서 일정 시간보다 로딩이 빨리 끝날 경우 default 로딩 시간 지정 ) 굳이 필요는 없음
      //setIsLoading(true);
      switch (standardBy) {
        case "by_time":
          console.log("시간에 따라");
          await deliveryApi
            .get_Time_Average(myArea, myDAreaValue)
            .then((response) => {
              setMyApiRes(response.data);
              response.data.map((i, idx) =>
                console.log(i["time"], i["freqavg"])
              );
            });
          break;
        //=======추후 삭제 예정=======
        case "by_day":
          console.log("요일에 따라");
          if (myTownValue === "전체") {
            alert("세부지역을 다시 설정해주세요.");
            break;
          }
          await deliveryApi
            .get_Day_Average(myArea, myDAreaValue)
            .then((response) => {
              setMyApiRes(response.data);
              console.log(response.data);
            });
          break;
      }
      // await deliveryApi.get_Time_Average(area, dAreaValue).then((response) => {
      //   setApiRes(response.data);
      //   response.data.map((i, idx) => console.log(i["time"], i["freqavg"]));
      // });
    } catch (e) {
      console.log(e);
    }
    //로딩 완료
    //setIsLoading(false);
  };

  const otherApiExecute = async () => {
    try {
      //로딩 처리 (추후 시간을 재서 일정 시간보다 로딩이 빨리 끝날 경우 default 로딩 시간 지정 ) 굳이 필요는 없음
      //setIsLoading(true);
      switch (standardBy) {
        case "by_time":
          console.log("시간에 따라");
          await deliveryApi
            .get_Time_Average(otherArea, otherDAreaValue)
            .then((response) => {
              setOtherApiRes(response.data);
              response.data.map((i, idx) =>
                console.log(i["time"], i["freqavg"])
              );
            });
          break;
        case "by_day":
          console.log("요일에 따라");
          if (otherTownValue === "전체") {
            alert("세부지역을 다시 설정해주세요.");
            break;
          }
          await deliveryApi
            .get_Day_Average(otherArea, otherDAreaValue)
            .then((response) => {
              setOtherApiRes(response.data);
              console.log(response.data);
            });
          break;
      }
      // await deliveryApi.get_Time_Average(area, dAreaValue).then((response) => {
      //   setApiRes(response.data);
      //   response.data.map((i, idx) => console.log(i["time"], i["freqavg"]));
      // });
    } catch (e) {
      console.log(e);
    }
    //로딩 완료
    //setIsLoading(false);
  };

  return (
    <OthertownContainer>
      <MenuHeader />
      <OthertownBody>
        <OthertownMenu />
        <MainContents>
          <SelectContainer>
            <Select
              name="areaData"
              onChange={changeMyFirstSelect}
              value={myArea}
            >
              <Option value="">도/시 선택</Option>
              {AREAS.map((item) => {
                return (
                  <Option key={`key_${item}`} value={item}>
                    {item}
                  </Option>
                );
              })}
            </Select>
            <Select onChange={changeMySecondSelect} value={myDAreaValue}>
              <Option value="">군/구 선택</Option>
              {myDetailArea.length !== 0 &&
                myDetailArea.map((item) => {
                  return (
                    <Option key={`key_${item}`} value={item}>
                      {item}
                    </Option>
                  );
                })}
            </Select>

            <SelectMessage>배달 주문량</SelectMessage>
          </SelectContainer>

          <SelectContainer>
            <Select
              name="areaData"
              onChange={changeOtherFirstSelect}
              value={otherArea}
            >
              <Option value="">도/시 선택</Option>
              {AREAS.map((item) => {
                return (
                  <Option key={`key_${item}`} value={item}>
                    {item}
                  </Option>
                );
              })}
            </Select>
            <Select onChange={changeOtherSecondSelect} value={otherDAreaValue}>
              <Option value="">군/구 선택</Option>
              {otherDetailArea.length !== 0 &&
                otherDetailArea.map((item) => {
                  return (
                    <Option key={`key_${item}`} value={item}>
                      {item}
                    </Option>
                  );
                })}
            </Select>
            <SelectMessage>배달 주문량</SelectMessage>
          </SelectContainer>
          <SubmitBtn onClick={onSubmitClick}>비교하기</SubmitBtn>
          <ContentsArea>
            <GrapArea>
              {myApiRes.length !== 0 && (
                <MyResponsiveBar data={myApiRes} standardBy={standardBy} />
              )}
            </GrapArea>
            <GrapArea>
              {otherApiRes.length !== 0 && (
                <MyResponsiveBar data={otherApiRes} standardBy={standardBy} />
              )}
            </GrapArea>
          </ContentsArea>
        </MainContents>
      </OthertownBody>
    </OthertownContainer>
  );
};

export default Othertown;
