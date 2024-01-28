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
          <span class="logout">logout</span>
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
      localStorage.removeItem('token');
      window.location.href = `http://127.0.0.1:3000`;
    });
  }
}
