import Component from "../core/Component.js";
import api from '../api/http.js';

export default class MyProfile extends Component {
  constructor($target, $props) {
    super($target, $props);
    // this.GetUserData();
    console.log("bb");// 이 시점에서 api 호출
  }

  setup() {
    
    this.$state = {
      user_id: 'user_id',
      intra_id: 'intra_id',
      name: 'name',
      img_url: 'assets/logo.jpeg',
      bio: 'bio',
    };
    console.log("aa");
    
  }
  template() {
    return `
      <div id = "profile-box">
        <div id ="profile-text-box">
          <p>Intra id</p>
          <span type="text" value=${this.$state.user_id} ></span>
          <p>name</p>
          <input type="text" value="${this.$state.name}" id = "inputName"></input>
          <p>Bio</p>
          <input type="text" value="${this.$state.bio}" id = "inputBio"></input>
        </div>
        <div id ="profile-img-box">
          <p>profile picture</p>
          <img class = profile-img></img>
          <button id="editButton">edit</button>
        </div>
        <a class="btn btn-primary" role="button" id ="saveButton">save</a>
      </div>
    `
  }
  
  
  setEvent() {
  this.addEvent("click", "#saveButton", ({ target }) => {
      this.InputChange();
    });
  }

  InputChange() {
    const newName = document.getElementById("inputName").value;
    const newBio = document.getElementById("inputBio").value;
    this.setState({
       name: newName, 
       bio: newBio,
      });
    console.log(this.$state)
  }

  async GetUserData() {
    // api 호출
    // HTTP 요청을 통해 데이터 가져오기
    // const {user_id} = this.$props.user_id;
    // const url = '/user/info/' + user_id; // 실제 API 엔드포인트로 변경 필요
    const user_id = localStorage.getItem('user_id');
    const url = '/users/info/' + user_id; 
    const token = localStorage.getItem('token');
    const headers = { 'token': token };

    try {
      const response = await api.get(url);

      // 가져온 데이터로 상태 업데이트
      this.setState({
        user_id: response.user_id,
        name: response.name,
        bio: response.bio,
        img_url: response.img_url,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async PostUserData() {
    // api 호출
    // HTTP 요청을 통해 데이터 가져오기
    const user_id = localStorage.getItem('user_id');
    const url = '/users/info/' + user_id; // 실제 API 엔드포인트로 변경 필요
    const token = localStorage.getItem('token');
    const headers = { 'token': token };

    try {
      const response = await api.post(url);

      // 가져온 데이터로 상태 업데이트
      this.setState({
        user_id: response.user_id,
        name: response.name,
        bio: response.bio,
        img_url: response.img_url,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
}

// user_id, name, bio, img_url 을 template에서 일단 선언해주고
// mounted 시점에서 api로 받아온 값을 setState로 넣어주면 될 것 같습니다.
// setState 되면 어차피 다시 render가 실행되니까요.
