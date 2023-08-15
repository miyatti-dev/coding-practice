import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tabIndicatorStyle: {
    backgroundColor: 'black',
    height: 5,
  },
  tabViewItem: {
    width: '100%',
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  plusIconContainer: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  overlayView: {
    position: 'absolute',
    zIndex: 100,
    bottom: 80,
    height: 50,
    width: '98%',
    paddingHorizontal: 20,
    left: '1%',
    borderRadius: 10,
    justifyContent: 'space-between',
    backgroundColor: 'black',
    alignItems: 'center',
    flexDirection: 'row',
  },
  overlayText: {
    color: 'white',
  },
});
