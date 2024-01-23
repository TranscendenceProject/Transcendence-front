import Component from "../core/Component.js";
import api from "../api/http.js";

export default class ManageFriend extends Component {
  constructor($target, $props) {
    this.super();
    // this.getFriendsList();
  } 

  setup() {
    this.$state = {
      firends: [
        {
          user_id: "1",
          intra_id: "seunghwk",
          login_status: true
        },
        {
          user_id: '2',
          intra_id: 'gsong',
          login_status: false,
        },
      ],
    };
  }

  template() {
    return `
    <div>
      <h2>친구 관리</h2>
      <div> ${this.$state.firends.map(user => `
        <div>
          <p>User ID: ${user.user_id}</p>
          <p>Intra ID: ${user.intra_id}</p>
          <p>IsLogined: ${user.login_status ? '로그인' : '로그아웃'}</p>
          <button>친구 삭제</button>
        </div>
      `).join('')}</div>
    </div>
    `;
  }

  async getFriendsList() {
    const url = 'http://127.0.0.1:8000/firends/list';
    const token = localStorage.getItem('token');
    const headers = { 'token': token };
    try {
      const response = await api.get(url, headers);

      this.setState({
        firends: response.firends,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
