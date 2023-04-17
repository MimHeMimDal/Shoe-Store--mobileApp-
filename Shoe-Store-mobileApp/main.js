import "./src/styles/style.css";
import App from "./src/App";
import { Routes } from "./src/routes";

const root = document.getElementById("app");
root.append(App());
Routes();

// Routes();
