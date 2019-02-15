import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getCardsLength } from "../utils/helpers";
import { white, blue, navyBlue, lightGray } from "../utils/colors";

const DeckDetail = props => {
  const { title, questions } = props.deck;
  const { entryId } = props;
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
              props.navigation.navigate("Quiz", { entryId: entryId })
            }
          >
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: navyBlue }]}
          onPress={() =>
            props.navigation.navigate("AddCard", { entryId: entryId })
          }
        >
          <Text style={styles.buttonText}>Add a Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
