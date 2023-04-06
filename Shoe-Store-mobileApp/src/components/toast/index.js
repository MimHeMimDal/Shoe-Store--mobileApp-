import { toastMode } from "@/data";
import ElementGenerator from "@/library/ElementGernerator";

export const Toast = function ({ mode }) {
  const tost = ElementGenerator({
    element: "div",
    className: "absolute top-5 z-10 left-1/2 -translate-x-1/2",
  });
  tost.innerHTML = toastMode[mode];
  //   console.log(document.getElementById("closeBtn"));
  return tost;
};
