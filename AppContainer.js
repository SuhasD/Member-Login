// import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import Friends from './Friends';

import {
  createStackNavigator,
  createAppContainer,
  MainNavigator
} from 'react-navigation';

const RootStack = createStackNavigator(
  {
    Home: Home,
    Details: Friends,
  },
  {
    initialRouteName: 'Home',
  }
);


const AppContainer = createAppContainer(RootStack);


export default AppContainer;