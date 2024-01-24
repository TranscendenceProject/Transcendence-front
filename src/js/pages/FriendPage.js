import Component from '../core/Component.js';
import SearchUser from '../components/SearchUser.js';
import ManageFriend from '../components/ManageFriend.js';

export default class FriendPage extends Component {

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
      <div data-component='friendContainer' id="friendContainer"/>

    `;
  }

  mounted() {
    const $friend = this.$target.querySelector(
      "[data-component='friendContainer']"
    );

    if (this.$state.currentMenu === 'searchUser') {
      new SearchUser($friend);
    } else if (this.$state.currentMenu === 'manageFriend') {
      new ManageFriend($friend);
    }
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
