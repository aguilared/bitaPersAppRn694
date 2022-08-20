import React from 'react';
import {
  Button,
  IconButton,
  Modal,
  Center,
  Text,
  NativeBaseProvider,
} from 'native-base';
import {useState} from 'react';
// import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

type Props = {
  id: number;
  bitacora_id: number;
  tipo_event_id: number;
  events_id: number;
  event_date: string;
  event: string;
  tipoevent: string;
  description: string;
};

const Example = (propss: Props) => {
  const [showModal, setShowModal] = useState(false);
  const clonedObj = {...propss.route};
  const bitaEvents = {...clonedObj, ...propss};
  const navigation = useNavigation();
  console.log('route.params', route);
  return (
    <Center>
      <Button onPress={() => setShowModal(true)}>Button</Button>
      <Icon
        name="ios-person"
        size={30}
        onPress={() => setShowModal(true)}
        color="#4F8EF7"
      />
      <IconButton
        size={30}
        variant="solid"
        _icon={{
          as: Icon,
          name: 'menu',
        }}
        onPress={() => setShowModal(true)}
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
    </Center>
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
