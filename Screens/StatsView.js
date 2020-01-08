import React from 'react';
import { StyleSheet, View, StatusBar, Text, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';

export default class NotesView extends React.Component {

  state = {notes: [], hourData: [0, 0, 0, 0, 0, 0, 0, 0]}

  getAllNotes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();

      const result = await AsyncStorage.multiGet(keys);

      let helperArray = []
      result.forEach((note) => {
        let parsedNote = JSON.parse(note[1])
        helperArray.push(parsedNote)
      })

      let hourData = this.getArrayOfHours(helperArray)

      this.setState({notes: helperArray, hourData : hourData})
    } catch (error) {
      console.log('Error while asyncing! ' + error)
    }
  }

  getNumberOfNotesBetween = (first, second, notes) => {
    let result = 0

    for (let note of notes) {
      let hour = note.timeStamp.match(/(2[0-3]|[01][0-9]):/)[1]
      if (hour >= first && hour < second) {
        result++
      }
    }

    return result
  }

  getArrayOfHours = (array) => {
    let notesPerHour = []

    let firstHour = 0
    let secondHour = 3

    while (firstHour <= 21) {
      notesPerHour.push(this.getNumberOfNotesBetween(firstHour, secondHour, array))
      firstHour = firstHour + 3
      secondHour = secondHour + 3
    }

    return notesPerHour
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
        <Text>Notes marked as done: {this.state.notes.length}</Text>
        <Text>Notes per hour: {this.state.hourData}</Text>
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
