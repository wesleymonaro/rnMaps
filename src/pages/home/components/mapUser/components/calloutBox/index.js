import React from 'react';
import {
  View, Text, TouchableOpacity, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';

import styles from './styles';

const deleteUser = (user) => {
  Alert.alert(
    'Atenção',
    'Confirma a exclusão?',
    [
      { text: 'Não' },
      {
        text: 'Sim',
        onPress: () => firebase.database().ref('users').child(user.login).remove(),
      },
    ],
  );
};

const CalloutBox = ({ user }) => (
  <View style={styles.container}>
    <Text style={styles.name}>
      {user.name}
    </Text>
    <Text>
      {user.bio}
    </Text>

    <TouchableOpacity style={styles.trash} onPress={() => deleteUser(user)}>
      <Icon name="md-trash" size={20} color="#F00" />
    </TouchableOpacity>

  </View>
);

CalloutBox.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string,
    avatar: PropTypes.string,
    coordinates: PropTypes.shape({
      lat: PropTypes.number,
      lon: PropTypes.number,
    }),
  }).isRequired,
};

export default CalloutBox;
