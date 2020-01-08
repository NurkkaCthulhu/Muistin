import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack';
 
import NotesView from './Screens/NotesView';
import StatsView from './Screens/StatsView';
import NewNoteView from './Screens/NewNoteView'

const NoteStack = createStackNavigator({
  NotesHome: { screen: NotesView },
  Create: { screen: NewNoteView },
});

export default createAppContainer(
  createBottomTabNavigator(
    { 
      Notes: { screen: NoteStack },
      Stats: { screen: StatsView },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Notes') {
            iconName = `pencil-square-o`;
          } else if (routeName === 'Stats') {
            iconName = `info-circle`;
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
