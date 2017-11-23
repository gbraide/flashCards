import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Keyboard} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { submitDeck, removeDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { purple, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import * as api from '../utils/api'
import * as color from '../utils/colors'
import { FontAwesome } from '@expo/vector-icons'

class AddDeck extends Component {
  static navigationOptions = {
    drawerLabel: 'Add Deck',
    drawerIcon: ({ tintColor }) =>  <FontAwesome name='plus-circle' size={25} color={tintColor} />
  };
    state = {
        title: '',
        allowSubmit: true,
      }

    submitDeck(){
        const { title } = this.state

        let deck = { title, questions: []}

        Keyboard.dismiss();

        this.setState({ title: ''})

        let complete = {}

        complete[title] = deck

        this.props.addDeck(complete)
        api.addDeck({id: title, deck: deck}).then(() => {
          this.props.navigation.dispatch(NavigationActions.navigate({
              routeName: 'Deck',
              params: { id: title }
          }))
        })
    }
    cancel(){
      this.props.navigation.dispatch(NavigationActions.navigate({
        routeName: 'Home',
      }))
    }
  render() {
    const addDeckText = (!this.state.title)? "Title empty": "Add"

    return (
      <View style={styles.container}>
      <Text style={styles.text}>Title:</Text>
      <TextInput
        autoFocus={true}
        autoCapitalize='words'
        placeholder='Enter Title...'
        onSubmitEditing={() => this.submitDeck()}
        returnKeyType='go'
        maxLength={25}
        style={styles.input}
        onChangeText={(title) => this.setState({title})}
        value={this.state.title}
      />
      <View style={styles.button}>
        <TouchableOpacity onPress={() => this.submitDeck()} disabled={!this.state.title}>
          <View>
            <Text style={[styles.buttonAdd, {backgroundColor: (!this.state.title ? color.gray : color.green)}]}>
              {addDeckText}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => this.cancel()}>
          <View>
            <Text style={styles.buttonCancel}>Cancel</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.white,
      padding: 15,
    },
    input: {
      height: 40,
      padding: 5,
      fontSize: 20,
      backgroundColor: color.whiteSmoke,
    },
    text: {
      paddingTop: 5,
      fontSize: 24,
    },
    button: {
      marginLeft: 20,
      marginRight: 20,
      marginTop: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    buttonAdd: {
      color: color.white,
      textAlign: 'center',
     // backgroundColor: color.green,
      fontSize: 24,
      paddingTop: 5,
      paddingBottom: 5,
    },
    buttonCancel: {
      color: color.white,
      textAlign: 'center',
      backgroundColor: color.red,
      fontSize: 24,
      paddingTop: 5,
      paddingBottom: 5,
    }
  })

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps(dispatch){
    return {
      addDeck: (data) => dispatch(addDeck(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)