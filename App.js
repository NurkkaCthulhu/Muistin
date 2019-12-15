import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesome } from '@expo/vector-icons';
 
import NotesView from './Screens/NotesView';
import StatsView from './Screens/StatsView';

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: NotesView },
      Stats: { screen: StatsView },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = `pencil-square${focused ? '' : '-o'}`;
          } else if (routeName === 'Stats') {
            iconName = `bar-chart${focused ? '' : '-o'}`;
          }
          return <FontAwesome name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: '#EF8354',
        inactiveTintColor: '#BFC0C0',
      },
    },
    {
      initialRouteName: 'Home'
    },
  )
);
