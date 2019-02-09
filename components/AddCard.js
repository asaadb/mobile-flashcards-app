import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
  TextInput,
  TouchableOpacity,
  Platform
} from "react-native";
import { white, lightGray, purple } from "../utils/colors";
import { addCard } from "../actions";
import { connect } from "react-redux";

class AddCard extends React.Component {
  static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add a new card'
        }
    }
  state = {
    question: "",
    answer: ""
  };
  handleSubmit = () => {
    const { question, answer } = this.state;
    if (!question || question === "") {
      return Alert.alert("Please Enter a Question");
    }
    if (!answer || answer === "") {
      return Alert.alert("Please Enter an Answer");
    }
    const { dispatch } = this.props;
    const card = { question: question, answer: answer };
    const {entryId }= this.props;
    dispatch(addCard(card, entryId));
    this.setState(() => ({
      question: "",
      answer: ""
    }));
    this.toDeckDetail(entryId)
    // update "DB"
  };
  toDeckDetail = (entryId) => {
    this.props.navigation.navigate('DeckDetail', { entryId: entryId} )
}
  render() {
    return (
      <KeyboardAvoidingView>
        <Text>Add a question</Text>
        <TextInput
          autoFocus
          placeholder="Enter a Question"
          value={this.state.question}
          onChangeText={question => this.setState({ question })}
        />
        <Text>Add an answer</Text>
        <TextInput
          autoFocus
          placeholder="enter an Answer"
          value={this.state.answer}
          onChangeText={answer => this.setState({ answer })}
        />
        <TouchableOpacity onPress={this.handleSubmit}>
          <Text >SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(decks, { navigation }) {
  const { entryId } = navigation.state.params;
  return {
    entryId,
    deck: decks[entryId]
  };
}
export default connect(mapStateToProps)(AddCard);
