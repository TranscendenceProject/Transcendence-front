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
        const pages = createPages($main, this.$state);

        const router = new Router($main, this.$state);
        router.addRoute("#/", pages.home);
        router.addRoute("#/game", pages.game);
        router.addRoute("#/profile", pages.profile);
        router.addRoute("#/friend", pages.friend);
        router.addRoute("#/login", pages.login);
        router.addRoute("#/game/localGame", pages.localGame);
        router.addRoute("#/game/multiGame", pages.multiGame);
        router.addRoute("#/game/tournamentGame", pages.tournamentGame);

        router.start();
    }
}

// login state를 app.js에 두고 바꾸는 거는 loginpage내부에 otp component에서 바꿀거임 그걸 app.js로 올려서 setstate를 할거임 그걸 router가 인자로 받아서 router에서 login -> false면 home으로 보내고 true면 맞는 페이지로 보낼거임

// destroyComponent() {
//     const parentElement = document.getElementById("app");
//     const childComponents = parentElement.children;

//     for (let childComponent of childComponents) {
//         childComponent.destroyComponent();
//     }
//     this.removeAllEventListener();
// }

// addEvent(eventType, selector, callback) {
//     //이벤트 등록 추상화
//     this.$target.addEventListener(eventType, (event) => {
//         if (!event.target.closest(selector)) return false;
//         callback(event);
//     });
//     this.attacthedEventListeners.push({ eventType, listener });
// }

// removeAllEventListener() {
//     for (let { eventType, listener } of this.attacthedEventListeners) {
//         this.target.removeEventListener(eventType, listener);
//     }
//     this.attacthedEventListeners = [];
// }

// setState(newState) {
//     //상태 변경 후 렌더링
//     this.$state = { ...this.$state, ...newState };
//     this.render();
// }
