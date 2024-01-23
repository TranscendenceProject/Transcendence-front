import Component from '../core/Component.js';
import MyProfile from '../components/MyProfile.js';
import MyRecord from '../components/MyRecord.js';


export default class Profile extends Component {
  setup() {
    this.$state = {
      currentMenu: 'myRecord',
      // currentMenu: 'default',
      isMyProfileChecked: "",
      isMyRecordChecked: "",
    };
  }

  template() {
    return `
    <div class="main-box">
      <div class="btn-box">
        <input type="radio" class="btn-check" name="options" id="radio1" autocomplete="off" ${this.$state.isMyProfileChecked} > 
          <label class="btn btn" for="radio1" ">내 정보 수정</label>
        </input>
        <input type="radio" class="btn-check" name="options" id="radio2" autocomplete="off"  ${this.$state.isMyRecordChecked}>
        <label class="btn btn" for="radio2" >내 기록</label>
        </input>
      </div>
        <div data-component='ProfileContainer' class="content-container"/>
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
        isMyProfileChecked: "checked",
        isMyRecordChecked: "",
      });
    })
    this.addEvent("click", "#radio2", ({ target }) => {
      this.setState({
        currentMenu: 'myRecord',
        isMyProfileChecked: "",
        isMyRecordChecked: "checked",
      });
    })
  } 
} 