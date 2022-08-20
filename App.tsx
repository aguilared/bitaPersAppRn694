import * as React from 'react';
import type {Node} from 'react';
import {Button, View, Text, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabThreeScreen from './screens/TabThreeScreen';
import TabThreeScreen3 from './screens/TabThreeScreen3';
import TabThreeScreen33 from './screens/TabThreeScreen33';
import TabThreeScreen1 from './screens/TabThreeScreen1';
import TabThreeScreenModal from './screens/TabThreeScreenModal';
import {QueryClient, QueryClientProvider} from 'react-query';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

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

function SettingsScreen({route, navigation}) {
  const {user} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings Screen</Text>
      <Text>userParam: {JSON.stringify(user)}</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

function ProfileScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile Screen</Text>
    </View>
  );
}

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Settings"
        onPress={() =>
          navigation.navigate('Root', {
            screen: 'Settings',
            params: {user: 'jane'},
          })
        }
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="TabTreeScreen" component={TabThreeScreen} />
      <Stack.Screen name="TabTreeScreen3" component={TabThreeScreen3} />
      <Stack.Screen name="TabTreeScreen33" component={TabThreeScreen33} />
      <Stack.Screen name="TabTreeScreen1" component={TabThreeScreen1} />
      <Stack.Screen name="TabTreeScreenModal" component={TabThreeScreenModal} />
    </Stack.Navigator>
  );
}

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Drawer.Navigator
          useLegacyImplementation
          initialRouteName="Root"
          screenOptions={{headerShown: false}}>
          <Drawer.Screen name="Root" component={TabThreeScreen33} />
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="TabTreeScreen" component={TabThreeScreen} />
          <Drawer.Screen name="TabTreeScreen3" component={TabThreeScreen3} />
          <Drawer.Screen name="TabTreeScreen33" component={TabThreeScreen33} />
          <Drawer.Screen name="TabTreeScreen1" component={TabThreeScreen1} />
          <Drawer.Screen
            name="TabTreeScreenModal"
            component={TabThreeScreenModal}
          />
        </Drawer.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
