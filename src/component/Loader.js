import {ActivityIndicator, Modal, StyleSheet, Text, View,Image} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
const Loader = ({isLoading = false}) => {
  return (
    <Modal visible={isLoading} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modalView}>
        <Image
            style ={{width: wp('30%'),height:wp('30%'),resizeMode:'contain'}}
            source={require('../assets/gif/loader.gif')}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    width: wp('40%'),
    alignSelf: 'center',
  },
});
