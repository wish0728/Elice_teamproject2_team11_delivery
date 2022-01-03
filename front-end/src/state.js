import { atom } from "recoil";

//login atom
const loginState = atom({
  key: "login",
  default: false,
});

// menu atoms => 배열로 처리할수 있을지 개선해보기
const menuState = atom({
  key: "menu-location",
  default: [false, false, false],
});

// loading atom
const loadingState = atom({
  key: "loading",
  default: false,
});

export { loginState, menuState, loadingState };
