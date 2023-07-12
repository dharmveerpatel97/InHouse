import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import {FONT, FONT_SIZE, COLOR} from '../../config/Globles';
import HeadLeftNotification from '../../assets/svg/HeadLeftNotification.svg';
import PlacesBGI from '../../assets/images/DetailsBGI.jpg';
import ServicesIcon from '../../assets/svg/ServicesIcon.svg';
import axios from 'axios';

const Form = ({navigation}) => {
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [city, setCity] = useState('');
  // ------------------------------------------------------
  const [lookingFor, setLookingFor] = useState('Buy');
  const [lookingForPropertyType, setLookingForServices] =
    useState('Commercial');
  // ------------------------------------------------------
  const [commercial, setCommercial] = useState('');
  const [residential, setResidential] = useState('');
  const [services, setServices] = useState('');
  const [loan, setSetLoan] = useState('');

  const SubmitHandilar = () => {
    let category = null;

    if (lookingFor === 'Services') {
      category = services;
    } else if (lookingFor === 'Loan') {
      category = loan;
    } else if (lookingForPropertyType === 'Commercial') {
      category = commercial;
    } else if (lookingForPropertyType === 'Residential') {
      category = residential;
    }

    const data = {
      name: name,
      mobile: mobileNo,
      city: city,
      looking_for: lookingFor,
      property_type:
        lookingFor === 'Buy' || lookingFor === 'Sell' || lookingFor === 'Rent'
          ? lookingForPropertyType
          : null,
      category: category,
    };

    axios
      .post('https://inhouse.hirectjob.in/api/property_enquery', data)
      .then(response => {
        console.log(response.data);
        Alert.alert(
          'Your form has been successfully submitted',
          'Our team will be in touch with you shortly.',
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.containerForm}>
      <ImageBackground source={PlacesBGI} style={styles.backgroundImageForm}>
        <View style={styles.headerContainerForm}>
          <View style={styles.headerContentForm}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Menu');
              }}
              style={styles.headerButtonForm}>
              <ServicesIcon height={hp('5%')} width={wp('12%')} />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTextForm}>Enquiry Form</Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notification');
            }}
            style={styles.headerButtonForm}>
            <HeadLeftNotification height={hp('5%')} width={wp('12%')} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainerForm}>
          <View>
            <ScrollView
              style={styles.innerContainerForm}
              showsVerticalScrollIndicator={false}>
              <Text style={styles.titleTextStyle}>Full Name</Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                value={name}
                onChangeText={setName}
              />
              <Text style={styles.titleTextStyle}>City</Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                value={city}
                onChangeText={setCity}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                autoCompleteType="email"
              />
              <Text style={styles.titleTextStyle}>Mobile No</Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                value={mobileNo}
                onChangeText={setMobileNo}
                keyboardType="phone-pad"
              />
              <Text style={styles.titleTextStyle}>Looking For</Text>
              <View style={styles.pickerContainerForm}>
                <Picker
                  style={styles.pickerForm}
                  selectedValue={lookingFor}
                  onValueChange={setLookingFor}>
                  {lookingForOptions.map(option => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              </View>

              {lookingFor === 'Buy' ||
              lookingFor === 'Sell' ||
              lookingFor === 'Rent' ? (
                <>
                  <Text style={styles.titleTextStyle}>Property Type</Text>
                  <View style={styles.pickerContainerForm}>
                    <Picker
                      style={styles.pickerForm}
                      selectedValue={lookingForPropertyType}
                      onValueChange={setLookingForServices}>
                      {propertyTypeOptions.map(option => (
                        <Picker.Item
                          key={option.value}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </Picker>
                  </View>
                </>
              ) : null}
              {lookingFor === 'Services' ? (
                <>
                  <Text style={styles.titleTextStyle}>Services</Text>
                  <View style={styles.pickerContainerForm}>
                    <Picker
                      style={styles.pickerForm}
                      selectedValue={services}
                      onValueChange={setServices}>
                      {servicesOptions.map(option => (
                        <Picker.Item
                          key={option.value}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </Picker>
                  </View>
                </>
              ) : null}
              {lookingFor === 'Loan' ? (
                <View>
                  <Text style={styles.titleTextStyle}>Loan</Text>
                  <View style={styles.pickerContainerForm}>
                    <Picker
                      style={styles.pickerForm}
                      selectedValue={loan}
                      onValueChange={setSetLoan}>
                      {loanOptions.map(option => (
                        <Picker.Item
                          key={option.value}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              ) : null}
              {lookingFor === 'Buy' ||
              lookingFor === 'Sell' ||
              lookingFor === 'Rent' ? (
                <>
                  {lookingForPropertyType === 'Commercial' ? (
                    <>
                      <Text style={styles.titleTextStyle}>Commercial</Text>
                      <View style={styles.pickerContainerForm}>
                        <Picker
                          style={styles.pickerForm}
                          selectedValue={commercial}
                          onValueChange={setCommercial}>
                          {commercialOptions.map(option => (
                            <Picker.Item
                              key={option.value}
                              label={option.label}
                              value={option.value}
                            />
                          ))}
                        </Picker>
                      </View>
                    </>
                  ) : null}
                </>
              ) : null}
              {lookingFor === 'Buy' ||
              lookingFor === 'Sell' ||
              lookingFor === 'Rent' ? (
                lookingForPropertyType === 'Residential' ? (
                  <>
                    <Text style={styles.titleTextStyle}>Residential</Text>
                    <View style={styles.pickerContainerForm}>
                      <Picker
                        style={styles.pickerForm}
                        selectedValue={residential}
                        onValueChange={setResidential}>
                        {residentialOptions.map(option => (
                          <Picker.Item
                            key={option.value}
                            label={option.label}
                            value={option.value}
                          />
                        ))}
                      </Picker>
                    </View>
                  </>
                ) : null
              ) : null}
            </ScrollView>
          </View>
        </View>

        {/* Bottom Navigation Button */}
        <View style={styles.bottomNavButtonContainerForm}>
          <TouchableOpacity
            style={styles.bottomButtonTouchOpacityForm}
            onPress={SubmitHandilar}>
            <Text style={styles.bottomButtonTextForm}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

//Array of objects
const lookingForOptions = [
  {id: 1, label: 'Buy', value: 'Buy'},
  {id: 2, label: 'Sell', value: 'Sell'},
  {id: 3, label: 'Rent', value: 'Rent'},
  {id: 4, label: 'Services', value: 'Services'},
  {id: 5, label: 'Loan', value: 'Loan'},
];

const propertyTypeOptions = [
  {id: 1, label: 'Commercial', value: 'Commercial'},
  {id: 2, label: 'Residential', value: 'Residential'},
];

const commercialOptions = [
  {id: 1, label: 'Plot', value: 'Plot'},
  {id: 2, label: 'Office Space', value: 'Office Space'},
  {id: 3, label: 'Shops / Showrooms', value: 'Shops / Showrooms'},
  {id: 4, label: 'Factory / Industry', value: 'Factory / Industry'},
  {id: 5, label: 'Other Commercial Space', value: 'Other Commercial Space'},
  {id: 6, label: 'Co-working Space', value: 'Co-working Space'},
];

const residentialOptions = [
  {id: 1, label: 'Plot', value: 'Plot'},
  {id: 2, label: 'Flat', value: 'Flat'},
  {id: 3, label: 'House', value: 'House'},
  {id: 4, label: 'Duplex', value: 'Duplex'},
  {id: 5, label: 'Villa / Bungalow', value: 'Villa / Bungalow'},
];

const servicesOptions = [
  {id: 1, label: 'Home Cleaning', value: 'Home Cleaning'},
  {id: 2, label: 'Repairing & Renovation', value: 'Repairing & Renovation'},
  {id: 3, label: 'AC Servicing', value: 'AC Servicing'},
  {id: 4, label: 'Construction', value: 'Construction'},
  {id: 5, label: 'Packers & Movers', value: 'Packers & Movers'},
  {id: 6, label: 'Interior', value: 'Interior'},
  {id: 7, label: 'Pest Control', value: 'Pest Control'},
  {id: 8, label: 'Architecture', value: 'Architecture'},
  {id: 9, label: 'Fire Safety', value: 'Fire Safety'},
  {id: 10, label: 'Vastu', value: 'Vastu'},
  {id: 11, label: 'Painting', value: 'Painting'},
  {id: 12, label: 'Carpenter', value: 'Carpenter'},
  {id: 13, label: 'Legal', value: 'Legal'},
  {id: 14, label: 'Valuation', value: 'Valuation'},
  {id: 15, label: 'Insurance', value: 'Insurance'},
  {id: 16, label: 'Plumbing', value: 'Plumbing'},
  {id: 17, label: 'Electrician', value: 'Electrician'},
  {id: 18, label: 'Bathroom Cleaning', value: 'Bathroom Cleaning'},
];

const loanOptions = [
  {id: 1, label: 'Home Loan', value: 'Home Loan'},
  {
    id: 2,
    label: 'Loan against Property / Mortgage',
    value: 'Loan against Property / Mortgage',
  },
  {id: 3, label: 'Project Loan', value: 'Project Loan'},
  {id: 4, label: 'Car Loan', value: 'Car Loan'},
  {id: 5, label: 'Agricultural Loan', value: 'Agricultural Loan'},
  {id: 6, label: 'Educational Loan', value: 'Educational Loan'},
  {id: 7, label: 'Retail', value: 'Retail'},
];
export default Form;

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
    justifyContent: 'space-between',
    marginLeft: hp('2.7%'),
    margin: hp('2.6%'),
    marginBottom: hp('1.5%'),
    alignItems: 'center',
  },
  headerContentForm: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonForm: {
    marginRight: hp('0%'),
  },

  headerTextForm: {
    color: COLOR.WHITE,
    fontFamily: FONT.SEMI_BOLD,
    fontSize: FONT_SIZE.F_17,
  },

  contentContainerForm: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    marginTop: hp('2%'),
    borderTopLeftRadius: hp('4%'),
    borderTopRightRadius: hp('4%'),
    paddingBottom: hp('9%'),
  },
  innerContainerForm: {
    margin: hp('3%'),
    marginTop: hp('5%'),
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
  bottomButtonTouchOpacityForm: {
    backgroundColor: '#F49825',
    width: wp('86%'),
    height: hp('7.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('1.5%'),
  },
  bottomButtonTextForm: {
    fontFamily: 'SemiBold',
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
  },

  buttonTextForm: {
    color: 'white',
    fontSize: FONT_SIZE.F_17,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  titleTextStyle: {
    color: 'black',
    fontSize: FONT_SIZE.F_15,
    fontFamily: FONT.SEMI_BOLD,
    marginVertical: hp('1%'),
  },
});
