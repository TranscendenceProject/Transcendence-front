import Component from "../core/Component.js";

export default class MultiGamePage extends Component {
    template() {
        return `
        <div>
        <span>Multi canvas</span>
        <canvas id="multi_canvas">Multi Canvas Content</canvas>
        </div>
    `;
    }
}
