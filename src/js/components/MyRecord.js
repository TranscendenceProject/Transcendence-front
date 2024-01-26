import Component from '../core/Component.js';
import PercentageCircle from './PercentageCircle.js';
import api from '../api/http.js';

export default class myRecord extends Component {
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
      histories: [{
        "intra_pk_id": "kjaeifsdfsdf",
        "intra_id": "raichu",
        "nick_name": "raichuchu",
        "start_time": "2024-01-19T17:32:28Z",
        "score": 4,
        "opponent_score": 7,
        "game_result": "win"
      },{
        "intra_pk_id": "kjaeifsdfsdf",
        "intra_id": "raichu",
        "nick_name": "raichuchu",
        "start_time": "2024-01-19T17:32:28Z",
        "score": 4,
        "opponent_score": 7,
        "game_result": "win"
      },{
        "intra_pk_id": "kjaeifsdfsdf",
        "intra_id": "raichu",
        "nick_name": "raichuchu",
        "start_time": "2024-01-19T17:32:28Z",
        "score": 4,
        "opponent_score": 7,
        "game_result": "win"
      },{
        "intra_pk_id": "kjaeifsdfsdf",
        "intra_id": "raichu",
        "nick_name": "raichuchu",
        "start_time": "2024-01-19T17:32:28Z",
        "score": 4,
        "opponent_score": 7,
        "game_result": "win"
      },{
        "intra_pk_id": "kjaeifsdfsdf",
        "intra_id": "raichu",
        "nick_name": "raichuchu",
        "start_time": "2024-01-19T17:32:28Z",
        "score": 4,
        "opponent_score": 7,
        "game_result": "win"
      }]
    };
  }

  template() {
    return `
    <h3>
      My Record
    </h3>
    <div id="record-box">
      <div id="record-profile-box">
        <div>
          <img id = "imgRecord" src=${this.$state.profile_picture}>
          <div>${this.$state.intra_id}(${this.$state.nick_name})</div>
        </div>
        <div id="record-circle-box">
          <div id="record-circle-text">0승 0패</div>
          <div id="record-circle">
            <div data-component='PercentageCircle'></div>
          </div>
        </div>
      </div>
      <hr>
      <div id="record-list-box">
          ${this.$state.histories.map((history) => `
            <div class="record-list-item">
              <div class="record-list-item-date">${history.start_time}</div>
              <div class="record-list-item-opponent">${history.name}</div>
              <div class="record-list-item-result">${history.game_result}</div>
              <hr>
            </div>
          `).join('')}
      </div>
    </div>
    `;
  }
  mounted() {
    const $PercentageCircle = this.$target.querySelector(
      "[data-component='PercentageCircle']"
    );
    new PercentageCircle($PercentageCircle, {percentage:70});
    }

    async getUserData() {
      const url = `http://127.0.0.1:8000/users/info/read`;
  
      const token = localStorage.getItem('token');
      const headers = { 'JWT': token };
  
      try {
        const response = await api.get(url, headers);
        console.log(response)
        // console.log(response);
        // 가져온 데이터로 상태 업데이트
        this.setState({
          intra_pk_id: response.intra_pk_id,
          intra_id: response.intra_id,
          nick_name: response.nick_name,
          bio: response.bio,
          profile_picture: response.profile_picture,
          // histories: response.histories,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
}

