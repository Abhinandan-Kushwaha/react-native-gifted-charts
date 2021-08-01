import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
  },
  horizBar: {
    flexDirection: 'row',
    width: '90%',
  },
  leftLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastLeftLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftPart: {
    justifyContent: 'center',
    width: '100%',
  },
  lastLeftPart: {
    justifyContent: 'flex-end',
    width: '100%',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
    opacity: 0.5,
  },
  lastLine: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
  },
  bottomLabel: {
    width: '100%',
  },
});
