import Component from '../core/Component.js';
import api from '../api/http.js';

export default class Otp extends Component {
  setup() {
    this.$state = { otpString: ['', '', '', '', '', ''] };
  }

  template() {
    return `
    <div class="otp-card">
      <h1>OTP Verification Form</h1>
      <p>Code has been sent to your email</p>
      <div class="otp-card-inputs">
        <input type="text" maxlength="1" autofocus>
        <input type="text" maxlength="1">
        <input type="text" maxlength="1">
        <input type="text" maxlength="1">
        <input type="text" maxlength="1">
        <input type="text" maxlength="1">
      </div>
      <button id="verifyButton" ${this.isVerifyButtonDisabled() ? 'disabled' : ''}>Verify</button>
    </div>
    `;
  }

  setEvent() {
    this.addEvent('input', '.otp-card-inputs input', (e) => this.handleInput(e));
    this.addEvent('keydown', '.otp-card-inputs input', (e) => this.handleKeyDown(e));
    this.addEvent('click', '#verifyButton', () => this.handleButtonClick());
  }

  handleInput(e) {
    const currentElement = e.target;
    const nextElement = currentElement.nextElementSibling;

    const reg = /^[0-9]+$/;
    if (reg.test(currentElement.value) === false) {
      currentElement.value = '';
    } else {
      this.$state.otpString[Array.from(currentElement.parentNode.children).indexOf(currentElement)] = currentElement.value;
      if (currentElement.value && nextElement) {
        nextElement.focus();
      }
    }

    this.updateVerifyButtonState();
  }

  handleKeyDown(e) {
    const currentElement = e.target;
    const prevElement = currentElement.previousElementSibling;
    const currentIndex = Array.from(currentElement.parentNode.children).indexOf(currentElement);
    const prevIndex = prevElement ? Array.from(prevElement.parentNode.children).indexOf(prevElement) : 0;

    if (e.keyCode === 8) {
      if (currentIndex == 5) {
        this.$state.otpString[currentIndex] = ''; 
      }
      if (currentElement.value === '' && prevElement) {
        this.$state.otpString[prevIndex] = '';
        prevElement.focus();
      }
    }
  }

  async handleButtonClick() {
    console.log(this.$state.otpString.join(''));

    
    const jwtTokenEndpoint = 'http://127.0.0.1:8000/users/verify/';
    const requestData = {
      access_token: `${localStorage.getItem('access_token')}`,
      input_number: `${this.$state.otpString.join('')}`,
    };
    
    try {
      const response = await api.post(jwtTokenEndpoint, requestData);
      console.log(response)
      if (response.status === 'NO') {
        this.$state.otpString = ['', '', '', '', '', ''];
        alert('입력한 OTP가 유효하지 않습니다');
      } else {
        const token = response.jwt_token;
        localStorage.setItem('token', token);
        localStorage.setItem('loginState', true);
        console.log(`로그인 성공!\njwt_token: ${localStorage.getItem('token')}`);
        window.location.href = `http://127.0.0.1/#/`;
      }
    } catch (error) {
      console.error('Error: ', error.message);
    }
  }

  updateVerifyButtonState() {
    const lastInput = this.$state.otpString[this.$state.otpString.length - 1];
    const isLastInputFilled = lastInput.trim() !== '';

    this.$target.querySelector('#verifyButton').disabled = !isLastInputFilled;
    console.log(this.$state.otpString);
  }

  isVerifyButtonDisabled() {
    return this.$state.otpString.some(value => value.trim() === '');
  }
}
