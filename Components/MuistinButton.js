import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class MuistinButton extends React.Component {
  render() {
    return (
        <TouchableOpacity
          style={[styles.button,
                  this.props.float ? styles.floating : styles.buttonPadding,
                  this.props.delete && styles.deleteButton,
                  this.props.done && styles.doneButton]
                }
          onPress={() => this.props.onClick()}>
            <Text style={styles.text}>{this.props.text}</Text>
        </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00ABE7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
  },
  floating: {
    position: 'absolute',
    backgroundColor: '#13b40e',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    borderRadius: 40,
  },
  buttonPadding: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  deleteButton: {
    backgroundColor: '#b40e1e',
  },
  doneButton: {
    backgroundColor: '#68A357',
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
});
