import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux'
import * as color from '../utils/colors'
import * as api from '../utils/api'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import {deleteDeck} from '../actions'
import { NavigationActions } from 'react-navigation'

class Deck extends Component{
  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    let title = navigation.state.params.id
    return {
      title: title,
      headerStyle:{
        backgroundColor: color.white,
      },
    }
  }
  state = {
    question: 0,
    correct: 0,
    incorrect: 0,
  }

  startQuiz(id){
    this.props.navigation.dispatch(NavigationActions.navigate({
    routeName: 'Quiz',
    params: {
        id: id
    }
    }))
  }

  addCard(id){
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'AddCard',
      params: {
        id: id
      }
    }))
  }

  componentDidMount(){
    const {setParams} = this.props.navigation;
    setParams({deleteDeck: this.deleteDeck});
  }

  deleteDeck = () => {
    api.removeDeck(this.props.id).then(() => {
      this.props.deleteDeck(this.props.id)
      this.props.navigation.dispatch(NavigationActions.navigate({
        routeName: 'Home',
        params: {},
      }))
    })
  }

  render(){
    let cards =  this.props.questions.length + ' Card(s)'
    const startQuizText = (this.props.questions.length === 0) ? "Add Card to enable Quiz": "Start Quiz"
    const quizDisabled =(this.props.questions.length === 0) ? true : false

    return(
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.cards}>{cards}</Text>
        </View>
        <View>
          <View style={[styles.button, {backgroundColor: (quizDisabled ? color.gray : color.blue)}]}>
            <TouchableOpacity onPress={() => this.startQuiz(this.props.id)} disabled={quizDisabled}>
              <View>
                <Text style={styles.buttonText}>{startQuizText}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => this.addCard(this.props.id)}>
              <View>
                <Text style={styles.buttonText}>Add Card</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonDelete}>
            <TouchableOpacity onPress={() => this.deleteDeck()}>
              <View>
                <Text style={styles.buttonText}>Delete Deck</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navIcons: {
    marginRight: 10,
    marginLeft: 20,
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%',
  },
  title: {
    fontSize: 34,
  },
  cards: {
    fontSize: 18,
    color: color.gray,
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: color.blue,
  },
  buttonText: {
    color: color.white,
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonDelete: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: color.red,    
  }
})

function mapStateToProps(state, ownProps){
  let id = ownProps.navigation.state.params.id
  if(id in state){
    return{
      id: id,
      title: state[id].title,
      questions: state[id].questions,
    }
  }
  else{
    return {
      id: id,
      title: 'Deck not Found',
      questions: [],
    }
  }
}

function mapDispatchToProps(dispatch){
  return {
    deleteDeck: (data) => dispatch(deleteDeck(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);