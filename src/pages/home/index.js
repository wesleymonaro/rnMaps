import React, { Component } from 'react';
import {
  View,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import firebase from 'firebase';
import _ from 'lodash';
import MapUser from './components/mapUser';
import styles from './styles';
import stylesModal from './stylesModal';

import api from '../../services/api';

const MAP_BOX_TOKEN = 'pk.eyJ1Ijoid2VzbGV5bW9uYXJvIiwiYSI6ImNqa2RhbWw0YzBoeHUzd3FtcHZpaTY4bjIifQ.lYSOeUucWfHFNpxXhwEIaA';

const config = {
  apiKey: 'AIzaSyDyC1VJhxRSkmeRlkTtnWQ8ts2eONDauWI',
  authDomain: 'palestra-maps.firebaseapp.com',
  databaseURL: 'https://palestra-maps.firebaseio.com',
  projectId: 'palestra-maps',
  storageBucket: 'palestra-maps.appspot.com',
  messagingSenderId: '313832450262',
};

MapboxGL.setAccessToken(MAP_BOX_TOKEN);

class Home extends Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    currentLat: -23.541047,
    currentLng: -46.211379,
    users: [],
    modalOpen: false,
    error: null,
    coordinates: [],
    username: '',
    loading: false,
  }

  async componentDidMount() {
    this.initializeFirebase();

    await this.checkPermission();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          currentLat: position.coords.latitude,
          currentLng: position.coords.longitude,
          error: null,
        });

        ToastAndroid.showWithGravityAndOffset(
          'Toque e segure no mapa para adicionar um usuário',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          50,
        );
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  initializeFirebase = async () => {
    await firebase.initializeApp(config);
    firebase.database().ref('users').on('value', (snap) => {
      const users = _.toArray(snap.val());
      this.setState({ users });
    });
  }

  checkPermission = async () => {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }
    let result;
    try {
      result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, { title: 'Permissão de localização', message: 'O app precisa de permissão para usar sua localização' });
    } catch (error) {
      console.error('failed getting permission, result:', result);
    }
    console.log('permission result:', result);
    return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
  }

  openModal = (coordinates) => {
    console.log(coordinates);
    this.setState({ coordinates, modalOpen: true });
  }

  addUser = async () => {
    const { username, coordinates, users } = this.state;
    try {
      this.setState({ loading: true });
      const response = await api.get(`/users/${username}`);
      const userData = response.data;


      const newUser = {
        login: userData.login,
        name: userData.name,
        bio: userData.bio,
        avatar: userData.avatar_url,
        coordinates: {
          lat: coordinates[0],
          lon: coordinates[1],
        },
      };

      if (users.find(user => user.login === newUser.login)) {
        this.setState({ error: 'Usuário duplicado', loading: false });
      } else {
        firebase.database().ref('users').child(newUser.login).set(newUser);
        this.setState({
          coordinates: [], modalOpen: false, loading: false, username: '', error: null,
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({ error: 'Usuário não existe', loading: false });
    }
  }

  renderModal = () => {
    const {
      username, loading, error,
    } = this.state;


    return (
      <View style={stylesModal.container}>
        <View style={stylesModal.modalBox}>
          <Text style={stylesModal.modalTitle}>
            Adicionar novo local
          </Text>

          <TextInput
            style={stylesModal.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Usuário no Github"
            underlineColorAndroid="transparent"
            autoFocus
            value={username}
            onChangeText={text => this.setState({ username: text })}
          />

          {error && (
            <View style={stylesModal.errorBox}>
              <Text style={stylesModal.error}>
                {error}
              </Text>
            </View>
          )}

          <View style={stylesModal.buttonsBox}>
            <TouchableOpacity
              style={stylesModal.cancelButton}
              onPress={() => this.setState({ modalOpen: false }, () => this.forceUpdate())}
            >
              <Text style={stylesModal.buttonText}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={stylesModal.saveButton}
              onPress={this.addUser}
            >
              {
                loading
                  ? <ActivityIndicator size="small" color="white" />
                  : (
                    <Text style={stylesModal.buttonText}>
                      Salvar
                    </Text>
                  )
              }
            </TouchableOpacity>


          </View>
        </View>
      </View>
    );
  }

  render() {
    const {
      users, modalOpen, currentLng, currentLat,
    } = this.state;

    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          centerCoordinate={[currentLng, currentLat]}
          zoomLevel={12}
          style={styles.container}
          showUserLocation
          onLongPress={info => this.openModal(info.geometry.coordinates)}
        >
          {users.map(user => <MapUser key={user.login} user={user} />)}


        </MapboxGL.MapView>
        { modalOpen
          && this.renderModal()}
      </View>
    );
  }
}

export default Home;
