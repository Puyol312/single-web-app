import { initRouter } from "./router"
import "./components/hand/hand";
(function(){
  const root = document.querySelector("#root");
  root? initRouter(root) : null ;
})()