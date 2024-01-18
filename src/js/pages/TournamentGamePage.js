import Component from "../core/Component.js";
import PercentageCircle from "../components/percentageCircle.js";
export default class TournamentGamePage extends Component {
    template() {
        return `
        <div>
        <span>Tournament canvas</span>
        <canvas id="tournament_canvas">Tournament Canvas Content</canvas>
        <div data-component='PercentageCircle'></div>
        
        </div>
        `;
    }
    mounted() {
        const $PercentageCircle = this.$target.querySelector(
          "[data-component='PercentageCircle']"
        );
        new PercentageCircle($PercentageCircle, {percentage:70});
        }
}
