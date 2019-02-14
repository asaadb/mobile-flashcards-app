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
import { white, blue2 } from "../utils/colors";
import { addCard } from "../actions";
import { connect } from "react-redux";
import { submitCard } from "../utils/api";

class AddCard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add a New Card"
    };
  };
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
    const { entryId } = this.props;
    dispatch(addCard(card, entryId));
    this.setState(() => ({
      question: "",
      answer: ""
    }));

    this.toDeckDetail(entryId);
    submitCard(card, entryId);
  };
  toDeckDetail = entryId => {
    this.props.navigation.navigate("DeckDetail", { entryId: entryId });
  };
  render() {
    return (
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
        <View style={{ marginTop: 45 }}>
          <Text style={styles.label}>Question:</Text>
          <TextInput
            autoFocus
            style={styles.input}
            placeholder="Enter a Question"
            value={this.state.question}
            onChangeText={question => this.setState({ question })}
          />
        </View>
        <View>
          <Text style={styles.label}>Answer:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter an Answer"
            value={this.state.answer}
            onChangeText={answer => this.setState({ answer })}
          />
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmit}>
          <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  submitBtn: {
    backgroundColor: blue2,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 15
  },
  submitBtnText: {
    fontSize: 22,
    textAlign: "center",
    color: white
  },
  label: {
    fontSize: 24,
    margin: 5,
    textAlign: "left",
    color: blue2
  },
  input: {
    backgroundColor: white,
    minWidth: 300,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    margin: 5,
    marginBottom: 20,
    borderWidth: 0.5
  }
});

function mapStateToProps(decks, { navigation }) {
  const { entryId } = navigation.state.params;
  return {
    entryId,
    deck: decks[entryId]
  };
}
export default connect(mapStateToProps)(AddCard);
