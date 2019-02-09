
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

class DeckDetail extends Component {
//   toAddCard = () => {
//     console.log('pressed', this.props.navigation);
//     this.props.navigation.navigate('AddCard', { entryId: this.props.entryId} )
// }
    render() {
      console.log("Props ", this.props)
      const { title, questions } = this.props.deck
      const { entryId } = this.props
      console.log('The entryId:',questions)
      return (
        <View>
          <Text>{title}</Text>
          <Text>{questions ? questions.length: 0} Cards </Text>
          {questions.length > 0 &&
          <TouchableOpacity>
            <Text>Start Quiz</Text>
          </TouchableOpacity>
          }
          <TouchableOpacity onPress={() => this.props.navigation.navigate(
              'AddCard',
              { entryId: entryId}
            )}>
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
