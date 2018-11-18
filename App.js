import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import AppContainer from './AppContainer';


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
