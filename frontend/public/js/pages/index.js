import HomePage from './HomePage.js';
import GamePage from './GamePage.js';
import ProfilePage from './ProfilePage.js';
import FriendPage from './FriendPage.js';

export default (main) => {
  const home = () => new HomePage(main);
  const game = () => new GamePage(main);
  const profile = () => new ProfilePage(main);
  const friend = () => new FriendPage(main);

  return {
    home,
    game,
    profile,
    friend,
  };
};
