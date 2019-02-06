import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
  TextInput,
  TouchableOpacity
} from "react-native";
import { white, lightBlue } from "../utils/colors";
import { addDeck } from "../actions";
import { submitDeck } from "../utils/api";
import { connect } from "react-redux";
import { formatDeck } from "../utils/helpers";

class AddDeck extends React.Component {
  state = {
    title: ""
  };
  handleSubmit = () => {
    const { title } = this.state;
    if (!title || title === "") {
      Alert.alert("Please Enter a Title For your New Deck");
    }
    console.log("Submit title: ", title);
    const { dispatch } = this.props;
    const newDeck = formatDeck(title)
    dispatch(addDeck(newDeck));
    this.setState(() => ({
      title: ""
    }));

    // update "DB"
    submitDeck(newDeck)
  };
  handleChange = text => {
    this.setState({
      title: text
    });
  };
  render() {
    console.log("Props ", this.props);
    return (
      <KeyboardAvoidingView>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          autoFocus
          placeholder="Deck Name"
          value={this.state.title}
          onChangeText={this.handleChange}
        />
        <TouchableOpacity onPress={this.handleSubmit}>
          <Text>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
export default connect()(AddDeck);
