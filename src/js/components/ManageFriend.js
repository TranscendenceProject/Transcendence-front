import Component from "../core/Component.js";
import api from "../api/http.js";

export default class ManageFriend extends Component {
  constructor($target, $props) {
    super($target, $props);
    this.getFriendsList();
  } 

  setup() {
    this.$state = {
      friends: [
        // {
        //   intra_pk_id: "1",
        //   friend_name: "seunghwk",
        //   is_login: true,
        // },
        // {
        //   intra_pk_id: '2',
        //   friend_name: 'gsong',
        //   is_login: false,
        // },
      ],
    };
  }

  template() {
    return `
    <div>
      <h2>친구 관리</h2>
      <div> ${this.$state.friends.map(user => `
        <div>
          <p>Intra ID: ${user.friend_name}</p>
          <p>로그인 상태: ${user.is_login === true ? '로그인 중' : '로그아웃'}</p>
          <button class="deleteButton" data-user-id="${user.intra_pk_id}">친구 삭제</button>
        </div>
      `).join('')}</div>
    </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.deleteButton', (e) => this.handleDeleteButtonClick(e));
  }

  handleDeleteButtonClick(e) {
    const userIdToRemove = e.target.dataset.userId;
    const newState = {
      ...this.$state,
      friends: this.$state.friends.filter(user => user.intra_pk_id !== userIdToRemove),
    };

    // 아래 함수에서 요청이 잘 처리되었을 때 함수 내에서 setState 호출 예정
    this.deleteFriend(userIdToRemove);
    this.setState(newState);
  }

  async getFriendsList() {
    const url = `http://127.0.0.1:8000/friends/list`;
    const token = localStorage.getItem('token');
    const headers = { 'JWT': token };
    try {
      const response = await api.get(url, headers);

      this.setState({
        friends: response.friends,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async deleteFriend(targetUserId) {
    const url = `http://127.0.0.1:8000/friends/delete?friend_intra_pk_id=${targetUserId}`;
    const token = localStorage.getItem('token');
    const headers = { 'JWT': token };
    try {
      const response = await api.delete(url, headers);
      alert("삭제 성공!");
      //추후 응답 코드에 따라 동작 추가 예정
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
