import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Globles, {COLOR, FONT, FONT_SIZE} from './Globles';

const Styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLOR.DARK_BLUE},
  headerIcons: {
    padding: hp('1.5%'),
    paddingLeft: hp('2.5%'),
    paddingRight: hp('1%'),
    //paddingTop: heightPercentageToDP('1%'),
  },
  cardView: {
    backgroundColor: COLOR.LIGHT_BLUE,
    paddingLeft: hp('2%'),
    paddingRight: hp('2%'),
    justifyContent: 'center',
    width: wp('43%'),
    height: hp('23%'),
    borderRadius: 20,
  },
  textWhiteSemi14: {
    color: COLOR.WHITE,
    fontFamily: FONT.SEMI_BOLD,
    fontSize: FONT_SIZE.F_14,
  },
  campaignsBookedTitleText: {
    color: COLOR.DARK_BLUE,
    fontFamily: FONT.BOLD,
    fontSize: FONT_SIZE.F_13,
  },
});

export default Styles;
