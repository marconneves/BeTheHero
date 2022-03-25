/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import logoImg from '../../assets/logo.png';
import arrowRight from '../../assets/arrow-right.png';

import styles from './styles';
import api from '../../services/api';
type Nav = {
  navigate: (value: 'Incidents' | 'Detail', content: any) => void;
};

export interface Incidents {
  id: number;
  title: string;
  description: string;
  value: number;
  ong_id: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
}

export default function Incidents() {
  const navigation = useNavigation<Nav>();
  const [incidents, setIncidents] = useState<Incidents[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navigationToDetail(incident: Incidents) {
    navigation.navigate('Detail', {incident});
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    setLoading(true);
    if (total > 0 && incidents.length === total) {
      setLoading(false);
      return;
    }
    const response = await api.get('/incidents', {
      params: {page},
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(1 || 0);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>
      <FlatList
        data={incidents}
        style={styles.incidentsList}
        keyExtractor={incident => String(incident.id)}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => {
          return (
            <View style={styles.loading}>
              {loading && <ActivityIndicator size="large" color="#e02041" />}
            </View>
          );
        }}
        renderItem={({item: incident}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => {
                navigationToDetail(incident);
              }}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Image source={arrowRight} style={{width: 20, height: 20}} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
