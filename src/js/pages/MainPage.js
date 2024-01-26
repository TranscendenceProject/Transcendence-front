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
        <button id="login-button">Login</button>
      </div>
      `;
    }
      return `
      <div class="main-box">
      ${loginOrGameContent}
      <img class="pikachu-image" src="/assets/background.jpeg"></img>
      </div>
      `;
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
      // const clientId = 'u-s4t2ud-b677e803809d207e81ae3a321bdf542af8d318ca330d81824e4b972bca224918';
      // const redirectUri = 'http://127.0.0.1/';
      // const authorizationEndpoint = 'https://api.intra.42.fr/oauth/authorize';
      // const authorizationUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;
      // 위 방법으로 만들어진 Url은 42api에서 제대로 응답하지 않음, client ID등 환경 변수로 관리할 예정이었으나 해당 부분 회의 필요
      const authorizationUrl = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-b677e803809d207e81ae3a321bdf542af8d318ca330d81824e4b972bca224918&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000&response_type=code`;
      window.location.href = authorizationUrl;
  }

  async authenticateUser(authCode) {
    try {
      const url = `http://127.0.0.1:8000/users/login/create/${authCode}`;
      const response = await api.get(url);
      console.log(response);
      console.log(response.message);
      console.log(response.access_token);

      if (response.message === "Token response is not 200") {
        alert("로그인 실패");
        window.history.replaceState({}, null, location.pathname);
      } else {
        localStorage.setItem("access_token", response.access_token);
        // OTP 컴포넌트가 있는 로그인 페이지로 이동
        window.location.href = `#/login`;
      }
    } catch (error) {
      console.error("Error: ", error.message);
    }
  }
}
