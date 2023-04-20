import ElementGenerator from "@/library/ElementGernerator";
import { Button } from "../Button";

export const Counter = function ({ price, totalPriceId, firstNumber = 1 }) {
  return ElementGenerator({
    element: "div",
    className: "flex gap-3 bg-[#ECECED] px-3 items-center py-1 rounded-full",
    child: [
      Button({
        child: "-",
        data: { name: "action", value: "count" },
        className: "font-bold ml-1",
        onclick: (e) => {
          if (e.target.nextElementSibling.textContent > 1) {
            e.target.nextElementSibling.textContent--;
            document.getElementById(totalPriceId).textContent = `$${(
              +price *
              +document.getElementById(`${totalPriceId}Number`).textContent
            ).toLocaleString()}`;
          }
        },
      }),
      ElementGenerator({
        element: "span",
        id: `${totalPriceId}Number`,
        child: firstNumber,
        className: "font-bold ml-1",
      }),
      Button({
        child: "+",
        data: { name: "action", value: "count" },
        className: "font-bold ml-1",
        onclick: (e) => {
          if (e.target.previousElementSibling.textContent > 0) {
            e.target.previousElementSibling.textContent++;
            document.getElementById(totalPriceId).textContent = `$${(
              +price *
              +document.getElementById(`${totalPriceId}Number`).textContent
            ).toLocaleString()}`;
          }
        },
      }),
    ],
  });
};
