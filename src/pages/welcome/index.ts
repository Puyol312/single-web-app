import "../../components/hands/hands";
import "../../components/button/button";
import "./welcome.css"
// Se puede hacer lo siguiente con CustomEl
export function initWelcome(something:any):HTMLElement{
  const div = document.createElement("div");
  div.classList.add("welcome-container")
  div.innerHTML = `
    <h1>
      Piedra<br>
      Papel <span>ó</span><br>
      Tijera
    </h1>
    <mi-boton name="Empezar"></mi-boton>
    <multi-hand></multi-hand>
  `;
  div.querySelector("mi-boton")?.addEventListener('click',()=>{
    something.goTo('/step-1');
  })
  return div;
}