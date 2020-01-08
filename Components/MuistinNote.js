import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import MuistinButton from './MuistinButton';

export default class MuistinNote extends React.Component {

  state = {title: 'title', body: 'This is a note lol', timeStamp: '1.1.2000 12:00:00'}

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
          <Text style={styles.timestamp}> Last edited: {this.props.timeStamp}</Text>
          <Text style={styles.body}>{this.props.body}</Text>

          <View style={styles.buttons}>
            <MuistinButton text='Edit' onClick={this.props.editingFunc}/>
            <MuistinButton text='Delete' onClick={this.confirmDelete} delete={true}/>
          </View>

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
    borderColor: '#262322',
    borderWidth: 1,
  },
  timestamp: {
    margin: 1,
    fontStyle: 'italic',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 15,
  },
  buttons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
