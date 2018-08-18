import { StyleSheet } from 'react-native';
import Color from 'color';

import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkTransparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: metrics.screenWidth - 40,
    height: 200,
    borderRadius: metrics.baseRadius,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: metrics.basePadding,
  },
  modalTitle: {
    fontSize: 18,
    color: colors.darker,
    fontWeight: 'bold',
  },
  input: {
    height: 42,
    width: metrics.screenWidth - 80,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    paddingHorizontal: metrics.basePadding,
    marginTop: metrics.basePadding,
    borderColor: colors.light,
    borderWidth: 1,

  },
  buttonsBox: {
    width: metrics.screenWidth - 80,
    marginTop: metrics.baseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    height: 42,
    backgroundColor: colors.neutral,
    borderRadius: metrics.baseRadius,
    paddingHorizontal: metrics.basePadding,
    justifyContent: 'center',
    alignItems: 'center',
    width: (metrics.screenWidth - 100) / 2,

  },
  saveButton: {
    height: 42,
    backgroundColor: colors.success,
    borderRadius: metrics.baseRadius,
    paddingHorizontal: metrics.basePadding,
    justifyContent: 'center',
    alignItems: 'center',
    width: (metrics.screenWidth - 100) / 2,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  errorBox: {
    backgroundColor: Color(colors.danger).lighten(0.4),
    height: 30,
    width: (metrics.screenWidth - 80),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: metrics.baseMargin,
  },
  error: {
    color: colors.danger,
    textAlign: 'center',
  },
});

export default styles;
