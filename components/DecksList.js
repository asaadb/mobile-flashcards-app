import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { receiveDecks } from "../actions";
import { fetchDecks } from "../utils/api";
import { clearAsyncStorage } from "../utils/api";
import { AppLoading } from "expo";
import { white, lightGray, gray, black } from "../utils/colors";

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
    const { ready } = this.state;
    if (ready === false) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        {keys.map(key => (
          <TouchableOpacity key={key} style={styles.decks} onPress={() => this.props.navigation.navigate(
              'DeckDetail',
              { entryId: key }
            )}>
            <Text style={styles.title}>
              {decks[key].title}
            </Text>
            <Text style={{ color: gray, fontSize: 18 }}>
              {decks[key].questions ? decks[key].questions.length : 0} Cards
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGray,
    alignItems: "stretch",
  },
  decks: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 50,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  title: { color: black, fontSize: 28, margin: 5, textAlign:'center' }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}
export default connect(mapStateToProps)(DecksList);
