import Component from '../core/Component.js';
import MyProfile from '../components/MyProfile.js';
import MyRecord from '../components/MyRecord.js';


export default class Profile extends Component {
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
            <button class="btn btn-primary" id = "myProfile" role="button">내 정보 수정 </button>
          </li>
          <li>
            <button class="btn btn-primary" id = "myRecord" role="button">내 기록</button>
          </li>
        </ul>
      </div>
      <img class="pikachu-image" src="assets/background.jpeg"></img>
    </div>
      
      <div data-component='ProfileContainer' id="profile-container"/>
    `;
  }

  mounted() {
    const $profile = this.$target.querySelector(
      "[data-component='ProfileContainer']"
    );

    if (this.$state.currentMenu === 'myProfile') {
      new MyProfile($profile);
    } else if (this.$state.currentMenu === 'myRecord') {
      new MyRecord($profile);
    }
  }

  setEvent() {
    this.addEvent("click", "#myProfile", ({ target }) => {
      this.setState({ currentMenu: 'myProfile' });
    })
    this.addEvent("click", "#myRecord", ({ target }) => {
      this.setState({ currentMenu: 'myRecord' });
    })
  } 
} 