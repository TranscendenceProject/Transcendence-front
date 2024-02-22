import Component from "../core/Component.js";

export default class LocalGamePreparePage extends Component {
  template() {
    return `
    <div class="main-box">
      <div class="btn-box">
        <ul>
          <li>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Player1</span>
            <input id = "player1" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" autocomplete=“off”>
          </div>
          </li>
          <li>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Player2</span>
            <input id = "player2" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" autocomplete=“off”>
          </div>
          </li>
          <li>
            <a class="btn btn-primary" role="button"  href="#/game/prepare/localGame">게임 시작</a>
          </li>
        </ul>
      </div>
      <img class="pikachu-image" src="/assets/background_1.jpeg"></img>
    </div>
    `;
  }
  mounted() {
    localStorage.setItem("player1_name", "Player1");
    localStorage.setItem("player2_name", "Player2");
  }
  setEvent() {
    this.addEvent("input", "#player1", (e) => this.setPlayerFirstName());
    this.addEvent("input", "#player2", (e) => this.setPlayerSecondName());
  }

  setPlayerFirstName(e) {
    let name = document.getElementById('player1').value;
    if (name === "")
      name = "player1";
    localStorage.setItem("player1_name", name);
  }
  setPlayerSecondName(e) {
    let name = document.getElementById('player2').value;
    if (name === "")
      name = "player2";
    localStorage.setItem("player2_name", name);
  }
}

