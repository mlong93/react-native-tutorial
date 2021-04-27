import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  SafeAreaView
} from 'react-native';
import CheckBox from 'react-native-check-box';

const ToDoItem = () => {
  const [doneState, setDone] = useState(false);
  const onCheck = () => {
    setDone(!doneState);
  };
  return (
    <View>
      <CheckBox
        checkBoxColor="skyblue"
        onClick={onCheck}
        isChecked={doneState}
        disabled={doneState}
      />
      <Text style={[styles.todoText, {opacity: doneState ? 0.2 : 1}]}>
        A random To-Do item
      </Text>
    </View>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
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
      <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>
        <View>
          <ToDoItem></ToDoItem>
        </View>
        <TextInput
          placeholder="Add new Todo"
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
          title="Add new To do item"
          onPress={this.addItem}
          color="lightgreen"
        />
        <View style={{marginTop: 20}}>
          <Button title="Clear todos" onPress={this.clearItems} color="red" />
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',

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
});
