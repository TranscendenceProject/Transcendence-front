import HomePage from "./HomePage.js";
import GamePage from "./GamePage.js";
import ProfilePage from "./ProfilePage.js";
import FriendPage from "./FriendPage.js";
import LocalGamePage from "./LocalGamePage.js";
import MultiGamePage from "./MultiGamePage.js";
import TournamentGamePage from "./TournamentGamePage.js";

export default (main) => {
    const home = () => new HomePage(main);
    const game = () => new GamePage(main);
    const profile = () => new ProfilePage(main);
    const friend = () => new FriendPage(main);
    const localGame = () => new LocalGamePage(main);
    const multiGame = () => new MultiGamePage(main);
    const tournamentGame = () => new TournamentGamePage(main);

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
