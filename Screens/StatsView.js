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

  findHowManyDone = () => {
    let result = 0

    for (let note of this.state.notes) {
      if (note.done === 1) {
        result++
      }
    }

    return result
  }

  renderRow = (text1, text2, title) => {
    return (
      <View style={[styles.tableRow, title && styles.tableTitleRow]}>
        <View style={styles.tableColumn}>
          <Text style={[styles.tableColumnText, title && styles.tableTitleText]}>{text1}</Text>
        </View>
        <View style={styles.tableColumn}>
          <Text style={[styles.tableColumnText, title && styles.tableTitleText]}>{text2}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.getAllNotes()}
        />
        <StatusBar hidden/>
        <Text style={styles.title}>Statistics</Text>
        <Text>You have currently {this.state.notes.length} notes.</Text>
        <Text>Notes marked as done: {this.findHowManyDone()}</Text>

        <Text style={{marginTop: 10, marginBottom: 2}}>Notes made per 3 hours</Text>
        {this.renderRow('Time', 'Number of notes', true)}
        {this.renderRow('00-03', this.state.hourData[0], false)}
        {this.renderRow('03-06', this.state.hourData[1], false)}
        {this.renderRow('06-09', this.state.hourData[2], false)}
        {this.renderRow('09-12', this.state.hourData[3], false)}
        {this.renderRow('12-15', this.state.hourData[4], false)}
        {this.renderRow('15-18', this.state.hourData[5], false)}
        {this.renderRow('18-21', this.state.hourData[6], false)}
        {this.renderRow('21-00', this.state.hourData[7], false)}
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
  tableRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,

  },
  tableColumn: {
    flex: 1,
    alignSelf: 'stretch',
    paddingLeft: 5,
    borderColor: '#262322',
    borderWidth: 1,
  },
  tableTitleText: {
    fontWeight: 'bold',
    color: '#3A2E39',
  },
  tableColumnText: {
    alignSelf: 'center',
  },
  tableTitleRow: {
    backgroundColor: '#F5F0F6',
  }
});
