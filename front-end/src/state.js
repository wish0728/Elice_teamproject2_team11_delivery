import { atom } from "recoil";

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

// menu atoms    to do : 객체로 개선
const menuState = atom({
  key: "menu-location",
  default: [false, false, false],
});

// loading atom
const loadingState = atom({
  key: "loading",
  default: false,
});

export { modalState, loginState, menuState, loadingState };
