import Component from "../core/Component.js";

export default class LocalGamePage extends Component {
    template() {
        return `
        <div>
        <span>local canvas</span>
        <canvas id="local_canvas">Local Canvas Content</canvas>
        </div>
    `;
    }
}
