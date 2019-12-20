import React from 'react';
import { StyleSheet, View, StatusBar, Text, TextInput } from 'react-native';

export default class NewNoteView extends React.Component {

  static navigationOptions = {
    title: 'Create a new note',
  }

  constructor(props) {
    super(props);
    this.state = {title : '', body: ''}
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <Text>Welcme to new note</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Title here"
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Body here"
          onChangeText={(body) => this.setState({body})}
          value={this.state.body}
        />
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
