// import { GetData } from "./GetData";
// import Cookies from "js-cookie";
// import { Routes } from "@/routes";
// import { Toast } from "@/components";

import { Routes } from "@/routes";

// import axios from "axios";

export const CheckLogin = function (e) {
  e.preventDefault();
  //   console.log(e.target.closest("form").elements);
  const { passwordLogin: password, userNameLogin: userName } =
    e.target.closest("form").elements;
  if (password.value.trim() === "") {
    document.getElementById("passwordLoginHelper").textContent =
      "Please Enter your password";
    document.getElementById("passwordLoginHelper").dataset.error = true;
    document
      .getElementById("passwordLoginHelper")
      .previousElementSibling.classList.add("border-red-500");
    document
      .getElementById("passwordLoginHelper")
      .previousElementSibling.classList.add("border-2");
  } else {
    document.getElementById("passwordLoginHelper").dataset.error = false;
    document
      .getElementById("passwordLoginHelper")
      .previousElementSibling.classList.remove("border-red-500");
    document
      .getElementById("passwordLoginHelper")
      .previousElementSibling.classList.remove("border-2");
    document.getElementById("passwordLoginHelper").textContent = "";
  }
  if (userName.value.trim() === "") {
    document.getElementById("userNameLoginHelper").dataset.error = true;
    document
      .getElementById("userNameLoginHelper")
      .previousElementSibling.classList.add("border-red-500");
    document
      .getElementById("userNameLoginHelper")
      .previousElementSibling.classList.add("border-2");
    document.getElementById("userNameLoginHelper").textContent =
      "Please Enter Your Username";
  } else {
    document.getElementById("userNameLoginHelper").dataset.error = false;

    document
      .getElementById("userNameLoginHelper")
      .previousElementSibling.classList.remove("border-red-500");
    document
      .getElementById("userNameLoginHelper")
      .previousElementSibling.classList.remove("border-2");
    document.getElementById("userNameLoginHelper").textContent = "";
  }
  if (password.value.trim() === "" && userName.value.trim() === "") {
    document.getElementById("passwordLoginHelper").dataset.error = true;
    document.getElementById("userNameLoginHelper").dataset.error = true;
    document
      .getElementById("passwordLoginHelper")
      .previousElementSibling.classList.add("border-red-500");
    document
      .getElementById("passwordLoginHelper")
      .previousElementSibling.classList.add("border-2");
    document
      .getElementById("userNameLoginHelper")
      .previousElementSibling.classList.add("border-red-500");
    document
      .getElementById("userNameLoginHelper")
      .previousElementSibling.classList.add("border-2");
    document.getElementById("userNameLoginHelper").textContent =
      "Please Enter Your Username";
    document.getElementById("passwordLoginHelper").textContent =
      "Please Enter your password";
  }
  // fetch("http://127.0.0.1:8000/account/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  // })
  //   .then((data) => console.log(data))
  //   .catch((err) => console.error(err));

  if (password.value.trim() !== "" && userName.value.trim() !== "") {
    if (password.value === "1234" && userName.value === "mim") {
      // history.pushState(null, null, "/home");
      // Routes();
      Routes().navigate("/home");
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
