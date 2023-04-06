import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";

export const PageNotFound = function ({ msg, login }) {
  return ElementGenerator({
    element: "div",
    onclick: login
      ? () => {
          history.pushState(null, null, "/login");
          Routes();
        }
      : () => {},
    className: `absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-[80px] text-center text-white ${
      login ? "hover:text-[#144272]" : ""
    }`,
    child: msg,
  });
};
