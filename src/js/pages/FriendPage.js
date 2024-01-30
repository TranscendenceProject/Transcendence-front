// <div class="btn-box">
//   <ul>
//     <li>
//       <button class="btn btn-primary" id="searchUser" role="button">유저 검색</button>
//     </li>
//     <li>
//       <button class="btn btn-primary" id="manageFriend" role="button">친구 관리</button>
//     </li>
//   </ul>
// </div>
//   <img class="pikachu-image" src="../assets/background_1.jpeg"></img>
// </div>
// <div data-component='friendContainer' id="friendContainer"/>
import Component from '../core/Component.js';
import SearchUser from '../components/SearchUser.js';
import ManageFriend from '../components/ManageFriend.js';

export default class FriendPage extends Component {
  
  setup() {
    this.$state = {
      // currentMenu: 'default',
      currentMenu: 'searchUser',
    };
  }
  
  template() {
    return `
    <div class="main-box">
      <div class="btn-box">
        <input type="radio" class="btn-check" name="options" id="radio1" autocomplete="off"> 
          <label class="btn btn-primary" for="radio1">유저 검색</label>
        </input>
        <input type="radio" class="btn-check" name="options" id="radio2" autocomplete="off">
          <label class="btn btn-primary" for="radio2" >친구 관리</label>
        </input>
      </div>
    <div>
  </div>
    ${this.$state.currentMenu === 'default' ? '<img class="pikachu-image" src="../assets/background_1.jpeg"></img>': "<div data-component='friendContainer' class='content-container'/>"}

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
    this.addEvent("click", "#radio1", ({ target }) => {
      this.setState({ currentMenu: "searchUser" });
    })
    this.addEvent("click", "#radio2", ({ target }) => {
      this.setState({ currentMenu: "manageFriend" });
    })
  }
}
