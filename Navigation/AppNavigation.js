import { StackNavigator } from 'react-navigation'
import HomeScreen from '../Containers/HomeScreen'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  HomeScreen: { screen: HomeScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HomeScreen'
})

export default PrimaryNav