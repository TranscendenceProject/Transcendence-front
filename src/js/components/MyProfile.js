import Component from "../core/Component.js";

export default class MyProfile extends Component {
  template() {
    return `
    <div>
      <h2>Public Profile</h2>
      <p>Intra id</p>
      <input type="text" value="seunghwk"></input>
      <p>name</p>
      <input type="text" value="Pikachu"></input>
      <p>Bio</p>
      <input type="text" value="hello world!"></input>
    </div>
    `
  }
}