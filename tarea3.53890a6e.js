const e=new URL(import.meta.resolve("2DBuG")).href,t=new URL(import.meta.resolve("cwl3B")).href,n=new URL(import.meta.resolve("apkrX")).href;class a extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){let a=this.getAttribute("type")||"",s=document.createElement("style"),o=document.createElement("img");o.alt=a,o.src="piedra"===a?e:"papel"===a?t:n,o.classList.add("hand-animation"),s.innerHTML=`
  .hand-animation {
    width: auto; /* antes no ten\xeda tama\xf1o fijo */
    height: 190px;
    transition: transform 0.3s;
    cursor: pointer;
  }
  .hand-animation:hover {
    transform: scale(1.1);
  }
  .selectedHand {
    transform: scale(1.2);
    opacity: 1;
  }
  .notSelectedHand {
    opacity: 0.5;
  }
    `,this.shadow.innerHTML="",this.shadow.appendChild(s),this.shadow.appendChild(o)}selectedHand(){let e=this.shadow.querySelector("img");e?.classList.add("selectedHand"),e?.classList.remove("notSelectedHand")}notSelectedHand(){let e=this.shadow.querySelector("img");e?.classList.add("notSelectedHand"),e?.classList.remove("selectedHand")}}function s(){let e=["piedra","papel","tijera"],t=Math.floor(Math.random()*e.length);return e[t]}customElements.define("single-hand",a);var o,i=((o=i||{})[o.ganar=0]="ganar",o[o.perder=1]="perder",o[o.empatar=2]="empatar",o);class r{constructor(){let e=localStorage.getItem("gameState");if(e){let t=JSON.parse(e);this.currentGame=t.currentGame||{computerPlay:"",myPlay:""},this.history=t.history||[]}else this.currentGame={computerPlay:"",myPlay:""},this.history=[];this.listeners=[]}saveHistory(e){e&&e.computerPlay&&e.myPlay&&(this.history.push(e),this.saveToLocalStorage())}saveToLocalStorage(){localStorage.setItem("gameState",JSON.stringify({currentGame:this.currentGame,history:this.history}))}notify(){for(let e of this.listeners)e()}static getInstance(){return this.instance||(this.instance=new r),this.instance}getState(){return this.currentGame}getHistory(){return[...this.history]}setMove(e){let t=s(),n=this.getState();n.computerPlay=t,n.myPlay=e,this.saveHistory({...n}),this.saveToLocalStorage(),this.notify()}whoWins(e,t){return e===t?2:+("papel"===e&&"tijera"===t||"piedra"===e&&"papel"===t||"tijera"===e&&"piedra"===t)}subscribe(e){this.listeners.push(e)}}class d extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.render()}render(){let e=document.createElement("div"),t=document.createElement("style"),n=document.createElement("single-hand"),a=document.createElement("single-hand"),s=document.createElement("single-hand");n.setAttribute("type","tijera"),a.setAttribute("type","piedra"),s.setAttribute("type","papel"),e.classList.add("contenedor-hands"),t.innerHTML=`
    .contenedor-hands{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: end;
      gap: 46px;
      width:100%;
      height: 100%;
    }
    `,e.appendChild(n),e.appendChild(a),e.appendChild(s),this.shadow.innerHTML="",this.shadow.appendChild(t),this.shadow.appendChild(e)}activeSelector(){let e=this.shadow.querySelector('single-hand[type="tijera"]'),t=this.shadow.querySelector('single-hand[type="piedra"]'),n=this.shadow.querySelector('single-hand[type="papel"]');e?.addEventListener("click",()=>{this.selectedHand("tijera")}),t?.addEventListener("click",()=>{this.selectedHand("piedra")}),n?.addEventListener("click",()=>{this.selectedHand("papel")})}selectedHand(e){let t=this.shadow.querySelectorAll("single-hand");t?.forEach(t=>{e===t.getAttribute("type")?t.selectedHand():t.notSelectedHand()}),r.getInstance().setMove(e)}}customElements.define("multi-hand",d);class l extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.render()}render(){let e=this.getAttribute("name"),t=document.createElement("style"),n=document.createElement("button");n.classList.add("button_element"),e?n.innerText=e:n.innerText="",t.innerHTML=`
      .button_element{
        width:100%;
        max-width:404px;
        height: 84px;
        color: #D8FCFC;
        border: solid 10px #001997;
        border-radius: 10px;
        text-align: center;
        background-color:#006CFC;
        font-family: var(--default-font-family);
        font-weight: 400;
        font-size: 45px;
        line-height: 88%;
        overflow: hidden;
      }
    `,this.shadow.innerHTML="",this.shadow.appendChild(t),this.shadow.appendChild(n)}}customElements.define("mi-boton",l);class c extends HTMLElement{connectedCallback(){this.render(),this.startCountdown()}startCountdown(){this.intervalId=setInterval(()=>{this.counter--;let e=this.shadow.querySelector(".circle");e&&(e.classList.remove("pulse"),e.offsetWidth,e.classList.add("pulse"),e.textContent=this.counter>0?String(this.counter):""),0===this.counter&&(this.stop(),this.dispatchEvent(new CustomEvent("countdown-finished",{bubbles:!0,composed:!0})))},1e3)}stop(){null!==this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null)}render(){this.shadow.innerHTML=`
      <style>
        .circle {
          font-family: var(--default-font-family);
          width: 243px;
          height: 243px;
          border: 23px solid black;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 100px;
          font-weight: bold;
          box-sizing: border-box;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .pulse {
          animation: pulseAnim 0.3s ease;
        }

        @keyframes pulseAnim {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      </style>
      <div class="circle">${this.counter}</div>
    `,r.getInstance().subscribe(()=>{this.stop()})}constructor(...e){super(...e),this.shadow=this.attachShadow({mode:"open"}),this.counter=3,this.intervalId=null}}customElements.define("circle-countdown",c);class h extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.render()}render(){let e=this.getAttribute("type")||"draw",t=document.createElement("style"),n=document.createElement("div"),a=document.createElement("span");t.innerHTML=`
      .container {
        position: relative;
        display: inline-block;
        width: 254px;
        height: 259px;
        opacity: 1;
        animation: fadeIn 0.5s ease;
      }
      .overlay {
        font-family: var(--default-font-family);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-weight: bold;
        text-align: center;
        font-size: 55px;
        line-height: 100%;
        padding: 10px;
        border-radius: 10px; /* Bordes redondeados */
      }
      svg {
        width: 100%;
        height: 100%;
        display: block;
        filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5)); /* Sombra */
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `,n.className="container",a.className="overlay",a.textContent="win"===e?"Ganaste":"lose"===e?"Perdiste":"Empataste",n.innerHTML=`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <polygon 
          points="32,4 39,24 60,24 42,38 48,58 32,46 16,58 22,38 4,24 25,24"
          fill="${"win"===e?"#6CB46C":"lose"===e?"#DC5B49":"#999999"}"
          stroke="#000000"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,n.appendChild(a),this.shadow.innerHTML="",this.shadow.appendChild(t),this.shadow.appendChild(n)}}customElements.define("mi-star",h);class p extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.render(),r.getInstance().subscribe(()=>{this.render()})}render(){let e=r.getInstance(),t=e.getHistory(),n=0,a=0;for(let s of t)e.whoWins(s.myPlay,s.computerPlay)===i.ganar?n++:e.whoWins(s.myPlay,s.computerPlay)===i.perder&&a++;let s=document.createElement("div"),o=document.createElement("style");o.innerHTML=`
      .contenedor-score {
      font-family: var(--default-font-family);
      width: 259px;
      height: 217px;
      border-radius: 10px;
      border: solid 10px;
      padding: 28px 30px;
      background-color: #FFFFFF;
      box-sizing: border-box;
      overflow-wrap: break-word;
    }
    .contenedor-score > h3 {
      text-align: center;
      font-weight: 400;
      font-size: 55px;
      line-height: 100%;
      margin: 0;
    }
    .contenedor-score > p {
      text-align: right;
      font-weight: 400;
      font-size: 45px;
      line-height: 100%;
      margin: 0;
      white-space: normal;
    }
    `,s.classList.add("contenedor-score"),s.innerHTML=`
    <h3>Score</h3>
    <p>Vos: ${n}</p>
    <p>Maquina: ${a}</p>
    `,this.shadow.innerHTML="",this.shadow.appendChild(o),this.shadow.appendChild(s)}}customElements.define("score-box",p);var m=[{path:/\/welcome/,component:function(e){let t=document.createElement("div");return t.classList.add("welcome-container"),t.innerHTML=`
    <h1>
      Piedra<br>
      Papel <span>\xf3</span><br>
      Tijera
    </h1>
    <mi-boton name="Empezar"></mi-boton>
    <multi-hand></multi-hand>
  `,t.querySelector("mi-boton")?.addEventListener("click",()=>{e.goTo("/step-1")}),t}},{path:/\/step-1/,component:function(e){let t=document.createElement("div");return t.classList.add("contenedor-rules"),t.innerHTML=`
      <div class="contenedor-rules-texto">
        <p>Presiona jugar y elegi: piedra, papel o tijera antes de que pasen los 3 segundos.</p>
      </div>
      <mi-boton name="\xa1Jugar!"></mi-boton>
      <multi-hand></multi-hand>
  `,t.querySelector("mi-boton")?.addEventListener("click",()=>{e.goTo("/step-2")}),t}},{path:/\/step-2/,component:function(e){let t=document.createElement("div");t.classList.add("contenedor-game"),t.innerHTML=`
    <div class="contenedor-contador">
      <circle-countdown></circle-countdown>
    </div>
    <multi-hand></multi-hand>
  `;let n=t.querySelector("multi-hand");n?.activeSelector();let a=t.querySelector("circle-countdown");return r.getInstance().subscribe(()=>{setTimeout(()=>{e.goTo("/result")},1e3)}),a?.addEventListener("countdown-finished",e=>{e.stopPropagation(),r.getInstance().setMove(s())}),t}},{path:/\/result/,component:function(e){let t=r.getInstance().getState(),n=document.createElement("div");return n.classList.add("result-container"),n.innerHTML=`
    <div class="hands-container">
      <single-hand type=${t.computerPlay}></single-hand>
      <single-hand type=${t.myPlay}></single-hand>
    </div>
  `,setTimeout(()=>{let a=n.querySelector(".hands-container");a&&(a.style.display="none");let s=r.getInstance().whoWins(t.myPlay,t.computerPlay),o=s==i.ganar?"win":s==i.perder?"lose":"draw";n.insertAdjacentHTML("beforeend",`
      <div class="result ${o}">
        <div class="star-container"><mi-star type=${o}></mi-star></div>
        <score-box></score-box>
        <mi-boton name="\xa1Volver a Jugar!"></mi-boton>
      </div>
      `);let d=n.querySelector("mi-boton");d?.addEventListener("click",t=>{t.stopPropagation(),e.goTo("./welcome")})},2e3),n}}];const u=document.querySelector("#root");u&&function(e){function t(e){history.pushState({},"",e),a(e)}function n(){return location.pathname.replace("/piedra-papel-tijera","")||"/"}function a(n){let a=!1;for(let s of m)if(s.path.test(n)){let n=s.component({goTo:t});e.firstChild&&e.firstChild.remove(),e.appendChild(n),a=!0;break}a||t("/welcome")}"/"==n()?t("/welcome"):a(n()),window.onpopstate=function(e){a(n())}}(u);
//# sourceMappingURL=tarea3.53890a6e.js.map
