import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Subheading, Surface, Divider, List} from 'react-native-paper';

import {Text, View} from '../components/Themed';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

import axios from 'axios';
import dayjs from 'dayjs';
import HTMLView from 'react-native-htmlview';

import {API_URL} from '@env';

const convertDate = (date: string) => {
  const d = dayjs(date).format('DD-MM-YYYY HH:MM');
  return d;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: true,
      staleTime: 10000,
    },
  },
});

export default function TabThreeScreen({navigation}) {
  const ENDPOINT =
    'https://bita-personal-api.vercel.app/api/' + 'bitacora/events';

  const {status, data, error, isLoading, refetch} = useQuery(
    'bitacoras',
    async () => {
      const res = await axios.get(`${ENDPOINT}`);
      //console.log('DATA1', res);
      return res.data;
    },
  );
  const date = new Date();
  const titulo = 'Eventos al: ' + convertDate(date);

  return (
    <Surface style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <Subheading style={styles.title}>{titulo}</Subheading>
        <Divider style={{backgroundColor: 'gray'}} />
        <FlatList
          style={{
            marginBottom: 1,
            marginTop: 1,
            marginLeft: 1,
          }}
          data={data}
          renderItem={({item}) => (
            <List.Section
              style={{
                marginTop: 1,
                marginBottom: 1,
                marginLeft: 10,
                marginRight: 5,
              }}>
              <Text
                style={
                  styles.title1
                }>{`Tipo Evento: ${item.tipo_event_id} ${item.tipoEvent.description}`}</Text>

              <Text
                style={styles.title3}
                onPress={() =>
                  navigation.navigate('ModalActivities', {
                    id: item.id,
                    event_date: item.event_date,
                    event: item.event.description,
                    description: item.description,
                  })
                }>{`Evento: ${item.event.description} ID:${item.id}`}</Text>
              <Text style={styles.title1}>{`${convertDate(
                item.event_date,
              )}`}</Text>
              <HTMLView
                value={`Description: ${item.description}`}
                stylesheet={styles}
              />

              <Divider style={{backgroundColor: 'gray'}} />
            </List.Section>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </QueryClientProvider>
    </Surface>
  );
}

const styles = StyleSheet.create({
  a: {
    fontWeight: 'bold',
    color: 'purple',
  },
  div: {
    fontFamily: 'monospace',
    marginTop: 1,
    marginBottom: 1,
  },
  p: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 1,
    marginBottom: 1,
    paddingVertical: 5,
    marginLeft: 5,
    fontSize: 19,
    fontWeight: 'bold',
  },
  title1: {
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 10,
    marginRight: 5,
    paddingVertical: 5,
    fontSize: 17,
  },
  title3: {
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 10,
    marginRight: 5,
    paddingVertical: 5,
    fontSize: 17,
    color: 'orange',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
