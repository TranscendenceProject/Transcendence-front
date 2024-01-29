import Component from "../core/Component.js";
import LocalPong from "../components/LocalPong.js";

export default class LocalGamePage extends Component {
    template() {
        return `
        <div>
            <div id="p1-score"></div>
            <div id="p2-score"></div>
            <div id="local_canvas"></canvas>
        </div>
        `;
    }
    
    mounted() {
        const $local_canvas = this.$target.querySelector("#local_canvas")

        new LocalPong();

    }
}
