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

import {FONT, FONT_SIZE, COLOR} from '../../../config/Globles';

import HeadLeftArrow from '../../../assets/svg/HeadLeftArrow.svg';
import PlacesBGI from '../../../assets/images/PlacesBGI.jpg';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// ---------------------- Property Owner

import {propertyFormPropertyOwner} from '../.././../redux/Store';
import {useSelector, useDispatch} from 'react-redux';

// ---------------------- Property Type
import {propertyFormPropertyType} from '../.././../redux/Store';

const PropertyForm = ({navigation}) => {
  // API CALLS Property Owner
  const dispatch = useDispatch();
  const propertyOwnerData = useSelector(
    state => state.propertyFormPropertyOwnerStatus,
  );

  // Fetch property owner
  useEffect(() => {
    dispatch(propertyFormPropertyOwner());
  }, [dispatch]);

  // console.log('propertyOwnerData', propertyOwnerData);

  const [loadingPropertyOwner, setLoadingPropertyOwner] = useState(true);
  const [apiLoadPropertyOwner, setApiLoadPropertyOwner] = useState(false);

  useEffect(() => {
    dispatch(propertyFormPropertyOwner())
      .then(() => {
        setLoadingPropertyOwner(false);
        setApiLoadPropertyOwner(true);
      })
      .catch(() => {
        setLoadingPropertyOwner(false);
        setApiLoadPropertyOwner(false);
      });
  }, []);

  // ------------------------------------------------------------- Type S

  // API CALLS Property Type
  const propertyTypeData = useSelector(
    state => state.propertyFormPropertyTypeStatus,
  );

  // Fetch property  Type
  useEffect(() => {
    dispatch(propertyFormPropertyType());
  }, [dispatch]);

  // console.log('shyam------------', propertyTypeData);

  const [loadingPropertyType, setLoadingPropertyType] = useState(true);
  const [apiLoadPropertyType, setApiLoadPropertyType] = useState(false);

  useEffect(() => {
    dispatch(propertyFormPropertyType())
      .then(() => {
        setLoadingPropertyType(false);
        setApiLoadPropertyType(true);
      })
      .catch(() => {
        setLoadingPropertyType(false);
        setApiLoadPropertyType(false);
      });
  }, []);

  // ------------------------------------------------------------- Type E

  // Purpose
  const [purpose, setPurpose] = useState('sale');

  // console.log('shyam----------------------', purpose);

  // Rent Period Of Rent
  const [rentPeriodOfRent, setRentPeriodOfRent] = useState('');
  const [rentPeriodOfRentHandilar, setRentPeriodOfRentHandilar] =
    useState(false);

  // Rent Period Of PG
  const [rentPeriodOfPG, setRentPeriodOfPG] = useState('');
  const [rentPeriodOfPGHandilar, setRentPeriodOfPGHandilar] = useState(false);

  useEffect(() => {
    if (purpose === 'For Rent') {
      setRentPeriodOfRentHandilar(true);
      setRentPeriodOfPGHandilar(false);
    } else if (purpose === 'For PG') {
      setRentPeriodOfRentHandilar(false);
      setRentPeriodOfPGHandilar(true);
    } else {
      setRentPeriodOfRentHandilar(false);
      setRentPeriodOfPGHandilar(false);
    }
  }, [purpose]);

  //Form submit
  // -----------------------------------------------------------------------slug,propertytypeid,rentperiod
  const [ownerType, setOwnerType] = useState('');
  // const [agentId, setAgentId] = useState('1');
  const [slug, setSlug] = useState('A');
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState('');
  // hide and show
  const [propertyTypeId, setPropertyTypeId] = useState('A');
  // ---------------
  const [rentPeriod, setRentPeriod] = useState('');
  const [price, setPrice] = useState('');
  const [totalArea, setTotalArea] = useState('');
  const [totalUnit, setTotalUnit] = useState('');
  const [totalBedroom, setTotalBedroom] = useState('');
  const [totalBathroom, setTotalBathroom] = useState('');
  const [totalGarage, setTotalGarage] = useState('');
  const [totalKitchen, setTotalKitchen] = useState('');
  const [description, setDescription] = useState('');

  //Response and error
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  propertyType;
  // console.log('ssss', );
  // console.log('responseData:', responseData);
  // console.log('error:', error);

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    return currentDate.toISOString();
  };

  // const handleNavigation = () => {
  //   navigation.navigate('Location');
  // };

  const handleSubmit = async () => {
    // Check if any field is empty
    if (
      !ownerType ||
      !title ||
      !propertyType ||
      !price ||
      !description ||
      !totalArea ||
      !totalUnit ||
      !totalBedroom ||
      !totalBathroom ||
      !totalGarage ||
      !totalKitchen
    ) {
      Alert.alert('Fill All the fields');
      return;
    }

    // Convert price, totalArea, and totalUnit to float
    const floatPrice = parseFloat(price);
    const floatTotalArea = parseFloat(totalArea);
    const floatTotalUnit = parseFloat(totalUnit);

    try {
      const response = await fetch(
        'https://inhouse.hirectjob.in/api/properties-store1',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            agent_id: ownerType,
            title: title,
            slug: slug,
            property_type_id: propertyType,
            purpose: purpose,
            rent_period: rentPeriod,
            price: floatPrice,
            total_area: floatTotalArea,
            total_unit: floatTotalUnit,
            total_bedroom: totalBedroom,
            total_bathroom: totalBathroom,
            total_garage: totalGarage,
            total_kitchen: totalKitchen,
            description: description,
            updated_at: getCurrentDateTime(),
            created_at: getCurrentDateTime(),
            totalRating: 0,
            ratingAvarage: null,
          }),
        },
      );

      const data = await response.json();
      console.log('Response Property Form:', data);
      setResponseData(data);

      Alert.alert('Successful');
      // Clear the form fields
      setOwnerType('');
      setTitle('');
      setPropertyType('');
      setPurpose('');
      setPrice('');
      setDescription('');
      setTotalArea('');
      setTotalUnit('');
      setTotalBedroom('');
      setTotalBathroom('');
      setTotalGarage('');
      setTotalKitchen('');

      const {id} = data.data;
      console.log('Data ID:', id);
      navigation.navigate('Location', {propertyId: id});
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
            <Text style={styles.headerTextForm}>Basic Information</Text>
          </View>
        </View>

        <View style={styles.contentContainerForm}>
          <View>
            <KeyboardAwareScrollView
              extraHeight={3}
              scrollIntoView={KeyboardAwareScrollView}
              style={styles.innerContainerForm}
              showsVerticalScrollIndicator={false}>
              {/* Property Owner */}
              {loadingPropertyOwner ? (
                <View style={styles.container}>
                  <ActivityIndicator size="large" color="blue" />
                </View>
              ) : propertyOwnerData ? (
                <>
                  <Text style={styles.titleTextInputFields}>Owner Type</Text>
                  <View style={styles.pickerContainerForm}>
                    <Picker
                      style={styles.pickerForm}
                      selectedValue={ownerType}
                      onValueChange={itemValue => {
                        setOwnerType(itemValue);
                        const selectedPropertyOwner =
                          propertyOwnerData.agents.data.find(
                            item => item.id === itemValue,
                          );
                      }}
                      dropdownIconColor="black">
                      {propertyOwnerData.agents.data.map(item => (
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
              {/* Title */}
              <Text style={styles.titleTextInputFields}>Title</Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                placeholderTextColor={'gray'}
                keyboardType="default"
                value={title}
                onChangeText={setTitle}
              />
              {/* Slug */}
              {/* <Text style={styles.titleTextInputFields}>Slug</Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                placeholderTextColor={'gray'}
                keyboardType="default"
                value={slug}
                onChangeText={setSlug}
              /> */}
              {/* -------- Property Type  -- */}
              {loadingPropertyType ? (
                <View style={styles.container}>
                  <ActivityIndicator size="large" color="blue" />
                </View>
              ) : propertyTypeData ? (
                <>
                  <Text style={styles.titleTextInputFields}>Property Type</Text>
                  <View style={styles.pickerContainerForm}>
                    <Picker
                      style={styles.pickerForm}
                      selectedValue={propertyType}
                      onValueChange={itemValue => {
                        setPropertyType(itemValue);
                        const selectedPropertyType =
                          propertyTypeData.property_types.find(
                            item => item.id === itemValue,
                          );
                      }}
                      dropdownIconColor="black">
                      {propertyTypeData.property_types.map(item => (
                        <Picker.Item
                          key={item.id}
                          label={item.name}
                          value={item.id} // Assuming you want to store the ID, not the name
                        />
                      ))}
                    </Picker>
                  </View>
                </>
              ) : (
                <Text>Failed to load API Data</Text>
              )}
              {/* 
              <Text style={styles.titleTextInputFields}>Property Type </Text>
              <View style={styles.pickerContainerForm}>
                <Picker
                  style={styles.pickerForm}
                  dropdownIconColor="black"
                  selectedValue={propertyType}
                  onValueChange={setPropertyType}>
                  <Picker.Item label="Select" value="Select" />
                  <Picker.Item label="Owner" value="Owner" />
                  <Picker.Item label="Builder" value="Builder" />
                </Picker>
              </View> */}
              {/* --------  Purpose  -- */}
              <Text style={styles.titleTextInputFields}>Purpose </Text>
              <View style={styles.pickerContainerForm}>
                <Picker
                  style={styles.pickerForm}
                  dropdownIconColor="black"
                  selectedValue={purpose}
                  onValueChange={setPurpose}>
                  <Picker.Item label="For Sale" value="sale" />
                  <Picker.Item label="For Rent" value="rent" />
                  <Picker.Item label="For PG" value="pg" />
                </Picker>
              </View>
              {/* --------  Rent Period (Rent) and Rent Period (PG)    -- */}
              {purpose !== null &&
                purpose !== 'For Sale' &&
                rentPeriodOfRentHandilar && (
                  <>
                    <Text style={styles.titleTextInputFields}>
                      Rent Period (Rent)
                    </Text>

                    <View style={styles.pickerContainerForm}>
                      <Picker
                        style={styles.pickerForm}
                        dropdownIconColor="black"
                        selectedValue={rentPeriodOfRent}
                        onValueChange={value => setRentPeriodOfRent(value)}>
                        <Picker.Item label="Monthly" value="Monthly" />
                        <Picker.Item label="Yearly" value="Yearly" />
                      </Picker>
                    </View>
                  </>
                )}
              {purpose !== null &&
                purpose !== 'For Sale' &&
                rentPeriodOfPGHandilar && (
                  <>
                    <Text style={styles.titleTextInputFields}>
                      Rent Period (PG)
                    </Text>

                    <View style={styles.pickerContainerForm}>
                      <Picker
                        style={styles.pickerForm}
                        dropdownIconColor="black"
                        selectedValue={rentPeriodOfPG}
                        onValueChange={value => setRentPeriodOfPG(value)}>
                        <Picker.Item label="Daily" value="Daily" />
                        <Picker.Item label="Monthly" value="Monthly" />
                        <Picker.Item label="Yearly" value="Yearly" />
                      </Picker>
                    </View>
                  </>
                )}
              {/* --------  Price  -- */}
              <Text style={styles.titleTextInputFields}>Price </Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                placeholderTextColor={'gray'}
                keyboardType="phone-pad"
                value={price}
                onChangeText={setPrice}
              />
              {/* -------- Total Area(m2)  -- */}
              <Text style={styles.titleTextInputFields}>Total Area(m2) </Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                placeholderTextColor={'gray'}
                keyboardType="phone-pad"
                value={totalArea}
                onChangeText={setTotalArea}
              />
              {/* Total Unit  */}
              <Text style={styles.titleTextInputFields}>Total Unit </Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                placeholderTextColor={'gray'}
                keyboardType="phone-pad"
                value={totalUnit}
                onChangeText={setTotalUnit}
              />
              {/* Total Bedroom   */}
              <Text style={styles.titleTextInputFields}>Total Bedroom </Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                placeholderTextColor={'gray'}
                keyboardType="phone-pad"
                value={totalBedroom}
                onChangeText={setTotalBedroom}
              />
              {/* ------------ Total Bathroom ------ */}
              <Text style={styles.titleTextInputFields}>Total Bathroom</Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                placeholderTextColor={'gray'}
                keyboardType="phone-pad"
                value={totalBathroom}
                onChangeText={setTotalBathroom}
              />
              {/* ------------ Total Garage ------ */}
              <Text style={styles.titleTextInputFields}>Total Garage</Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                placeholderTextColor={'gray'}
                keyboardType="phone-pad"
                value={totalGarage}
                onChangeText={setTotalGarage}
              />
              {/* ------------ Total Kitchen ------ */}
              <Text style={styles.titleTextInputFields}>Total Kitchen</Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                placeholderTextColor={'gray'}
                keyboardType="phone-pad"
                value={totalKitchen}
                onChangeText={setTotalKitchen}
              />
              {/* ---------- Lond Description ------ */}
              <Text style={styles.titleTextInputFields}>Description</Text>

              <View style={[styles.descripView, {marginBottom: hp('30%')}]}>
                <TextInput
                  style={styles.descriptionInput}
                  placeholder="Enter the long description"
                  placeholderTextColor={'gray'}
                  keyboardType="default"
                  multiline={true}
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
              {/* ------------------- Submit ---------- */}
              <TouchableOpacity
                style={[
                  styles.bottomButtonTouchOpacityForm,
                  {backgroundColor: '#F49825'},
                ]}
                onPress={handleSubmit}
                // onPress={() => {
                //   navigation.navigate('Location');
                // }}
              >
                <Text style={styles.bottomButtonTextForm}>Next</Text>
              </TouchableOpacity>
              {/* <Button title="btn" onPress={handleNavigation}></Button> */}
            </KeyboardAwareScrollView>
          </View>
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
    // marginTop: hp('10%'),
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
    marginTop: hp('75%'),
    width: wp('95%'),
    height: hp('20%'),
    borderColor: 'gray',
    borderWidth: hp('0.1%'),
    borderRadius: hp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  borderText: {
    borderBottomWidth: hp('0.1%'),
    borderBottomColor: 'gray',
    width: wp('95%'),
    alignItems: 'center',
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
