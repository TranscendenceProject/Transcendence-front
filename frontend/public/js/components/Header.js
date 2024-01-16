import Component from '../core/Component.js';

export default class header extends Component {
  template() {
    return `
    <a href="/">
      <div class="logo">
        <img src="/images/logo.jpg" alt="Logo" />
      </div>
    </a>
    <nav>
      <ul>
        <li><a href="#/profile">Profile</a></li>
        <li><a href="#/friend">Friend</a></li>
        <li><a href="#/game">Game Play</a></li>
      </ul>
    </nav>
    `;
  }
}
