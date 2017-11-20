import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class AddDeck extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Add Deck',
    drawerIcon: () => (
      <Ionicons name='ios-add-circle' size={25} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Add Deck</Text>
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