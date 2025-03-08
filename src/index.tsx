/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import { lazy } from "solid-js";
import App from "./App";

const ChatView = lazy(() => import("./components/ChatView"));
const EmptyState = lazy(() => import("./components/EmptyState"));

render(() => (
  <Router root={App}>
    <Route path="/chats/:id" component={ChatView} />
    <Route path="/" component={EmptyState} />
  </Router>
), document.getElementById("root") as HTMLElement);
