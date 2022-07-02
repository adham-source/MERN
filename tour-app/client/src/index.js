import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import "mdb-react-ui-kit/dist/css/mdb.min.css"
import reportWebVitals from "./reportWebVitals"
import store from "./app/store"
import { Provider } from "react-redux"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
