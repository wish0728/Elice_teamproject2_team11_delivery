import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Modal from "./Components/Modal.jsx";
import AuthSetting from "./Pages/AuthSetting";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Modal />} />
      <Route exact path="usersetting" element={<AuthSetting />} />
      {/* 경로 임시 설정 추후 변경 */}
    </Routes>
  );
}

export default App;
