import Component from "../core/Component.js";

export default class SearchUser extends Component {
  setup() {
    this.$state = {
      users: [
        {
          user_id: '1',
          intra_id: 'seunghwk',
          login_status: 'true',
          is_friend: 'false'
        },
        {
          user_id: '1',
          intra_id: 'gsong',
          login_status: 'false',
          is_friend: 'true'
        },
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
      <div> ${this.$state.users.map(user => `
        <div>
          <p>Intra ID: ${user.intra_id}</p>
          <p>로그인 상태: ${user.login_status === "true" ? '로그인 중' : '로그아웃'}</p>
          ${user.is_friend === "true" ?
          '<p>친구</p>' : `<button class="addButton" data-user-id="${user.user_id}">친구 추가</button>`}
        </div>
      `).join('')}</div>
    </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.searchButton', () => this.handleSearchButtonClick());
    this.addEvent('click', '.addButton', (e) => this.handleAddButtonClick(e));
  }

  handleSearchButtonClick() {
    const searchInput = this.$target.querySelector('.searchInput');
    const searchValue = searchInput.value;

    console.log('검색어:', searchValue);
    // this.searchUser(searchValue);


    // // 테스트 코드
    // this.setState({
    //   users: [
    //     {
    //       user_id: '1',
    //       intra_id: 'test',
    //       login_status: 'true',
    //       is_friend: 'false'
    //     },
    //     {
    //       user_id: '1',
    //       intra_id: 'test',
    //       login_status: 'false',
    //       is_friend: 'true'
    //     },
    //     {
    //       user_id: '1',
    //       intra_id: 'test',
    //       login_status: 'false',
    //       is_friend: 'true'
    //     },
    //   ],
    // });
  }

  handleAddButtonClick(e) {
    const targetUserId = e.target.dataset.userId;
    const targetUser = this.$state.users.find(user => user.user_id === targetUserId);
    const updatedUser = { ...targetUser, is_friend: 'true' };
    const newState = {
      ...this.$state,
      users: this.$state.users.map(user => (user.user_id === targetUserId ? updatedUser : user)),
    };

    // 아래 함수에서 요청이 잘 처리되었을 때 함수 내에서 setState 호출 예정
    // this.addFriend(targetUserId);
    this.setState(newState);
  }

  async searchUser(searchValue) {
    const url = `http://127.0.0.1:8000/friends/search?query=${searchInput}`;
    const token = localStorage.getItem('token');
    const headers = { 'token': token };

    try {
      const response = await api.get(url, headers);

      this.setState({
        users: response.users,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async addFriend(targetUserId) {
    const url = `http://127.0.0.1:8000/friends/add?user_id=${targetUserId}`;
    const token = localStorage.getItem('token');
    const headers = { 'JWT': token };
    try {
      const response = await api.post(url, headers);
      alert("추가 성공!");
      //추후 응답 코드에 따라 동작 추가 예정
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
