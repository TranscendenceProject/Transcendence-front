import Component from "../core/Component.js";
let i = 0;
export default class Home extends Component {
    setup() {
        this.$state = this.$props;
    }
    
    template() {
      let loginOrGameContent = "";
      switch (this.$state.loginState) {
        case true:
          loginOrGameContent = `
          <div class="btn-box">
          <a class="btn btn-primary" href="#/game" role="button">게임플레이</a>
          </div>
          `
        case false:
          loginOrGameContent = `
          <button id="login-button">Login</button>
          `
      }
        return `
        <div class="main-box">
        ${loginOrGameContent}
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
    moveFortyTwoOAuth() {
      const authorizationUrl = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-b677e803809d207e81ae3a321bdf542af8d318ca330d81824e4b972bca224918&redirect_uri=http%3A%2F%2F127.0.0.1&response_type=code`;
      window.location.href = authorizationUrl;
    }

  setEvent() {
    this.addEvent('click', '#login-Button', ({ target }) => {
      this.moveFortyTwoOAuth();
    });

  }
}
