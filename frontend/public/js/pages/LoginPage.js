import Component from '../core/Component.js';
import Otp from '../components/Otp.js';


export default class Login extends Component {
  template() {
    return `
    <h2>Login Page</h2>
    <div data-component='Otp'></div>
    `;
  }

  mounted() {
    const $otp = this.$target.querySelector(
      "[data-component='Otp']"
    );
    new Otp($otp);
    }
}
