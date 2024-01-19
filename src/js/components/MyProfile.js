import Component from "../core/Component.js";
import api from '../api/http.js';

export default class MyProfile extends Component {
  constructor($target, $props) {
    super($target, $props);
    this.GetUserData();
    console.log("bb");// 이 시점에서 api 호출
  }

  setup() {
    this.$state = {
      nickname: 'nickname',
      name: 'name',
      bio: 'bio',
      img_url: 'assets/logo.jpeg',
      
    };
    console.log("aa");
    
  }
  template() {
    return `
    <div>
      <h2>Public Profile</h2>
      <div>
        <div id ="profile-text-box">
          <p>Intra id</p>
          <input type="text" value=${this.$state.nickname}></input>
          <p>name</p>
          <input type="text" value="${this.$state.name}"></input>
          <p>Bio</p>
          <input type="text" value="${this.$state.bio}"></input>
        </div>
        <div id ="profile-img-box">
          <p>profile picture</p>
          <img class = profile-img></img>
          <button>edit</button>
        </div>
      </div>
      <button>save</button>
    </div>
    `
  }
  
  async mounted() {
  
  }

  setEvent() {
   
  }
  async GetUserData() {
    // api 호출
    // HTTP 요청을 통해 데이터 가져오기
    const url = 'API_ENDPOINT'; // 실제 API 엔드포인트로 변경 필요
    const token = localStorage.getItem('token');
    const headers = { 'token': token };

    try {
      const response = await api.get(url);

      // 가져온 데이터로 상태 업데이트
      this.setState({
        nickname: response.nickname,
        name: response.name,
        bio: response.bio,
        img_url: response.img_url,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  setState() {

  }
}

// nickname, name, bio, img_url 을 template에서 일단 선언해주고
// mounted 시점에서 api로 받아온 값을 setState로 넣어주면 될 것 같습니다.
// setState 되면 어차피 다시 render가 실행되니까요.
