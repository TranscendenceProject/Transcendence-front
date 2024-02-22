import Component from "../core/Component.js";

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
}
