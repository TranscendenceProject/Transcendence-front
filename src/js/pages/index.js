import MainPage from "./MainPage.js";
import GamePage from "./GamePage.js";
import ProfilePage from "./ProfilePage.js";
import FriendPage from "./FriendPage.js";
import LoginPage from "./LoginPage.js";
import LocalGamePage from "./LocalGamePage.js";
import MultiGamePage from "./MultiGamePage.js";
import TournamentGamePage from "./TournamentGamePage.js";
import LocalGamePreparePage from "./LocalGamePreparePage.js";

export default ($target, $props) => {
  const main = () => new MainPage($target, $props);
  const game = () => new GamePage($target, $props);
  const profile = () => new ProfilePage($target, $props);
  const friend = () => new FriendPage($target, $props);
  const login = () => new LoginPage($target, $props);
  const localGamePrepare = () => new LocalGamePreparePage($target, $props);
  const localGame = () => new LocalGamePage($target, $props);
  const multiGame = () => new MultiGamePage($target, $props);
  const tournamentGame = () => new TournamentGamePage($target, $props);

  return {
    main,
    game,
    profile,
    friend,
    login,
    localGamePrepare,
    localGame,
    multiGame,
    tournamentGame,
  };
}
