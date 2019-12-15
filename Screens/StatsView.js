import React from 'react';
import { StyleSheet, View, StatusBar, Text } from 'react-native';

export default class NotesView extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <Text>Some stats should be here.</Text>
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
