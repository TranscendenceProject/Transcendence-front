import Component from "../core/Component.js";
import api from '../api/http.js';

export default class MyProfile extends Component {
  constructor($target, $props) {
    super($target, $props);
    this.getUserData();
  }

  setup() {
    this.$state = {
      intra_pk_id: 'intra_pk_id',
      intra_id: 'intra_id',
      nick_name: 'nick_name',
      profile_picture: 'assets/logo.jpeg',
      bio: 'bio',
      check_message: '',
    };
  }
  template() {
    return `
    <div id = "profile-box">
      <div id ="profile-text-box">
        <h4>Intra id</h4>
        <div id = "divIntra"> ${this.$state.intra_id}</div>
        <h4>name</h4>
        <input type="text" value="${this.$state.nick_name}" id = "inputName"></input>
        <h4>Bio</h4>
        <input type="text" value="${this.$state.bio}" id = "inputBio"></input>
      </div>
      <div>
        <div id ="profile-img-box">
          <h4>profile picture</h4>
          <img id = "imgProfile" src=${this.$state.profile_picture}>
          <input type="file" id = "inputProfile"  style= "display:none;" accept=".jpg" >
          </img>
          <label class="btn btn-warning" id="editButton" for="inputProfile">
          edit
          </label>
        </div>
        <div id= "saveButtonBox">
        <a class="btn btn-success" role="button" id ="saveButton">save</a>
        <div id="saveMessage">${this.$state.check_message}</div>
        </div>
      </div>
    </div>
    `;
  }
  
  setEvent() {
    this.addEvent("change", "#inputName", ({ target }) => {
      const newName = document.getElementById("inputName").value;
      this.setState({
        nick_name: newName,
        check_message: '',

      });
    });
    this.addEvent("change", "#inputBio", ({ target }) => {
      const newBio = document.getElementById("inputBio").value;
      this.setState({
        bio: newBio,
        check_message: '',
      });
    });
    this.addEvent("click", "#saveButton", ({ target }) => {
      this.inputChange();
    });
    this.addEvent("change", "#inputProfile", ({ target }) => {
      this.editButton();
    });
  }

  inputChange() {
    const newName = document.getElementById("inputName").value;
    const newBio = document.getElementById("inputBio").value;
    this.setState({
      nick_name: newName, 
      bio: newBio,
      });
    this.postUserData();
  }
  
  async editButton() {
    console.log("edit button clicked");
    
    const newImg = document.getElementById("inputProfile");
    let profile_form = new FormData();
    if (newImg.files.length > 0) {
      let maxSize = 4 * 1024 * 1024; //* 5MB 사이즈 제한
      let fileSize = newImg.files[0].size; //업로드한 파일용량



      profile_form.append("profile_image",  newImg.files[0], newImg.files[0].name);
      // profile_form.append("comment", newImg.files[0].commentValue);
    

      if(fileSize > maxSize){
        alert("파일첨부 사이즈는 4MB 이내로 가능합니다.");
        newImg.value = "";
        return; 
      }
	}
  
    try {
      const file_url = await this.PostUserImg(profile_form);
      this.setState({
        profile_picture: file_url,
        check_message: '',
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async getUserData() {
    const url = `http://127.0.0.1:8000/users/info/read`;

    const token = localStorage.getItem('token');
    const headers = { 'JWT': token };

    try {
      const response = await api.get(url, headers);
      this.setState({
        intra_pk_id: response.intra_pk_id,
        intra_id: response.intra_id,
        nick_name: response.nick_name,
        profile_picture: response.profile_picture,
        bio: response.bio,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async postUserData() {
    const url = 'http://127.0.0.1:8000/users/info/update'
    const token = localStorage.getItem('token');
    const headers = { 'JWT': token , "Content-Type": 'application/json'};
    const body = {
      intra_pk_id: this.$state.intra_pk_id,
      intra_id: this.$state.intra_id,
      nick_name: this.$state.nick_name,
      bio: this.$state.bio,
      profile_picture: this.$state.profile_picture,
    }

    try {
      const response = await api.post(url, body, headers);
      this.setState({
        check_message: "저장 완료",
      });
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  async PostUserImg(body) {
    const url = 'http://127.0.0.1:8000/users/info/update/image';

    const token = localStorage.getItem('token');
    const headers = { 'JWT': token, 'Accept': 'application/json', };
    try {
      const response = await api.post(url, body, headers);      
      return ('http://127.0.0.1:8000'+response.file_url);
      // return response.data.file_url;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
