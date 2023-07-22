import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import HeadLeftArrow from '../../assets/svg/HeadLeftArrow.svg';
import PlacesBGI from '../../assets/images/PlacesBGI.jpg';
import {useRoute} from '@react-navigation/native';
//  ------------- Image picker --------------
import ImagePicker from 'react-native-image-crop-picker';
import { FONT, FONT_SIZE } from '../../config/Globles';
import { androidCameraPermission } from '../../../permissions';


const PropertyForm = ({navigation}) => {
  const [imageProperty, setImageProperty] = useState(
    'https://cdn.britannica.com/65/142565-050-91E55B84/Daly-College-Indore-Madhya-Pradesh-India.jpg',
  );
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // ---------------------------------------------------------- Route Property Id
  // const route = useRoute();
  // const {propertyId} = route.params;
  // console.log('Property ID Location:', propertyId);
  // ---------------------------------------------------------- Route Property Id

  const [singleImage, setSingleImage] = useState([]);
  //  ---------- Camera -----------
  const SelectCamera = async () => {
    const permission = await androidCameraPermission();
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('camera path ====', image);
      setSingleImage(image.path);
    });
    setModalVisible(false);
  };

  const SelectGallary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('gallery path ====----------', image.path);
      setSingleImage(image.path);
    });
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    // const newImageProperty = [imageProperty];
    // const newTitle = [title];
    // const newDescription = [description];

    if (!title || !description) {
      Alert.alert('Fill All the fields');
      return;
    }

    try {
      const planData = new FormData();

      if (singleImage) {
        planData.append('plan_images', {
          uri: singleImage,
          type: 'image/jpg',
          name: 'thumbnail.jpg',
        });
      } else {
        planData.append('plan_images', '0');
      }

      planData.append('plan_titles', title);
      planData.append('plan_descriptions', description);
      planData.append('property_id', '83');

      console.log('response of planData', planData);

      const response = await fetch(
        'https://inhouse.hirectjob.in/api/store_property_data',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: planData,
        },
      );

      Alert.alert('Successful');
      setTitle('');
      setDescription('');
      navigation.navigate('Home');
      const data = await response.json();
      console.log('Property Plan:', data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.containerForm}>
      <ImageBackground source={PlacesBGI} style={styles.backgroundImageForm}>
        <View style={styles.headerContainerForm}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack('');
            }}
            style={styles.headerButtonForm}>
            {/* Assuming 'HeadLeftArrow' is an image or icon component */}
            <HeadLeftArrow height={hp('5%')} width={wp('12%')} />
          </TouchableOpacity>
          <View style={styles.propertyPlanContainer}>
            <Text style={styles.propertyPlanText}>Property Plan</Text>
          </View>
        </View>

        <View style={styles.contentContainerForm}>
          <View>
            <KeyboardAwareScrollView
              extraHeight={3}
              scrollIntoView={KeyboardAwareScrollView}
              style={styles.innerContainerForm}
              showsVerticalScrollIndicator={false}>
              {/* ------------------- Image Picker ---------- */}
              <Text style={styles.Title}>Image</Text>
              <TouchableOpacity
                style={styles.bottomButtonTouchOpacityForm}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.bottomButtonTextForm}>Choose File</Text>
              </TouchableOpacity>

              {/* --------- Title -------- */}
              <Text style={styles.Title}>Title</Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                placeholderTextColor={'gray'}
                keyboardType="default"
                value={title}
                onChangeText={text => setTitle(text)}
              />

              {/* --------- Description -------- */}
              <Text style={styles.Title}>Description</Text>
              <View style={styles.descripView}>
                <TextInput
                  style={styles.descriptionInput}
                  placeholder="Enter the description"
                  placeholderTextColor={'gray'}
                  keyboardType="default"
                  multiline={true}
                  value={description}
                  onChangeText={txt => setDescription(txt)}
                />
              </View>
            </KeyboardAwareScrollView>
          </View>
        </View>

        {/* -------------------Image Picker Modal ---------- */}
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.ViewContain}>
              <TouchableOpacity
                style={[styles.borderText, {backgroundColor: 'orange'}]}
                onPress={() => SelectCamera()}>
                <Text style={styles.Title}> Select from Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.borderText, {backgroundColor: '#206e4b'}]}
                onPress={() => SelectGallary()}>
                <Text style={styles.Title}>Select from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CancelborderText}
                onPress={() => setModalVisible(false)}>
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

        <View style={{backgroundColor: '#FFFFFF'}}>
          <TouchableOpacity
            style={[
              styles.bottomButtonTouchOpacityForm,
              {
                backgroundColor: '#F49825',
                alignSelf: 'center',
                marginBottom: hp('4.5%'),
                width: wp('86%'),
              },
            ]}
            onPress={handleSubmit}>
            <Text style={styles.bottomButtonTextForm}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default PropertyForm;

const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
  },
  backgroundImageForm: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  headerContainerForm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  propertyPlanText: {
    color: '#FFFFFF',
    fontFamily: FONT.SEMI_BOLD,
    fontSize: FONT_SIZE.F_16,
    justifyContent: 'center',
  },
  headerButtonForm: {
    marginRight: hp('2%'),
  },
  contentContainerForm: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    marginTop: hp('2%'),
    borderTopLeftRadius: hp('4%'),
    borderTopRightRadius: hp('4%'),
  },
  innerContainerForm: {
    margin: hp('3%'),
    marginTop: hp('5%'),
    marginBottom: 0,
  },
  bottomButtonTouchOpacityForm: {
    backgroundColor: '#001D4C',
    height: hp('7.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('1.5%'),
    marginBottom: hp('1%'),
  },
  bottomButtonTextForm: {
    fontFamily: FONT.SEMI_BOLD,
    color: '#FFFFFF',
    fontSize: FONT_SIZE.F_17,
  },
  inputFieldForm: {
    height: hp('6.5%'),
    borderWidth: hp('0.1'),
    borderColor: 'gray',
    marginBottom: hp('2.5%'),
    paddingHorizontal: wp('2%'),
    borderRadius: hp('1%'),
    color: 'black',
  },
  descripView: {
    marginBottom: hp('2.5%'),
    borderRadius: hp('1%'),
    paddingHorizontal: wp('2%'),
    height: hp('14%'),
    borderWidth: hp('0.1'),
    borderColor: 'gray',
  },
  descriptionInput: {
    color: 'black',
  },
  Title: {
    color: 'black',
    fontSize: FONT_SIZE.F_15,
    fontFamily: FONT.SEMI_BOLD,
    marginVertical: hp('1%'),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  ViewContain: {
    // marginTop: hp('75%'),
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
  headerButtonForm: {
    position: 'absolute',
    left: hp('2%'),
    zIndex: 1,
  },
  propertyPlanContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
