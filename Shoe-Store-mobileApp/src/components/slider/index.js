import ElementGenerator from "@/library/ElementGernerator";
import { Button } from "../Button";
import { Routes } from "@/routes";

let isDragStarts = false;
let isDragging = false;
let lastPageX;
let lastScrollLeft;
let positionDiff;
let lastPositionDiff;
console.log(lastPositionDiff);
function dragStart(e) {
  isDragStarts = true;
  // console.log(e.pageX || e.touches[0].pageX);
  lastPageX = e.pageX || e.touches[0].pageX;
  lastScrollLeft = document.getElementById("slider").scrollLeft;
  document.getElementById("slider").classList.remove("scroll-smooth");
}

function autoSlide() {
  if (
    document.getElementById("slider").scrollLeft ===
    document.getElementById("slider").scrollWidth -
      document.getElementById("slider").clientWidth
  )
    return;

  positionDiff = Math.abs(positionDiff);
  const valDiffrence = window.screen.availWidth - positionDiff;
  // console.log(valDiffrence);

  if (document.getElementById("slider").scrollLeft > lastScrollLeft) {
    return (document.getElementById("slider").scrollLeft +=
      positionDiff > window.screen.availWidth / 3
        ? valDiffrence
        : -positionDiff);
  } else {
    return (document.getElementById("slider").scrollLeft -=
      positionDiff > window.screen.availWidth / 3
        ? valDiffrence
        : -positionDiff);
  }
}

function dragEnd(e) {
  isDragStarts = false;
  document.getElementById("slider").classList.add("scroll-smooth");
  if (!isDragging) return;
  isDragging = false;
  autoSlide();
}

function drag(e) {
  if (!isDragStarts) return;
  e.preventDefault();
  isDragging = true;
  positionDiff = (e.pageX || e.touches[0].pageX) - lastPageX;
  document.getElementById("slider").scrollLeft = lastScrollLeft - positionDiff;
}
function nextPage(e) {
  e.preventDefault();
  document.getElementById("slider").scrollLeft += window.screen.availWidth;
}

export const Slider = function () {
  return ElementGenerator({
    element: "div",
    id: "slider",
    className: "flex h-screen overflow-hidden scroll-smooth",
    onclick: (e) => {
      if (e.target.dataset.action === "next") {
        nextPage(e);
      }
    },
    onmousemove: drag,
    ontouchmove: drag,
    onmousedown: dragStart,
    onmouseup: dragEnd,
    ontouchstart: dragStart,
    ontouchend: dragEnd,
    child: [
      ElementGenerator({
        element: "div",

        className: "",
        child: [
          ElementGenerator({
            element: "div",
            className: "w-screen h-2/3",
            child: ElementGenerator({
              element: "img",
              src: "./src/assets/Landing/wall-1.png",
              className: "w-full h-full object-cover",
            }),
          }),
          ElementGenerator({
            element: "div",
            className:
              "bg-white h-1/3 py-5 px-7 flex flex-col items-center justify-between",
            child: [
              ElementGenerator({
                element: "div",
                className:
                  "text-[22px] font-semibold text-center leading-6 grow-[5]",
                child: "We provide high quality products just for you",
              }),
              ElementGenerator({
                element: "div",
                className: "grow-[1]",
                child: "slide",
              }),
              Button({
                child: "Next",
                dataSet: { action: "next" },
                className: "bg-[#212529] w-full rounded-3xl py-1 text-white",
              }),
            ],
          }),
        ],
      }),
      ElementGenerator({
        element: "div",
        className: "",
        child: [
          ElementGenerator({
            element: "div",
            className: "w-screen h-2/3",
            child: ElementGenerator({
              element: "img",
              src: "./src/assets/Landing/wall-2.png",
              className: "w-full h-full object-cover",
            }),
          }),
          ElementGenerator({
            element: "div",
            className:
              "bg-white h-1/3 py-5 px-7 flex flex-col items-center justify-between",
            child: [
              ElementGenerator({
                element: "div",
                className:
                  "text-[22px] font-semibold text-center leading-6 grow-[5]",
                child: "Your satisfaction is our number one periority",
              }),
              ElementGenerator({
                element: "div",
                className: "grow-[1]",
                child: "slide",
              }),
              Button({
                child: "Next",
                dataSet: { action: "next" },
                className: "bg-[#212529] w-full rounded-3xl py-1 text-white",
              }),
            ],
          }),
        ],
      }),
      ElementGenerator({
        element: "div",
        className: "",
        child: [
          ElementGenerator({
            element: "div",
            className: "w-screen h-2/3",
            child: ElementGenerator({
              element: "img",
              src: "./src/assets/Landing/wall-3.png",
              className: "w-full h-full object-cover",
            }),
          }),
          ElementGenerator({
            element: "div",
            className:
              "bg-white h-1/3 py-5 px-7 flex flex-col items-center justify-between",
            child: [
              ElementGenerator({
                element: "div",
                className:
                  "text-[22px] font-semibold text-center leading-6 grow-[5]",
                child: "Let’s fulfill your fashion needs with shoearight now!",
              }),
              ElementGenerator({
                element: "div",
                className: "grow-[1]",
                child: "slide",
              }),
              Button({
                child: "Get Started",
                dataSet: { action: "start" },
                className: "bg-[#212529] w-full rounded-3xl py-1 text-white",
                onclick: () => {
                  history.pushState(null, null, "/login");
                  Routes();
                },
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
