import Component from "../core/Component.js";

export default class ManageFriend extends Component {
  setup() {
    this.$state = {
      firends: [
        {
          intraId: 'seunghwk',
          nickname: 'seunghwk',
          isLogined: true,
          profilePictureUrl: 'assets/dummyProfile.jpg'
        },
        {
          intraId: 'gsong',
          nickname: 'gsong',
          isLogined: false,
          profilePictureUrl: 'assets/dummyProfile.jpg'
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
          <img src="${user.profilePictureUrl}" alt="Profile Picture">
          <p>Intra ID: ${user.intraId}</p>
          <p>Nickname: ${user.nickname}</p>
          <p>IsLogined: ${user.isLogined ? '로그인' : '로그아웃'}</p>
          <button>친구 삭제</button>
        </div>
      `).join('')}</div>
    </div>
    `;
  }
}
