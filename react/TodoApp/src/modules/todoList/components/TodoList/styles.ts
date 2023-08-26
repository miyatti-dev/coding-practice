import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  todoListContentContainer: {
    flexGrow: 1,
  },
  todoList: {
    height: '100%',
  },
  overlayView: {
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
});
