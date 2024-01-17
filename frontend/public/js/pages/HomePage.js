import Component from "../core/Component.js";
let i = 0;
export default class Home extends Component {
    setup() {
        this.$state = this.$props;
    }
    template() {
        return `
        <button id="loginbtn">로그인</button>
    <div class="main-box">
      <div class="btn-box">
        <a class="btn btn-primary" href="#/game" role="button">게임플레이</a>
      </div>
      <img class="pikachu-image" src="../images/background.jpeg"></img>
    </div>
    `;
    }

    setEvent() {
        this.addEvent("click", "#loginbtn", () => {
            this.login();
        });
    }
    login() {
        this.$state.login();
    }
}
