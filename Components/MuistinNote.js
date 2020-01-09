import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import MuistinButton from './MuistinButton';

export default class MuistinNote extends React.Component {
  
  confirmDelete = () => {
    Alert.alert(
      'Delete note',
      'Are you sure you want to delete this note? The note cannot be restored.',
      [
        {text: 'OK', onPress: () => this.props.deletingFunc(this.props.deletingKey)},
        {text: 'Cancel', onPress: () => console.log('canceled'), style: 'cancel'}
      ],
      {cancelable: false},
    )
  }

  render() {
    return (
        <View style={[styles.note, this.props.done===1 && styles.doneNote]}>
          <Text style={[styles.title, this.props.done===1 && styles.greyedFont]}>{this.props.title}</Text>
          <Text style={[styles.timestamp, this.props.done===1 && styles.greyedFont]}> Last edited: {this.props.timeStamp}</Text>
          <Text style={[styles.body, this.props.done===1 && styles.greyedFont]}>{this.props.body}</Text>

          <View style={styles.buttons}>
            <MuistinButton text='Edit' onClick={this.props.editingFunc}/>
            <MuistinButton text={this.props.done===0 ? 'Done' : 'Undone'} onClick={this.props.toggleDoneFunc} done={true}/>
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
  doneNote: {
    backgroundColor: '#E8E8E8',
  },
  timestamp: {
    margin: 1,
    fontStyle: 'italic',
  },
  greyedFont: {
    color: '#96939B',
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
