import Component from "../core/Component.js";

export default class SearchUser extends Component {
  setup() {
    this.$state = {
      users: [
        {
          intraId: 'seunghwk',
          nickname: 'seunghwk',
          isFriend: true,
          profilePictureUrl: 'assets/dummyProfile.jpg'
        },
        {
          intraId: 'gsong',
          nickname: 'gsong',
          isFriend: false,
          profilePictureUrl: 'assets/dummyProfile.jpg'
        },
      ],
    };
  }

  template() {
    return `
    <div>
      <h2>유저 검색</h2>
      <p>유저명</p>
      <input type="text" value=""></input>
      <button>검색</button>
      <div> ${this.$state.users.map(user => `
      <div>
        <img src="${user.profilePictureUrl}" alt="Profile Picture">
        <p>Intra ID: ${user.intraId}</p>
        <p>Nickname: ${user.nickname}</p>
        <p>Is Friend: ${user.isFriend ? '친구' : '<button>친구 추가</button>'}</p>
        </div>
      `).join('')}</div>
    </div>
    `;
  }
}
