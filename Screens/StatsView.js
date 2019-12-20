import React from 'react';
import { StyleSheet, View, StatusBar, Text, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';

export default class NotesView extends React.Component {

  state = {keyNumber: 0}

  getAllNotes = async () => {
    try {
      AsyncStorage.getAllKeys()
        .then(keys => this.setState({keyNumber: keys.length}))
    } catch (error) {
      console.log('Error while getting notes in Stats tab!' + error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.getAllNotes()}
        />
        <StatusBar hidden/>
        <Text>You have currently this many notes: {this.state.keyNumber}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
