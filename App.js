import React from 'react'
import { View, Text } from 'react-native'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import HomeView from './components/HomeView'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

const HomeStack = DrawerNavigator({
  Home: { screen: HomeView},
  AddDeck: { screen: AddDeck }
}, {
  headerMode: 'float',
  gesturesEnabled: false
})

const MainNavigator = StackNavigator({
  Home: { screen: HomeStack },
  Deck: { screen: Deck},
  AddCard: { screen: AddCard},
  Quiz: { screen: Quiz},
  },{
    initialRouteName: 'Home',
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}