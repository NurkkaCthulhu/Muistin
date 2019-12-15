import React from 'react';
import { StyleSheet, View, StatusBar, AsyncStorage } from 'react-native';
import MuistinNote from '../Components/MuistinNote';
import MuistinButton from '../Components/MuistinButton';
import NoteData from '../NoteData';

export default class NotesView extends React.Component {
  static navigationOptions = {
    title: 'Notes',
  };

  state = {deleteMsg: 'Delete note', addMsg: 'Added', keyNumber: 0}

  constructor(props) {
    super(props);
    try {
      AsyncStorage.getAllKeys()
        .then((keys) => {this.setState({keyNumber: keys.length})})
    } catch (error) {
      console.log('Error while saving! ' + error)
    }
  }

  addNote = () => {
    console.log('add note')
    this.setState({addMsg: 'I will add notes someday'})

    let myNote = new NoteData('Title text', 'This is some data that is in a text file.');
    console.log('saving...')
    try {
      AsyncStorage.getAllKeys()
        //.then((keys) => {this.setState({keyNumber: keys.length})})
        .then(() => AsyncStorage.setItem('key 0', JSON.stringify(myNote)))
    } catch (error) {
      console.log('Error while saving! ' + error)
    }
  }

  deleteNote = () => {
    console.log('should delete')
    this.setState({deleteMsg: 'In the future I go to trash.'})
  }

  render() {
    AsyncStorage.getAllKeys().then((keys) => console.log(keys))
    console.log('keys: ' + this.state.keyNumber)
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <MuistinButton text={this.state.addMsg} onClick={this.addNote}/>
        <MuistinNote storageKey="key 0"/>
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
