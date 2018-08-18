import { StyleSheet } from 'react-native';

import { colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 25,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: colors.white,
  },
  calloutContainer: {
    width: 250,
  },

});

export default styles;
