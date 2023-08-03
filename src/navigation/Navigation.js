import React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/usercredential/Splash';
import Login from '../screens/usercredential/Login';
import SignUp from '../screens/usercredential/SignUp';
import ForgetPassword from '../screens/usercredential/ForgetPassword';
import OTP from '../screens/usercredential/OTP';

import GetStart from '../screens/usercredential/GetStart';
import States from '../screens/usercredential/States';
import Places from '../screens/usercredential/Places';
import Home from '../screens/Home.js';
import CreateGroup from '../screens/CreateGroup';
import Details from '../screens/Details';
import BuyFliter from '../screens/BuyFliter';
import PGFilter from '../screens/PGFilter';
import RentFliter from '../screens/RentFliter';
import Acrepair from '../screens/Acrepair';
import LoanScrn from '../screens/LoanScrn';
import Profile from '../screens/Profile';
import ProfileEdit from '../screens/ProfileEdit';
import Services from '../screens/Services';
import Favourite from '../screens/Favourite';
import Search from '../screens/Search';
import Property from '../screens/Property';
import LoanType from '../screens/LoanType';
import Form from '../screens/Form';
import Menu from '../screens/Menu';

//Form
import PropertyForm from '../screens/PropertyForm/PropertyForm';
import Location from '../screens/PropertyForm/Location';
import ImageVideo from '../screens/PropertyForm/ImageVideo';
import NearestLocation from '../screens/PropertyForm/NearestLocation';

import ChatScreen from '../screens/ChatScreen';
import SetNewPassword from '../screens/usercredential/SetNewPassword';
import Notification from '../screens/Notification';
import Messages from '../screens/Messages';
import Post from '../screens/Post';
import Chat from '../screens/Chat';
import Demo from '../screens/Demo';
import Aminities from '../screens/PropertyForm/Aminities';
import AdditionalInformation from '../screens/PropertyForm/AdditionalInformation';
import PropertyPlan from '../screens/PropertyForm/PropertyPlan';
import PropertyFormMail from '../screens/PropertyFormMail';
import MessageForm from '../screens/MessageForm';

import LoanSubCategory from '../screens/LoanSubCategory';
import SubService from '../screens/SubService'; 
import { navigationRef } from './RootNavigation';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#001D4C" barStyle="light-content" />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Home"
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="SetNewPassword" component={SetNewPassword} />
          <Stack.Screen name="GetStart" component={GetStart} />
          <Stack.Screen name="States" component={States} />
          <Stack.Screen name="Places" component={Places} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="BuyFliter" component={BuyFliter} />
          <Stack.Screen name="PGFilter" component={PGFilter} />
          <Stack.Screen name="RentFliter" component={RentFliter} />
          <Stack.Screen name="Acrepair" component={Acrepair} />
          <Stack.Screen name="LoanType" component={LoanType} />
          <Stack.Screen name="LoanScrn" component={LoanScrn} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
          <Stack.Screen name="Services" component={Services} />
          <Stack.Screen name="Favourite" component={Favourite} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Property" component={Property} />
          <Stack.Screen name="Form" component={Form} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Messages" component={Messages} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="LoanSubCategory" component={LoanSubCategory} />
          <Stack.Screen name="SubService" component={SubService} />

          {/* Property Form */}
          <Stack.Screen name="PropertyForm" component={PropertyForm} />
          <Stack.Screen name="Location" component={Location} />
          <Stack.Screen name="ImageVideo" component={ImageVideo} />
          <Stack.Screen name="Aminities" component={Aminities} />
          <Stack.Screen name="NearestLocation" component={NearestLocation} />
          <Stack.Screen name="PropertyPlan" component={PropertyPlan} />
          <Stack.Screen name="PropertyFormMail" component={PropertyFormMail} />
          <Stack.Screen name="MessageForm" component={MessageForm} />

          <Stack.Screen
            name="AdditionalInformation"
            component={AdditionalInformation}
          />

          <Stack.Screen name="Demo" component={Demo} />
          <Stack.Screen name="CreateGroup" component={CreateGroup} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Navigation;
