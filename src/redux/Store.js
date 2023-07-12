import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
  postData: null,
  stateApiGetStatus: null,
  propertyFormPropertyOwnerStatus: null,
  propertyFormPropertyTypeStatus: null,
  cityTrueStatus: null,
  aminitiesStatus: null,
  stateApiGetStatus: null,
  itemId: null,
  propertyGetDataStatus: null,
  nearistLocationStatus: null,
  userData: null,
  profileGetStatus: null,
  notificationStatus: null,
  // messageFormPostStatus: null,
};

const counter = (state = initialState, action) => {
  switch (action.type) {
    case 'POST':
      return {...state, postData: action.payload};
    case 'GET':
      return {...state, stateApiGetStatus: action.payload};
    case 'PropertyOwnerTrue':
      return {...state, propertyFormPropertyOwnerStatus: action.payload};
    case 'PropertyTypeTrue':
      return {...state, propertyFormPropertyTypeStatus: action.payload};

    case 'CityTrue':
      return {...state, cityTrueStatus: action.payload};
    case 'AminitiesTrue':
      return {...state, aminitiesStatus: action.payload};
    case 'STATEDATA':
      return {...state, stateApiGetStatus: action.payload};
    case 'PROPERTY':
      return {...state, propertyGetDataStatus: action.payload};
    case 'SET_ITEM_ID':
      return {...state, itemId: action.itemId};
    case 'NearistLocationTrue':
      return {...state, nearistLocationStatus: action.payload};
    case 'ProfileGetTrue':
      return {...state, profileGetStatus: action.payload};
    case 'NotificationTrue':
      return {...state, notificationStatus: action.payload};
    // case 'MessageFormPostTrue':
    //   return {...state, messageFormPostStatus: action.payload};

    default:
      return state;
  }
};

const Store = createStore(counter, applyMiddleware(thunk));

