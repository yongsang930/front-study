import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import App from "./App";
import "./index.css";
import rootReducer from "./reducers";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const store = createStore(rootReducer);

store.dispatch({ type: "ADD_TODO", text: "USE_REDUX" });
console.log(store.getState());

const render = () =>
  root.render(
    <React.StrictMode>
      <App
        onIncrement={() => store.dispatch({ type: "INCREMENT" })}
        onDecrement={() => store.dispatch({ type: "DECREMENT" })}
        value={store.getState()}
      />
    </React.StrictMode>,
  );

render();
store.subscribe(render);

reportWebVitals();
