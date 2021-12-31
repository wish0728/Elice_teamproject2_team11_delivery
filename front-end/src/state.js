import { atom } from "recoil";

//login atom
const loginState = atom({
  key: "login",
  default: false,
});

// menu atoms => 배열로 처리할수 있을지 개선해보기
const firstLocationState = atom({
  key: "first-location",
  default: false,
});

const secondLocationState = atom({
  key: "second-location",
  default: false,
});

const thridLocationState = atom({
  key: "thrid-location",
  default: false,
});

// loading atom
const loadingState = atom({
  key: "loading",
  default: false,
});

export {
  loginState,
  firstLocationState,
  secondLocationState,
  thridLocationState,
  loadingState,
};
