import { GetData } from "./GetData";
import Cookies from "js-cookie";
import { Routes } from "@/routes";
import { Toast } from "@/components";

export const CheckLogin = function (e) {
  e.preventDefault();
  //   console.log(e.target.closest("form").elements);
  const { passwordLogin: password, userNameLogin: userName } =
    e.target.closest("form").elements;
  GetData(
    `http://localhost:3000/loginData?userName=${userName.value}&&password=${password.value}`
  ).then((data) => {
    console.log(data);
    if (data.length === 1) {
      document.body.append(Toast({ mode: "success" }));
      document.getElementById("closeBtn").addEventListener("click", () => {
        document.getElementById("toast-success").remove();
      });
      setTimeout(() => {
        document.getElementById("toast-success").remove();
      }, 1500);
      Cookies.set("token", "usermmd", { expires: 2 });
      history.pushState(null, null, "/weather");
      Routes();
    } else {
      document.body.append(Toast({ mode: "failed" }));
      document.getElementById("closeBtn").addEventListener("click", () => {
        document.getElementById("toast-danger").remove();
      });
      setTimeout(() => {
        document.getElementById("toast-danger").remove();
      }, 1500);
      // console.log(Toast());
      // console.log(document.getElementById("toast-danger"));
    }
  });
  e.target.closest("form").reset();
};

//   console.log(password.value);
//   console.log(userName.value);
//   fetch(`http://localhost:3000/loginData?userName=mmd&password=1234`)
//     .then((res) => res.json())
//     .then((data) => console.log(data));
//   fetch(
//     `http://localhost:3000/loginData?userName=${userName.value}&&password=${password.value}`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.length === 1) {
//         console.log("user found");
//         console.log(data);
//       } else {
//         throw new Error("User not found");
//       }
//     })
//     .catch((err) => console.error(err));
