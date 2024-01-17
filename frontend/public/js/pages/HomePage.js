import Component from '../core/Component.js';
import api from '../api/http.js';

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

    moveFortyTwoOAuth() {
      const authorizationUrl = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-b677e803809d207e81ae3a321bdf542af8d318ca330d81824e4b972bca224918&redirect_uri=http%3A%2F%2F127.0.0.1&response_type=code`;
      window.location.href = authorizationUrl;
    }

  setEvent() {
    this.addEvent('click', '#login-Button', ({ target }) => {
      this.moveFortyTwoOAuth();
    });

    document.addEventListener('DOMContentLoaded', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get('code');
      urlParams.delete('code');

      if (authCode) {
        this.authenticateUser(authCode);
      }
    });
  
  moveFortyTwoOAuth() {
    // const clientId = 'u-s4t2ud-b677e803809d207e81ae3a321bdf542af8d318ca330d81824e4b972bca224918';
    // const redirectUri = 'http://127.0.0.1/';
    // const authorizationEndpoint = 'https://api.intra.42.fr/oauth/authorize';
    // const authorizationUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;
    // 위 방법으로 만들어진 Url은 42api에서 제대로 응답하지 않음, client ID등 환경 변수로 관리할 예정이었으나 해당 부분 회의 필요
    const authorizationUrl = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-b677e803809d207e81ae3a321bdf542af8d318ca330d81824e4b972bca224918&redirect_uri=http%3A%2F%2F127.0.0.1&response_type=code`;
    window.location.href = authorizationUrl;
  }

  async authenticateUser(authCode) {
    try {
      const response = await api.get(`http://127.0.0.1:8000/users/create/${authCode}/`);
      console.log(response);
      console.log(response.message);
      console.log(response.access_token);
      if (response.message === 'token_response is not 200') {
        // 새로고침 시 함수를 다시 실행하지 않도록 params값을 제거
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.delete('code');
        window.history.replaceState({}, document.title, 'http://127.0.0.1/#/');
        alert('로그인 실패');
      } else {
        localStorage.setItem('access_token', response.access_token);
        // OTP 컴포넌트가 있는 로그인 페이지로 이동
        window.location.href = `http://127.0.0.1/#/login`;
      }
    } catch (error) {
      console.error('Error: ', error.message);
    }
  };
  }
