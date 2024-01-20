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
        <img id = "imgProfile" src=${this.$state.img_url}>
        <input type="file" id = "inputProfile"  style= "display:none;" accept="image/*" >
        </img>
        <label id="editButton" for="inputProfile">
          edit
        </label>
      </div>
    </div>
    <a class="btn btn-primary" role="button" id ="saveButton">save</a>
    `
  }
  
  
  setEvent() {
  this.addEvent("click", "#saveButton", ({ target }) => {
      this.InputChange();
    });
    this.addEvent("click", "#editButton", ({ target }) => {
      this.EditButton();
    });
  }

  InputChange() {
    const newName = document.getElementById("inputName").value;
    const newBio = document.getElementById("inputBio").value;
    this.setState({
       name: newName, 
       bio: newBio,
      });
    // this.PostUserData();
    console.log(this.$state);
  }
  
  EditButton() {
    console.log("edit button clicked");
    const newImg = document.getElementById("imgProfile").value;
    const {img_url} = this.PostUserImg(newImg);
    this.setState({
      img_url: img_url,
    });
  }

  async GetUserData() {
    const user_id = localStorage.getItem('user_id');
    const url = 'http://127.0.0.1:8000/users/info/' + user_id; 
    const token = localStorage.getItem('token');
    const headers = { 'token': token };

    try {
      const response = await api.get(url, headers);

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
    const user_id = localStorage.getItem('user_id');
    const url = 'http://127.0.0.1:8000/users/info/' + user_id;
    const token = localStorage.getItem('token');
    const headers = { 'token': token };
    let profile_form = new FormData();
    profile_form.append('user_id', this.$state.user_id);
    profile_form.append('intra_id', this.$state.intra_id);
    profile_form.append('name', this.$state.name);
    profile_form.append('img_url', this.$state.img_url);
    profile_form.append('bio', this.$state.bio);
    
    const body = profile_form;
    console.log(body)
    try {
      const response = await api.post(url, body, headers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  async PostUserImg(Img) {
    const user_id = localStorage.getItem('user_id');
    const url = 'http://127.0.0.1:8000/users/info/image' + user_id;
    const token = localStorage.getItem('token');
    const headers = { 'token': token };
    let profile_form = new FormData();
    profile_form.append('profile_image', Img);
    
    const body = profile_form;
    console.log(body)
    try {
      const response = await api.post(url, body, headers);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  
  }
}

// user_id, name, bio, img_url 을 template에서 일단 선언해주고
// mounted 시점에서 api로 받아온 값을 setState로 넣어주면 될 것 같습니다.
// setState 되면 어차피 다시 render가 실행되니까요.



// 사진 업로드 로직
// 1. 사진 업로드 버튼 클릭
// 2. input type="file" 을 통해 사진 선택
// 3. 선택한 사진을 서버에 전송 (멀티파트 데이터로 전송,   https://developer.mozilla.org/ko/docs/Web/API/FormData/Using_FormData_Objects)
// 4. 서버에서 사진을 저장하고, 저장된 사진의 url을 반환
// 5. 반환된 url을 setState로 업데이트
// 6. setState 되면 어차피 다시 render가 실행되니까요.