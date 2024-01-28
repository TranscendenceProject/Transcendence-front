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
      histories: [{
        "intra_pk_id": "kjaeifsdfsdf",
        "intra_id": "raichu",
        "nick_name": "1",
        "start_time": "2024-01-19T17:32:28Z",
        "score": 4,
        "opponent_score": 7,
        "game_result": "lose"
      },{
        "intra_pk_id": "kjaeifsdfsdf",
        "intra_id": "raichu",
        "nick_name": "2",
        "start_time": "2024-01-19T17:32:28Z",
        "score": 4,
        "opponent_score": 7,
        "game_result": "lose"
      },{
        "intra_pk_id": "kjaeifsdfsdf",
        "intra_id": "raichu",
        "nick_name": "3",
        "start_time": "2024-01-19T17:32:28Z",
        "score": 5,
        "opponent_score": 2,
        "game_result": "win"
      },{
        "intra_pk_id": "kjaeifsdfsdf",
        "intra_id": "raichu",
        "nick_name": "4",
        "start_time": "2024-01-19T17:32:28Z",
        "score": 4,
        "opponent_score": 7,
        "game_result": "lose"
      },{
        "intra_pk_id": "kjaeifsdfsdf",
        "intra_id": "raichu",
        "nick_name": "3",
        "start_time": "2024-01-19T17:32:28Z",
        "score": 5,
        "opponent_score": 2,
        "game_result": "win"
      },{
        "intra_pk_id": "kjaeifsdfsdf",
        "intra_id": "raichu",
        "nick_name": "3",
        "start_time": "2024-01-19T17:32:28Z",
        "score": 5,
        "opponent_score": 2,
        "game_result": "win"
      },{
        "intra_pk_id": "kjaeifsdfsdf",
        "intra_id": "raichu",
        "nick_name": "3",
        "start_time": "2024-01-19T17:32:28Z",
        "score": 5,
        "opponent_score": 2,
        "game_result": "win"
      },{
        "intra_pk_id": "kjaeifsdfsdf",
        "intra_id": "raichu",
        "nick_name": "3",
        "start_time": "2024-01-19T17:32:28Z",
        "score": 5,
        "opponent_score": 2,
        "game_result": "win"
      },{
        "intra_pk_id": "kjaeifsdfsdf",
        "intra_id": "raichu",
        "nick_name": "3",
        "start_time": "2024-01-19T17:32:28Z",
        "score": 5,
        "opponent_score": 2,
        "game_result": "win"
      }]
    };
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
              <div id="record-item-text">vs ${history.intra_id} (${history.nick_name})</div>
              <div class="column-line"></div>
              <div id="record-item-text">${this.dateFormat(history.start_time)}</div>
              <div class="column-line"></div>
              <div id="record-item-text">${history.score} : ${history.opponent_score} ${history.game_result}</div>
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

    new PercentageCircle($PercentageCircle, {percentage: Math.floor(this.calculateWinRate()[0] / (this.calculateWinRate()[0] + this.calculateWinRate()[1]) * 100)});
  }

  calculateWinRate() {
    const winCount = this.$state.histories.filter((history) => history.game_result === 'win').length;
    const totalCount = this.$state.histories.length;
    return ([winCount, totalCount - winCount]);
  }
  dateFormat(inputDateStr) {
    const inputDate = new Date(inputDateStr);


    const outputFormat = new Intl.DateTimeFormat('en-GB', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    });

    return outputFormat.format(inputDate);
  }

  async getUserData() {
    const targetId = this.$props.id;
    const url = `http://127.0.0.1:8000/users/info/read?target_pk_id=${targetId}`;
    const token = localStorage.getItem('token');
    const headers = { 'JWT': token };

    try {
      const response = await api.get(url, headers);
      // 가져온 데이터로 상태 업데이트
      this.setState({
        intra_pk_id: response.intra_pk_id,
        intra_id: response.intra_id,
        nick_name: response.nick_name,
        profile_picture: response.profile_picture,
        bio: response.bio,
        // histories: response.histories,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

