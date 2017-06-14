import React from "react";
import ReactDOM from "react-dom";
import EmailSignup from "./EmailSignup";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

ReactDOM.render(<EmailSignup />, document.getElementById("root"));
registerServiceWorker();
