import { StyleSheet } from 'react-native';

export const styleBackground = StyleSheet.create({
  container: {
    backgroundColor: '#2D2D2D',
    height: '100%',
  },
});

export const offerDetialsStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 30,
    zIndex: 1,
    elevation: 1,
    paddingBottom: 20,
  },
  containerButtons: {
    paddingBottom: '40%',
    paddingTop: '15%',
    zIndex: 2,
    elevation: 2,
  },
  containerButtonsSmall: {
    paddingBottom: '20%',
    paddingTop: '12%',
    zIndex: 2,
    elevation: 2,
  },
  buttonConfirm: {
    marginHorizontal: 20,
    paddingTop: 0,
  },
  containerFee: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    marginVertical: 5,
    paddingTop: '20%',
    paddingBottom: '10%',
    backgroundColor: 'white',
  },
  form: {
    backgroundColor: '#2D2D2D',
    borderColor: 'white',
    borderWidth: 0.2,
    padding: 20,
    borderRadius: 10,
    borderTopColor: '#ffffff',
    borderStyle: 'solid',
    borderBottomColor: '#ffffff',
    marginTop: 20,
    elevation: 3,
  },
  textLoad: {
    alignItems: 'center',
    color: 'black',
  },
  text: {
    marginVertical: 5,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
  },
  textSecond: {
    fontSize: 15,
    padding: 5,
    color: '#ffffff',
    fontFamily: 'Poppins-Medium',
  },
  textAmount: {
    fontSize: 16,
    paddingLeft: 5,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
    textAlign: 'right',
    alignSelf: 'stretch',
    marginVertical: 5,
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
    marginVertical: 50,
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  loading: {
    flex: 1,
    marginTop: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBlod: {
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
  },
  left: {
    width: '50%',
  },
  right: {
    width: '50%',
    flexDirection: 'row-reverse',
    paddingStart: 10,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  feeContainer: {
    backgroundColor: '#FAFAFA',
    marginTop: 0,
    borderRadius: 10,
  },
  linkText: {
    alignItems: 'center',
    fontFamily: 'Poppins-Regular',
    paddingTop: 10,
  },
  enterPinWrapper: {
    backgroundColor: '#2D2D2D',
  },
});
