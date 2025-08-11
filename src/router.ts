import { initWelcome } from "./pages/welcome";
import { initRules } from "./pages/rules";
import { initGame } from "./pages/game";
import { initResult } from "./pages/result";


var routes = [
  {
    path: /\/welcome/,
    component:initWelcome
  },
  {
    path: /\/step-1/,
    component:initRules
  },
  {
    path: /\/step-2/,
    component:initGame
  },
  {
    path: /\/result/,
    component:initResult
  }
];
const basePath = "/single-web-app";

export function initRouter(container: Element) {

  function goTo(path) { 
    history.pushState({}, "", basePath + path);
    handleRoute(path);
  }
  function getCurrentPath() {
    return location.pathname.replace(basePath, "") || "/";
  }
  function handleRoute(route) {
    let found = false;

    for (const r of routes) {
      if (r.path.test(route)) {
        const el = r.component({ goTo: goTo });
        if (container.firstChild) {
          container.firstChild.remove();
        }
        container.appendChild(el);
        found = true;
        break;
      }
    }

    // Si no se encontró ninguna ruta, redirigimos a /welcome
    if (!found) {
      goTo("/welcome");
    }
  }

  if (getCurrentPath() == "/") {
    goTo("/welcome")
  } else { 
    handleRoute(getCurrentPath());
  }
  //para poder que funcione para atras y para adelante
  window.onpopstate = function (event) { 
    handleRoute(getCurrentPath());
  }
}