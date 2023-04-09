import { Button, Form } from "@/components";
import { svgIcons } from "@/data";
// import { CheckLogin } from "@/library/CheckLogin";
import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";

// onclick: () => {
//   console.log("hi");
//   if (document.getElementById("passwordLogin").type === "password") {
//     document.getElementById("passwordLogin").type = "text";
//   } else {
//     document.getElementById("passwordLogin").type = "password";
//   }
// },

export const LoginPage = function () {
  return ElementGenerator({
    element: "div",
    className:
      "h-full flex flex-col items-center justify-between [&_>_*]:w-full px-4 py-3",
    // onsubmit: CheckLogin,
    child: [
      ElementGenerator({
        element: "div",
        className: "",
        onclick: () => {
          history.pushState(null, null, "/");
          Routes();
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
        className: "flex flex-col items-center justify-between grow",
        child: [
          ElementGenerator({
            element: "h1",
            className: "font-semibold text-[26px] mb-7",
            child: "Login to Your Account",
          }),
          ElementGenerator({
            element: "div",
            className:
              "flex items-center justify-between w-full h-10 border-2 border-gray-300 rounded px-2 opacity-60",
            child: [
              ElementGenerator({
                element: "label",
                for: "userNameLogin",
                className: "flex items-center justify-center h-full",
                innerHTML: svgIcons.mail,
              }),
              ElementGenerator({
                element: "input",
                type: "text",
                onkeyup: (e) => {
                  if (
                    document.getElementById("passwordLogin").value.trim() !==
                      "" &&
                    document.getElementById("userNameLogin").value.trim() !== ""
                  ) {
                    document
                      .getElementById("submit")
                      .classList.remove("opacity-60");
                    document.getElementById("submit").disabled = false;
                  } else {
                    document
                      .getElementById("submit")
                      .classList.add("opacity-60");
                    document.getElementById("submit").disabled = true;
                  }
                },
                onfocus: (e) => {
                  e.target.closest("div").classList.remove("border-gray-300");
                  e.target.closest("div").classList.add("border-black");
                  e.target.closest("div").classList.remove("opacity-60");
                },
                onblur: (e) => {
                  e.target.closest("div").classList.remove("border-black");
                  e.target.closest("div").classList.add("border-gray-300");
                  if (e.target.value.trim() === "")
                    e.target.closest("div").classList.add("opacity-60");
                },
                className:
                  "h-full px-1 font-medium border-none grow outline-none focus:border-none active:border-none active:outline-none focus:outline-none",
                id: "userNameLogin",
                placeholder: "Email",
              }),
            ],
          }),
          ElementGenerator({
            element: "p",
            for: "userNameHelper",
            className: "h-6 w-full text-sm px-2",
            child: "hello",
          }),
          ElementGenerator({
            element: "div",
            className:
              "flex items-center justify-between w-full h-10 border-2 border-gray-300 rounded px-2 opacity-60",
            child: [
              ElementGenerator({
                element: "span",
                className: "flex items-center justify-center",
                innerHTML: svgIcons.lock,
              }),
              ElementGenerator({
                element: "input",
                onkeyup: (e) => {
                  if (
                    document.getElementById("passwordLogin").value.trim() !==
                      "" &&
                    document.getElementById("userNameLogin").value.trim() !== ""
                  ) {
                    document
                      .getElementById("submit")
                      .classList.remove("opacity-60");
                    document.getElementById("submit").disabled = false;
                  } else {
                    document.getElementById("submit").disabled = true;
                    document
                      .getElementById("submit")
                      .classList.add("opacity-60");
                  }
                },
                onfocus: (e) => {
                  e.target.closest("div").classList.remove("border-gray-300");
                  e.target.closest("div").classList.add("border-black");
                  e.target.closest("div").classList.remove("opacity-60");
                },
                onblur: (e) => {
                  e.target.closest("div").classList.remove("border-black");
                  e.target.closest("div").classList.add("border-gray-300");
                  if (e.target.value.trim() === "")
                    e.target.closest("div").classList.add("opacity-60");
                },
                className:
                  "h-full px-1 font-medium border-none grow outline-none focus:border-none active:border-none active:outline-none focus:outline-none",
                id: "passwordLogin",
                type: "password",
                placeholder: "Password",
              }),
              ElementGenerator({
                element: "div",
                className: "relative",
                onclick: (e) => {
                  console.log("hi");
                  if (
                    document.getElementById("passwordLogin").type === "password"
                  ) {
                    document.getElementById("passwordLogin").type = "text";
                    document.getElementById("eye").classList.add("h-[0%]");
                    document.getElementById("eye").classList.remove("h-[100%]");
                  } else {
                    document.getElementById("passwordLogin").type = "password";
                    document.getElementById("eye").classList.remove("h-[0%]");
                    document.getElementById("eye").classList.add("h-[100%]");
                  }
                },
                child: [
                  ElementGenerator({
                    element: "div",
                    id: "eye",
                    className:
                      "absolute duration-300 bottom-1/2 translate-y-[17%] -translate-x-[27%] border-black border-r-2 h-[100%] w-full rotate-45",
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
            for: "userNameHelper",
            className: "h-6 w-full text-sm px-2",
            child: "hello",
          }),
          ElementGenerator({
            element: "label",
            for: "remeber",
            className: "flex gap-2 items-center justify-center",
            child: [
              ElementGenerator({
                element: "input",
                id: "remeber",
                // <div class="text-inherit">
                className:
                  "flex items-center justify-center rounded accent-[#212529]",
                type: "checkbox",
              }),
              ElementGenerator({
                element: "p",
                className:
                  "flex gap-2 items-center justify-center font-semibold",
                child: "Remeber me",
              }),
            ],
          }),
          Button({
            type: "submit",
            id: "submit",
            disabled: true,
            child: "Sing in",
            className:
              "w-full h-10 mt-auto mb-5 rounded-3xl bg-[#212529] opacity-60",
            variant: "normal",
          }),
        ],
      }),
    ],
  });
};
