/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, Linking} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RectButton, TouchableOpacity} from 'react-native-gesture-handler';

import logoImg from '../../assets/logo.png';
import arrowLeft from '../../assets/arrow-left.png';

import styles from './styles';
import {Incidents} from '../Incidents';

type RouteParams = {
  params: {
    incident: Incidents;
  };
};

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute() as RouteParams;

  if (!route || !route?.params || !route?.params?.incident) {
    return <></>;
  }

  const incident = route?.params.incident as Incidents;
  const message = `Olá ${
    incident.name
  }, estou entrando em contato pois gostaria de ajudar no caso "${
    incident.title
  }" com o valor de ${Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(incident.value)}`;

  function navigateBack() {
    navigation.goBack();
  }

  async function sendMail() {
    Linking.openURL(
      `mailto:${incident.email}?subject=Herói do caso: ${incident.title}&body=${message}`,
    );
  }

  function sendWhatsApp() {
    Linking.openURL(
      `whatsapp://send?phone=55${incident.whatsapp}&text=${message}`,
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Image source={arrowLeft} style={{width: 25, height: 25}} />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(incident.value)}
        </Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <RectButton
            rippleColor="#BE2041"
            style={styles.action}
            onPress={sendWhatsApp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </RectButton>
          <RectButton
            rippleColor="#BE2041"
            style={styles.action}
            onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}
