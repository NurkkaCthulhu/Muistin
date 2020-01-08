import React from 'react';
import { StyleSheet, View, StatusBar, AsyncStorage, FlatList, Text, Image } from 'react-native';
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
    //console.log('getting notes')
    try {
      //const clear = await AsyncStorage.clear();
      const keys = await AsyncStorage.getAllKeys();

      console.log('notes: ' + keys)
      const result = await AsyncStorage.multiGet(keys);

      let helperArray = []
      result.forEach((note) => {
        let parsedNote = JSON.parse(note[1])
        let noteKey = note[0].replace(/[^0-9]/g,'')
        helperArray.push({key: noteKey, title: parsedNote.title, body: parsedNote.body, timeStamp: parsedNote.timeStamp, done: parsedNote.done})
      })

      // sort by oldest-> newest to get right key
      helperArray.sort((a,b) => a.key - b.key)
      let lastKey = helperArray.length > 0 ? helperArray[helperArray.length-1].key : 0
      lastKey = parseInt(lastKey) + 1

      // sort undone notes first
      helperArray.sort((a, b) => a.done - b.done)

      this.setState({keyNumber: lastKey, notes: helperArray})
    } catch (error) {
      console.log('Error while asyncing! ' + error)
    }
  }

  addNote = (myNote) => {
    console.log(myNote)
    console.log('saving...')
    try {
      AsyncStorage.setItem('note ' + this.state.keyNumber, JSON.stringify(myNote))
      this.getAllNotes()
    } catch (error) {
      console.log('Error while saving! ' + error)
    }
  }

  saveEditedNote = (myNote, id) => {
    try {
      AsyncStorage.setItem(id, JSON.stringify(myNote))
      this.getAllNotes()
    } catch (error) {
      console.log('Error while saving! ' + error)
    }
  }

  toggleDone = (myNote, id) => {

    if(myNote.done === 0) {
      myNote.done = 1
    } else {
      myNote.done = 0
    }

    try {
      AsyncStorage.setItem(id, JSON.stringify(myNote))
      this.getAllNotes()
    } catch (error) {
      console.log('Error while saving! ' + error)
    }
  }

  navigateToNewNoteView = (noteId, title, body, done) => {
    console.log('noteID::::' + noteId)
    //this.addNote();
    this.props.navigation.navigate('Create', {add: this.addNote, save: this.saveEditedNote, id: noteId, title: title, body: body, done: done})
  }

  deleteNote = (id) => {
    console.log('should delete' + id)
    try {
      AsyncStorage.removeItem(id)
      .then((resp) => console.log(resp))
      this.getAllNotes()
    } catch (error) {
      console.log('Error while deleting! ' + error)
    }
  }

  renderNoNotes = () => {
    return (
      <View style={styles.nonotesView}>
        <Image source={require('../Images/nonotes_light.png')} style={styles.nonotesImg}/>
        <Text style={styles.nonotesText}>You have no notes. Add some with the green +-button in the lower right corner.</Text>
      </View>
    )
  } 

  render() {
    //AsyncStorage.getAllKeys().then((keys) => console.log(keys))
    //console.log(this.state)
    return (
      <View style={[styles.container, this.state.notes.length === 0 && styles.centered]}>
        <StatusBar hidden/>
        <Image source={require('../Images/logo.png')} style={styles.logoImg}/>
        {this.state.notes.length === 0 ?
          this.renderNoNotes()
          :
          <FlatList
            data={this.state.notes}
            renderItem={({item}) =>
              <MuistinNote deletingKey={'note ' + item.key}
                           title={item.title}
                           body={item.body}
                           done={item.done}
                           timeStamp={item.timeStamp}
                           deletingFunc={this.deleteNote}
                           toggleDoneFunc={() => this.toggleDone(item, 'note ' + item.key)}
                           editingFunc={() => this.navigateToNewNoteView('note ' + item.key, item.title, item.body, item.done)}/>
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
  },
  nonotesView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nonotesImg: {
    height: 200,
    width: 160,
    resizeMode: 'contain',
  },
  logoImg: {
    height: 70,
    width: 255,
    resizeMode: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  nonotesText: {
    paddingLeft: 40,
    paddingRight: 40,
  },
});
