import Component from '../core/Component.js';
import PercentageCircle from './PercentageCircle.js';

export default class myRecord extends Component {
  setup() {
  }
  template() {
    return `
    <h3>
      My Record
    </h3>
    <div id="record-box">
      <div id="record-profile-box">
        <div id="record-profile-img"></div>
        <div id="record-circle-box">
          <div id="record-circle-text">0승 0패</div>
          <div id="record-circle">
            <div data-component='PercentageCircle'></div>
          </div>
        </div>
      </div>
      <div id="record-list-box">

      </div>
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

