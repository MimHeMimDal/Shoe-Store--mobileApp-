import Cookies from "js-cookie";
import { Routes } from "@/routes";
import { Button, Modal } from "@/components";
import ElementGenerator from "./ElementGernerator";

export const Logout = function (e) {
  e.preventDefault();
  document.body.append(
    Modal({
      modalClass: "text-white",
      id: "logout",
      child: ElementGenerator({
        element: "div",
        className: "h-full flex flex-col items-center justify-between py-10",
        child: [
          ElementGenerator({
            element: "div",
            child: "Are you sure you want to logout?",
          }),
          ElementGenerator({
            element: "div",
            className: "flex gap-5 w-full justify-center",
            child: [
              Button({
                child: "Cancel",
                className:
                  "px-2 py-1 bg-red-500 rounded w-[100px] h-[30px] flex items-center justify-center",
                onclick: () => {
                  document.getElementById("logout").remove();
                },
              }),
              Button({
                child: "Yes",
                className:
                  "px-2 py-1 bg-green-500 rounded w-[100px] h-[30px] flex items-center justify-center",
                onclick: () => {
                  Cookies.remove("token");
                  history.pushState(null, null, "/");
                  Routes();
                  document.getElementById("logout").remove();
                },
              }),
            ],
          }),
        ],
      }),
    })
  );
};
