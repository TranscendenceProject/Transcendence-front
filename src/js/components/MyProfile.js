import Component from "../core/Component.js";
import api from '../api/http.js';

export default class MyProfile extends Component {
  constructor($target, $props) {
    super($target, $props);
    // this.GetUserData();
  }

  setup() {
    
    this.$state = {
      user_id: 'user_id',
      intra_id: 'intra_id',
      name: 'name',
      img_url: 'assets/logo.jpeg',
      bio: 'bio',
    };
  }
  template() {
    return `
    <h3>
    Public Profile
    </h3>
    <div id = "profile-box">
      <div id ="profile-text-box">
        <h4>Intra id</h4>
        <div id = "divIntra"> ${this.$state.intra_id}</div>
        <h4>name</h4>
        <input type="text" value="${this.$state.name}" id = "inputName"></input>
        <h4>Bio</h4>
        <input type="text" value="${this.$state.bio}" id = "inputBio"></input>
      </div>
      <div>
        <div id ="profile-img-box">
          <h4>profile picture</h4>
          <img id = "imgProfile" src=${this.$state.img_url}>
          <input type="file" id = "inputProfile"  style= "display:none;" accept="image/*" >
          </img>
          <label class="btn btn-warning" id="editButton" for="inputProfile">
          edit
          </label>
        </div>
        <div id= "saveButtonBox">
          <a class="btn btn-success" role="button" id ="saveButton">save</a>
        </div>
      </div>
    </div>
    `;
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
    const url = `http://127.0.0.1:8000/users/info/read`;
    const token = localStorage.getItem('token');
    const headers = { 'JWT': token };

    try {
      const response = await api.get(url, headers);
      console.log(response);
      // 가져온 데이터로 상태 업데이트
      this.setState({
        user_id: response.intra_pk_id,
        intra_id: response.intra_id,
        name: response.nick_name,
        bio: response.bio,
        img_url: response.profile_picture,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async PostUserData() {
    const user_id = localStorage.getItem('user_id');
    const url = 'http://127.0.0.1:8000/users/info/update'
    const token = localStorage.getItem('token');
    const headers = { 'JWT': token };
    let profile_form = new FormData();
    profile_form.append('intra_pk_id', this.$state.user_id);
    profile_form.append('intra_id', this.$state.intra_id);
    profile_form.append('nick_name', this.$state.name);
    profile_form.append('profile_picture', this.$state.img_url);
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
    const url = 'http://127.0.0.1:8000/users/info/update/image';
    const token = localStorage.getItem('token');
    const headers = { 'JWT': token };
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
