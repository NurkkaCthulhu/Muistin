import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import MuistinNote from '../Components/MuistinNote';
import MuistinButton from '../Components/MuistinButton';

export default class NotesView extends React.Component {
  static navigationOptions = {
    title: 'Notes',
  };

  state = {deleteMsg: 'Delete note', addMsg: 'Added'}

  addNote = () => {
    console.log('add note')
    this.setState({addMsg: 'I will add notes someday'})
  }

  deleteNote = () => {
    console.log('should delete')
    this.setState({deleteMsg: 'In the future I go to trash.'})
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <MuistinButton text={this.state.addMsg} onClick={this.addNote}/>
        <MuistinNote deleteButton={<MuistinButton text={this.state.deleteMsg} onClick={this.deleteNote}/>}/>  
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
