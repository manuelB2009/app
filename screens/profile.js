import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch, ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'; 
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getTokenLoggin, removeTokenLoggin } from '../services/getLoggin';
import Toast from 'react-native-toast-message';
import NetInfo from "@react-native-community/netinfo";


export default function ProfileScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('es'); // Preseleccionar Español
  const [selectedCurrency, setSelectedCurrency] = useState('COP'); // Preseleccionar Pesos colombianos
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useFocusEffect(
    React.useCallback(() => {

        NetInfo.fetch().then(state => {
          // console.log("Connection type", state.type);
          // console.log("Is connected?", state.isConnected);
          if (state.isConnected) setConection(true)
          else setConection(false)
        });

        const isLogged = async () => {
            let loggued = await getTokenLoggin();
            if (loggued) setIsLoggedIn(true)
            else setIsLoggedIn(false)
        }
      
        isLogged()
    }, [])
  );

  useEffect(() => {

    const isLogged = async () => {
      let loggued = await getTokenLoggin();
      if (loggued) setIsLoggedIn(true)
    }

    isLogged()
  }, []);
  
  const navigation = useNavigation();

  function redirectSignIn() {
    if (!conection) return Toast.show({
      type: 'error',
      text1: 'Parece que no estás conectado a internet',
      visibilityTime: 3000
    });
    navigation.navigate('InicioSesion')
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [conection, setConection] = useState(true);

  const logOut = async () => {
    removeTokenLoggin()
    .then((resp) => {
      if (resp) setIsLoggedIn(false)
    })
  }
  
  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
  };

  const handleCurrencyChange = (value) => {
    setSelectedCurrency(value);
  };

  const toggleLocation = () => {
    setLocationEnabled(!locationEnabled);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <ScrollView style={styles.ScrollView}>
      <View style={styles.container}>
        <Ionicons name="ios-person-circle-sharp" size={wp('28%')} color={'gray'} />
        <Text style={styles.welcomeText}>Bienvenido a viajar</Text>
        <Text style={styles.descriptionText}>Organiza tus vacaciones gracias al sistema de reservas, pagos y preferencias de la app.</Text>
        {!isLoggedIn && (
          <TouchableOpacity style={styles.loginButton} onPress={redirectSignIn}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        )}
        {
          isLoggedIn && (
            <TouchableOpacity style={styles.loginButton} onPress={logOut}>
              <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          )
        }
  
        <View style={styles.formContainer}>
          <Picker selectedValue={selectedLanguage} onValueChange={handleLanguageChange} style={styles.picker}>
            <Picker.Item label="Seleccionar Idioma" value="" />
            <Picker.Item label="Español" value="es" />
            <Picker.Item label="Inglés" value="en" />
          </Picker>
          <Picker selectedValue={selectedCurrency} onValueChange={handleCurrencyChange} style={styles.picker}>
            <Picker.Item label="Seleccionar Moneda" value="" />
            <Picker.Item label="Pesos colombianos" value="COP" />
            <Picker.Item label="Dólar" value="USD" />
            <Picker.Item label="Euro" value="EUR" />
          </Picker>
          <View style={styles.switchContainer}>
            <Text>Ubicación</Text>
            <Switch 
              trackColor={{false: '#767577', true: '#FF6633'}}
              thumbColor={locationEnabled ? '#FF6633' : '#FF6633'}
              value={locationEnabled} 
              onValueChange={toggleLocation}/>
          </View>
          <View style={styles.switchContainer}>
            <Text>Notificaciones</Text>
            <Switch 
              trackColor={{false: '#767577', true: '#FF6633'}}
              thumbColor={notificationsEnabled ? '#FF6633' : '#FF6633'}
              value={notificationsEnabled}
              onValueChange={toggleNotifications}/>
          </View>
        </View>
  
        <TouchableOpacity style={styles.buttonFinal}>
          <Text style={styles.buttonText}>Ayuda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonFinal}>
          <Text style={styles.buttonText}>Términos y Condiciones</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ScrollView: {
    flex: 1,
    paddingTop: hp('10%'),
    paddingBottom: hp('400%'),
  },
  profileImage: {
    width: wp('25%'),
    height: hp('12.5%'),
  },
  welcomeText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  descriptionText: {
    fontSize: hp('2%'),
    textAlign: 'center',
    paddingHorizontal: hp('2%'),
    marginBottom: hp('1%')
  },
  loginButton: {
    backgroundColor: '#FF6633',
    padding: wp('2.5%'),
    borderRadius: 8,
    marginTop: hp('1%'),
  },
  buttonFinal: {
    backgroundColor: '#336699',
    borderRadius: 8,
    marginTop: hp('1%'),
    padding: hp('1%'),
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    marginTop: 20,
  },
  picker: {
    width: 200,
    height: 50,
    marginBottom: 10
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    color: '#FF6633',
  },
  Switch: {
    
  }
});