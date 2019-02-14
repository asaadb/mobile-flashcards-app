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
import { white, lightGray, blue2} from "../utils/colors";
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
        return Alert.alert("Please Enter a Title For your New Deck");
    }
    console.log("Submit title: ", title);
    const { dispatch } = this.props;
    const newDeck = formatDeck(title)
    const entryId = Object.keys(newDeck)[0]
    dispatch(addDeck(newDeck));
    this.setState(() => ({
      title: ""
    }));
    submitDeck(newDeck)
    this.toDeckDetail(entryId)
  };
  handleChange = text => {
    this.setState({
      title: text
    });
  };
  toDeckDetail = (entryId) => {
    this.props.navigation.navigate('DeckDetail', { entryId: entryId} )
}
  render() {
    console.log("Props ", this.props);
    return (
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
        <Text style={{ fontSize: 31, margin: 40, textAlign:'center', color:blue2 }}>What is the title of your new deck?</Text>
        <TextInput
          autoFocus
          placeholder="Deck Name"
          value={this.state.title}
          onChangeText={this.handleChange}
          style={styles.textInput}
        />
        <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn} onPress={this.handleSubmit}>
          <Text style={styles.submitBtnText}>Create Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGray,
    alignItems: "center",
    justifyContent:'center',
  },
iosSubmitBtn: {
  backgroundColor: blue2,
  padding: 10,
  paddingLeft: 30,
  paddingRight: 30,
  borderRadius: 7,
  height: 45,
  marginLeft: 40,
  marginRight: 40,

},
AndroidSubmitBtn: {
  backgroundColor: blue2,
  padding: 10,
  paddingLeft: 30,
  paddingRight: 30,
  height: 45,
  borderRadius: 2,
  alignSelf: 'flex-end',
  justifyContent: 'center',
  alignItems: 'center',
},
submitBtnText: {
  fontSize: 22,
  textAlign: 'center',
  color:white,
},
textInput: {
  backgroundColor:white,
  minWidth:300,
  borderRadius: 5,
  padding:10,
  fontSize: 24,
  margin: 5,
  marginBottom:40,
  borderWidth: 0.5,
},
});
export default connect()(AddDeck);
