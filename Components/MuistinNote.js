import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

export default class MuistinNote extends React.Component {

  state = {title: 'title', body: 'This is a note lol'}

  render() {
    return (
        <View style={styles.note}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text>{this.props.body}</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  note: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    margin: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 3,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
});
