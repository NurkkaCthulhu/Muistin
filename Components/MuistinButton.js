import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class MuistinButton extends React.Component {
  render() {
    return (
        <TouchableOpacity
          style={[styles.button, this.props.float && styles.floating]}
          onPress={() => this.props.onClick()}>
            <Text style={styles.text}>{this.props.text}</Text>
        </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#B3A394',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
  },
  floating: {
    position: 'absolute',
    backgroundColor: 'green',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    borderRadius: 40,
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
});
