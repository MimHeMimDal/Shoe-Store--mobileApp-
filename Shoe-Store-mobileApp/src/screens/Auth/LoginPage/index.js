import { Button, Form } from "@/components";
import { svgIcons } from "@/data";
import { CheckLogin } from "@/library/CheckLogin";
import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";

const stillButton = (e) => {
  if (
    document.getElementById("passwordLogin").value.trim() !== "" &&
    document.getElementById("userNameLogin").value.trim() !== ""
  ) {
    document.getElementById("submit").classList.remove("opacity-[65%]");
  } else {
    document.getElementById("submit").classList.add("opacity-[65%]");
  }
};

const inputFocus = (e) => {
  e.target.closest("div").classList.add("border-2");
  e.target.closest("div").classList.add("border-black");
};

const inputBlur = (e) => {
  e.target.closest("div").classList.remove("border-2");
  e.target.closest("div").classList.remove("border-black");
};

const showPassword = (e) => {
  if (document.getElementById("passwordLogin").type === "password") {
    document.getElementById("passwordLogin").type = "text";
    document.getElementById("eye").classList.add("h-[0%]");
    document.getElementById("eye").classList.remove("h-[100%]");
  } else {
    document.getElementById("passwordLogin").type = "password";
    document.getElementById("eye").classList.remove("h-[0%]");
    document.getElementById("eye").classList.add("h-[100%]");
  }
};

export const LoginPage = function () {
  return ElementGenerator({
    element: "div",
    className:
      "h-screen flex flex-col items-center justify-between [&_>_*]:w-full px-4 py-3",
    child: [
      ElementGenerator({
        element: "div",
        className: "",
        onclick: () => {
          // history.pushState(null, null, "/");
          // Routes();
          Routes().navigate("/");
        },
        child: ElementGenerator({
          element: "span",
          className: "font-thin",
          innerHTML: svgIcons.leftArrow,
        }),
      }),
      ElementGenerator({
        element: "div",
        className: "flex items-center justify-center my-16",
        child: ElementGenerator({
          element: "img",
          src: "./src/assets/Logo/logo.png",
          className: "w-10",
        }),
      }),
      Form({
        id: "login-form",
        onsubmit: CheckLogin,
        className: "flex flex-col items-center justify-between grow",
        child: [
          ElementGenerator({
            element: "h1",
            className:
              "font-semibold text-[24px] xs:text-[32px] text-[#152536] mb-7",
            child: "Login to Your Account",
          }),
          ElementGenerator({
            element: "div",
            className:
              "flex items-center justify-between w-full h-10 bg-gray-600 bg-opacity-[1%] rounded px-2",
            child: [
              ElementGenerator({
                element: "label",
                for: "userNameLogin",
                id: "userNameLoginLabel",
                className:
                  "flex items-center justify-center h-full fill-slate-500",
                innerHTML: svgIcons.mailGray,
              }),
              ElementGenerator({
                element: "input",
                type: "text",
                className:
                  "h-full px-1 font-medium border-none grow placeholder:text-[#6C757D] placeholder:text-[14px] placeholder:font-regular bg-transparent outline-none focus:border-none active:border-none active:outline-none focus:outline-none",
                id: "userNameLogin",
                placeholder: "Email",
                onkeyup: stillButton,
                onfocus: (e) => {
                  inputFocus(e);
                  document.getElementById("userNameLoginLabel").innerHTML =
                    svgIcons.mailBlack;
                },
                onblur: (e) => {
                  inputBlur(e);
                  if (e.target.value.trim() === "")
                    document.getElementById("userNameLoginLabel").innerHTML =
                      svgIcons.mailGray;
                },
              }),
            ],
          }),
          ElementGenerator({
            element: "p",
            id: "userNameLoginHelper",
            className: "h-6 w-full text-sm px-2",
          }),
          ElementGenerator({
            element: "div",
            className:
              "flex items-center justify-between w-full h-10 bg-gray-600 bg-opacity-[1%] rounded px-2",
            child: [
              ElementGenerator({
                element: "label",
                for: "passwordLogin",
                id: "passwordLoginLabel",
                className: "flex items-center justify-center",
                innerHTML: svgIcons.lockGray,
              }),
              ElementGenerator({
                element: "input",
                id: "passwordLogin",
                type: "password",
                placeholder: "Password",
                className:
                  "h-full px-1 font-medium border-none grow placeholder:text-[#6C757D] placeholder:text-[14px] placeholder:font-regular bg-transparent outline-none focus:border-none active:border-none active:outline-none focus:outline-none",
                onkeyup: stillButton,
                onfocus: (e) => {
                  inputFocus(e);
                  document.getElementById("passwordLoginLabel").innerHTML =
                    svgIcons.lockBlack;
                },
                onblur: (e) => {
                  inputBlur(e);
                  if (e.target.value.trim() === "")
                    document.getElementById("passwordLoginLabel").innerHTML =
                      svgIcons.lockGray;
                },
              }),
              ElementGenerator({
                element: "div",
                className: "relative",
                onclick: showPassword,
                child: [
                  ElementGenerator({
                    element: "div",
                    id: "eye",
                    className:
                      "absolute duration-300 bottom-1/2 translate-y-[80%] -translate-x-[30%] border-[#6C757D] border-r-2 h-[100%] w-full -rotate-45",
                  }),
                  ElementGenerator({
                    element: "span",
                    className: "flex items-center justify-center h-full w-full",
                    innerHTML: svgIcons.openEye,
                  }),
                ],
              }),
            ],
          }),
          ElementGenerator({
            element: "p",
            id: "passwordLoginHelper",
            className: "h-6 w-full text-sm px-2",
          }),
          ElementGenerator({
            element: "label",
            for: "remeber",
            className: "flex gap-2 items-center justify-center",
            child: [
              ElementGenerator({
                element: "input",
                id: "remeber",
                className:
                  "flex items-center justify-center rounded accent-[#212529]",
                type: "checkbox",
              }),
              ElementGenerator({
                element: "p",
                className:
                  "flex gap-2 items-center justify-center tracking-tighter font-semibold text-[15px] leading-3",
                child: "Remeber me",
              }),
            ],
          }),
          Button({
            type: "submit",
            id: "submit",
            child: "Sing in",
            className:
              "w-full h-10 mt-auto mb-5 rounded-3xl bg-[#212529] opacity-[65%]",
            variant: "normal",
          }),
        ],
      }),
    ],
  });
};
