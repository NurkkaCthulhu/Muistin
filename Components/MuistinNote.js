import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class MuistinNote extends React.Component {
  render() {
    return (
        <View style={styles.note}>
          <Text>This is a note lol</Text>
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
    borderColor: 'black',
    borderWidth: 3,
  },
});
