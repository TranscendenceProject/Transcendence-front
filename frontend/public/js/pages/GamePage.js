import Component from "../core/Component.js";

export default class GamePage extends Component {
  template() {
    return `
    <div class="main-box">
      <div class="btn-box">
        <ul>
          <li>
            <a class="btn btn-primary" role="button"  href="#/game/localGame">로컬플레이</a>
          </li>
          <li>
            <a class="btn btn-primary" role="button"  href="#/game/multiGame">멀티플레이</a>
          </li>
          <li>
            <a class="btn btn-primary" role="button" href="#/game/tournamentGame">토너먼트</a>
          </li>
        </ul>
      </div>
      <img class="pikachu-image" src="../images/background.jpeg"></img>
    </div>
    `;
  }
}
// 기존에 쓰던건데 이제 안쓰는거, 그냥 state관리 참고용으로 놔둠
// setup() {
//     this.$state = {
//         render: "none",
//     };
// }
// template() {
//     let canvasContent = "";
//     switch (this.$state.render) {
//         case "local":
//             canvasContent = `
//                 <div>
//                   <span>local canvas</span>
//                   <canvas id="local_canvas">Local Canvas Content</canvas>
//                 </div>
//                 `;
//             break;
//         case "two":
//             canvasContent =
//                 '<canvas id="two_canvas">Two Canvas Content</canvas>';
//             break;
//         case "four":
//             canvasContent =
//                 '<canvas id="four_canvas">Four Canvas Content</canvas>';
//             break;
//         default:
//             canvasContent = `<div class="main-box">
//             <div class="btn-box">
//             <ul>
//               <li>
//                 <a class="btn btn-primary" role="button" id="local" >로컬플레이</a>
//               </li>
//               <li>
//                 <a class="btn btn-primary" role="button" id ="two">멀티플레이</a>
//               </li>
//               <li>
//                 <a class="btn btn-primary" role="button" id = "four">토너먼트</a>
//               </li>
//               <li>${this.$state.render}</li>
//             </ul>
//             </div>
//             <img class="pikachu-image" src="../images/background.jpeg"></img>
//           </div>`;
//             break;
//     }
//     return `
//     ${canvasContent}
// `;
// }
// setEvent() {
//     this.addEvent("click", "#local", ({ target }) => {
//         const prev = this.$state.render;
//         this.local(prev);
//     });
//     this.addEvent("click", "#two", ({ target }) => {
//         const prev = this.$state.render;
//         this.two(prev);
//     });
//     this.addEvent("click", "#four", ({ target }) => {
//         const prev = this.$state.render;
//         this.four(prev);
//     });
// }
// local(prev) {
//     this.setState({
//         render: "local",
//     });
// }
// two(prev) {
//     this.setState({
//         render: "two",
//     });
// }
// four(prev) {
//     this.setState({
//         render: "four",
//     });
// }
