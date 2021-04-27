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
import {db} from './src/config';

const ToDoItem = ({todoItem: {todoItem: name, done}, id}) => {
  const [doneState, setDone] = useState(done);
  const onCheck = () => {
    setDone(!doneState);
    db.ref('/todos').update({
      [id]: {
        todoItem: name,
        done: !doneState,
      },
    });
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
        {name}
      </Text>
    </View>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      presentToDo: '',
    };

    this.addItem = this.addItem.bind(this);
    this.clearItems = this.clearItems.bind(this);
  }

  componentDidMount() {
    db.ref('/todos').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let todoItems = {...data};
      this.setState({
        items: todoItems,
      });
    });
  }

  addItem() {
    db.ref('/todos').push({
      done: false,
      todoItem: this.state.presentToDo,
    });
    Alert.alert('Action!', 'A new To-do item was created');

    this.setState({presentToDo: ''});
  }

  clearItems() {
    db.ref('/todos').remove();
  }

  render() {
    let todosKeys = Object.keys(this.state.items);
    return (
      <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>
        <View>
          {todosKeys.length > 0 ? (
            todosKeys.map(key => (
              <ToDoItem
                key={key}
                id={key}
                todoItem={this.state.items[key]}
              />
            ))
          ) : (
                <Text>No items</Text>
          )}
        </View>
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
          title="Add new todo item"
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
