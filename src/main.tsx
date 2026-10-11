import React from "react"

import ReactDOM from "react-dom/client"

import App from "./App"

import "./index.css"

// 케이스를 코드로 바꾸는 창구 (window.__wfCase) — 화면 캡처용
import "./lib/wfCase"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
