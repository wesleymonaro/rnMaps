import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import styles from './styles';

import CalloutBox from './components/calloutBox';

const MapUser = ({ user }) => (
  <MapboxGL.PointAnnotation
    key={user.login}
    id={user.login}
    coordinate={[user.coordinates.lat, user.coordinates.lon]}
  >

    <View style={styles.userContainer}>
      <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
    </View>

    <MapboxGL.Callout style={{}} containerStyle={styles.calloutContainer} title={user.name}>
      <CalloutBox user={user} />
    </MapboxGL.Callout>
  </MapboxGL.PointAnnotation>
);

MapUser.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string,
    avatar: PropTypes.string,
    coordinates: PropTypes.shape({
      lat: PropTypes.number,
      lon: PropTypes.number,
    }),
  }).isRequired,
};

export default MapUser;
