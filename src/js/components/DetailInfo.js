import Component from '../core/Component.js';
import PercentageCircle from './PercentageCircle.js';
import api from '../api/http.js';

export default class DetailInfo extends Component {
  constructor($target, $props) {
    super($target, $props);
    this.getUserData();
  }
  setup() {
    this.$state = {
      intra_pk_id: 'dummy',
      intra_id: 'dummy',
      nick_name: 'dummy',
      profile_picture: 'assets/dummyProfile.jpeg',
      bio: 'bio',
      histories: [
      // {
      //   "intra_pk_id": "kjaeifsdfsdf",
      //   "intra_id": "raichu",
      //   "nick_name": "1",
      //   "start_time": "2024-01-19T17:32:28Z",
      //   "score": 4,
      //   "opponent_score": 7,
      //   "game_result": "lose"
      // },{
      //   "intra_pk_id": "kjaeifsdfsdf",
      //   "intra_id": "raichu",
      //   "nick_name": "2",
      //   "start_time": "2024-01-19T17:32:28Z",
      //   "score": 4,
      //   "opponent_score": 7,
      //   "game_result": "lose"
      // },{
      //   "intra_pk_id": "kjaeifsdfsdf",
      //   "intra_id": "raichu",
      //   "nick_name": "3",
      //   "start_time": "2024-01-19T17:32:28Z",
      //   "score": 5,
      //   "opponent_score": 2,
      //   "game_result": "win"
      // },{
      //   "intra_pk_id": "kjaeifsdfsdf",
      //   "intra_id": "raichu",
      //   "nick_name": "4",
      //   "start_time": "2024-01-19T17:32:28Z",
      //   "score": 4,
      //   "opponent_score": 7,
      //   "game_result": "lose"
      // },{
      //   "intra_pk_id": "kjaeifsdfsdf",
      //   "intra_id": "raichu",
      //   "nick_name": "3",
      //   "start_time": "2024-01-19T17:32:28Z",
      //   "score": 5,
      //   "opponent_score": 2,
      //   "game_result": "win"
      // },{
      //   "intra_pk_id": "kjaeifsdfsdf",
      //   "intra_id": "raichu",
      //   "nick_name": "3",
      //   "start_time": "2024-01-19T17:32:28Z",
      //   "score": 5,
      //   "opponent_score": 2,
      //   "game_result": "win"
      // },{
      //   "intra_pk_id": "kjaeifsdfsdf",
      //   "intra_id": "raichu",
      //   "nick_name": "3",
      //   "start_time": "2024-01-19T17:32:28Z",
      //   "score": 5,
      //   "opponent_score": 2,
      //   "game_result": "win"
      // },{
      //   "intra_pk_id": "kjaeifsdfsdf",
      //   "intra_id": "raichu",
      //   "nick_name": "3",
      //   "start_time": "2024-01-19T17:32:28Z",
      //   "score": 5,
      //   "opponent_score": 2,
      //   "game_result": "win"
      // },{
      //   "intra_pk_id": "kjaeifsdfsdf",
      //   "intra_id": "raichu",
      //   "nick_name": "3",
      //   "start_time": "2024-01-19T17:32:28Z",
      //   "score": 5,
      //   "opponent_score": 2,
      //   "game_result": "win"
      // }]
      // }
    ]};
  }

  template() {
    return `
    <div id="record-box">
      <div id="record-profile-box">
        <div>
          <img id = "imgRecord" src=${this.$state.profile_picture}>
          <div>${this.$state.intra_id}(${this.$state.nick_name})</div>
        </div>
        <div id="record-circle-box">
          <div id="record-circle-text">${this.calculateWinRate()[0]}승 ${this.calculateWinRate()[1]}패 </div>
          <div id="record-circle">
            <div data-component='PercentageCircle'></div>
          </div>
        </div>
      </div>
      <div id="record-list-box">
          ${this.$state.histories.map((history) => `
              <div id="record-item">
                ${history[0].game_result === "lose" ? `<div id="record-item-lose"> </div>`: `<div id="record-item-win"> </div>`}
                <div class="column-line"></div>

                <div id="record-item-name">vs ${history[0].intra_id} (${history[0].nick_name})</div>
                <div class="column-line"></div>
                <div id="record-item-time">${this.dateFormat(history[0].start_time)}</div>
                <div class="column-line"></div>
                <div id="record-item-score">${history[0].score} : ${history[0].opponent_score} ${history[0].game_result}</div>
              </div>
              <hr>
          `).join('')}
      </div>
    </div>
    `;
  }
 
  mounted() {
    const $PercentageCircle = this.$target.querySelector(
      "[data-component='PercentageCircle']"
    );
    if (this.calculateWinRate()[0] === 0 && this.calculateWinRate()[1] === 0)
      new PercentageCircle($PercentageCircle, {percentage: 100});
    else
      new PercentageCircle($PercentageCircle, {percentage: Math.floor(this.calculateWinRate()[0] / (this.calculateWinRate()[0] + this.calculateWinRate()[1]) * 100)});
    }

  calculateWinRate() {
    const winCount = this.$state.histories.filter((history) => history[0].game_result === 'win').length;
    const totalCount = this.$state.histories.length;
    return ([winCount, totalCount - winCount]);
  }
  dateFormat(inputDateStr) {
    const inputDate = new Date(inputDateStr);
    

    // const outputFormat = new Intl.DateTimeFormat('en-GB', {
    //   year: '2-digit',
    //   month: '2-digit',
    //   day: '2-digit',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   timeZone: 'UTC'
    // });
    // 2024-02-22T12:23:29Z
    let result = `${inputDate.getHours()}:${inputDate.getMinutes()}`;
    return result;
    // return outputFormat.format(inputDate);
  }

  async getUserData() {
    const targetId = this.$props.id;
    const path = `/users/info/read?target_pk_id=${targetId}`;

    const token = localStorage.getItem('token');
    const headers = { 'JWT': token };

    try {
      const response = await api.get(path, headers);
      // 가져온 데이터로 상태 업데이트
      console.log(this.$state.nick_name);
      this.setState({
        intra_pk_id: response.intra_pk_id,
        intra_id: response.intra_id,
        nick_name: response.nick_name,
        profile_picture: response.profile_picture,
        bio: response.bio,
        histories: response.histories,
      });
      console.log(this.$state.nick_name);
      console.log(this.$state.intra_pk_id);
      console.log(response);
      console.log(this.$state);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  limitNicknameLength(nickname) {
    console.log(nickname);
    if (nickname.length >= 10) {
      nickname = nickname.substring(0, 10) + "...";
    }
    return nickname;
  }
}
