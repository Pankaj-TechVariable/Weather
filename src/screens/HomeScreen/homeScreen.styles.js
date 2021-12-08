import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    zIndex: 1,
  },

  searchWrapper: {
    position: 'relative',
    zIndex: 999,
  },

  searchContent: {
    position: 'absolute',
    width: '100%',
    top: 50,
    left: 0,
    maxHeight: 400,
    borderRadius: 2,
    backgroundColor: 'white',
    zIndex: 99,
    padding: 10,
  },

  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.3)',
  },

  city: {
    color: 'rgba(0,0,0,0.6)',
  },

  weatherContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
  },

  date: {
    fontSize: 20,
    marginBottom: 20,
  },

  details: {
    fontSize: 20,
    marginVertical: 5,
  },

  image: {
    height: 100,
    width: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default styles;
