import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import App from "./App";
import "./index.css";
import rootReducer from "./reducers";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const loggerMiddleWare = (store: any) => (next: any) => (action: any) => {
  console.log("store", store);
  console.log("action", action);
  next(action);
};

const middleWare = applyMiddleware(loggerMiddleWare);

const store = createStore(rootReducer, undefined, middleWare);

const render = () =>
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App
          onIncrement={() => store.dispatch({ type: "INCREMENT" })}
          onDecrement={() => store.dispatch({ type: "DECREMENT" })}
          value={store.getState()}
        />
      </Provider>
    </React.StrictMode>,
  );

render();
store.subscribe(render);

reportWebVitals();
