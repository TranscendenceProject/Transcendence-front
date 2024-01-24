import Component from "../core/Component.js";
import api from '../api/http.js';

export default class MyProfile extends Component {
  constructor($target, $props) {
    super($target, $props);
    this.getUserData();
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
          <input type="file" id = "inputProfile"  style= "display:none;" accept=".jpg" >
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
      this.inputChange();
    });
    this.addEvent("change", "#inputProfile", ({ target }) => {
      this.editButton();
    });
  }

  inputChange() {
    const newName = document.getElementById("inputName").value;
    const newBio = document.getElementById("inputBio").value;
    console.log(newName,newBio);
    this.setState({
      name: newName, 
      bio: newBio,
      });
      console.log(this.$state)
    this.postUserData();
    console.log(this.$state);
  }
  
  editButton() {
    console.log("edit button clicked");
    
    const newImg = document.getElementById("inputProfile");
    let profile_form = new FormData();
    if (newImg.files.length > 0) {
      console.log(newImg.files[0], newImg.files[0].name);
      let maxSize = 4 * 1024 * 1024; //* 5MB 사이즈 제한
      let fileSize = newImg.files[0].size; //업로드한 파일용량
      console.log(fileSize)



      profile_form.append("profile_image",  newImg.files[0], newImg.files[0].name);
      // profile_form.append("comment", newImg.files[0].commentValue);
    

      if(fileSize > maxSize){
        alert("파일첨부 사이즈는 4MB 이내로 가능합니다.");
        newImg.value = "";
        return; 
      }
	}
    // for (var pair of profile_form.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]); 
    // }
    const img_url = 'http://127.0.0.1:8000'+ this.PostUserImg(profile_form);
    console.log(img_url)
    this.setState({
      img_url: img_url.file_url,
    });
  }

  async getUserData() {
    const url = `http://127.0.0.1:8000/users/info/read`;

    const token = localStorage.getItem('token');
    const headers = { 'JWT': token };

    try {
      const response = await api.get(url, headers);
      // console.log(response);
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

  async postUserData() {
    const url = 'http://127.0.0.1:8000/users/info/update'
    const token = localStorage.getItem('token');
    const headers = { 'JWT': token , "Content-Type": 'application/json'};
    console.log(this.$state)
    const body = {
      user_id: this.$state.user_id,
      intra_id: this.$state.intra_id,
      nick_name: this.$state.name,
      bio: this.$state.bio,
      img_url: this.$state.profile_picture,
    }
    console.log(body)

    try {
      const response = await api.post(url, body, headers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  async PostUserImg(body) {
    const url = 'http://127.0.0.1:8000/users/info/update/image';
    // for (var pair of body.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1].name); 
    // }
    const token = localStorage.getItem('token');
    const headers = { 'JWT': token, 'Accept': 'application/json', };
    try {
      const response = await api.post(url, body, headers);
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  
  }
}
