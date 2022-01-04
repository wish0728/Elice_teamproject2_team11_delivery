import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import AuthSetting from "./Pages/AuthSetting";
import Mytown from "./Pages/Mytown";
import Othertown from "./Pages/Othertown";
import Register from "./Pages/Register";
import Test from "./Pages/Test";
import LoginModal from "./Components/LoginModal";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="usersetting" element={<AuthSetting />} />
      <Route exact path="/mytown" element={<Mytown />} />
      <Route exact path="/othertown" element={<Othertown />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/map" element={<Test />} />
      {/* 경로 임시 설정 추후 변경 */}
    </Routes>
  );
}

export default App;
