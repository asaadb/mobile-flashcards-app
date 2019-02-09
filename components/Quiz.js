import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Quiz"
    };
  };
  state = {
    showQuestion: true,
    questions: this.props.deck.questions,
    currentIndex: 0,
    correctAnswers: 0
  };
  correct = () => {
    this.setState(state => {
      const count = state.correctAnswers + 1;
      const index = state.currentIndex + 1;
      return {
        ...state,
        correctAnswers: count,
        currentIndex: index
      };
    });
  };
  incorrect = () => {
    this.setState(state => {
      const index = state.currentIndex + 1;
      return {
        ...state,
        currentIndex: index
      };
    });
  };
  toggle = () => {
    this.setState(state => ({
      showQuestion:!state.showQuestion
    })
  )
  }
  render() {
    const { currentIndex } = this.state;
    const { showQuestion } = this.state;
    const { questions } = this.state;
    const { correctAnswers } = this.state;
    if (currentIndex < questions.length) {
      const currentQuestion = questions[currentIndex];
      return (
        <View>
          <Text>
            {showQuestion
              ? `Question: ${currentQuestion.question}`
              : `Answer: ${currentQuestion.answer}`}
          </Text>
          <TouchableOpacity onPress={this.toggle}>
          {showQuestion ?
            <Text>Answer</Text>
            :
            <Text>Question</Text>
          }
          </TouchableOpacity>
          <TouchableOpacity onPress={this.correct}>
            <Text>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.incorrect}>
            <Text>Incorrect</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View>
        <Text> {`You got ${correctAnswers} out of ${questions.length}`}</Text>
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
export default connect(mapStateToProps)(Quiz);
