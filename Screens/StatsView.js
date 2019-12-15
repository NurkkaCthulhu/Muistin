import React from 'react';
import { StyleSheet, View, StatusBar, Text, AsyncStorage } from 'react-native';

export default class NotesView extends React.Component {

  state = {keyNumber: 0}

  constructor(props) {
    super(props);
    AsyncStorage.getAllKeys()
        .then((keys) => {this.setState({keyNumber: keys.length})})
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <Text>You have currently this many notes: {this.state.keyNumber}</Text>
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
