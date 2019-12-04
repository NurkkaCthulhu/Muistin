import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator } from 'react-navigation-tabs';
 
import NotesView from './Screens/NotesView';

const TabNavigator = createBottomTabNavigator (
  {
  Home: NotesView,
  Stats: NotesView,
  },
  {
    initialRouteName: 'Home'
  },
);

const App = createAppContainer(TabNavigator);

export default App;