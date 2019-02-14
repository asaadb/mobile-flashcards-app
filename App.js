import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import { Constants } from 'expo'
import DecksList from "./components/DecksList";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import DeckDetail from "./components/DeckDetail";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { white, lightBlue, blue2 } from './utils/colors'
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from "react-navigation";
import { setLocalNotification } from './utils/helpers'

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator(
  {
    DecksList: {
      screen: DecksList,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
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
      activeTintColor: Platform.OS === "ios" ? blue2 : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : blue2,
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

const MainNavigator = createStackNavigator({
  home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
      title: 'Decks',
    },
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue2,
      },
    }),
  },
  AddCard : {
    screen: AddCard,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue2,
      },
    }),
  },
  Quiz : {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue2,
      },
    }),
  },
})

const TabsContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <AppStatusBar backgroundColor={blue2} barStyle="light-content" />
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
