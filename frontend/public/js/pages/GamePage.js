import Component from "../core/Component.js";

export default class GamePage extends Component {
    template() {
        return `

    <div class="main-box">
      <div class="btn-box">
      <ul>
      <li>
        <a class="btn btn-primary" onClick={} role="button">로컬   플레이</a>
      </li>
      <li>
        <a class="btn btn-primary" onClick={} role="button">2인 토너먼트</a>
      </li>
      <li>
        <a class="btn btn-primary" onClick={} role="button">4인 토너먼트</a>
      </li>
    </ul>
      </div>
      <img class="pikachu-image" src="../images/background.jpeg"></img>
    </div>
    `;
    }
}
