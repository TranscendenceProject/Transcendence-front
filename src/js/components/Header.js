import Component from "../core/Component.js";

export default class Header extends Component {
  template() {
    return `
    <a href="#/">
      <div class="logo">
        <img src="/assets/logo.jpg" alt="Logo" />
      </div>
    </a>
    <li class="nav-item dropdown">
      <a class="nav-link pl-0 dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="far fa-heart"></i>
        <span class="d-none d-md-inline">menu</span>
      </a>
        <span class="caret"></span>
        <div class="dropdown-menu">
          <a href="#/profile">Profile</a>
          <a href="#/friend">Friend</a>
          <a href="#/game">Game Play</a>
          <a class="logout">Logout</a>
        </div>
    </li>
    `;
  }

  mounted() {
    const JWT = localStorage.getItem('token');
    const dropdown = document.querySelector('.nav-item.dropdown');

    dropdown.style.display = JWT ? 'block' : 'none';
  }

  setEvent() {
    this.addEvent('click', '.logout', ({ target }) => {
      const HTTP_PROTOCOL = import.meta.env.TS_HTTP_PROTOCOL;
      const HOST_IP = import.meta.env.TS_HOST_IP;
      const WEB_SERVER_PORT = import.meta.env.TS_WEB_SERVER_PORT;
      const ENTRYPOINT = HTTP_PROTOCOL + '://' + HOST_IP + ':' + WEB_SERVER_PORT;
      localStorage.removeItem('token');
      window.location.href = ENTRYPOINT;
    });
  }
}
