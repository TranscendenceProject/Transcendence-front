import Component from "../core/Component.js";

export default class Home extends Component {
    template() {
        return `
    <div class="main-box">
      <div class="btn-box">
        <a class="btn btn-primary" href="#/game" role="button">게임플레이</a>
      </div>
      <img class="pikachu-image" src="../images/background.jpeg"></img>
    </div>
    `;
    }
}
