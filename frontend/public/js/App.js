import Component from "./core/Component.js";
import Header from "./components/Header.js";
import createPages from "./pages/index.js";
import Router from "./Router.js";

export default class App extends Component {
    template() {
        return `
    <div class="full-container">
      <header></header>
      <main></main>
    </div>
    `;
    }

    mounted() {
        const $header = this.$target.querySelector("header");
        new Header($header);
        const $main = this.$target.querySelector("main");
        const pages = createPages($main);

        const router = new Router($main);
        router.addRoute("#/", pages.home);
        router.addRoute("#/game", pages.game);
        router.addRoute("#/profile", pages.profile);
        router.addRoute("#/friend", pages.friend);
        router.addRoute("#/login", pages.login);

        router.start();
    }
}
