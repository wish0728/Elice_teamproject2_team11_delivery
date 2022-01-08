import React, { useEffect, useState } from "react";
import styled from "styled-components";
import deliveryApi from "../apis/delivery";
import { Container, Option, Select } from "../Components/common";
import Menu from "../Components/Menu";
import MenuHeader from "../Components/MenuHeader";
import MyResponsiveBar from "../Components/MyResponsiveBar";
import MyCombinedBar from "../Components/MyCombinedBar";
import MyCombinedLine from "../Components/MyCombinedLine";
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

const SubmitBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-top: 20px;
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

  const [standardBy, setStandardBy] = useState("by_time"); //데이터 받아오는 기준 (default : 시간)
  const [year, setYear] = useState(2019);

  const [graphOption, setGraphOption] = useState(); // 그래프 선택 기준 (바 형태, 꺾은선 형태)
  const [twoApiRes, setTwoApiRes] = useState([]);

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
          let tmpArr = element.value.filter((item) => item != otherDAreaValue);
          setMyDetailArea(tmpArr);
        }
      });
      console.log(myDetailArea);
      return;
    }
  }, [myArea, myDAreaValue]);

  useEffect(() => {
    //다른 동네
    if (otherArea === "") {
      setOtherDetailArea([]);
      return;
    }

    if (otherArea !== "") {
      DETAIL_AREAS.find((element) => {
        if (element.id == otherArea) {
          let tmpOArr = element.value.filter((item) => item != myDAreaValue);
          setOtherDetailArea(tmpOArr); //두번째 Select를 위한 값 설정
        }
      });
      return;
    }
  }, [otherArea, otherDAreaValue]);

  useEffect(() => {
    //todo : 우리 동네와 다른 동네가 서로 안겹치도록 설정

    console.log("todo 확인");
  }, []);
  useEffect(() => {
    //todo : 우리 동네와 다른 동네가 서로 안겹치도록 설정

    console.log(graphOption);
  }, [graphOption]);

  // api 두 개 합치는 함수
  useEffect(() => {
    console.log(myApiRes, otherApiRes);
    if (myApiRes.length !== 0 && otherApiRes.length !== 0) {
      switch (standardBy) {
        case "by_time":
          let x = [];
          for (let i = 0; i < myApiRes.length; i++) {
            x.push({
              time: i,
              freqavg1: myApiRes[i].freqavg,
              freqavg2: otherApiRes[i].freqavg,
            });
          }
          console.log("newData");
          console.log(x);
          setTwoApiRes(x);
          break;
        case "by_day":
          let y = [];
          for (let i = 0; i < myApiRes.length; i++) {
            y.push({
              day: myApiRes[i].day,
              freqavg1: myApiRes[i].freqavg,
              freqavg2: otherApiRes[i].freqavg,
            });
          }
          console.log("newData");
          console.log(y);
          setTwoApiRes(y);
          break;
        default:
          break;
      }
    }
  }, [myApiRes, otherApiRes, standardBy]);

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

  //기준 Select 변화 감지
  const changeStandardBySelect = (e) => {
    setStandardBy(e.target.value);
  };

  //연도 설정
  const changeYear = (e) => {
    console.log(typeof parseInt(e.target.value));
    console.log(parseInt(e.target.value));
    setYear(parseInt(e.target.value));
  };

  // 그래프 옵션
  const changeGraphOption = (e) => {
    setGraphOption(e.target.value);
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
      switch (standardBy) {
        case "by_time":
          console.log("시간에 따라");
          await deliveryApi
            .get_Time_Average(myArea, myDAreaValue)
            .then((response) => {
              setMyApiRes(response.data);
              console.log(response.data);
              response.data.map((i, idx) =>
                console.log(i["time"], i["freqavg"])
              );
            });
          break;
        case "by_day":
          console.log("요일에 따라");
          await deliveryApi
            .get_Day_Average(myArea, myDAreaValue)
            .then((response) => {
              setMyApiRes(response.data);
              console.log(response.data);
              response.data.map((i, idx) =>
                console.log(i["day"], i["freqavg"])
              );
            });
          break;
        case "by_holiday":
          console.log("공휴일에 따라");
          await deliveryApi
            .get_Holiday_Average(myArea, myDAreaValue)
            .then((response) => {
              let res = response.data.filter((it) => it.year == year);
              console.log(res);
              setMyApiRes(res);
              res.map((i, idx) => console.log(i["year"], typeof i["year"]));
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
              console.log(response.data);
              response.data.map((i, idx) =>
                console.log(i["time"], i["freqavg"])
              );
            });
          break;
        case "by_day":
          console.log("요일에 따라");
          await deliveryApi
            .get_Day_Average(otherArea, otherDAreaValue)
            .then((response) => {
              setOtherApiRes(response.data);
              console.log(response.data);
              response.data.map((i, idx) =>
                console.log(i["day"], i["freqavg"])
              );
            });
          break;
        case "by_holiday":
          console.log("공휴일에 따라");
          await deliveryApi
            .get_Holiday_Average(otherArea, otherDAreaValue)
            .then((response) => {
              let res = response.data.filter((it) => it.year == year);
              console.log(res);
              setOtherApiRes(res);
              res.map((i, idx) => console.log(i["year"], typeof i["year"]));
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
          <SubmitBtnContainer>
            <Select onChange={changeStandardBySelect} value={standardBy}>
              <Option value="by_time">시간에 따라</Option>
              <Option value="by_day">요일에 따라</Option>
              <Option value="">공휴일에 따라</Option>
              {/* <Option value="by_corona">코로나에 따라</Option> */}
            </Select>
            {standardBy === "by_holiday" && (
              <Select onChange={changeYear} value={year}>
                <Option value="2019">2019</Option>
                <Option value="2020">2020</Option>
                <Option value="2021">2021</Option>
              </Select>
            )}
            <Select onChange={changeGraphOption} value={graphOption}>
              <Option value="by_bar">막대그래프</Option>
              <Option value="by_line">꺾은선</Option>
            </Select>
            <SubmitBtn onClick={onSubmitClick}>비교하기</SubmitBtn>
          </SubmitBtnContainer>

          <ContentsArea>
            {graphOption === "by_bar" &&
              twoApiRes.length !== 0 &&
              standardBy !== "by_holiday" && (
                <MyCombinedBar data={twoApiRes} standardBy={standardBy} />
              )}
            {graphOption === "by_line" &&
              twoApiRes.length !== 0 &&
              standardBy !== "by_holiday" && (
                <MyCombinedLine data={twoApiRes} standardBy={standardBy} />
              )}

            {/* <GrapArea>
              {myApiRes.length !== 0 && (
                <MyResponsiveBar data={myApiRes} standardBy={standardBy} />
              )}
            </GrapArea>
            <GrapArea>
              {otherApiRes.length !== 0 && (
                <MyResponsiveBar data={otherApiRes} standardBy={standardBy} />
              )}
            </GrapArea> */}
          </ContentsArea>
        </MainContents>
      </OthertownBody>
    </OthertownContainer>
  );
};

export default Othertown;
