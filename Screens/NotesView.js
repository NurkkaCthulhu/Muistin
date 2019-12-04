import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import MuistinNote from '../Components/MuistinNote';
import MuistinButton from '../Components/MuistinButton';

export default class NotesView extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  addNote = () => {
    console.log('App')
  }

  deleteNote = () => {
    console.log('should delete')
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <MuistinButton text='Add note' onClick={this.addNote}/>
        <MuistinNote deleteButton={<MuistinButton text='Add note' onClick={this.deleteNote}/>}/>  
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
