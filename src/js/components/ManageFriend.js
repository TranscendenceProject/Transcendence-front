import Component from "../core/Component.js";
import DetailInfo from"../components/DetailInfo.js";
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
          <button class="detailInfoButton" data-user-id="${user.intra_pk_id}">상세 정보</button>
          <button class="deleteButton" data-user-id="${user.intra_pk_id}">친구 삭제</button>
        </div>
      `).join('')}</div>
      <div id="modalContainer">
        <div id="modal">
          <span id="modalClose">&times;</span>
          <div data-component='detailInfo' id="detailInfo"/>
        </div>
      </div>
    </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.detailInfoButton', (e) => this.handleDetailInfoButtonClick(e));
    this.addEvent('click', '.deleteButton', (e) => this.handleDeleteButtonClick(e));
    this.addEvent('click', '#modalClose', () => this.handleModalCloseButtonClick());
  }

  handleDeleteButtonClick(e) {
    const userIdToRemove = e.target.dataset.userId;
    const newState = {
      ...this.$state,
      friends: this.$state.friends.filter(user => user.intra_pk_id !== userIdToRemove),
    };

    this.deleteFriend(userIdToRemove);
    this.setState(newState);
  }

  handleDetailInfoButtonClick(e) {
    const $detailInfo = this.$target.querySelector(
      "[data-component='detailInfo']"
    );
    const targetUserId = e.target.dataset.userId;

    new DetailInfo($detailInfo, { id: targetUserId });

    const modalContainer = document.getElementById('modalContainer');
    modalContainer.style.display = 'flex';
    modalContainer.focus();
  }

  handleModalCloseButtonClick() {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.style.display = 'none';
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
