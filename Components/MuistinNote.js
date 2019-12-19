import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import MuistinButton from './MuistinButton';

export default class MuistinNote extends React.Component {

  state = {title: 'title', body: 'This is a note lol'}

  confirmDelete = () => {
    Alert.alert(
      'Delete note',
      'Are you sure you want to delete this note?',
      [
        {text: 'OK', onPress: () => this.props.deletingFunc(this.props.deletingKey)},
        {text: 'Cancel', onPress: () => console.log('canceled'), style: 'cancel'}
      ],
      {cancelable: false},
    )
  }

  render() {
    return (
        <View style={styles.note}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text>{this.props.body}</Text>
          <MuistinButton text='Remove' onClick={this.confirmDelete}/>
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
