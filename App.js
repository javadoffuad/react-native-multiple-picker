import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import MultiplePicker from './MultiplePicker';

const data = [
  {id: 1, title: 'Title first'},
  {id: 2, title: 'Title second'},
  {id: 3, title: 'Title third'},
  {id: 4, title: 'Title four'},
]

export default class App extends Component {
  render() {
    return (
          <MultiplePicker
            data={data}
            onChange={(value) => console.warn(value)}
            />
    );
  }
}

const styles = StyleSheet.create({

});
