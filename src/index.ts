import { initRouter } from "./router"
import "./components/hand/hand";
(function(){
  const root = document.querySelector("#root");
  console.log("Hola 1")
  root? initRouter(root) : null ;
})()