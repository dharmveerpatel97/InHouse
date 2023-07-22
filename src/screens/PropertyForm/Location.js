import React, {useEffect, useState} from 'react';
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
import {Picker} from '@react-native-picker/picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import HeadLeftArrow from '../../assets/svg/HeadLeftArrow.svg';
import PlacesBGI from '../../assets/images/PlacesBGI.jpg';

import {FONT, FONT_SIZE, COLOR} from '../../config/Globles';

//API LOCATION
import {propertyFormCity} from '../../redux/Store';
import {useSelector, useDispatch} from 'react-redux';

import {useRoute} from '@react-navigation/native';

const Location = ({navigation}) => {
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetails, setAddressDetails] = useState('');
  const [googleMap, setGoogleMap] = useState('');

  //API CITY
  const dispatch = useDispatch();
  const citysData = useSelector(state => state.cityTrueStatus);

  // Fetch property owner
  useEffect(() => {
    dispatch(propertyFormCity());
  }, [dispatch]);

  // console.log('propertyOwnerData', propertyOwnerData);

  const [loadingPropertyCity, setLoadingCity] = useState(true);
  const [apiLoadPropertyCity, setApiLoadCity] = useState(false);

  useEffect(() => {
    dispatch(propertyFormCity())
      .then(() => {
        setLoadingCity(false);
        setApiLoadCity(true);
      })
      .catch(() => {
        setLoadingCity(false);
        setApiLoadCity(false);
      });
  }, []);

  // console.log('Shya---------', city);
  // ---------------------------------------------------------- Route Property Id
  const route = useRoute();
  const {propertyId} = route.params;
  console.log('Property ID Location------------------:', propertyId);
  // ---------------------------------------------------------- Route Property Id
  const handleSubmit = async () => {
    if (!city || !address || !addressDetails || !googleMap) {
      // Display an alert if any field is empty
      Alert.alert('Fill All the fields');
      return;
    }

    try {
      const response = await fetch(
        'https://inhouse.hirectjob.in/api/properties-store2',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            city_id: city,
            address: address,
            address_description: addressDetails,
            google_map: googleMap,
            property_id: propertyId,
          }),
        },
      );

      Alert.alert('Successfull');
      // Clear the form fields
      setCity('');
      setAddress('');
      setAddressDetails('');
      setGoogleMap('');
      const data = await response.json();
      console.log('Property  Location Response ------------------:', data);
      navigation.navigate('ImageVideo', {propertyId: propertyId});
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
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextForm}>Location</Text>
          </View>
        </View>

        <View style={styles.contentContainerForm}>
          <View>
            <KeyboardAwareScrollView
              extraHeight={3}
              scrollIntoView={KeyboardAwareScrollView}
              style={styles.innerContainerForm}
              showsVerticalScrollIndicator={false}>
              {loadingPropertyCity ? (
                <View style={styles.container}>
                  <ActivityIndicator size="large" color="blue" />
                </View>
              ) : citysData ? (
                <>
                  <Text style={styles.titleTextInputFields}>City</Text>
                  <View style={styles.pickerContainerForm}>
                    <Picker
                      style={styles.pickerForm}
                      selectedValue={city}
                      onValueChange={itemValue => {
                        setCity(itemValue);
                        const selectedPropertyCity = citysData.state.find(
                          item => item.id === itemValue,
                        );
                        // console.log('Selected City:', selectedPropertyCity);
                      }}
                      dropdownIconColor="black">
                      {citysData.state.map(item => (
                        <Picker.Item
                          key={item.id}
                          label={item.name}
                          value={item.id}
                        />
                      ))}
                    </Picker>
                  </View>
                </>
              ) : (
                <Text>Failed to load API Data</Text>
              )}

              <Text style={styles.titleTextInputFields}>Address</Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                placeholderTextColor="gray"
                keyboardType="default"
                value={address}
                onChangeText={setAddress}
              />

              <Text style={styles.titleTextInputFields}>Address Details</Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                placeholderTextColor="gray"
                keyboardType="default"
                value={addressDetails}
                onChangeText={setAddressDetails}
              />

              <Text style={styles.titleTextInputFields}>Google Map</Text>
              <View style={[styles.descripView, {marginBottom: hp('35%')}]}>
                <TextInput
                  style={styles.descriptionInput}
                  placeholder="Enter Here"
                  placeholderTextColor="gray"
                  keyboardType="default"
                  multiline={true}
                  value={googleMap}
                  onChangeText={setGoogleMap}
                />
              </View>
            </KeyboardAwareScrollView>
          </View>
        </View>
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

export default Location;

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
    marginTop: hp('10%'),
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
  titleTextInputFields: {
    fontSize: FONT_SIZE.F_14,
    fontFamily: FONT.SEMI_BOLD,
    color: '#001D4C',
    marginBottom: hp('0.6%'),
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
