type Jugada = "piedra" | "papel" | "tijera" | "";
type Game = {
  computerPlay:Jugada,
  myPlay:Jugada,
}
type History = Game[];
enum Resultado { 
  ganar,
  perder,
  empatar
}
class State {
  private static instance: State;
  private currentGame: Game;
  private history: History;
  private listeners: (() => any)[];

  private constructor() { 
    this.currentGame = {
      computerPlay: "",
      myPlay:""
    };
    this.history = [];
    this.listeners = [];
  }
  private saveHistory(game: Game) { 
    if (game && game.computerPlay && game.myPlay)
      this.history.push(game)
  }
  private notify() { 
    for (const listener of this.listeners) {
      listener();
    }
  }

  public static getInstance(): State {
    if (!this.instance)
      this.instance = new State(); 
    return this.instance
  }
  public getState(): Game { 
    return this.currentGame;
  }
  public getHistory(): History { 
    return [... this.history];
  }
  public setMove(myMove: Jugada, computerMove: Jugada) {
    const currentGame = this.getState();
    currentGame.computerPlay = computerMove;
    currentGame.myPlay = myMove;
    this.saveHistory({ ...currentGame });
    this.notify();
  }
  public whoWins(myPlay: Jugada, computerPlay: Jugada):Resultado { 
    let res:Resultado;
    if (myPlay === computerPlay) {
      res = Resultado.empatar;
    } else if ((myPlay === "papel" && computerPlay === "tijera") || (myPlay === "piedra" && computerPlay === "papel") || (myPlay === "tijera" && computerPlay === "piedra")) {
      res = Resultado.perder;
    } else { 
      res = Resultado.ganar;
    }
    return res;
  }
  public subscribe(callback: () => any) { 
    this.listeners.push(callback);
  }
}

export { State }