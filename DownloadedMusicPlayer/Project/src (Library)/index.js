import { StrictMode } from "react";
import ReactDOM from "react-dom";

import Library from "./Library";

const rootElement = document.body;
ReactDOM.render(
  <StrictMode>
    <Library />
  </StrictMode>,
  rootElement
);
