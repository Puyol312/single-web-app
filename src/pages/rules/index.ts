import "../../components/button/button";
import "../../components/hands/hands";
import { HandsEl } from "../../components/hands/hands";
import "./rules.css"

export function initRules(something:any):HTMLElement{
  const div = document.createElement("div");
  div.classList.add("contenedor-rules")
  div.innerHTML = `
      <div class="contenedor-rules-texto">
        <p>Presiona jugar y elegi: piedra, papel o tijera antes de que pasen los 3 segundos.</p>
      </div>
      <mi-boton name="¡Jugar!"></mi-boton>
      <multi-hand></multi-hand>
  `;
  div.querySelector("mi-boton")?.addEventListener('click',()=>{
    something.goTo('/step-2');
  })
  return div;
}