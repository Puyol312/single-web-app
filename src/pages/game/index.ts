import "../../components/hands/hands";
import "../../components/count/count";
import { HandsEl } from "../../components/hands/hands";
import "./game.css"
import { State } from "../../state";
import { aleatorySelection } from "../../utils/aleatorySelection";

export function initGame(something:any):HTMLElement{
  const div = document.createElement("div");
  div.classList.add("contenedor-game")
  div.innerHTML = `
    <div class="contenedor-contador">
      <circle-countdown></circle-countdown>
    </div>
    <multi-hand></multi-hand>
  `;
  // aqui va el custom-event
  const manos = div.querySelector("multi-hand") as HandsEl;
  manos?.activeSelector();
  const el = div.querySelector("circle-countdown");
  State.getInstance().subscribe(() => { 
    setTimeout(() => {something.goTo("/result");}, 1000);
  })
  el?.addEventListener("countdown-finished", (event) => {
    event.stopPropagation();
    State.getInstance().setMove(aleatorySelection());
  });
  return div;
}