/**
 * From: https://stackoverflow.com/a/45234513/4812090
 */
import React, {Component} from 'react';

import {StyleSheet, Text, View, Button} from 'react-native';

export class App extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
    };
    this.socket = new WebSocket('wss://echo.websocket.org/');
    this.emit = this.emit.bind(this);
  }

  emit() {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
    this.socket.send('It worked!');
  }

  componentDidMount() {
    this.socket.onopen = () =>
      this.socket.send(
        JSON.stringify({type: 'greet', payload: 'Hello Mr. Server!'}),
      );
    this.socket.onmessage = ({data}) => console.log(data);
  }

  render() {
    const LED = {
      backgroundColor: this.state.open ? 'lightgreen' : 'red',
      height: 30,
      position: 'absolute',
      flexDirection: 'row',
      bottom: 0,
      width: 100,
      height: 100,
      top: 120,
      borderRadius: 40,
      justifyContent: 'space-between',
    };

    return (
      <View style={styles.container}>
        <Button
          onPress={this.emit}
          title={this.state.open ? 'Turn off' : 'Turn on'}
          color="#21ba45"
          accessibilityLabel="Learn more about this purple button"
        />
        <View style={LED}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
