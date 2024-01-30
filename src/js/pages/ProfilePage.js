import Component from '../core/Component.js';
import MyProfile from '../components/MyProfile.js';
import MyRecord from '../components/MyRecord.js';


export default class ProfilePage extends Component {
  setup() {
    this.$state = {
      // currentMenu: 'myRecord',
      currentMenu: 'default',
    };
  }

  template() {
    return `
    <div class="main-box">
      <div class="btn-box">
        <input type="radio" class="btn-check" name="options" id="radio1" autocomplete="off"> 
          <label class="btn btn-primary" for="radio1">내 정보 수정</label>
        </input>
        <input type="radio" class="btn-check" name="options" id="radio2" autocomplete="off">
        <label class="btn btn-primary" for="radio2" >내 기록</label>
        </input>
      </div>
      <div>
      </div>
        ${this.$state.currentMenu === 'default' ? '<img class="pikachu-image" src="../assets/background_1.jpeg"></img>': "<div data-component='ProfileContainer' class='content-container'/>"}
        
    </div>
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
    this.addEvent("click", "#radio1", ({ target }) => {
      this.setState({
        currentMenu: 'myProfile',
      });
    })
    this.addEvent("click", "#radio2", ({ target }) => {
      this.setState({
        currentMenu: 'myRecord',
      });
    })
  } 
} 
