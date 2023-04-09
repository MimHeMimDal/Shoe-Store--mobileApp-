import { IsLoading, Slider } from "@/components";
import { LoginPage } from "@/screens/Auth";
import { LandingPage } from "@/screens/LandingPage";
import { PageNotFound } from "@/screens/PageNotFound";
// import axios from "axios";
// import Cookies from "js-cookie";

export const Routes = function () {
  const app = document.getElementById("container");
  app.innerHTML = "";

  switch (location.pathname) {
    case "/":
      app.append(IsLoading());
      setTimeout(() => {
        app.innerHTML = "";
        app.append(LandingPage());
        // document.getElementById("landing-page").style.position = "absolute";
        // document.getElementById("landing-page").scrollTop = 200;
        setTimeout(() => {
          app.append(Slider());
          // if (navigator.userAgentData.mobile) {
          //   document.getElementById("container").scrollTop =
          //     window.screen.height;
          // } else {
          //   document.getElementById("container").scrollTop =
          //     window.screen.height;
          // }
          // document.getElementById("landing-page").style.display = "none";
          document.getElementById("container").scrollTop = window.screen.height;
        }, 2000);
      }, 700);

      // if (Cookies.get("cookie")) {
      //   console.log("yes cookie");
      // } else {
      //   app.innerHTML = "";
      // }
      break;

    case "/login":
      app.append(LoginPage());
      break;
    case "/register":
      break;

    case "/weather":
      break;

    default:
      app.append(PageNotFound({ msg: "Requested Page Not Found" }));
      break;
  }
};
