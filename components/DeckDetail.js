
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { gray, purple, white, blue, black, lightGray } from "../utils/colors";

class DeckDetail extends Component {
    render() {
      console.log("Props ", this.props)
      const { title, questions } = this.props.deck
      const { entryId } = this.props
      console.log('The entryId:',questions)
      return (
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.cards}>{questions ? questions.length: 0} Cards </Text>
          </View>
          <View>
            {questions.length > 0 &&
            <TouchableOpacity style={[styles.button, { backgroundColor: blue }]} onPress={() => this.props.navigation.navigate(
                'Quiz',
                { entryId: entryId}
              )}>
              <Text style={ styles.buttonText }>Start Quiz</Text>
            </TouchableOpacity>
            }
            <TouchableOpacity style={[styles.button, { backgroundColor: black }]}  onPress={() => this.props.navigation.navigate(
                'AddCard',
                { entryId: entryId}
              )}>
              <Text style={styles.buttonText}>Add a Card</Text>
            </TouchableOpacity>
            </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:lightGray,
  },
  title: {
    textAlign:'center',
    fontSize: 32,
    margin: 5
  },
  cards:{
    fontSize: 23,
    color: gray,
    textAlign:'center',
     margin: 10
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
})
function mapStateToProps(decks, { navigation }) {
  const { entryId } = navigation.state.params;
  return {
    entryId,
    deck: decks[entryId]
  };
}
export default connect(mapStateToProps)(DeckDetail);
