import { svgIcons } from "@/data";
import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";

export const PageNotFound = function ({ msg, login, title }) {
  return ElementGenerator({
    element: "div",
    onclick: login
      ? () => {
          // history.pushState(null, null, "/login");
          // Routes();
          Routes().navigate("/login");
        }
      : () => {},
    className: `absolute left-1/2 top-1/2 -translate-y-1/2  -translate-x-1/2 text-center ${
      login ? "hover:text-[#144272]" : ""
    }`,
    child: [
      ElementGenerator({ element: "div", innerHTML: svgIcons.pageNotFound }),
      ElementGenerator({
        element: "h1",
        child: title,
        className: "font-bold text-[40px]",
      }),
      ElementGenerator({
        element: "div",
        child: msg,
        className: "text-[30px]",
      }),
    ],
  });
};
