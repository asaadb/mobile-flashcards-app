import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform, Animated } from "react-native";
import { connect } from "react-redux";
import { clearLocalNotification, setLocalNotification } from "react-redux";
import { white, lightGray, red, green, black, gray, blue } from '../utils/colors'

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let  randomIndex;

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
  };
  resetQuiz = () => {
    this.setState({
      correctAnswers:0,
      currentIndex:0,
      questions: shuffle(this.props.deck.questions),
    })
  }
  handleAnimation = () => {
    Animated.spring(this.state.animatedValue, {
      toValue: 1,
      friction: 4,
      duration: 1000,
    }).start()
  }
  render() {
    const { currentIndex, showQuestion, questions, correctAnswers, opacity, fontSize, animatedValue } = this.state;
    if (currentIndex < questions.length) {
      const currentQuestion = questions[currentIndex];
      return (
        <View style={{flex:1, backgroundColor:lightGray}}>
          <Text style={styles.pageNum}>{`${currentIndex + 1} / ${questions.length}`}</Text>
          <View style={styles.container}>
            <View style= {styles.card}>
              <Text style = {styles.question}>
                {showQuestion
                  ? `${currentQuestion.question}`
                  : `${currentQuestion.answer}`}
              </Text>
              <TouchableOpacity onPress={this.toggle}>
                {showQuestion ? <Text style={[styles.toggleText, {color:green}]}>Show Answer</Text> : <Text style={[styles.toggleText, {color:red}]}>Show Question</Text>}
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={[styles.button, {backgroundColor:green}]} onPress={this.correct}>
                <Text style={styles.buttonText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {backgroundColor:red}]} onPress={this.incorrect}>
                <Text style={styles.buttonText}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    else{
      this.handleAnimation()
      return (
        <View style = {styles.container}>
          <Animated.Text style = {[styles.results, {transform: [{scale: animatedValue}]}]}> {`You got ${correctAnswers} out of ${questions.length}`}
          </Animated.Text>
          <TouchableOpacity style={[styles.button, {backgroundColor:blue}]} onPress={this.resetQuiz}>
            <Text style={styles.buttonText}>Start Over</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: black, paddingLeft:32, paddingRight:32}]} onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.buttonText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      );
      clearLocalNotification()
      .then(setLocalNotification)
    }
  }
}

const styles = StyleSheet.create({
  pageNum:{
    fontSize:18,
    margin: 5,
    color:black,
    marginTop:12,
  },
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#D0D0D0',
    margin:15,
    marginTop:10,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  card:{
    justifyContent: "center",
    alignItems: "center",

  },
  question: {
    textAlign:'center',
    margin: 10,
    marginBottom: 40,
    fontSize:32,
  },
  button:{
    padding: 20,
    borderRadius: 7,
    height: 65,
    margin: 8,
    paddingLeft:45,
    paddingRight:45,
  },
  buttonText:{
    fontSize: 22,
    textAlign: 'center',
    color: white,
  },
  toggleText: {
    fontSize:20,
    textAlign:'center',
    marginBottom:25,
    color: black,
  },
  results:{
    fontSize:32,
    textAlign:'center',
    margin:10,
    marginBottom:30,
    color: black,
  },
})
function mapStateToProps(decks, { navigation }) {
  const { entryId } = navigation.state.params;
  return {
    entryId,
    deck: decks[entryId]
  };
}
export default connect(mapStateToProps)(Quiz);
