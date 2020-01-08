import React from 'react';
import { StyleSheet, View, StatusBar, Text, TextInput, Alert } from 'react-native';
import MuistinButton from '../Components/MuistinButton';
import NoteData from '../NoteData';

export default class NewNoteView extends React.Component {

  static navigationOptions = {
    title: 'Back to notes',
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
    let myNote = new NoteData(this.state.title, this.state.body, timeStamp)
    this.props.navigation.state.params.add(myNote)
    this.props.navigation.navigate('NotesHome')
  }

  confirmSave = () => {
    if (this.state.title === '' || this.state.body === '') {
      Alert.alert(
        'Save incomplete note',
        'Are you sure you want to save this note?',
        [
          {text: 'OK', onPress: () => this.saveNote()},
          {text: 'Cancel', onPress: () => console.log('canceled'), style: 'cancel'}
        ],
        {cancelable: false},
      )
    } else {
      this.saveNote()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <Text style={styles.pageTitle}>Create a new note</Text>
        <Text style={styles.helpText}>Title</Text>
        <TextInput
          style={styles.textInput}
          multiline={true}
          numberOfLines={1}
          placeholder='Title'
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
        />
        <Text style={styles.helpText}>Message</Text>
        <TextInput
          style={[styles.textInput, styles.bodyInput]}
          multiline={true}
          numberOfLines={5}
          placeholder='Write some text here...'
          onChangeText={(body) => this.setState({body})}
          value={this.state.body}
        />
        <MuistinButton text='ADD NOTE' onClick={this.confirmSave} float={false}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  pageTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  helpText: {
    marginBottom: 3,
    fontSize: 10,
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 1,
    textAlignVertical: 'top',
    padding: 5,
    marginBottom: 10,
  },
  bodyInput: {
    minHeight: 150,
    height: 'auto',
  },
});
