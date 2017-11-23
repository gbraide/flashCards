import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import * as color from '../utils/colors'
import Card from './Card'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { NavigationActions } from 'react-navigation'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component{
    state = {
      showQuestion: true,
      question: 0,
      correct: 0,
      incorrect: 0,
      onFinish: false,
    }

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    const { id: title } = navigation.state.params
    return {
      title,
      headerStyle:{
        backgroundColor: color.white,
      },
    }
  }
  componentDidMount(){
    clearLocalNotification()
    .then(setLocalNotification)
  }

  onSwipe() {
    this.setState(state => ({ showQuestion: !state.showQuestion }))
  }

  onCorrect(){
    if(this.state.question >= this.props.questions.length -1){
      this.setState({
        onFinish: true,
      })
    }
    this.setState({
      question: this.state.question + 1,
      correct: this.state.correct + 1,
      showQuestion: true,
    })
  }

  onIncorrect(){
    if(this.state.question >= this.props.questions.length -1){
      this.setState({
        onFinish: true,
      })
    }
    this.setState({
      question: this.state.question + 1,
      incorrect: this.state.correct + 1,
      showQuestion: true,
    })
  }

  onRestart(){
    this.setState({
      onFinish: false,
      showQuestion: true,
      correct: 0,
      incorrect: 0,
      question: 0,
    })
  }

  onBackToDeck(){
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'Deck',
      params: {
        id: this.props.id
      }
    }))
  }

  render() {

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    if(this.state.onFinish){
      return(
        <View>
          <View>
            <Text style={[styles.summaryText, {paddingTop: 30}]}>Finished!</Text>
            <Text style={styles.summaryText}>{this.state.correct} out of {this.state.question} Correct</Text>
            <Text style={styles.summaryText}>{Math.floor(this.state.correct / this.state.question * 100)}%</Text>
          </View>
          <View style={styles.bottom}>
            <View style={[styles.button, {backgroundColor: color.blue}]}>
              <TouchableOpacity
                onPress={() => this.onRestart()}
              >
                <View>
                  <Text style={styles.buttonText}>Start Over</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.button, {backgroundColor: color.blue}]}>
              <TouchableOpacity
                onPress={() => this.onBackToDeck()}
              >
                <View>
                  <Text style={styles.buttonText}>Back to Deck</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
    else{
      return (
        <View style={styles.container}>
          <Text style={styles.questionNumber}>Question {this.state.question + 1} of {this.props.questions.length}</Text>
          <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            config={config}
          >
            <View style={styles.card}>
              <Card
                question={this.props.questions[this.state.question]}
                showQuestion={this.state.showQuestion}
              />
            </View>
            <Text style={styles.flip}>(Swipe to flip)</Text>
          </GestureRecognizer>
          <View style={styles.bottom}>
            <View style={[styles.button, {backgroundColor: color.green}]}>
              <TouchableOpacity
                onPress={() => this.onCorrect()}
              >
                <View>
                  <Text style={styles.buttonText}>Correct</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.button, {backgroundColor: color.red}]}>
              <TouchableOpacity
                onPress={() => this.onIncorrect()}
              >
                <View>
                  <Text style={styles.buttonText}>Incorrect</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionNumber: {
    margin: 10,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: color.black,
    margin: 10,
    marginBottom: 0,
    backgroundColor: color.white,
  },
  bottom: {
    alignItems: 'stretch',
    width: '100%',
    height: '50%',
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: color.white,
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 5,
    paddingBottom: 5,
  },
  flip: {
    textAlign: 'center',
    color: color.gray,
  },
  summaryText: {
    fontSize: 28,
    textAlign: 'center',
    padding: 10,
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
}

function mapDispatchToProps(state){
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)