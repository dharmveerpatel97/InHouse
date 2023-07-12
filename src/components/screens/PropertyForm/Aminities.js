import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {PropertyFormAminities} from '../../../redux/Store';
import {useSelector, useDispatch} from 'react-redux';

import {FONT, FONT_SIZE, COLOR} from '../../../config/Globles';

import HeadLeftArrow from '../../../assets/svg/HeadLeftArrow.svg';
import PlacesBGI from '../../../assets/images/PlacesBGI.jpg';
import {useRoute} from '@react-navigation/native';

const Amenities = ({navigation}) => {
  const [filterData, setFilterData] = useState([]);
  const [selectedAminities, setSelectedAminities] = useState([]);

  console.log('selectedItemsId--------:', selectedAminities);

  const toggleStatus = id => {
    const isSelected = selectedAminities.includes(id);
    let updatedSelectedItemsId;

    if (isSelected) {
      updatedSelectedItemsId = selectedAminities.filter(
        itemId => itemId !== id,
      );
    } else {
      updatedSelectedItemsId = [...selectedAminities, id];
    }

    setSelectedAminities(updatedSelectedItemsId);

    const updatedFilterData = filterData.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: !item.status,
        };
      }
      return item;
    });
    setFilterData(updatedFilterData);
  };

  const renderCards = () => {
    return filterData.map(item => (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.selectCard,
          {backgroundColor: item.status ? 'green' : '#001D4C'},
        ]}
        onPress={() => toggleStatus(item.id)}>
        <Text style={styles.titleSelectCard}>{item.aminity}</Text>
      </TouchableOpacity>
    ));
  };

  const dispatch = useDispatch();
  const propertyAmenities = useSelector(state => state.aminitiesStatus);

  useEffect(() => {
    dispatch(PropertyFormAminities())
      .then(() => {
        setLoadingPropertyOwner(false);
        setApiLoadPropertyOwner(true);
      })
      .catch(() => {
        setLoadingPropertyOwner(false);
        setApiLoadPropertyOwner(false);
      });
  }, []);

  useEffect(() => {
    if (propertyAmenities && propertyAmenities.state) {
      const initialFilterData = propertyAmenities.state.map(item => ({
        id: item.id,
        aminity: item.aminity,
        status: false,
      }));
      setFilterData(initialFilterData);
    }
  }, [propertyAmenities]);

  const [loadingPropertyOwner, setLoadingPropertyOwner] = useState(true);
  const [apiLoadPropertyOwner, setApiLoadPropertyOwner] = useState(false);

  // ---------------------------------------------------------- Route Property Id
  const route = useRoute();
  const {propertyId} = route.params;
  // console.log('Property ID Aminities:', propertyId);
  // ---------------------------------------------------------- Route Property Id

  const handleSubmit = async () => {
    console.log('+++++++++++++++', selectedAminities);

    if (!selectedAminities) {
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
            aminities: selectedAminities,
            property_id: propertyId, // Include the propertyId in the request body
          }),
        },
      );

      const data = await response.json();
      console.log('Property  Location Amanityies ------------------:', data);

      Alert.alert('Successfull');

      setSelectedAminities([]);

      navigation.navigate('NearestLocation', {propertyId: propertyId});
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
            <HeadLeftArrow height={hp('5%')} width={wp('12%')} />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextForm}>Amenities</Text>
          </View>
        </View>

        <View style={styles.contentContainerForm}>
          {loadingPropertyOwner ? (
            <View style={styles.container}>
              <ActivityIndicator size="large" color="blue" />
            </View>
          ) : apiLoadPropertyOwner ? (
            <>
              <KeyboardAwareScrollView
                extraHeight={3}
                scrollIntoView={KeyboardAwareScrollView}
                style={styles.innerContainerForm}
                showsVerticalScrollIndicator={false}>
                <View style={styles.cardContainer}>{renderCards()}</View>
              </KeyboardAwareScrollView>
            </>
          ) : (
            <Text>Failed to load API Data</Text>
          )}
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

export default Amenities;

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

  //Cards
  containerSelectCard: {
    flex: 1,
  },
  selectCard: {
    width: wp('40%'),
    height: hp('12%'),
    marginBottom: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('2%'),
  },
  titleSelectCard: {
    color: 'white',
    fontSize: FONT_SIZE.F_16,
    width: wp('35%'),
    textAlign: 'center',
  },
  rowSelectCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1.8%'),
    width: '100%',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
