import { AsyncStorage, Text } from 'react-native'
import React from 'react'
import { Notifications, Permissions } from 'expo'
import { gray } from "../utils/colors";
const NOTIFICATION_KEY = 'MobileFlashCards:notifications'

export function formatResults (results) {
  return results === null
    ? null
    : JSON.parse(results)
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function formatDeck (title) {
  const id = generateUID()
  return {
    [id]:{
      title: title,
      questions:[],
    }
  }
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'take your quiz!',
    body: "👋 don't forget to take your quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationsAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export function getCardsLength(questions) {
  if(questions.length === 0) {
    return (
      <Text style={{ color: gray, fontSize: 22, margin: 10, textAlign:'center' }}>
        0 Cards
      </Text>
    )
  } else if (questions.length === 1) {
    return (
      <Text style={{ color: gray, fontSize: 22, margin: 10, textAlign:'center' }}>
        1 Card
      </Text>
    )
  }
  return (
    <Text style={{ color: gray, fontSize: 22, margin: 10, textAlign:'center' }}>
      {questions.length} Cards
    </Text>
  )
}
