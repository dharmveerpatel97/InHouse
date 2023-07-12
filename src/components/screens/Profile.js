import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONT, FONT_SIZE, COLOR} from '../../config/Globles';
import HeadLeftNotification from '../../assets/svg/HeadLeftNotification.svg';
import PlacesBGI from '../../assets/images/DetailsBGI.jpg';
import HeadLeftArrow from '../../assets/svg/HeadLeftArrow.svg';
import ProfileEdit from '../../assets/svg/ProfileEdit.svg';
import ProfileImageEdit from '../../assets/svg/ProfileImageEdit.svg';
import {useSelector, useDispatch} from 'react-redux';
import {ProfileGet} from '../../redux/Store';
import axios from 'axios';
//  ------------- Image picker --------------
import ImagePicker from 'react-native-image-crop-picker';

import {androidCameraPermission} from '../../../permissions';

const Profile = ({navigation}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageFetchModalVisible, setImageFetchModalVisible] = useState(false);
  const [dpData, setDpData] = useState(true);
  const [userLogInId, setUserLogInId] = useState(5);

  // console.log('dpData 1111111---------------', dpData);

  const handleInputChange = (field, value) => {
    setEditedData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  //API GET
  const dispatch = useDispatch();
  const profileData = useSelector(state => state.profileGetStatus);

  useEffect(() => {
    dispatch(ProfileGet());
  }, [dispatch]);

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [apiProfile, setApiProfile] = useState(false);

  useEffect(() => {
    dispatch(ProfileGet())
      .then(() => {
        setLoadingProfile(false);
        setApiProfile(true);
      })
      .catch(() => {
        setLoadingProfile(false);
        setApiProfile(false);
      });
  }, []);

  useEffect(() => {
    if (profileData && profileData.user && profileData.user.length > 0) {
      const user = profileData.user[0];
      setEditedData({
        img: user.image,
        name: user.name,
        mail: user.email,
        phoneNumber: user.phone,
        location: user.address,
        profession: user.designation,
      });
    }
  }, [profileData]);

  // console.log('ProfileGet', profileData);

  if (loadingProfile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLOR.primary} />
      </View>
    );
  }

  const handleCameraPermission = async () => {
    try {
      const granted = await androidCameraPermission({
        title: 'Camera Permission',
        message: 'App needs access to your camera.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      return granted === androidCameraPermission.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const openCamera = async () => {
    const permission = await androidCameraPermission();
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('Selected Image------------Cam:----', image.path);
      setDpData(image.path);
      setModalVisible(false);
      setImageFetchModalVisible(true);
    });
    setThumbnailImage(false);
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      cropping: true,
    }).then(image => {
      if (image && image.path) {
        setDpData(image.path);
        setModalVisible(false);
        console.log('Selected Image:--------------------Gal----', image.path);
        setImageFetchModalVisible(true);
      }
    });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const submitEditedDataHandler = async () => {
    try {
      const requestData = {
        name: editedData.name,
        phone: editedData.phoneNumber,
        address: editedData.location,
        email: editedData.mail,
        designation: editedData.profession,
        id: userLogInId, //Login User ID
      };

      const response = await axios.post(
        'https://inhouse.hirectjob.in/api/user/update-profile',
        requestData,
      );

      if (response.status === 200) {
        console.log('Edited Data:', editedData);
        setIsEditing(false);
        Alert.alert('Success');
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      Alert.alert('Error');
      console.error(error);
    }
  };

  // console.log('dpData 222222---------------', dpData);

  const dpImageHandilor = async () => {
    // console.log('dpData 3333333---------------', dpData);
    setImageFetchModalVisible(false);

    try {
      const formData = new FormData();
      formData.append('image', {
        uri: dpData,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      formData.append('id', userLogInId);

      const response = await axios.post(
        'https://inhouse.hirectjob.in/api/user/update-profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      console.log(response.data);
      Alert.alert('DP Updated Successfully');
      dispatch(ProfileGet());
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to update DP');
    }
  };

  return (
    <View style={styles.containerMessages}>
      <ImageBackground
        source={PlacesBGI}
        style={styles.backgroundImageMessages}>
        <View style={styles.headerContainerMessages}>
          <View style={styles.headerContentMessages}>
            <TouchableOpacity
              onPress={() => {
                dispatch(ProfileGet());
                navigation.goBack('');
              }}>
              <HeadLeftArrow height={hp('5%')} width={wp('12%')} />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTextFormMessages}>Profile</Text>

          <TouchableOpacity
            onPress={() => {
              setIsEditing(true);
            }}>
            <HeadLeftNotification height={hp('5%')} width={wp('12%')} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainerMessages}>
          <View
            style={styles.innerContainerMessages}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            {/* DP */}
            <View style={{marginTop: hp('2.5%'), marginBottom: hp('0.5%')}}>
              <View style={styles.circleContainerMessages}>
                <Image
                  source={{
                    uri: editedData?.img
                      ? `https://inhouse.hirectjob.in/public/${editedData.img}`
                      : '',
                  }}
                  style={styles.profileImage}
                />
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.editImageContainer}>
                <ProfileImageEdit height={hp('5%')} width={wp('8%')} />
              </TouchableOpacity>
            </View>
            {/* Edit */}
            {!isEditing ? (
              <TouchableOpacity
                onPress={() => {
                  setIsEditing(true);
                }}
                style={styles.editTextContainer}>
                <Text style={styles.editText}>Edit</Text>
                <ProfileEdit height={hp('3%')} width={wp('3.5%')} />
              </TouchableOpacity>
            ) : null}
            {/* DETAILS OF OF USER */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{marginTop: hp('5%')}}>
                <View style={styles.detailsTitlesContainer}>
                  {isEditing ? (
                    <TextInput
                      style={styles.detailsTitles}
                      value={editedData.name}
                      onChangeText={text => handleInputChange('name', text)}
                    />
                  ) : (
                    <Text style={styles.detailsTitles}>{editedData.name}</Text>
                  )}
                </View>
                <View style={styles.detailsTitlesContainer}>
                  {isEditing ? (
                    <TextInput
                      style={styles.detailsTitles}
                      value={editedData.mail}
                      onChangeText={text => handleInputChange('mail', text)}
                    />
                  ) : (
                    <Text style={styles.detailsTitles}>{editedData.mail}</Text>
                  )}
                </View>
                <View style={styles.detailsTitlesContainer}>
                  {isEditing ? (
                    <TextInput
                      style={styles.detailsTitles}
                      value={editedData.phoneNumber}
                      onChangeText={text =>
                        handleInputChange('phoneNumber', text)
                      }
                    />
                  ) : (
                    <Text style={styles.detailsTitles}>
                      {editedData.phoneNumber}
                    </Text>
                  )}
                </View>
                <View style={styles.detailsTitlesContainer}>
                  {isEditing ? (
                    <TextInput
                      style={styles.detailsTitles}
                      value={editedData.location}
                      onChangeText={text => handleInputChange('location', text)}
                    />
                  ) : (
                    <Text style={styles.detailsTitles}>
                      {editedData.location}
                    </Text>
                  )}
                </View>
                <View style={styles.detailsTitlesContainer}>
                  {isEditing ? (
                    <TextInput
                      style={styles.detailsTitles}
                      value={editedData.profession}
                      onChangeText={text =>
                        handleInputChange('profession', text)
                      }
                    />
                  ) : (
                    <Text style={styles.detailsTitles}>
                      {editedData.profession}
                    </Text>
                  )}
                </View>
              </View>
              {/* Submit Button */}
              {isEditing ? (
                <TouchableOpacity
                  style={[styles.submitButton, {marginBottom: hp('40%')}]}
                  onPress={submitEditedDataHandler}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              ) : null}
            </ScrollView>
          </View>
          {/* -------------------Image Picker Modal ---------- */}
          <Modal visible={modalVisible} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.ViewContain}>
                <TouchableOpacity
                  style={[styles.borderText, {backgroundColor: 'orange'}]}
                  onPress={openCamera}>
                  <Text style={styles.Title}>Take Image from Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.borderText, {backgroundColor: '#206e4b'}]}
                  onPress={openGallery}>
                  <Text style={styles.Title}>Select from Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.CancelborderText}
                  onPress={closeModal}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: FONT_SIZE.F_17,
                      fontFamily: FONT.BOLD,
                      marginVertical: hp('1%'),
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal visible={imageFetchModalVisible} animationType="slide">
            <View
              style={[
                styles.modalContainerOkModalDP,
                {height: hp('100%'), width: wp('100%')},
              ]}>
              <Text
                style={[
                  styles.alertTextModalDP,
                  {marginTop: hp('20%'), fontSize: wp('5%')},
                ]}>
                Click "OK" to update your profile picture.
              </Text>
              {/* <Text>Click</Text> */}
              <View style={styles.buttonContainerModalDP}>
                <TouchableOpacity
                  onPress={() => setImageFetchModalVisible(false)}
                  style={[
                    styles.buttonModalDP,
                    styles.cancelButtonModalDP,
                    {width: wp('40%')},
                  ]}>
                  <Text
                    style={[styles.buttonTextModalDP, {fontSize: wp('4%')}]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={dpImageHandilor}
                  style={[
                    styles.buttonModalDP,
                    styles.okButtonModalDP,
                    {width: wp('40%')},
                  ]}>
                  <Text
                    style={[styles.buttonTextModalDP, {fontSize: wp('4%')}]}>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  containerMessages: {
    flex: 1,
  },
  backgroundImageMessages: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  headerTextFormMessages: {
    color: COLOR.WHITE,
    fontFamily: FONT.SEMI_BOLD,
    fontSize: FONT_SIZE.F_17,
  },
  headerContainerMessages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: hp('2.7%'),
    margin: hp('2.6%'),
    marginBottom: hp('1.5%'),
    alignItems: 'center',
  },
  headerContentMessages: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTextContainerMessages: {
    marginLeft: hp('2%'),
    marginTop: hp('0.5%'),
  },
  headerTextMessages: {
    color: '#FFFFFF',
    fontFamily: 'bold',
    fontSize: wp('4.5%'),
  },
  contentContainerMessages: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    marginTop: hp('2%'),
    borderTopLeftRadius: hp('4%'),
    borderTopRightRadius: hp('4%'),
  },
  innerContainerMessages: {
    margin: hp('3%'),
    marginTop: hp('2%'),
    flex: 1,
    marginBottom: hp('2%'),
  },
  notificationContainerMessages: {
    flexGrow: 1,
    paddingTop: hp('2%'),
  },
  notificationItemContainerMessages: {
    padding: hp('2%'),
    borderRadius: hp('2.5%'),
    backgroundColor: 'rgba(2, 20, 49, 0.1)',
    marginBottom: hp('2%'),
  },
  notificationItemHeaderMessages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationItemNameMessages: {
    fontSize: FONT_SIZE.F_15,
    color: '#001D4C',
    fontFamily: FONT.SEMI_BOLD,
  },
  notificationItemTimeMessages: {
    fontSize: FONT_SIZE.F_12,
    color: '#001D4C',
    fontFamily: FONT.BOLD,
  },
  notificationItemMessageText: {
    fontSize: wp('4%'),
    marginTop: hp('0.5%'),
    fontSize: FONT_SIZE.F_14,
    color: '#001D4C',
    fontFamily: FONT.MEDIUM,
  },
  timeMessageText: {
    fontSize: wp('4%'),
    fontSize: FONT_SIZE.F_12,
    color: '#9EA3AE',
    fontFamily: FONT.SEMI_BOLD,
  },
  detailsTitlesContainer: {
    marginBottom: hp('2.5%'),
    height: hp('6.5%'),
    justifyContent: 'center',
    borderRadius: hp('1.5%'),
    borderWidth: hp('0.1%'),
    borderColor: 'rgba(0, 29, 76, 0.1)',
  },
  detailsTitles: {
    color: '#001D4C',
    marginLeft: hp('1.5%'),
  },
  circleContainerMessages: {
    width: hp('15%'),
    height: hp('15%'),
    borderRadius: hp('10%'),
    alignSelf: 'center',
    marginBottom: hp('2%'),
    overflow: 'hidden',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editImageContainer: {
    position: 'absolute',
    bottom: -hp('0.5%'),
    alignSelf: 'center',
    zIndex: 1,
  },
  editTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: hp('1.5%'),
  },
  editText: {
    fontFamily: FONT.SEMI_BOLD,
    fontSize: FONT_SIZE.F_15,
    color: '#001D4C',
    marginRight: hp('1%'),
  },
  submitButton: {
    backgroundColor: 'blue',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: hp('2%'),
  },
  submitButtonText: {
    color: 'white',
    fontFamily: FONT.SEMI_BOLD,
    fontSize: FONT_SIZE.F_15,
  },
  loadingContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  //Model
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  ViewContain: {
    width: wp('95%'),
    height: hp('30%'),
    borderColor: 'gray',
    borderWidth: hp('0.1%'),
    borderRadius: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  borderText: {
    borderWidth: hp('0.1%'),
    borderRadius: wp('2%'),
    borderColor: 'gray',
    width: wp('76%'),
    alignItems: 'center',
    marginVertical: wp('2.6%'),
    paddingVertical: wp('1%'),
  },
  CancelborderText: {
    borderWidth: hp('0.1%'),
    borderRadius: wp('2%'),
    borderColor: 'gray',
    width: wp('50%'),
    alignItems: 'center',
    marginVertical: wp('2.6%'),
    paddingVertical: wp('1%'),
    backgroundColor: 'red',
  },
  pickerForm: {
    height: hp('5%'),
    color: 'black',
  },

  buttonTextForm: {
    color: 'white',
    fontSize: FONT_SIZE.F_17,
    fontFamily: FONT.BOLD,
    alignSelf: 'center',
  },
  Title: {
    color: 'black',
    fontSize: FONT_SIZE.F_15,
    fontFamily: FONT.SEMI_BOLD,
    marginVertical: hp('1%'),
  },

  //Modal for ok click to update
  modalContainerOkModalDP: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertTextModalDP: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp('5%'),
  },
  buttonContainerModalDP: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    marginLeft: hp('2%'),
    marginRight: hp('2%'),
  },
  buttonModalDP: {
    padding: wp('2%'),
    marginHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('15%'),
  },
  cancelButtonModalDP: {
    backgroundColor: '#e53935',
  },
  okButtonModalDP: {
    backgroundColor: '#4caf50',
  },
  buttonTextModalDP: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});
