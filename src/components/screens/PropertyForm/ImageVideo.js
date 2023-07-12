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
import {Picker} from '@react-native-picker/picker';
import {FONT, FONT_SIZE, COLOR} from '../../../config/Globles';
import HeadLeftArrow from '../../../assets/svg/HeadLeftArrow.svg';
import PlacesBGI from '../../../assets/images/PlacesBGI.jpg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useRoute} from '@react-navigation/native';

//  ------------- Image picker --------------
import ImagePicker from 'react-native-image-crop-picker';
import {androidCameraPermission} from '../../../../permissions';

const ImageVideo = ({navigation}) => {
  const [modalThumbnailImage, setThumbnailImage] = useState(false);
  const [modalSliderImage, setSliderImage] = useState(false);
  const [modalVideoThumbnailImage, setVideoThumbnailImage] = useState(false);
  // ----------------------------------------------------------------------- z

  const [youtubeVideoId, setYoutubeVideoId] = useState('');
  const [instagramVideoId, setInstagramVideoId] = useState('');
  const [videoDescription, setVideoDescription] = useState('');

  const [singleImage, setSingleImage] = useState(null);
  const [multiImag, setMultiImag] = useState([]);
  const [videoImag, setVideoImag] = useState(null);

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
    setThumbnailImage(false);
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
    setThumbnailImage(false);
  };

  const multiImageCamera = async () => {
    const permission = await androidCameraPermission();
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('CAMERA MULTI path ====', image);
      const paths = image.map(image => image.path);
      setMultiImag(paths);
    });
    setSliderImage(false);
  };

  const multiImageGallary = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      console.log('GALLERY path ====', images);
      const paths = images.map(image => image.path); // Extracting only the path property
      setMultiImag(paths);
      console.log('setMultiGalleryImag path ====', paths);
    });
    setSliderImage(false);
  };

  // -------------- Video ----------

  const VideoCamera = async () => {
    const permission = await androidCameraPermission();
    // ImagePicker.openCamera({
    //   mediaType: 'video',
    // }).then(image => {
    //   setVideoImag(image.path);
    //   console.log(image);
    // });
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('Video path ====', image);
      setVideoImag(image.path);
    });
    setVideoThumbnailImage(false);
  };

  const selectVideoGallary = () => {
    // ImagePicker.openPicker({
    //   mediaType: 'video',
    // }).then(video => {
    //   setVideoImag(video.path);
    //   console.log(video);
    // });
    // setVideoThumbnailImage(false);

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('Video galllery path ====----------', image.path);
      setVideoImag(image.path);
    });
    setVideoThumbnailImage(false);
  };

  // ------------ on next btn ----------

  // ---------------------------------------------------------- Route Property Id
  const route = useRoute();
  const {propertyId} = route.params;
  console.log('Property ID Image and Video:', propertyId);
  // ---------------------------------------------------------- Route Property Id
  const handleSubmit = async () => {
    if (!youtubeVideoId || !instagramVideoId || !videoDescription) {
      Alert.alert('Fill All the fields');
      return;
    }
    console.log('singleImag----', singleImage);
    console.log('multiImag----', multiImag);
    console.log('video_thumbnail----', videoImag);

    try {
      const formData = new FormData();
      if (singleImage) {
        formData.append('thumbnail_image', {
          uri: singleImage,
          type: 'image/jpg',
          name: 'thumbnail.jpg',
        });
      } else {
        formData.append('thumbnail_image', '0');
      }

      if (multiImag.length > 0) {
        for (let index = 0; index < multiImag.length; index++) {
          formData.append('slider_images[]', {
            uri: multiImag[index],
            type: 'image/jpg',
            name: `img_${index}.jpg`,
          });
        }
      } else {
        formData.append('slider_images', '0');
      }

      if (singleImage) {
        formData.append('video_thumbnail', {
          uri: videoImag,
          type: 'image/jpg',
          name: 'thumbnail.jpg',
        });
      } else {
        formData.append('video_thumbnail', '0');
      }

      formData.append('video_id', youtubeVideoId);
      formData.append('ins_video_id', instagramVideoId);
      formData.append('video_description', videoDescription);
      formData.append('property_id', propertyId);
      console.log(formData, 'formData');
      const response = await fetch(
        'https://inhouse.hirectjob.in/api/properties-store3',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
          body: formData,
        },
      );

      const data = await response.json();
      console.log('Property Images and Videos Response:-------', data);
      navigation.navigate('Aminities', {propertyId: propertyId});
      Alert.alert('Successful');

      setYoutubeVideoId('');
      setInstagramVideoId('');
      setVideoDescription('');
    } catch (error) {
      console.log('error', error);
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
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextForm}>Image and Video</Text>
          </View>
        </View>

        <View style={styles.contentContainerForm}>
          <View>
            <KeyboardAwareScrollView
              extraHeight={3}
              scrollIntoView={KeyboardAwareScrollView}
              style={styles.innerContainerForm}
              showsVerticalScrollIndicator={false}>
              {/* -------------------Thumbnail Image  ---------- */}
              <Text style={styles.Title}>Thumbnail Image </Text>
              <TouchableOpacity
                style={styles.thumbnailImagePicker}
                onPress={() => setThumbnailImage(true)}>
                <Text style={styles.bottomButtonTextForm}>Select Images</Text>
              </TouchableOpacity>

              {/* -------------------Slider Image (Multiple)  ---------- */}
              <Text style={styles.Title}>Slider Image (Multiple) </Text>

              <TouchableOpacity
                style={styles.thumbnailImagePicker}
                onPress={() => setSliderImage(true)}>
                <Text style={styles.bottomButtonTextForm}>Select Images</Text>
              </TouchableOpacity>

              {/* -------------------Video Thumbnail Image  ---------- */}
              <Text style={styles.Title}>Video Thumbnail </Text>

              <TouchableOpacity
                style={styles.thumbnailImagePicker}
                onPress={() => setVideoThumbnailImage(true)}>
                <Text style={styles.bottomButtonTextForm}>
                  Select Video Thumbnail
                </Text>
              </TouchableOpacity>

              {/* ------------ Floor ------ */}

              <Text style={styles.Title}>Youtube video id</Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                placeholderTextColor={'gray'}
                keyboardType="default"
                value={youtubeVideoId}
                onChangeText={setYoutubeVideoId}
              />

              <Text style={styles.Title}>Instagram video id</Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                placeholderTextColor={'gray'}
                keyboardType="default"
                value={instagramVideoId}
                onChangeText={setInstagramVideoId}
              />

              {/* ------------ Floor ------ */}
              <Text style={styles.Title}>Video description</Text>
              <TextInput
                style={[styles.inputFieldForm, {marginBottom: hp('35%')}]}
                placeholder="Enter Here"
                placeholderTextColor={'gray'}
                keyboardType="default"
                value={videoDescription}
                onChangeText={setVideoDescription}
              />
            </KeyboardAwareScrollView>
          </View>
        </View>

        {/* -------------------Image Picker Modal ---------- */}
        <Modal visible={modalThumbnailImage} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.ViewContain}>
              <TouchableOpacity
                style={[styles.borderText, {backgroundColor: 'orange'}]}
                onPress={() => {
                  SelectCamera();
                }}>
                <Text style={styles.Title}> Take Image from Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.borderText, {backgroundColor: '#206e4b'}]}
                onPress={() => SelectGallary()}>
                <Text style={styles.Title}>Select from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CancelborderText}
                onPress={() => setThumbnailImage(false)}>
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

        {/* -------------------Slider Image (Multiple) ---------- */}
        <Modal visible={modalSliderImage} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.ViewContain}>
              <TouchableOpacity
                style={[styles.borderText, {backgroundColor: 'orange'}]}
                onPress={() => multiImageCamera()}>
                <Text style={styles.Title}> Take Image from Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.borderText, {backgroundColor: '#206e4b'}]}
                onPress={() => multiImageGallary()}>
                <Text style={styles.Title}>Select from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CancelborderText}
                onPress={() => setSliderImage(false)}>
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

        {/* ------------------- Video Thumbnail Image ---------- */}
        <Modal visible={modalVideoThumbnailImage} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.ViewContain}>
              <TouchableOpacity
                style={[styles.borderText, {backgroundColor: 'orange'}]}
                onPress={() => VideoCamera()}>
                <Text style={styles.Title}>Take Video from Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.borderText, {backgroundColor: '#206e4b'}]}
                onPress={() => selectVideoGallary()}>
                <Text style={styles.Title}>Select Video from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CancelborderText}
                onPress={() => setVideoThumbnailImage(false)}>
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
              {backgroundColor: '#F49825'},
            ]}
            onPress={handleSubmit}>
            <Text style={styles.bottomButtonTextForm}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ImageVideo;

