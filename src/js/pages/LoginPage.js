import Component from '../core/Component.js';
import Otp from '../components/Otp.js';


export default class LoginPage extends Component {
  template() {
    return `

    <div data-component='Otp' class="otp-box"></div>
    `;
  }

  mounted() {
    const $otp = this.$target.querySelector(
      "[data-component='Otp']"
    );
    new Otp($otp);
    }
}
