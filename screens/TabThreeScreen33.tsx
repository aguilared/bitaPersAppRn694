import React, {useState} from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  FlatList,
  Heading,
  HStack,
  Modal,
  VStack,
  Text,
  useColorMode,
  Spacer,
  Switch,
  NativeBaseProvider,
} from 'native-base';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';

import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import HTMLView from 'react-native-htmlview';

const Example = () => {
  const navigation = useNavigation();

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
  console.log('DATA', data);
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
  const [showModal, setShowModal] = useState(false);

  return (
    <Box
      _light={{bg: 'coolGray.50'}}
      _dark={{bg: 'coolGray.900'}}
      minHeight="sm"
      justifyContent="center"
      px={4}>
      <Heading size="lg">Bitacoras</Heading>
      <ToggleDarkMode />
      <Button onPress={() => setShowModal(true)}>Button</Button>

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
                alignSelf="flex-start"
                onPress={() =>
                  navigation.navigate('TabThreeScreenModal', {
                    id: item.id,
                    bitacora_id: item.bitacora_id,
                    event_date: item.event_date,
                    events_id: item.events_id,
                    description: item.description,
                  })
                }>
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
              {`TipoEvent: ${item.id}`}
            </Text>
            <Spacer />

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
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        _backdrop={{
          _dark: {
            bg: 'coolGray.800',
          },
          bg: 'warmGray.50',
        }}>
        <Modal.Content maxWidth="350" maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Return Policy</Modal.Header>
          <Modal.Body>
            Create a 'Return Request' under “My Orders” section of App/Website.
            Follow the screens that come up after tapping on the 'Return’
            button. Please make a note of the Return ID that we generate at the
            end of the process. Keep the item ready for pick up or ship it to us
            basis on the return mode.
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
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
