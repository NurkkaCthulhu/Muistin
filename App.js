import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator } from 'react-navigation-tabs';
 
import NotesView from './Screens/NotesView';
import StatsView from './Screens/StatsView';

const TabNavigator = createBottomTabNavigator (
  {
  Home: NotesView,
  Stats: StatsView,
  },
  {
    initialRouteName: 'Home'
  },
);

const App = createAppContainer(TabNavigator);

export default App;