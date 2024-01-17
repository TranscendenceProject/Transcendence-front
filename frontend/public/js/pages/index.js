import HomePage from "./HomePage.js";
import GamePage from "./GamePage.js";
import ProfilePage from "./ProfilePage.js";
import FriendPage from "./FriendPage.js";
import LocalGamePage from "./LocalGamePage.js";
import MultiGamePage from "./MultiGamePage.js";
import TournamentGamePage from "./TournamentGamePage.js";

export default (main, $props) => {
    const home = () => new HomePage(main, $props);
    const game = () => new GamePage(main, $props);
    const profile = () => new ProfilePage(main, $props);
    const friend = () => new FriendPage(main, $props);
    const localGame = () => new LocalGamePage(main, $props);
    const multiGame = () => new MultiGamePage(main, $props);
    const tournamentGame = () => new TournamentGamePage(main, $props);

    return {
        home,
        game,
        profile,
        friend,
        localGame,
        multiGame,
        tournamentGame,
    };
};
