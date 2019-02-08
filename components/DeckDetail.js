
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

class DeckDetail extends Component {
    render() {
      console.log("Props ", this.props);
      const { title, questions } = this.props.deck
      return (
        <View>
          <Text>{title}</Text>
          <Text>{questions ? questions.length: 0} Cards </Text>
          {questions.length > 0 &&
          <TouchableOpacity onPress={this.goToAddCard}>
            <Text>Start Quiz</Text>
          </TouchableOpacity>
          }
          <TouchableOpacity onPress={this.goToAddCard}>
            <Text>Add a Card</Text>
          </TouchableOpacity>
        </View>
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
export default connect(mapStateToProps)(DeckDetail);
