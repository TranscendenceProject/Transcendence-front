import Component from "../core/Component.js";

export default class header extends Component {
    template() {
        return `
    <a href="#/">
      <div class="logo">
        <img src="/images/logo.jpg" alt="Logo" />
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
        </div>
    </li>


    `;
    }
}
