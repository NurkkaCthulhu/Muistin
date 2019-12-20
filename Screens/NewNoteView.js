import React from 'react';
import { StyleSheet, View, StatusBar, Text, TextInput } from 'react-native';
import MuistinButton from '../Components/MuistinButton';
import NoteData from '../NoteData';

export default class NewNoteView extends React.Component {

  static navigationOptions = {
    title: 'Create a new note',
  }

  constructor(props) {
    super(props);
    this.state = {title : '', body: ''}
  }


  padWithZero = (number) => {
    let result = number
    if (number < 10) {
      result = '0' + result
    }
    return result
  }

  getTimeStamp = () => {
    var now = new Date();
    var date = this.padWithZero(now.getDate()); //Current Date
    var month = this.padWithZero((now.getMonth() + 1)); //Current Month
    var year = now.getFullYear(); //Current Year
    var hours = this.padWithZero(now.getHours()); //Current Hours
    var minutes = this.padWithZero(now.getMinutes()); //Current Minutes
    var seconds = this.padWithZero(now.getSeconds()); //Current Seconds

    return date + '.' + month + '.' + year + ' ' + hours + ':' + minutes + ':' + seconds
  }

  saveNote = () => {
    let timeStamp = this.getTimeStamp()
    let myNote;
    if (this.state.title === '' || this.state.body === '') {
      myNote = new NoteData('Title text', 'This is some data that is in a text file.', timeStamp);
    } else {
      myNote = new NoteData(this.state.title, this.state.body, timeStamp);
    }

    //let myNote = new NoteData('Title text', 'This is some data that is in a text file.', timeStamp);

    this.props.navigation.state.params.add(myNote)
    this.props.navigation.navigate('NotesHome')
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <Text>Create a new note</Text>
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
        <MuistinButton text='ADD NOTE' onClick={this.saveNote} float={false}/>
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
