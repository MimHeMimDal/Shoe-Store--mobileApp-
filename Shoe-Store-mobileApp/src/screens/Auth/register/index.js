import { Button, Form, TextField } from "@/components";
import { CheckRegister } from "@/library/CheckRegister";
import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";

export const RegisterPage = function () {
  return ElementGenerator({
    element: "div",
    className:
      "absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#2C74B3] w-2/3 max-w-xs border rounded-xl px-5 py-5",
    onsubmit: CheckRegister,
    child: [
      Form({
        id: "register-form",
        className: "flex flex-col items-center justify-between gap-2 pb-5",
        child: [
          ElementGenerator({
            element: "div",
            className: "h-20 w-20",
            child: ElementGenerator({
              element: "img",
              src: "./src/assets/logo/Circle-icons-weather.svg.png",
            }),
          }),
          TextField({
            parentClass: "w-full",
            labelChild: "Username",
            id: "userNameRegister",
            type: "text",
          }),
          TextField({
            parentClass: "w-full",
            labelChild: "Password",
            id: "passwordRegister",
            type: "password",
          }),
          TextField({
            parentClass: "w-full",
            labelChild: "Reapat Password",
            id: "rePasswordRegister",
            type: "password",
          }),
          Button({
            type: "submit",
            child: "Register",
            className: "w-full",
            variant: "normal",
          }),
        ],
      }),
      ElementGenerator({
        element: "div",
        className: "flex flex-col sm:flex-row gap-2",
        child: [
          ElementGenerator({ element: "span", child: "You have an account?" }),
          ElementGenerator({
            element: "span",
            child: "Sign in",
            className: "text-white hover:text-[#000] cursor-pointer",
            onclick: () => {
              history.pushState(null, null, "/login");
              Routes();
            },
          }),
        ],
      }),
    ],
  });
};