// SignUp [POST]
const signUpPostData = (name, email, password) => {
  return dispatch => {
    return axios
      .post('https://inhouse.hirectjob.in/api/store-register', {
        name,
        email,
        password,
      })
      .then(res => {
        dispatch({type: 'POST', payload: res.data});
        return res.data;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  };
};

// Login [POST]
const loginPostData = (email, password) => {
  return dispatch => {
    return axios
      .post('https://inhouse.hirectjob.in/api/store-login', {
        email,
        password,
      })
      .then(res => {
        dispatch({type: 'POST', payload: res.data});
        return res.data;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  };
};

// Demo API [GET]
const demoApiGet = () => {
  return dispatch => {
    return axios
      .get('https://inhouse.hirectjob.in/api/state')
      .then(res => {
        dispatch({type: 'POST', payload: res.data});
        return res.data;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  };
};

//Properrty Form : Basic Information Screen : Property Owner API
const propertyFormPropertyOwner = () => {
  return dispatch => {
    return axios
      .get('https://inhouse.hirectjob.in/api/agents')
      .then(res => {
        dispatch({type: 'PropertyOwnerTrue', payload: res.data});
        return res.data;
      })
      .catch(error => {
        console.log('propertyFormPropertyOwner', error);
        throw error;
      });
  };
};

//Properrty Form : Basic Information Screen : Property Type API
const propertyFormPropertyType = () => {
  return dispatch => {
    return axios
      .get('https://inhouse.hirectjob.in/api/category-list')
      .then(res => {
        dispatch({type: 'PropertyTypeTrue', payload: res.data});
        return res.data;
      })
      .catch(error => {
        console.log('propertyFormPropertyType', error);
        throw error;
      });
  };
};

//Properrty Form : Location Screen : City API
const propertyFormCity = () => {
  return dispatch => {
    return axios
      .get('https://inhouse.hirectjob.in/api/cities')
      .then(res => {
        dispatch({type: 'CityTrue', payload: res.data});
        return res.data;
      })
      .catch(error => {
        console.log('propertyFormCity', error);
        throw error;
      });
  };
};

// Properrty Form : Location Screen : City API

const PropertyFormAminities = () => {
  return dispatch => {
    return axios
      .get('https://inhouse.hirectjob.in/api/aminities')
      .then(res => {
        dispatch({type: 'AminitiesTrue', payload: res.data});
        return res.data;
      })
      .catch(error => {
        console.log('PropertyFormAminities', error);
        throw error;
      });
  };
};

// States API [GET]
const stateApiGet = () => {
  return dispatch => {
    return axios
      .get('https://inhouse.hirectjob.in/api/state')
      .then(res => {
        dispatch({type: 'STATEDATA', payload: res.data});
        return res.data;
      })
      .catch(error => {
        console.log('stateApiGet', error);
        throw error;
      });
  };
};

// Property API
const propertyGetData = () => {
  return dispatch => {
    return axios
      .get('https://inhouse.hirectjob.in/api/properties')
      .then(res => {
        dispatch({type: 'PROPERTY', payload: res.data});
        return res.data;
      })
      .catch(error => {
        console.log('propertyGetData', error);
        throw error;
      });
  };
};

// city API [POST]
const citysetItemId = itemId => {
  console.log('itemmmmm', itemId);
  return dispatch => {
    return axios
      .post('https://inhouse.hirectjob.in/api/city?state.id=' + itemId)
      .then(res => {
        dispatch({type: 'SET_ITEM_ID', payload: res});
        return res;
      })
      .catch(error => {
        console.log('propertyGetData', error);
        throw error;
      });
  };
};

//Properrty Form : Basic Information Screen : Nearist Location [GET] API
const propertyNearistLocation = () => {
  return dispatch => {
    return axios
      .get('https://inhouse.hirectjob.in/api/nearest-location')
      .then(res => {
        dispatch({type: 'NearistLocationTrue', payload: res.data});
        return res.data;
      })
      .catch(error => {
        console.log('NearistLocation', error);
        throw error;
      });
  };
};

//Profile Get API
const ProfileGet = () => {
  return dispatch => {
    return axios
      .get('https://inhouse.hirectjob.in/api/my-profile/5')
      .then(res => {
        dispatch({type: 'ProfileGetTrue', payload: res.data});
        return res.data;
      })
      .catch(error => {
        console.log('ProfileGetOwner', error);
        throw error;
      });
  };
};

//Profile Get API
const NotificationsGet = () => {
  return dispatch => {
    return axios
      .get('https://inhouse.hirectjob.in/api/notification')
      .then(res => {
        dispatch({type: 'NotificationTrue', payload: res.data});
        return res.data;
      })
      .catch(error => {
        console.log('Notification', error);
        throw error;
      });
  };
};

//MessageForm   [ Post ]
// const MessageFormPost = (name, phone, email, subject, message, user_id) => {
//   return dispatch => {
//     const formData = {
//       name,
//       phone,
//       email,
//       subject,
//       message: message.toString(), // Convert message to a string
//       user_id,
//     };

//     return axios
//       .post('https://inhouse.hirectjob.in/api/send-contact-message', formData)
//       .then(res => {
//         dispatch({type: 'MessageFormPostTrue', payload: res.data});
//         return res.data;
//       })
//       .catch(error => {
//         console.log(error);
//         throw error;
//       });
//   };
// };

export {
  Store as store,
  signUpPostData as signUpPostData,
  loginPostData as loginPostData,
  demoApiGet as demoApiGet,
  stateApiGet as stateApiGet,
  propertyFormPropertyOwner as propertyFormPropertyOwner,
  propertyFormPropertyType as propertyFormPropertyType,
  propertyFormCity as propertyFormCity,
  PropertyFormAminities as PropertyFormAminities,
  // stateApiGet as stateApiGet,
  propertyGetData as propertyGetData,
  citysetItemId as citysetItemId,
  propertyNearistLocation as propertyNearistLocation,
  ProfileGet as ProfileGet,
  NotificationsGet as NotificationsGet,
  // MessageFormPost as MessageFormPost,
};

export default Store;
