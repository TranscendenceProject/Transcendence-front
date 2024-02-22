import Component from "../core/Component.js";
import MultiPong from "../components/MultiPong.js";

export default class MultiGamePage extends Component {
    template() {
        return `
        <div>
            <div id="p1-score"></div>
            <div id="p2-score"></div>
            <div id="multi_canvas"></canvas>
        </div>
        `;
    }
}
