import React from 'react';
import { StyleSheet, View, StatusBar, AsyncStorage, FlatList, Text } from 'react-native';
import MuistinNote from '../Components/MuistinNote';
import MuistinButton from '../Components/MuistinButton';
import NoteData from '../NoteData';

export default class NotesView extends React.Component {

  static navigationOptions = {
    header: null,
  }

  state = {deleteMsg: 'Delete note', addMsg: 'Added', keyNumber: 0, notes: []}

  constructor(props) {
    super(props);
    
    this.getAllNotes()
  }

  getAllNotes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();

      const result = await AsyncStorage.multiGet(keys);

      let helperArray = []
      result.forEach((note) => {
        let parsedNote = JSON.parse(note[1])
        let noteKey = note[0].replace(/[^0-9]/g,'')
        helperArray.push({key: noteKey, title: parsedNote.title, body: parsedNote.body, timeStamp: parsedNote.timeStamp})
      })

      helperArray.sort((a,b) => a.key - b.key)
      let lastKey = helperArray.length > 0 ? helperArray[helperArray.length-1].key : 0
      lastKey = parseInt(lastKey) + 1

      this.setState({keyNumber: lastKey, notes: helperArray})
    } catch (error) {
      console.log('Error while asyncing! ' + error)
    }
  }

  addNote = (myNote) => {
    try {
      AsyncStorage.setItem('note ' + this.state.keyNumber, JSON.stringify(myNote))
      this.getAllNotes()
    } catch (error) {
      console.log('Error while saving! ' + error)
    }
  }

  navigateToNewNoteView = () => {
    this.props.navigation.navigate('Create', {add: this.addNote})
  }

  deleteNote = (id) => {
    try {
      AsyncStorage.removeItem(id)
      .then((resp) => console.log(resp))
      this.getAllNotes()
    } catch (error) {
      console.log('Error while deleting! ' + error)
    }
  }

  renderNoNotes = () => {
    return <Text>You have no notes xd</Text>
  }

  render() {
    return (
      <View style={[styles.container, this.state.notes.length === 0 && styles.centered]}>
        <StatusBar hidden/>
        {this.state.notes.length === 0 ?
          this.renderNoNotes()
          :
          <FlatList
            data={this.state.notes}
            renderItem={({item}) =>
              <MuistinNote deletingKey={'note ' + item.key} title={item.title} body={item.body} timeStamp={item.timeStamp} deletingFunc={this.deleteNote}/>
            }
          />
        }
        <MuistinButton text='+' onClick={this.navigateToNewNoteView} float={true}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  centered: {
    alignItems: 'center',
  }
});
