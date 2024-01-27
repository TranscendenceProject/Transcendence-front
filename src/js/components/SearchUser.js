import Component from "../core/Component.js";
import DetailInfo from"../components/DetailInfo.js";
import api from "../api/http.js";

export default class SearchUser extends Component {
  setup() {
    this.$state = {
      user_profiles: [
        // {
        //   intra_pk_id: '1',
        //   intra_id: 'seunghwk',
        //   nick_name: 'seunghwk',
        //   is_login: true,
        //   is_friend: false
        // },
        // {
        //   intra_pk_id: '1',
        //   intra_id: 'gsong',
        //   is_login: false,
        //   is_friend: true
        // },
      ],
    };
  }

  template() {
    return `
    <div>
      <h2>유저 검색</h2>
      <p>유저명</p>
      <input type="text" class="searchInput" value="">
      <button class="searchButton">검색</button>
      <div> ${this.$state.user_profiles.map(user => `
        <div>
          <p>Intra ID: ${user.intra_id}</p>
          <p>로그인 상태: ${user.is_login === true ? '로그인 중' : '로그아웃'}</p>
          <button class="detailInfoButton" data-user-id="${user.intra_pk_id}">상세 정보</button>
          ${user.is_friend === true ?
          '<p>친구</p>' : `<button class="addButton" data-user-id="${user.intra_pk_id}">친구 추가</button>`}
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
    this.addEvent('click', '.searchButton', () => this.handleSearchButtonClick());
    this.addEvent('click', '.detailInfoButton', (e) => this.handleDetailInfoButtonClick(e));
    this.addEvent('click', '.addButton', (e) => this.handleAddButtonClick(e));
    this.addEvent('click', '#modalClose', () => this.handleModalCloseButtonClick());
  }

  handleSearchButtonClick() {
    const searchInput = this.$target.querySelector('.searchInput');
    const searchValue = searchInput.value;

    this.searchUser(searchValue);
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

  handleAddButtonClick(e) {
    const targetUserId = e.target.dataset.userId;
    const targetUser = this.$state.user_profiles.find(user => user.intra_pk_id === targetUserId);
    const updatedUser = { ...targetUser, is_friend: true };
    const newState = {
      ...this.$state,
      user_profiles: this.$state.user_profiles.map(user => (user.intra_pk_id === targetUserId ? updatedUser : user)),
    };

    // 아래 함수에서 요청이 잘 처리되었을 때 함수 내에서 setState 호출 예정
    this.addFriend(targetUserId);
    this.setState(newState);
  }

  async searchUser(searchValue) {
    const url = `http://127.0.0.1:8000/users/info/search?key_word=${searchValue}`;
    const token = localStorage.getItem('token');
    const headers = { 'JWT': token };

    try {
      const response = await api.get(url, headers);

      this.setState({
        user_profiles: response.user_profiles,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async addFriend(targetUserId) {
    const url = `http://127.0.0.1:8000/friends/add?friend_intra_pk_id=${targetUserId}`;
    const token = localStorage.getItem('token');
    const headers = { 'JWT': token };
    try {
      const response = await api.post(url,{}, headers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
