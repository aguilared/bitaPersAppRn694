import React from 'react';
import {
  Box,
  Divider,
  FlatList,
  Heading,
  HStack,
  VStack,
  Text,
  useColorMode,
  Spacer,
  Center,
  Switch,
  NativeBaseProvider,
} from 'native-base';
import {StyleSheet} from 'react-native';

import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import HTMLView from 'react-native-htmlview';

const Example = () => {
  function renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name == 'iframe') {
      return null;
    }
  }
  function ToggleDarkMode() {
    const {colorMode, toggleColorMode} = useColorMode();
    return (
      <HStack space={2}>
        <Text>Dark</Text>
        <Switch
          isChecked={colorMode === 'light' ? true : false}
          onToggle={toggleColorMode}
          aria-label={
            colorMode === 'light'
              ? 'switch to dark mode'
              : 'switch to light mode'
          }
        />
        <Text>Light</Text>
      </HStack>
    );
  }

  const convertDate = (date: string) => {
    const d = dayjs(date).format('DD-MM-YYYY HH:MM');
    return d;
  };
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
  const styles = StyleSheet.create({
    a: {
      fontWeight: '300',
      color: '#FF3366', // make links coloured pink
    },
    p: {
      fontWeight: '400',
      fontSize: 16,
      color: '#393A3F', // make links coloured pink
    },
  });

  return (
    <Box
      _light={{bg: 'coolGray.50'}}
      _dark={{bg: 'coolGray.900'}}
      minHeight="sm"
      justifyContent="center"
      px={4}>
      <Heading size="lg">Bitacoras</Heading>
      <ToggleDarkMode />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <VStack>
            <Divider my="2" />
            <HStack>
              <Text
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                alignSelf="flex-start">
                {`Fecha: ${convertDate(item.event_date)}`}
              </Text>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                alignSelf="flex-start">
                {`BitaID: ${item.bitacora_id}`}
              </Text>
              <Spacer />

              <Text
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                alignSelf="flex-start">
                {`ID: ${item.id}`}
              </Text>
            </HStack>

            <Text
              _dark={{
                color: 'warmGray.50',
              }}
              fontSize="md"
              color="coolGray.800"
              bold>
              {`TipoEvent: ${item.tipoEvent.description}`}
            </Text>
            <Spacer />
            <Text
              _dark={{
                color: 'warmGray.50',
              }}
              fontSize="md"
              color="coolGray.800"
              bold>
              {`Event: ${item.event.description}`}
            </Text>

            <HTMLView
              _dark={{
                color: 'warmGray.50',
              }}
              value={item.description}
              stylesheet={styles}
              renderNode={renderNode}
            />
          </VStack>
        )}
        keyExtractor={item => item.id}
      />
    </Box>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};