const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
  },
  backgroundImageForm: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  //------------------------------
  headerContainerForm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },

  headerTextForm: {
    color: '#FFFFFF',
    fontFamily: FONT.SEMI_BOLD,
    fontSize: FONT_SIZE.F_16,
    justifyContent: 'center',
  },

  //------------------------------

  headerContentForm: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
  textContainerForm: {
    flex: 1,
  },

  bottomNavButtonContainerForm: {
    position: 'absolute',
    bottom: hp('4%'),
    flex: 0,
    width: wp('100%'),
    alignItems: 'center',
  },
  thumbnailImagePicker: {
    backgroundColor: '#001D4C',
    width: wp('86%'),
    height: hp('7.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('1.5%'),
    marginBottom: hp('2%'),
  },
  bottomButtonTouchOpacityForm: {
    width: wp('86%'),
    height: hp('7.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('1.5%'),
    marginBottom: hp('5%'),
    alignSelf: 'center',
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
  pickerContainerForm: {
    borderWidth: hp('0.1%'),
    borderRadius: hp('1%'),
    marginBottom: hp('2%'),
    justifyContent: 'center',
    height: hp('6.5%'),
    marginBottom: hp('2.5%'),
    borderColor: 'gray',
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
  // -------  modal -------
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  ViewContain: {
    //  marginTop: hp('74%'),
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

  //header Style
  headerButtonForm: {
    position: 'absolute',
    left: hp('2%'),
    zIndex: 1,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
