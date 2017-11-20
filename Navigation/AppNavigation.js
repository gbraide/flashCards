import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from '../Containers/HomeScreen'
import AddDeck from '../Containers/AddDeck'
import Decks from '../Containers/Decks'

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

// drawer stack
const DrawerStack = DrawerNavigator({
  decks: { screen: Decks },
  addDeck: { screen: AddDeck },
}, {
  gesturesEnabled: false
})

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: 'green'},
    title: 'flashCards',
    gesturesEnabled: false,
    headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}><Ionicons name='ios-menu' size={25} /> Menu</Text>
  })
})

// welcom stack
const WelcomeStack = StackNavigator({
  homeScreen: { screen: HomeScreen }
}, {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: {backgroundColor: 'green'},
    title: 'Welcome'
  }
})

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  welcomeStack: { screen: WelcomeStack },
  drawerStack: { screen: DrawerNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'welcomeStack',
  transitionConfig: noTransitionConfig
})

export default PrimaryNav