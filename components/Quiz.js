import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated, Platform } from "react-native";
import { connect } from "react-redux";
import { white, lightGray, red, green, black } from '../utils/colors'

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
    correctAnswers: 0,
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
    }, this.toggle());
  };
  incorrect = () => {
    this.setState(state => {
      const index = state.currentIndex + 1;
      return {
        ...state,
        currentIndex: index
      };
    }, this.toggle());
  };
  toggle = () => {
    this.setState(state => ({
      showQuestion: !state.showQuestion
    }));
  };
  render() {
    const { currentIndex } = this.state;
    const { showQuestion } = this.state;
    const { questions } = this.state;
    const { correctAnswers } = this.state;
    if (currentIndex < questions.length) {
      const currentQuestion = questions[currentIndex];
      return (
        <View style={{flex:1, backgroundColor:lightGray}}>
          <Text style={styles.pageNum}>{`${currentIndex + 1} / ${questions.length}`}</Text>
          <View style={styles.container}>
            <View style= {styles.card}>
              <Text>
                {showQuestion
                  ? `${currentQuestion.question}`
                  : `${currentQuestion.answer}`}
              </Text>
              <TouchableOpacity onPress={this.toggle}>
                {showQuestion ? <Text style={{color:green}}>Answer</Text> : <Text style={{color:red}}>Question</Text>}
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
    return (
      <View style = {styles.container}>
        <Text style = {styles.results}> {`You got ${correctAnswers} out of ${questions.length}`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageNum:{
    fontSize:18,
    margin: 12,
    color:black,
  },
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  card:{
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    marginBottom: 30,
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
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
  results:{
    fontSize:32,
    textAlign:'center',
    margin:10,
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
