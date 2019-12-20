import React from 'react';
import { StyleSheet, View, StatusBar, Text, AsyncStorage } from 'react-native';

export default class NewNoteView extends React.Component {

  static navigationOptions = {
    title: 'Create a new note',
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <Text>Welcme to new note</Text>
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
