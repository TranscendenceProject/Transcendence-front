import Component from "./core/Component.js";
import LocalPong from "./components/LocalPong.js";
import MultiPong from "./components/MultiPong.js";

export default class Router extends Component {
    constructor($target, $props) {
        super($target, $props)
        this.$localPong = null;
        this.$multiPong = new MultiPong();
    }

    setup() {
        this.$state = {
            routes: [],
        };
    }

    addRoute(fragment, component) {
        this.$state.routes.push({ fragment, component });
    }

    checkRoutes() {
        const currentRoute = this.$state.routes.find((route) => {
            return route.fragment === window.location.hash;
        });

        if (!currentRoute) {
            window.location.href = "#/";
            this.$state.routes[0].component();
            return;
        }

        // 소켓 연결 종료 함수 호출
        if (this.$localPong) {
            this.$localPong.terminateGame();
            this.$localPong = null;
        }
        this.$multiPong.disconnect_socket();
        currentRoute.component();
        // multiGamePage로 이동 시 게임 시작
        if (currentRoute.fragment === "#/game/multiGame") {
            this.$multiPong.run();
        } else if (currentRoute.fragment === "#/game/prepare/localGame") {
            this.$localPong = new LocalPong();
        }
    }

    start() {
        window.addEventListener("hashchange", () => this.checkRoutes());

        if (!window.location.hash) {
            window.location.hash = "#/";
        }

        this.checkRoutes();
    }
}