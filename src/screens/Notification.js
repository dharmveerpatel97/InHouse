import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONT, FONT_SIZE, COLOR} from '../config/Globles';
import HeadLeftArrow from '../assets/svg/HeadLeftArrow.svg';
import HeadLeftNotification from '../assets/svg/HeadLeftNotification.svg';
import PlacesBGI from '../assets/images/DetailsBGI.jpg';

//Notification Api
import {NotificationsGet} from '../redux/Store';
import {useSelector, useDispatch} from 'react-redux';

const Notification = ({navigation}) => {
  // const notificationData = [
  //   {
  //     id: 1,
  //     name: 'John Doe',
  //     time: '1 min ago',
  //     message: 'Just started following you',
  //   },
  //   {
  //     id: 2,
  //     name: 'Jane Smith',
  //     time: '5 mins ago',
  //     message: 'Sent you a friend request',
  //   },
  //   {
  //     id: 3,
  //     name: 'Mike Johnson',
  //     time: '10 mins ago',
  //     message: 'Just started to following you.',
  //   },
  //   {
  //     id: 4,
  //     name: 'Sarah Thompson',
  //     time: '30 mins ago',
  //     message: 'Sent you a friend request',
  //   },
  //   {
  //     id: 5,
  //     name: 'David Wilson',
  //     time: '1 hour ago',
  //     message: 'Tagged you in a post',
  //   },
  //   {
  //     id: 6,
  //     name: 'Emily Davis',
  //     time: '2 hours ago',
  //     message: 'Shared your story',
  //   },
  //   {
  //     id: 7,
  //     name: 'Alex Rodriguez',
  //     time: '3 hours ago',
  //     message: 'Mentioned you in a comment',
  //   },
  //   {
  //     id: 8,
  //     name: 'Sophia Garcia',
  //     time: '4 hours ago',
  //     message: 'Replied to your message',
  //   },
  //   {
  //     id: 9,
  //     name: 'Daniel Thomas',
  //     time: '5 hours ago',
  //     message: 'Invited you to an event',
  //   },
  //   {
  //     id: 10,
  //     name: 'Olivia Martin',
  //     time: '6 hours ago',
  //     message: 'Started following you',
  //   },
  // ];

  const [notificationData, setNotificationData] = useState();

  const handleNotificationPress = id => {
    Alert.alert(`Clicked on notification ID: ${id}`);
  };

  const renderNotificationItem = ({item}) => (
    <TouchableOpacity onPress={() => handleNotificationPress(item.id)}>
      <View style={styles.notificationItemContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* Dp */}
          <Image
            source={{
              uri: `https://inhouse.hirectjob.in/public/${item.image}`,
            }}
            style={styles.circleContainer}
          />

          {/* Name and About */}
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.notificationItemName}>{item.title}</Text>
              <Text style={styles.notificationItemTime}>{item.created_at}</Text>
            </View>
            <View>
              <Text style={styles.notificationItemMessage}>
                {item.description}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: 'black',
            marginTop: hp('2%'),
          }}
        />
      </View>
    </TouchableOpacity>
  );

  //API DATA GETING FOR NOTIFICATION
  const dispatch = useDispatch();
  const NotificationDate = useSelector(state => state.notificationStatus);

  useEffect(() => {
    dispatch(NotificationsGet());
  }, [dispatch]);

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [apiProfile, setProfile] = useState(false);

  useEffect(() => {
    dispatch(NotificationsGet())
      .then(() => {
        setLoadingProfile(false);
        setProfile(true);
      })
      .catch(() => {
        setLoadingProfile(false);
        setProfile(false);
      });
  }, []);

  useEffect(() => {
    if (
      NotificationDate &&
      NotificationDate.data &&
      NotificationDate.data.length > 0
    ) {
      setNotificationData(NotificationDate.data);
    }
  }, [NotificationDate]);

  if (loadingProfile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLOR.primary} />
      </View>
    );
  }

  return (
    <View style={styles.containerNotification}>
      <ImageBackground
        source={PlacesBGI}
        style={styles.backgroundImageNotification}>
        <View style={styles.headerContainerNotification}>
          <View style={styles.headerContentNotification}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack('');
              }}>
              <HeadLeftArrow height={hp('5%')} width={wp('12%')} />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTextForm}>Notifications</Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notification');
            }}>
            <HeadLeftNotification height={hp('5%')} width={wp('12%')} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainerNotification}>
          <View
            style={styles.innerContainerNotification}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <FlatList
              data={notificationData}
              keyExtractor={item => item.id.toString()}
              renderItem={renderNotificationItem}
              contentContainerStyle={styles.notificationContainerNotification}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  containerNotification: {
    flex: 1,
  },
  backgroundImageNotification: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  headerTextForm: {
    color: COLOR.WHITE,
    fontFamily: FONT.SEMI_BOLD,
    fontSize: FONT_SIZE.F_17,
  },
  headerContainerNotification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: hp('2.7%'),
    margin: hp('2.6%'),
    marginBottom: hp('1.5%'),
    alignItems: 'center',
  },
  headerContentNotification: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('12%') / 2,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: hp('1.5%'),
  },
  headerTextContainerNotification: {
    marginLeft: hp('2%'),
    marginTop: hp('0.5%'),
  },
  headerTextNotification: {
    color: '#FFFFFF',
    fontFamily: 'bold',
    fontSize: wp('4.5%'),
  },
  contentContainerNotification: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    marginTop: hp('2%'),
    borderTopLeftRadius: hp('4%'),
    borderTopRightRadius: hp('4%'),
  },
  innerContainerNotification: {
    margin: hp('3%'),
    marginTop: hp('2%'),
    flex: 1,
    marginBottom: hp('2%'),
  },
  notificationContainerNotification: {
    flexGrow: 1,
    paddingTop: hp('2%'),
  },
  notificationItemContainer: {
    padding: hp('1.5%'),
    borderRadius: hp('1%'),
  },
  notificationItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationItemName: {
    fontSize: FONT_SIZE.F_15,
    color: '#001D4C',
    fontFamily: FONT.SEMI_BOLD,
  },
  notificationItemTime: {
    fontSize: FONT_SIZE.F_12,
    color: '#001D4C',
    fontFamily: FONT.SEMI_BOLD,
  },
  notificationItemMessage: {
    fontSize: wp('4%'),
    marginTop: hp('1%'),
    fontSize: FONT_SIZE.F_14,
    color: '#001D4C',
    fontFamily: FONT.REGULAR,
  },
});
