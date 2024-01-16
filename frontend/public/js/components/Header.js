import Component from '../core/Component.js';

export default class header extends Component {
  setup() {
    this.$state = {
      isLogedin: false,
    };
  }

  template() {
    return `
    <nav>
      <ul>
        <li><a href="#/">Home</a></li>
        <li><a href="#/profile">Profile</a></li>
        <li><a href="#/friend">Friend</a></li>
        <li><a href="#/game">Game Play</a></li>
      </ul>
    </nav>
    `;
  }
}
