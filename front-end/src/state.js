import { atom } from "recoil";

const loginState = atom({
  key: "login",
  default: false,
});

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

export {
  loginState,
  firstLocationState,
  secondLocationState,
  thridLocationState,
};
