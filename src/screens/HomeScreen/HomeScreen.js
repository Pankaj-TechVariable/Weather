import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import InputText from '../../components/InputText/InputText';
import styles from './homeScreen.styles';
import {
  getCities,
  getWeather,
  checkPermission,
  getMyWeather,
} from './HomeScreen.actions';
import Loader from '../../components/Loader/Loader';

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState({});
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [location, setLocation] = useState(false);

  useEffect(() => {
    checkPermission(setLocation);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getMyWeather(setSelectedCity, setIsLoading);
  }, [location]);

  useEffect(() => {
    if (selectedCity.woeid) {
      setIsLoading(true);
      getWeather(setIsLoading, setWeather, selectedCity.woeid);
    }
  }, [selectedCity]);

  const updateSearch = keyword => {
    setSearch(keyword);
    setIsLoadingSearch(true);
    getCities(setIsLoadingSearch, setCities, keyword);
  };

  const handleSelect = item => {
    setSelectedCity({...item});
    setCities([]);
    setSearch('');
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleSelect(item)} style={styles.row}>
      <Text style={styles.city}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <InputText
          isLoading={isLoadingSearch}
          options={{
            placeholder: 'Search',
            placeholderTextColor: 'rgba(0,0,0,0.5)',
            value: search,
            onChangeText: updateSearch,
          }}
          right={<Feather name="search" size={20} color="rgba(0,0,0, 0.5)" />}
        />

        {search.length > 0 && cities.length > 0 && (
          <View style={styles.searchContent}>
            <FlatList
              data={cities}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
            />
          </View>
        )}
      </View>

      {weather.weather_state_name && (
        <View style={styles.weatherContainer}>
          <Text style={styles.title}>{selectedCity.title}</Text>
          <Text style={styles.date}>{moment(new Date()).format('LL')}</Text>
          {weather.weather_state_abbr && (
            <Image
              source={{
                uri: `https://www.metaweather.com/static/img/weather/png/64/${weather.weather_state_abbr}.png`,
              }}
              style={styles.image}
            />
          )}
          <Text style={styles.details}>{`${weather.weather_state_name}`}</Text>
          <Text
            style={styles.details}>{`Temparature: ${weather?.the_temp?.toFixed(
            2,
          )}° C`}</Text>
          <Text style={styles.details}>{`Humidity: ${weather.humidity}%`}</Text>
          <Text style={styles.details}>{`Wind: ${weather?.wind_speed?.toFixed(
            2,
          )}m/h`}</Text>
          <Text style={styles.details}>{`Wind: ${weather?.air_pressure?.toFixed(
            2,
          )}m/h`}</Text>
        </View>
      )}

      {isLoading && <Loader />}
    </View>
  );
};

export default HomeScreen;
