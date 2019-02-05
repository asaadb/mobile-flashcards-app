import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DecksList from "./components/DecksList";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { white, lightBlue } from './utils/colors'
export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <DecksList />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
