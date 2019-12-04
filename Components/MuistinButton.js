import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class MuistinButton extends React.Component {
  render() {
    return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.onClick()}>
            <Text>{this.props.text}</Text>
        </TouchableOpacity>
      );
  }

}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#B3A394',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
  },
});
