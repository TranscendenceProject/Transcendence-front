import Component from '../core/Component.js';

export default class Login extends Component {

  setup() {
    this.$state = {
      currentMenu: 'default',
    };
  }

  template() {
    return `
    <div class="main-box">
      <div class="btn-box">
        <ul>
          <li>
            <button class="btn btn-primary" id="searchUser" role="button">유저 검색</button>
          </li>
          <li>
            <button class="btn btn-primary" id="manageFriend" role="button">친구 관리</button>
          </li>
        </ul>
      </div>
      <img class="pikachu-image" src="../assets/background.jpeg"></img>
      </div>
    `;
  }

  setEvent() {
    this.addEvent("click", "#searchUser", ({ target }) => {
      this.setState({ currentMenu: "searchUser" });
    })
    this.addEvent("click", "#manageFriend", ({ target }) => {
      this.setState({ currentMenu: "manageFriend" });
    })
  }
}
