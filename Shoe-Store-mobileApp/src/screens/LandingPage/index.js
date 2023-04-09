// import { Button, Slider } from "@/components";
import ElementGenerator from "@/library/ElementGernerator";

// export const LandingPage = function () {
//   return ElementGenerator({
//     element: "div",
//     className: "bg-main h-full",
//     child: ElementGenerator({
//       element: "div",
//       className:
//         "flex flex-col bg-black text-white h-full bg-opacity-50 justify-end items-center px-5 pb-10 text-start ",
//       child: [
//         ElementGenerator({
//           element: "div",
//           className: "text-start w-full text-[38px] font-semibold",
//           child: "Welcome to 👋",
//         }),
//         ElementGenerator({
//           element: "div",
//           className: "text-start w-full text-[72px] font-bold",
//           child: "Shoea",
//         }),
//         ElementGenerator({
//           element: "div",
//           className: "text-start w-full text-[16px] font-semibold",
//           child:
//             "The best sneakers & shoes e-commerse app of the century for your fashion needs!",
//         }),
//       ],
//     }),
//   });
// };

export const LandingPage = function () {
  return ElementGenerator({
    element: "div",
    className: "relative h-full",
    id: "landing-page",
    // onclick: () => {
    //   // console.log("hi");
    //   // console.log(document.getElementById("container"));
    //   // console.log(document.getElementById("container").scrollBy);

    //   // window.scrollTop = 300;
    //   // document.getElementById("container").scrollBy(0, 300);
    // },
    child: [
      ElementGenerator({
        element: "img",
        src: "./src/assets/Landing/main.png",
        className: "h-screen w-full object-cover",
      }),
      ElementGenerator({
        element: "div",
        className:
          "flex flex-col bg-black text-white h-full w-full bg-opacity-40 justify-end items-center px-5 pb-10 text-start absolute top-0",
        child: [
          ElementGenerator({
            element: "div",
            className: "text-start w-full text-[38px] font-semibold",
            child: "Welcome to 👋",
          }),
          ElementGenerator({
            element: "div",
            className: "text-start w-full text-[72px] font-bold",
            child: "Shoea",
          }),
          ElementGenerator({
            element: "div",
            className: "text-start w-full text-[16px] font-semibold",
            child:
              "The best sneakers & shoes e-commerse app of the century for your fashion needs!",
          }),
        ],
      }),
      // Slider(),
    ],
  });
};

// Slider().append();
