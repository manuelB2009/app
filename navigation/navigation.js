import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// screens

import ReservasScreen from "../screens/bookings/bookings";
import MyTripsScreen from "../screens/myTrips";
import VirtualAssistantScreen from "../screens/virtualAssistant";
import AccountScreen from "../screens/profile";
import DatosTitular from "../screens/bookings/datosTitular";
import Pasajeros from "../screens/bookings/pasajeros";
import SignIn from "../screens/access/SignIn";
import SignUp from "../screens/access/SignUp";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNav() {
  return (
    <Tab.Navigator 
          initialRouteName="ReservasStack"
          screenOptions={{
              tabBarShowLabel: false,
              tabBarActiveTintColor: '#FF6633',
              tabBarStyle: {
                  position: 'absolute',
                  bottom: hp("1%"),
                  width: wp("95%"),
                  left: wp("2.5%"),
                  right: wp("2.5%"),
                  elevation: 0,
                  backgroundColor: '#ffffff',
                  borderRadius: 15,
                  height: hp("8%"),
                  ...styles.shadow
              },
          }}
      >
        <Tab.Screen 
          name="ReservasStack"
          component={ReservasScreen}
          options={{
              tabBarIcon: ({ focused }) => (
                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name="home" size={30} color={focused ? '#FF6633' : '#748c94'} />
                    <Text style={{color: focused ? '#FF6633' : '#748c94', fontSize: 12 }}>{focused ? "Reservas" : ""}</Text>
                  </View>
              ),
              headerShown: false,
          }}
        />
        <Tab.Screen 
          name="Mis viajes" 
          component={MyTripsScreen}
          options={{
              tabBarIcon: ({ focused }) => (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Ionicons name="airplane" size={30} color={focused ? '#FF6633' : '#748c94'} />
                  <Text style={{color: focused ? '#FF6633' : '#748c94', fontSize: 12 }}>{focused ? "Mis viajes" : ""}</Text>
                </View>
              ),
              headerShown: false,
          }}
        />
        <Tab.Screen 
          name="Asistente virtual" 
          component={VirtualAssistantScreen}
          options={{
              tabBarIcon: ({ focused }) => (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Ionicons name="headset" size={30} color={focused ? '#FF6633' : '#748c94'} />
                  <Text style={{color: focused ? '#FF6633' : '#748c94', fontSize: 12 }}>{focused ? "Asistente virtual" : ""}</Text>
                </View>
              ),
              headerShown: false,
          }}
        />
        <Tab.Screen 
          name="Mi cuenta" 
          component={AccountScreen}
          options={{
              tabBarIcon: ({ focused }) => (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Ionicons name="person" size={30} color={focused ? '#FF6633' : '#748c94'} />
                  <Text style={{color: focused ? '#FF6633' : '#748c94', fontSize: 12 }}>{focused ? "Mi cuenta" : ""}</Text>
                </View>
              ),
              headerShown: false,
          }}
        />
    </Tab.Navigator>
  );
}


function MyTabs() {
  return (
    <Stack.Navigator initialRouteName='Main'>
      <Stack.Screen name="Main" component={TabNav} options={{headerShown:false}}/>
      <Stack.Screen name="DatosTitular" component={DatosTitular} options={{ headerTitle: "Datos del titular" }}/>
      <Stack.Screen name="Pasajeros" component={Pasajeros} options={{ headerTitle: "Pasajeros" }}/>
      <Stack.Screen name="InicioSesion" component={SignIn} options={{ headerTitle: "" }}/>
      <Stack.Screen name="Registro" component={SignUp} options={{ headerTitle: ""}}/>
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 100,
      height: 100
    },
    shadowOpacity: 0.95,
    shadowRadius: 6.5,
    elevation: 10
  }
})