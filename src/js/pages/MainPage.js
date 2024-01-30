import Component from "../core/Component.js";
import api from "../api/http.js";

export default class MainPage extends Component {
  template() {
    let loginOrGameContent = "";
    const JWT = localStorage.getItem("token");
    if (JWT) {
      loginOrGameContent = `
      <div class="btn-box">
        <a class="btn btn-primary" href="#/game" role="button">게임플레이</a>
      </div>
      `;
    } else {
      loginOrGameContent = `
      <div class="btn-box">
        <button class="btn btn-primary" id="login-button">Login</button>
      </div>
      `;
    }
      return `
      <div class="main-box">
        ${loginOrGameContent}
        <img class="pikachu-image" src="/assets/background_1.jpeg"></img>
        <div id="modalContainer">
          <div id="modal">
            <p>인증 진행 중입니다</p>
          </div>
        </div>
      </div>
      `;
  }

  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    if (authCode) {
      const modalContainer = document.getElementById('modalContainer');
      modalContainer.style.display = 'flex';
    }
  }

  setEvent() {
    this.addEvent("click", "#login-Button", () => this.moveFortyTwoOAuth());

    document.addEventListener("DOMContentLoaded", () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get("code");
      urlParams.delete("code");

      if (authCode) {
        this.authenticateUser(authCode);
      }
    });
  }

  moveFortyTwoOAuth() {
      const authorizationUrl = import.meta.env.TS_OAUTH_URL;
      window.location.href = authorizationUrl;
  }

  async authenticateUser(authCode) {
    try {
      const path = `/users/login/create/${authCode}`;
      const response = await api.get(path);

      localStorage.setItem("access_token", response.access_token);
      window.history.replaceState({}, null, location.pathname);
      window.location.href = `#/login`;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  }
}
