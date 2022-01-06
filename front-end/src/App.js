import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import AuthSetting from "./Pages/AuthSetting";
import Mytown from "./Pages/Mytown";
import Othertown from "./Pages/Othertown";
import Register from "./Pages/Register";
import Test from "./Pages/Test";
import { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { themeState } from "./state";

function App() {
  //localStorage 작업 해야함

  const themeValue = useRecoilValue(themeState); //테마 값

  return (
    <ThemeProvider theme={themeValue}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="usersetting" element={<AuthSetting />} />
        <Route exact path="/mytown" element={<Mytown />} />
        <Route exact path="/othertown" element={<Othertown />} />
        <Route exact path="/register" element={<Register />} />
        {/* 경로 임시 설정 추후 변경 */}
        <Route exact path="/test" element={<Test />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
