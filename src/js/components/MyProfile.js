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

// 사진 업로드 할때 용량 줄여서 보내줄건지 아니면 그냥 보내줄건지도 회의 필요합니다.