// import { GetData } from "./GetData";
// import Cookies from "js-cookie";
// import { Routes } from "@/routes";
// import { Toast } from "@/components";

import { Routes } from "@/routes";
import Cookies from "js-cookie";

// import axios from "axios";

export const CheckLogin = function (e) {
  e.preventDefault();
  // console.log(e.target.closest("form").elements);
  const passwordLoginHelper = document.getElementById("passwordLoginHelper");
  const userNameLoginHelper = document.getElementById("userNameLoginHelper");
  const {
    passwordLogin: password,
    userNameLogin: userName,
    remeber,
  } = e.target.closest("form").elements;
  if (password.value.trim() === "") {
    passwordLoginHelper.textContent = "Please Enter your password";
    passwordLoginHelper.dataset.error = true;
    passwordLoginHelper.previousElementSibling.classList.add("border-red-500");
    passwordLoginHelper.previousElementSibling.classList.add("border-2");
  } else {
    passwordLoginHelper.dataset.error = false;
    passwordLoginHelper.previousElementSibling.classList.remove(
      "border-red-500"
    );
    passwordLoginHelper.previousElementSibling.classList.remove("border-2");
    passwordLoginHelper.textContent = "";
  }
  if (userName.value.trim() === "") {
    userNameLoginHelper.dataset.error = true;
    userNameLoginHelper.previousElementSibling.classList.add("border-red-500");
    userNameLoginHelper.previousElementSibling.classList.add("border-2");
    userNameLoginHelper.textContent = "Please Enter Your Username";
  } else {
    userNameLoginHelper.dataset.error = false;

    userNameLoginHelper.previousElementSibling.classList.remove(
      "border-red-500"
    );
    userNameLoginHelper.previousElementSibling.classList.remove("border-2");
    userNameLoginHelper.textContent = "";
  }
  if (password.value.trim() === "" && userName.value.trim() === "") {
    passwordLoginHelper.dataset.error = true;
    userNameLoginHelper.dataset.error = true;
    passwordLoginHelper.previousElementSibling.classList.add("border-red-500");
    passwordLoginHelper.previousElementSibling.classList.add("border-2");
    userNameLoginHelper.previousElementSibling.classList.add("border-red-500");
    userNameLoginHelper.previousElementSibling.classList.add("border-2");
    userNameLoginHelper.textContent = "Please Enter Your Username";
    passwordLoginHelper.textContent = "Please Enter your password";
  }

  if (password.value === "1234" && userName.value === "mim") {
    if (remeber.checked) {
      Cookies.set("cookie", "1380", { expires: 5 });
    } else {
      Cookies.set("cookie", "1380");
    }
    Routes().navigate("/home");
  }
  if (password.value.trim() !== "" && userName.value.trim() !== "") {
    if (password.value !== "1234") {
      passwordLoginHelper.textContent = "password is incorrect";
      passwordLoginHelper.dataset.error = true;
      passwordLoginHelper.previousElementSibling.classList.add(
        "border-red-500"
      );
      passwordLoginHelper.previousElementSibling.classList.add("border-2");
    } else {
      passwordLoginHelper.dataset.error = false;
      passwordLoginHelper.previousElementSibling.classList.remove(
        "border-red-500"
      );
      passwordLoginHelper.previousElementSibling.classList.remove("border-2");
      passwordLoginHelper.textContent = "";
    }

    if (userName.value !== "mim") {
      userNameLoginHelper.dataset.error = true;
      userNameLoginHelper.previousElementSibling.classList.add(
        "border-red-500"
      );
      userNameLoginHelper.previousElementSibling.classList.add("border-2");
      userNameLoginHelper.textContent = "username is incorrect";
    } else {
      userNameLoginHelper.dataset.error = false;
      userNameLoginHelper.previousElementSibling.classList.remove(
        "border-red-500"
      );
      userNameLoginHelper.previousElementSibling.classList.remove("border-2");
      userNameLoginHelper.textContent = "";
    }
  }

  // axios
  //   .post(
  //     "http://127.0.0.1:8000/account/login",
  //     JSON.stringify(
  //       { username: userName.value, password: password.value },
  //       {
  //         headers: {
  //           "Access-Control-Allow-Origin": "http://localhost:5173",
  //           "Access-Control-Allow-Credentials": "true",
  //         },
  //       }
  //     )
  //   )
  //   .then((data) => console.log(data))
  //   .then((err) => console.log(err));
  // GetData(
  //   `http://localhost:3000/loginData?userName=${userName.value}&&password=${password.value}`
  // ).then((data) => {
  //   console.log(data);
  //   if (data.length === 1) {
  //     document.body.append(Toast({ mode: "success" }));
  //     document.getElementById("closeBtn").addEventListener("click", () => {
  //       document.getElementById("toast-success").remove();
  //     });
  //     setTimeout(() => {
  //       document.getElementById("toast-success").remove();
  //     }, 1500);
  //     Cookies.set("token", "usermmd", { expires: 2 });
  //     history.pushState(null, null, "/weather");
  //     Routes();
  //   } else {
  //     document.body.append(Toast({ mode: "failed" }));
  //     document.getElementById("closeBtn").addEventListener("click", () => {
  //       document.getElementById("toast-danger").remove();
  //     });
  //     setTimeout(() => {
  //       document.getElementById("toast-danger").remove();
  //     }, 1500);
  //     // console.log(Toast());
  //     // console.log(document.getElementById("toast-danger"));
  //   }
  // });
  // e.target.closest("form").reset();
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
