import React from 'react';
import { StyleSheet, View, StatusBar, Text, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';

export default class NotesView extends React.Component {

  state = {notes: []}

  getAllNotes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();

      const result = await AsyncStorage.multiGet(keys);

      let helperArray = []
      result.forEach((note) => {
        let parsedNote = JSON.parse(note[1])
        let noteKey = note[0].replace(/[^0-9]/g,'')
        helperArray.push({key: noteKey, note: parsedNote})
      })

      this.setState({notes: helperArray})
    } catch (error) {
      console.log('Error while asyncing! ' + error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.getAllNotes()}
        />
        <StatusBar hidden/>
        <Text style={styles.title}>Epic stats</Text>
        <Text>You have currently this many notes: {this.state.notes.length}</Text>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
