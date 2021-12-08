import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

export const getCities = (setIsLoadingSearch, setCities, keyword) => {
  fetch(`http://www.metaweather.com/api/location/search/?query=${keyword}`)
    .then(response => response.json())
    .then(data => {
      setIsLoadingSearch(false);
      setCities([...data]);
    })
    .catch(err => {
      console.log(err);
      setIsLoadingSearch(false);
    });
};

export const getWeather = (setIsLoading, setWeather, woeid) => {
  fetch(`http://www.metaweather.com/api/location/${woeid}`)
    .then(response => response.json())
    .then(data => {
      setWeather({...data.consolidated_weather[0]});
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
      setIsLoading(false);
    });
};

export const getMyWeather = (selectedCity, setIsLoading) => {
  Geolocation.getCurrentPosition(
    info => {
      const {latitude, longitude} = info.coords;

      fetch(
        `http://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`,
      )
        .then(response => response.json())
        .then(data => {
          selectedCity({...data[data.length - 1]});
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    },
    err => {
      console.log(err);
      setIsLoading(false);
    },
  );
};

const PERMISSION_TYPE =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

export const checkPermission = setLocation => {
  check(PERMISSION_TYPE)
    .then(result => {
      if (result !== 'granted') {
        request(PERMISSION_TYPE)
          .then(res => {
            setLocation(res);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        setLocation(result);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

// Geolocation.getCurrentPosition(
//   info => {
//     const {latitude, longitude} = info.coords;
//     // console.log(latitude, longitude);
//     const request = {
//       method: 'GET',
//       url: `schools/nearby?latitude=${latitude}&longitude=${longitude}`,
//     };
//     app.invokeApi(request, (res, err) => {
//       if (!err) {
//         setState({isSelectLoading: false, schoolNearBy: res.data});
//       } else if (res == undefined) {
//         setState({isSelectLoading: false, schoolNearBy: EMPTY_ARRAY});
//         Alert.alert('Opps', 'Something went wrong. Please try again later.', [
//           {text: 'Ok'},
//         ]);
//       } else {
//         setState({isSelectLoading: false, schoolNearBy: EMPTY_ARRAY});
//         Alert.alert('Failed', res.data.message, [{text: 'Ok'}]);
//       }
//     });
//   },
//   err => {
//     console.log(err);
//     setState({isSelectLoading: false, schoolNearBy: EMPTY_ARRAY});
//   },
// );
