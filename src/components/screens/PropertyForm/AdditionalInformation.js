import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {FONT, FONT_SIZE} from '../../../config/Globles';

import HeadLeftArrow from '../../../assets/svg/HeadLeftArrow.svg';
import PlacesBGI from '../../../assets/images/PlacesBGI.jpg';
import {useRoute} from '@react-navigation/native';

const AdditionalInformation = ({navigation}) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  // const handleSubmit = () => {
  console.log('Key:', key);
  console.log('Value:', value);
  //   navigation.navigate('PropertyPlan');
  //   setKey('');
  // };

  // ---------------------------------------------------------- Route Property Id
  const route = useRoute();
  const {propertyId} = route.params;
  // console.log('Property ID Location:', propertyId);
  // ---------------------------------------------------------- Route Property Id
  const handleSubmit = async () => {
    const newkey = [key];
    const newvalue = [value];

    console.log('Key:', newkey);
    console.log('Value:', newvalue);

    if (!key || !value) {
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
            add_keys: newkey,
            add_values: newvalue,
            property_id: propertyId,
          }),
        },
      );

      Alert.alert('Successfull');
      // Clear the form fields
      setKey('');
      setValue('');
      const data = await response.json();
      console.log('Property Additional Information ------------------:', data);

      navigation.navigate('PropertyPlan', {propertyId: propertyId});
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
            <Text style={styles.headerTextForm}> Additional Information</Text>
          </View>
        </View>

        <View style={styles.contentContainerForm}>
          <View style={styles.innerContainerForm}>
            {/* -------- Key -- */}
            <Text style={styles.titleText}>Key</Text>
            <TextInput
              style={styles.inputFieldForm}
              placeholder="Enter Here"
              placeholderTextColor={'gray'}
              keyboardType="default"
              value={key}
              onChangeText={setKey}
            />

            {/* ------------ Value ------ */}
            <Text style={styles.titleText}>Value</Text>
            <TextInput
              style={styles.inputFieldForm}
              placeholder="Enter Here"
              placeholderTextColor={'gray'}
              keyboardType="default"
              value={value}
              onChangeText={setValue}
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

export default AdditionalInformation;

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

  titleText: {
    color: 'black',
    fontSize: FONT_SIZE.F_15,
    fontFamily: FONT.SEMI_BOLD,
    marginVertical: hp('1%'),
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
