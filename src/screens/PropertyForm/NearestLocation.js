import React, {useState, useEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import {FONT, FONT_SIZE} from '../../config/Globles';
import HeadLeftArrow from '../../assets/svg/HeadLeftArrow.svg';
import PlacesBGI from '../../assets/images/PlacesBGI.jpg';
import {useRoute} from '@react-navigation/native';

import {useSelector, useDispatch} from 'react-redux';
import {propertyNearistLocation} from '../../redux/Store';

const NearestLocation = ({navigation}) => {
  const [nearestLocation, setNearestLocation] = useState(2);
  const [distance, setDistance] = useState('');

  // console.log('nearestLocation:', nearestLocation);
  // console.log('distance:', distance);

  // ---------------------------------------------------------- Route Property Id
  const route = useRoute();
  const {propertyId} = route.params;
  // console.log('Property ID Location:', propertyId);
  // ---------------------------------------------------------- Route Property Id
  const handleSubmit = async () => {
    const nearestLocationArray = [nearestLocation]; // Store the value in an array

    if (!nearestLocation || !distance) {
      // Display an alert if any field is empty
      Alert.alert('Fill All the fields');
      return;
    }

    try {
      const response = await fetch(
        'https://inhouse.hirectjob.in/api/store_property_data',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nearest_locations: nearestLocationArray,
            distances: distance,
            property_id: propertyId,
          }),
        },
      );

      Alert.alert('Successfull');
      // Clear the form fields
      setNearestLocation('');
      setDistance('');
      const data = await response.json();
      console.log('Property Nearist Location  ------------------:', data);

      navigation.navigate('AdditionalInformation', {propertyId: propertyId});
    } catch (error) {
      console.log(error);
    }
  };

  // API CALLS Property Nearist -------------------------------------------------- Location
  const dispatch = useDispatch();
  const nearistLocationData = useSelector(state => state.nearistLocationStatus);

  // Fetch property nearist location
  useEffect(() => {
    dispatch(propertyNearistLocation())
      .then(() => {
        setLoadingNearistLocation(false);
        setApiLoadNearistLocation(true);
      })
      .catch(() => {
        setLoadingNearistLocation(false);
        setApiLoadNearistLocation(false);
      });
  }, [dispatch]);

  const [loadingNearistLocation, setLoadingNearistLocation] = useState(true);
  const [apiLoadNearistLocation, setApiLoadNearistLocation] = useState(false);

  console.log('nearistLocationData', nearistLocationData);

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
            <Text style={styles.headerTextForm}>Nearest Location</Text>
          </View>
        </View>

        <View style={styles.contentContainerForm}>
          <View style={styles.innerContainerForm}>
            {/* -------- Owernship -- */}
            {loadingNearistLocation ? (
              <View style={styles.container}>
                <ActivityIndicator size="large" color="blue" />
              </View>
            ) : nearistLocationData ? (
              <>
                <Text style={styles.titleText}>Nearest Location</Text>

                <View style={styles.pickerContainerForm}>
                  <Picker
                    style={styles.pickerForm}
                    selectedValue={nearestLocation}
                    onValueChange={itemValue => {
                      setNearestLocation(itemValue);
                      const selectedLocation = nearistLocationData.state.find(
                        item => item.id === itemValue,
                      );
                      console.log('Selected Location:', selectedLocation);
                    }}
                    dropdownIconColor="black">
                    {nearistLocationData.state.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={item.location}
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </View>
              </>
            ) : (
              <Text>Failed to load API Data</Text>
            )}

            {/* ------------ Floor ------ */}
            <Text style={styles.titleText}>Distance(km)</Text>
            <TextInput
              style={styles.inputFieldForm}
              placeholder="Enter Here"
              placeholderTextColor={'gray'}
              keyboardType="phone-pad"
              value={distance}
              onChangeText={setDistance}
            />
          </View>
        </View>

        <View style={{backgroundColor: '#F8F8F8'}}>
          <TouchableOpacity
            style={[
              styles.bottomButtonTouchOpacityForm,
              {backgroundColor: '#F49825', alignSelf: 'center'},
            ]}
            onPress={handleSubmit}>
            <Text style={styles.bottomButtonTextForm}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default NearestLocation;

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

  headerTextForm: {
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
    width: wp('86%'),
    height: hp('7.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('1.5%'),
    marginBottom: hp('5%'),
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

  titleText: {
    color: 'black',
    fontSize: FONT_SIZE.F_15,
    fontFamily: FONT.SEMI_BOLD,
    marginVertical: hp('1%'),
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
