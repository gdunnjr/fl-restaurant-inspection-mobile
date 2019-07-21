import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import InfoScreen from '../screens/InfoScreen';
import DetailsScreen from '../screens/DetailsScreen';

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen},
  Details: {screen: DetailsScreen}
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-home'}
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: SearchScreen,
  Details: {screen: DetailsScreen}
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        'md-search'
        //Platform.OS === 'ios' ? 'ios-link' : 'md-link'
      }
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: InfoScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
        name='md-information-circle'
      //      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const AppNavigator = createStackNavigator({
  Details : {
    screen : DetailsScreen
  }
});

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack
});
