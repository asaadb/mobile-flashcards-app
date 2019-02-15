import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { receiveDecks } from "../actions";
import { fetchDecks } from "../utils/api";
import { getCardsLength } from "../utils/helpers";
import { AppLoading } from "expo";
import { white, lightGray, gray, navyBlue } from "../utils/colors";

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
      .then(() => this.setState(() => ({ ready: true })))
      .catch(error => {
        console.log(error);
        return Alert.alert("Sorry, an error occurred while loading the decks");
      });
  }
  render() {
    console.log("decks", this.props.decks);
    const { decks } = this.props;
    const keys = Object.keys(decks);
    const { ready } = this.state;
    if (ready === false) {
      return <AppLoading />;
    }
    if (Object.keys(decks) < 1) {
      return (
        <View style={[styles.container, { justifyContent: "center" }]}>
          <Text style={styles.title}>
            You have no decks. Please create a new deck
          </Text>
        </View>
      );
    }
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          {keys.map(key => (
            <TouchableOpacity
              key={key}
              style={styles.decks}
              onPress={() =>
                this.props.navigation.navigate("DeckDetail", { entryId: key })
              }
            >
              <Text style={styles.title}>{decks[key].title}</Text>
              {decks[key].questions
                ? getCardsLength(decks[key].questions)
                : null}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGray,
    alignItems: "stretch"
  },
  decks: {
    backgroundColor: "#D0D0D0",
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 50,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 17,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  title: {
    color: navyBlue,
    fontSize: 28,
    margin: 5,
    textAlign: "center"
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}
export default connect(mapStateToProps)(DecksList);
