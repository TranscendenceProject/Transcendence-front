import Component from "../core/Component.js";

export default class GamePage extends Component {
  template() {
    return `
    <div class="main-box">
      <div class="btn-box">
        <ul>
          <li>
            <a class="btn btn-primary" role="button"  href="#/game/prepare">로컬플레이</a>
          </li>
          <li>
            <a class="btn btn-primary" role="button"  href="#/game/multiGame">멀티플레이</a>
          </li>
          <li>
            <a class="btn btn-primary" role="button" href="#/game/tournamentGame">토너먼트</a>
          </li>
        </ul>
      </div>
      <img class="pikachu-image" src="/assets/background_1.jpeg"></img>
    </div>
    `;
  }
}