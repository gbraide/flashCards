import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'
import * as color from '../utils/colors'

class Card extends Component{

  static navigationOptions = ({navigation}) => {
    let title = navigation.state.params.id
    return {
      title: title,
      headerStyle:{
        backgroundColor: color.white,
      },
    }
  }

  render(){
    return (
      <View style={styles.container}>
        {this.props.question && (
          <View>
          {!this.props.showQuestion && (
            <View style={styles.card}>
              <Text style={styles.text}>{this.props.question.answer}</Text>
            </View>
          )}
          {this.props.showQuestion && (
            <View style={styles.card}>
              <Text style={styles.text}>{this.props.question.question}</Text>
            </View>
          )}
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {

  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 10,
  },
})

function mapStateToProps(state){
  return {

  }
}

function mapDispatchToProps(state){
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)