import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform } from "react-native";
import { connect } from "react-redux";
import { receiveDecks } from "../actions";
import { fetchDecks } from "../utils/api";
import { AppLoading } from "expo";
import { white, lightBlue, gray, black } from '../utils/colors'

class DecksList extends React.Component {
  state = {
    ready: false
  };
  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks()
      .then(decks => {
        return dispatch(receiveDecks(decks));
      })
      .then(() => this.setState(() => ({ ready: true })));
  }
  render() {
    console.log("decks", this.props.decks);
    const { decks } = this.props;
    const keys = Object.keys(decks);
    const { ready } = this.state
    if (ready === false) {
      return <AppLoading />
    }
    return (
      <View>
      {keys.map(key => (
        <TouchableOpacity key={key}>
          <Text>
            {decks[key].title}
          </Text>
          <Text>
            {decks[key].questions.length} cards
          </Text>
        </TouchableOpacity>
      ))}
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks
  };
}
export default connect(mapStateToProps)(DecksList);
