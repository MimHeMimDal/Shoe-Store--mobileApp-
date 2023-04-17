import { Card, Slider } from "@/components";
import { svgIcons } from "@/data";
import { axiosInstance } from "@/functions/axiosinstance";
import ElementGenerator from "@/library/ElementGernerator";
import { LoginPage } from "@/screens/Auth";
import { Cart } from "@/screens/Cart";
// import { LandingPage } from "@/screens/LandingPage";
import { Main } from "@/screens/Main";
import { PageNotFound } from "@/screens/PageNotFound";
import { Product } from "@/screens/Product";
import Navigo from "navigo";
// import Cookies from "js-cookie";
const rout = new Navigo("/");

export const Routes = function () {
  const app = document.getElementById("container");
  app.innerHTML = "";
  rout
    .on("/", function () {
      app.append(Slider());
      // if (Cookies.get("cookie")) {
      //   console.log("yes cookie");
      // } else {
      //   app.innerHTML = "";
      // }
    })
    .on("/login", function () {
      app.innerHTML = "";
      app.append(LoginPage());
    })
    .on("/home", function () {
      app.innerHTML = "";
      app.append(Main());
    })
    .on("/products/:name", function (params) {
      axiosInstance.get(`/products?brand=${params.data.name}`).then((res) => {
        app.innerHTML = "";
        const cardContainer = ElementGenerator({
          element: "div",
          id: "cardsContainer",
          className: "grid grid-cols-2 gap-4 pt-5",
        });
        const container = ElementGenerator({
          element: "div",
          className: "px-5 py-3",
          child: [
            ElementGenerator({
              element: "div",
              className: "flex items-center gap-3",
              child: [
                ElementGenerator({
                  element: "div",
                  className: "",
                  innerHTML: svgIcons.leftArrow,
                  onclick: (e) => {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    rout.navigate("/home");
                  },
                }),
                ElementGenerator({
                  element: "div",
                  className: "font-bold",
                  child: params.data.name,
                }),
              ],
            }),
            cardContainer,
          ],
        });
        res.data.forEach((item) => cardContainer.append(Card(item)));
        app.append(container);
      });
    })
    .on("/products/:name/:id", function (params) {
      app.innerHTML = "";
      app.append(Product(params.data.id));
    })
    .on("/my-cart", function () {
      app.innerHTML = "";
      app.append(Cart());
    })
    .notFound(function () {
      app.innerHTML = "";
      app.append(PageNotFound({ msg: "Requested Page Not Found" }));
    });
  rout.resolve();
  return rout;
};

// export const Routes = function () {
//   const app = document.getElementById("container");
//   app.innerHTML = "";
//   // const obj = {};

//   switch (location.pathname) {
//     case "/":
//       app.append(IsLoading());
//       setTimeout(() => {
//         app.innerHTML = "";
//         app.append(LandingPage());
//         // document.getElementById("landing-page").style.position = "absolute";
//         // document.getElementById("landing-page").scrollTop = 200;
//         setTimeout(() => {
//           app.append(Slider());
//           // if (navigator.userAgentData.mobile) {
//           //   document.getElementById("container").scrollTop =
//           //     window.screen.height;
//           // } else {
//           //   document.getElementById("container").scrollTop =
//           //     window.screen.height;
//           // }
//           // document.getElementById("landing-page").style.display = "none";
//           document.getElementById("container").scrollTop = window.screen.height;
//         }, 2000);
//       }, 700);

//       // if (Cookies.get("cookie")) {
//       //   console.log("yes cookie");
//       // } else {
//       //   app.innerHTML = "";
//       // }
//       break;

//     case "/login":
//       app.append(LoginPage());
//       break;
//     case "/register":
//       break;

//     case "/home":
//       app.append(Main());
//       break;

//     default:
//       app.append(PageNotFound({ msg: "Requested Page Not Found" }));
//       break;
//   }
// };
