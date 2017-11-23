import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Animated, Button } from 'react-native';
import * as color from './../utils/colors'
import { connect } from 'react-redux'
import {getAllDecks} from '../actions'
import * as api from '../utils/api'
import { setLocalNotification } from '../utils/helpers'
import { NavigationActions } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'


class HomeView extends Component{
  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    
    return {
      drawerLabel: 'Decks',
      drawerIcon: ({ tintColor }) =>  <Ionicons name='ios-list' size={30} color={tintColor} />,
      headerTitle: 'flashCards',
      headerLeft: <FontAwesome
      style={styles.navIcons}
      name='bars'
      size={25}
      color={color.darkblue}
      onPress={(data) => navigation.navigate('DrawerOpen')}
    />,
    }
  }

  state = {
    decks: {},
    opacity: new Animated.Value(1),
  }

  componentDidMount(){
    setLocalNotification()
    api.getDecks().then((d) => this.props.getAllDecks(d))
  }

  goToDeck(id){
    Animated.timing(this.state.opacity, {toValue: 0, duration: 500}).start()
    setTimeout(() => {
      Animated.timing(this.state.opacity, {toValue: 1, duration: 2000}).start()
      this.props.navigation.dispatch(NavigationActions.navigate({
        routeName: 'Deck',
        params: {
          id: id
        }
      }))
    }, 500)
  }

  render(){
    const { decks } = this.props
    const deckCount = Object.keys(decks).length + ' Deck(s)';

    let deckCards = Object.keys(decks).map((d) => {
    let cards = decks[d].questions.length + ' Card(s)' 
      return (
        <TouchableOpacity onPress={() => this.goToDeck(d)} key={d}>
          <Animated.View style={[styles.deck, {opacity: this.state.opacity}]}>
              <Text style={styles.title}>
                {decks[d].title}
              </Text>
              <Text style={styles.cards}>
                {cards}
              </Text>
          </Animated.View>
        </TouchableOpacity>
      )
    })
    return (
        <View style={styles.container}>
        <View style={styles.button}>
          <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate('AddDeck')}>
            <View><Text style={styles.addButton}>Add Deck</Text></View>
          </TouchableOpacity>
          <View><Text style={styles.deckCount}>{deckCount}</Text></View>
          </View>
          <FlatList
            data={deckCards}
            renderItem={({item}) => item}
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  deckCount:{
    textAlign: 'center',
    padding: 3,
  },
  deck: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: color.black,
    margin: 10,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: color.gray,
    shadowOffset: { height: 0, width: 0 },
  },
  title: {
    paddingTop: 5,
    fontSize: 24,
    paddingLeft: 10,
  },
  cards: {
    fontSize: 14,
    color: color.gray,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  addButton: {
    color: color.white,
    textAlign: 'center',
    backgroundColor: color.green,
    fontSize: 24,
    paddingTop: 5,
    paddingBottom: 5,
  },
  navIcons: {
    marginRight: 10,
    marginLeft: 20,
  },
})

function mapStateToProps(state){
  return {
    decks: state
  }
}

function mapDispatchToProps(dispatch){
  return {
    getAllDecks: (data) => dispatch(getAllDecks(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)