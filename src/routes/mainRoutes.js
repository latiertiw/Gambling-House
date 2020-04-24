
import * as screens from '../components';



const mainRoutes = [
  { exact: true, route: screens.Menu, path: "/" },
  { exact: true, route: screens.OptionsMenu, path: "/options" },
  { exact: true, route: screens.GameScreen, path: "/play" }
];

export default mainRoutes;
