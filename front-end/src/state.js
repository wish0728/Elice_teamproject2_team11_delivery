import { atom } from "recoil";

//theme atom
const themeState = atom({
  key: "theme",
  default: { name: "light", titleColor: "#000000", bgColor: "#e9ecef" },
});

//login modal atom
const modalState = atom({
  key: "modal",
  default: false,
});

//login atom
const loginState = atom({
  key: "login",
  default: { isLoggedIn: false, name: "" },
});

// menu atoms  to do : 객체로 개선 spread 연산자 || useSelector
const menuState = atom({
  key: "menu-location",
  default: { first: false, second: false, third: false },
});

// loading atom
const loadingState = atom({
  key: "loading",
  default: false,
});

export { themeState, modalState, loginState, menuState, loadingState };
