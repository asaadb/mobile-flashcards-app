import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getCardsLength } from "../utils/helpers";
import { white, blue, navyBlue, lightGray, red } from "../utils/colors";
import { removeDeck } from "../actions/index"
import { deleteDeck } from "../utils/api";

class DeckDetail extends Component {
  handleDelete = () => {
    const { entryId, dispatch } = this.props
    dispatch(removeDeck(entryId))
    deleteDeck(entryId)
  }
  render() {
    if(!this.props.deck) {
      return this.props.navigation.navigate("DecksList")
    }
  const { title, questions } = this.props.deck;
  const { entryId } = this.props;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {questions ? getCardsLength(questions) : null}
      </View>
      <View>
        {questions.length > 0 && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: blue }]}
            onPress={() =>
              this.props.navigation.navigate("Quiz", { entryId: entryId })
            }
          >
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: navyBlue }]}
          onPress={() =>
            this.props.navigation.navigate("AddCard", { entryId: entryId })
          }
        >
          <Text style={styles.buttonText}>Add a Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: red }]}
          onPress={this.handleDelete}
        >
          <Text style={styles.buttonText}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: lightGray
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    margin: 5
  },
  button: {
    padding: 20,
    borderRadius: 7,
    height: 65,
    margin: 8,
    paddingLeft: 45,
    paddingRight: 45
  },
  buttonText: {
    fontSize: 22,
    textAlign: "center",
    color: white
  }
});

function mapStateToProps(decks, { navigation }) {
  const { entryId } = navigation.state.params;
  return {
    entryId,
    deck: decks[entryId]
  };
}
export default connect(mapStateToProps)(DeckDetail);
