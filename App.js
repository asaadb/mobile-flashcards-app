import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import DecksList from "./components/DecksList";
import AddDeck from "./components/AddDeck";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { white, lightBlue, purple } from './utils/colors'
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from "react-navigation";

const Tabs = createBottomTabNavigator(
  {
    DecksList: {
      screen: DecksList,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    },
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : purple,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);
const TabsContainer = createAppContainer(Tabs);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <TabsContainer />
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
