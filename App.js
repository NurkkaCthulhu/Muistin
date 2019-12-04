import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MuistinNote from './Components/MuistinNote';
import MuistinButton from './Components/MuistinButton';

export default class App extends React.Component {

  addNote = () => {
    console.log('App')
  }

  render() {
    return (
      <View style={styles.container}>
        <MuistinButton text='Add note' onClick={this.addNote}/>
        <MuistinNote/>
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
