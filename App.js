import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, ScrollView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          'key': 'Hello World!'
        }, 
        {
          'key': 'Dev is awesome!'
        }, 
        {
          'key': '😊'
        }
      ],
      presentToDo: '',
    };

    this.addItem = this.addItem.bind(this);
    this.clearItems = this.clearItems.bind(this);
  }

  componentDidMount() {

  }

  addItem() {
    this.setState({items: [...this.state.items, {'key': this.state.presentToDo}]});
    this.setState({presentToDo: ''});
  }

  clearItems() {
    this.setState({items: []});
  }

  render() {
    return (
      <>
      <StatusBar barStyle={"light-content"} backgroundColor={"#212121"}/>
      <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <FlatList
          data={this.state.items}
          renderItem={({item}) => <Text style={styles.todoItem}>{item.key}</Text>}
        />
        <TextInput
          placeholder="Add new todo"
          value={this.state.presentToDo}
          style={styles.textInput}
          onChangeText={e => {
            this.setState({
              presentToDo: e,
            });
          }}
          onSubmitEditing = {this.addItem}
        />
        <Button
          title="Add new todo"
          onPress={this.addItem}
          color="lightgreen"
        />
        <TouchableOpacity onPress={this.clearItems}
            style={styles.roundButton1} />
      </ScrollView>
      </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#afafaf',
    width: '80%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontSize: 20,
  },
  todoItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  todoText: {
    borderColor: '#afafaf',
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    minWidth: "50%",
    textAlign: "center"
  },
  roundButton1: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'red',
  },
});
