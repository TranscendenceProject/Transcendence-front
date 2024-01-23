import Component from "../core/Component.js";

export default class PercentageCircle extends Component {
    setup() {
        this.$state = this.$props.percentage;
    }
    template() {
        const percentage  = this.$state;
        console.log(percentage)
        return `
        <div class="single-chart">
          <svg viewBox="0 0 36 36" class="circular-chart blue">
            <path class="circle-bg"d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
            <path class="circle" stroke-dasharray="${percentage}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
            <text x="18" y="20.35" class="percentage">${percentage}%</text>
          </svg>        
        </div>
        `;
    }
}
