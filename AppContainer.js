// import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import Friends from './Friends';
import Login from './Login';

import {
  createStackNavigator,
  createAppContainer,
  MainNavigator
} from 'react-navigation';

const RootStack = createStackNavigator(
  {
    Home: Home,
    Details: Friends,
    Login: Login,
  },
  {
    initialRouteName: 'Home',
  }
);


const AppContainer = createAppContainer(RootStack);


export default AppContainer;