import { colors } from 'styles';
import { StackNavigator } from 'react-navigation';

import Home from './pages/home';

const Routes = StackNavigator({
  Home: { screen: Home },
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: colors.primaryDark,
    },
    headerTintColor: colors.white,
    headerBackTitle: null,
  },
});

export default Routes;
