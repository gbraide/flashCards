import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class Decks extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Decks',
    drawerIcon: () => (
      <Ionicons name='ios-albums' size={25} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Decks</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})