import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Animated
} from "react-native";
import { connect } from "react-redux";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";
import {
  white,
  lightGray,
  red,
  green,
  navyBlue,
  gray,
  blue,
  black
} from "../utils/colors";
import FlipCard from "react-native-flip-card";

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Quiz"
    };
  };
  state = {
    showQuestion: true,
    questions: shuffle(this.props.deck.questions),
    currentIndex: 0,
    correctAnswers: 0,
    animatedValue: new Animated.Value(0)
  };
  correct = () => {
    this.setState(state => {
      const count = state.correctAnswers + 1;
      const index = state.currentIndex + 1;
      return {
        ...state,
        correctAnswers: count,
        currentIndex: index,
        showQuestion: true
      };
    });
  };
  incorrect = () => {
    this.setState(state => {
      const index = state.currentIndex + 1;
      return {
        ...state,
        currentIndex: index,
        showQuestion: true
      };
    });
  };
  toggle = () => {
    this.setState(state => ({
      showQuestion: !state.showQuestion
    }));
    this.flip._toggleCard();
  };
  resetQuiz = () => {
    this.setState({
      correctAnswers: 0,
      currentIndex: 0,
      questions: shuffle(this.props.deck.questions)
    });
  };
  handleAnimation = () => {
    Animated.spring(this.state.animatedValue, {
      toValue: 1,
      friction: 4,
      duration: 1000
    }).start();
  };
  render() {
    const {
      currentIndex,
      showQuestion,
      questions,
      correctAnswers,
      opacity,
      fontSize,
      animatedValue
    } = this.state;
    if (currentIndex < questions.length) {
      const currentQuestion = questions[currentIndex];
      return (
        <View style={{ flex: 1, backgroundColor: lightGray }}>
          <Text style={styles.pageNum}>{`${currentIndex + 1} / ${
            questions.length
          }`}</Text>
          <View style={styles.container}>
            <FlipCard
              style={styles.card}
              friction={6}
              perspective={1000}
              flipHorizontal={true}
              flipVertical={false}
              flip={false}
              clickable={false}
              ref={flip => (this.flip = flip)}
            >
              <Text style={styles.cardText}>{currentQuestion.question}</Text>
              <Text style={styles.cardText}>{currentQuestion.answer}</Text>
            </FlipCard>
            <TouchableOpacity onPress={this.toggle}>
              {showQuestion ? (
                <Text style={[styles.toggleText, { color: green }]}>
                  Show Answer
                </Text>
              ) : (
                <Text style={[styles.toggleText, { color: red }]}>
                  Show Question
                </Text>
              )}
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: green }]}
                onPress={this.correct}
              >
                <Text style={styles.buttonText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: red }]}
                onPress={this.incorrect}
              >
                <Text style={styles.buttonText}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      this.handleAnimation();
      clearLocalNotification().then(setLocalNotification);
      return (
        <View style={styles.container}>
          <Animated.Text
            style={[styles.results, { transform: [{ scale: animatedValue }] }]}
          >
            {`You got ${correctAnswers} out of ${questions.length}`}
          </Animated.Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: blue }]}
            onPress={this.resetQuiz}
          >
            <Text style={styles.buttonText}>Start Over</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: navyBlue, paddingLeft: 32, paddingRight: 32 }
            ]}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  pageNum: {
    fontSize: 18,
    margin: 5,
    color: navyBlue,
    marginTop: 12
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    marginTop: 0
  },
  card: {
    maxHeight: 210,
    width: 315,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    shadowRadius: 3,
    margin: 0,
    marginBottom: 20,
    shadowOpacity: 0.8,
    backgroundColor: "#D0D0D0",
    borderWidth: 0,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  cardText: {
    fontSize: 24,
    textAlign: "center",
    color: black,
    margin: 10,
    marginBottom: 40,
    marginTop: 30
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
  },
  toggleText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 25,
    color: navyBlue
  },
  results: {
    fontSize: 32,
    textAlign: "center",
    margin: 10,
    marginBottom: 30,
    color: navyBlue
  }
});

function mapStateToProps(decks, { navigation }) {
  const { entryId } = navigation.state.params;
  return {
    entryId,
    deck: decks[entryId]
  };
}
export default connect(mapStateToProps)(Quiz);
