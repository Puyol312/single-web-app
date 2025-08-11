export class ButtonEl extends HTMLElement { 
  shadow = this.attachShadow({ mode: "open" });
  constructor() { 
    super();
    this.render();
  }
  render() { 
    const name = this.getAttribute("name");
    const style = document.createElement('style');
    const button = document.createElement('button');
    button.classList.add('button_element');
    name ? button.innerText = name : button.innerText = "";
    style.innerHTML = `
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
    `;
    this.shadow.innerHTML = "";
    this.shadow.appendChild(style);
    this.shadow.appendChild(button);
  }
}
customElements.define("mi-boton", ButtonEl);
