import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

export default class MuistinNote extends React.Component {

  state = {title: 'title', body: 'This is a note lol'}

  componentDidMount() {
    console.log(this.props.storageKey)
    try {
      AsyncStorage.getItem(this.props.storageKey)
        .then((value) => {
          let note = JSON.parse(value)
          if (note !== null) {
            this.setState({title: note.title, body: note.body})
          } else {
            this.setState({title: 'Error', body: 'Something went wrong; could not load note information.'})
          }
        }
        )
    } catch (error) {
      console.log('Error while loading! ' + error)
    }
  }

  render() {
    return (
        <View style={styles.note}>
          <Text style={styles.title}>{this.state.title}</Text>
          <Text>{this.state.body}</Text>
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
