import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getTokenLoggin } from '../services/getLoggin';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import NetInfo from "@react-native-community/netinfo";

export default function MyTripsScreen() {

    const navigation = useNavigation();

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

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [conection, setConection] = useState(true);

    useEffect(() => {

      }, []);

    function redirectSignIn() {
      navigation.navigate('InicioSesion')
    }
    
    return (
        <>
            <View style={styles.containerSearch}>
                <View style={styles.contInpt}>
                    <TextInput
                      placeholder="Buscar tu reserva"
                      style={styles.input}
                    />
                </View>
                <View style={styles.contBtnSerch}>
                    <TouchableOpacity style={styles.boton}>
                        <Text style={styles.textoBoton}>Buscar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                conection == true
                ?
                    <View>
                        {!isLoggedIn && (
                            <View style={styles.textoTripsContainer}>
                                <Image source={require('../assets/fondoOpacity.png')} style={styles.fondo}/>
                                <View style={{paddingHorizontal: wp("5%")}}>
                                    <Text style={styles.textoTrips}>Inicia sesión para ver todos tus viajes aquí</Text>
                                    <Text style={styles.textoParrafoTrips}>Encuentra información sobre tus reservas, incluyendo fechas de compra y uso, productos adquiridos, costos y saldos pendientes.</Text>
                                </View>
                                <TouchableOpacity style={styles.loginButton} onPress={redirectSignIn}>
                                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                :
                    <View style={styles.divNotConection}>
                      <Image source={require('../assets/img/noConection.png')} style={{ width: wp('25%'), height: hp('15%') }}/>
                      <Text style={styles.textNotConection}>Parece que no estás conectado a internet</Text>
                    </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    containerSearch:{
        flexDirection: 'row',
        marginTop: Constants.statusBarHeight,
    },
    contInpt:{
        flex: 2,
        padding: wp("1%"),
        justifyContent: 'center',
        alignItems: 'center'
    },
    contBtnSerch:{
        flex: 1,
        padding: wp("1%"),
        justifyContent: 'center',
        alignItems: 'center'
    },
    fondo: {
        alignContent: 'center',
        alignItems: 'center',
        width: wp("60%"),
        height: hp("12.5%"),
        marginTop: hp("25%"),
        marginBottom: hp("2%"),
    },
    input: {
        width: wp("63%"),
        height: hp("6%"),
        padding: wp("3%"),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },

    boton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF6633',
        padding: 10,
        borderRadius: 8,
        width: wp("25%"),
        height: hp("6%"),
    },


    textoBoton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    textoTripsContainer: {
        alignItems: 'center',
    },
    contenidoTripsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: hp('5%')
    },
    
    textoTrips: {
        color: 'black',
        fontSize: wp('5.5%'),
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: hp('1%')
      },
    textoParrafoTrips: {
        color: 'black',
        fontSize: wp('4%'),
        lineHeight: wp('5%'),
        textAlign: 'center',

      },
    loginButton: {
        backgroundColor: '#FF6633',
        padding: wp('3%'),
        borderRadius: 8,
        marginVertical: hp("5%")
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    divNotConection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp('12%')
    },

    textNotConection: {
        fontSize: wp('4%'),
        fontWeight: '600',
        marginVertical: hp('5%')
    }
});