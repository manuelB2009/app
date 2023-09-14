import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getTokenLoggin } from '../../services/getLoggin';

export default function DatosTitular() {

    const navigation = useNavigation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            const isLogged = async () => {
                let loggued = await getTokenLoggin();
                if (loggued) setIsLoggedIn(true)
                else setIsLoggedIn(false)
            }
          
            isLogged()
        }, [])
    );

    function redirectSignIn() {
        navigation.navigate('InicioSesion')
    }


    const validationSchema = Yup.object().shape({
        documento: Yup.string().required('El documento es obligatorio'),
        nombres: Yup.string().required('Los Nombres son obligatorio'),
        apellidos: Yup.string().required('Los Apellidos son obligatorio'),
        email: Yup.string().email('Ingrese un correo electrónico válido').required('El correo electrónico es obligatorio'),
        tipo: Yup.string().required('El género es obligatorio'),
        telefono: Yup.string().required('El telefono es obligatorio')
    });

    return (
        <Formik
            initialValues={{ documento: '', nombres: '', apellidos: '', email: '', tipo: 'Cedula de ciudadania', telefono: '' }}
            validationSchema={validationSchema}
            onSubmit={values => navigation.navigate('Pasajeros')}
            >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <ScrollView>
                        <Picker
                            selectedValue={values.tipo}
                            onValueChange={handleChange('tipo')}
                            style={styles.picker}
                        >
                            <Picker.Item label="Tipo documento" value="" />
                            <Picker.Item label="Cedula de ciudadania" value="Cedula de ciudadania" />
                            <Picker.Item label="Cedula de extranjería" value="Cedula de extranjería" />
                            <Picker.Item label="NIT" value="NIT" />
                            <Picker.Item label="Otro" value="Otro" />
                            <Picker.Item label="Permiso Especial de Permanencia" value="Permiso Especial de Permanencia" />
                            <Picker.Item label="Tarjeta de Identidad" value="Tarjeta de Identidad" />
                            <Picker.Item label="Permiso por Proteccion Temporal" value="Permiso por Proteccion Temporal" />
                            <Picker.Item label="Pasaporte" value="Pasaporte" />
                        </Picker>
                        {errors.tipo && touched.tipo && (
                            <Text style={styles.errorText}>{errors.tipo}</Text>
                        )}
                        <TextInput
                            onChangeText={handleChange('documento')}
                            value={values.documento}
                            placeholder="Documento"
                            style={styles.input}
                        />
                        {errors.documento && touched.documento && (
                            <Text style={styles.errorText}>{errors.documento}</Text>
                        )}

                        <TextInput
                            onChangeText={handleChange('nombres')}
                            value={values.nombres}
                            placeholder="Nombres"
                            style={styles.input}
                        />
                        {errors.nombres && touched.nombres && (
                            <Text style={styles.errorText}>{errors.nombres}</Text>
                        )}

                        <TextInput
                            onChangeText={handleChange('apellidos')}
                            value={values.apellidos}
                            placeholder="Apellidos"
                            style={styles.input}
                        />
                        {errors.apellidos && touched.apellidos && (
                            <Text style={styles.errorText}>{errors.apellidos}</Text>
                        )}

                        <TextInput
                          onChangeText={handleChange('email')}
                          value={values.email}
                          placeholder="Correo electrónico"
                          style={styles.input}
                        />
                        {errors.email && touched.email && (
                          <Text style={styles.errorText}>{errors.email}</Text>
                        )}

                        <TextInput
                            onChangeText={handleChange('telefono')}
                            value={values.telefono}
                            placeholder="Telefono"
                            style={styles.input}
                        />
                        {errors.telefono && touched.telefono && (
                            <Text style={styles.errorText}>{errors.telefono}</Text>
                        )}
                    </ScrollView>
                    {!isLoggedIn && (
                        <>
                            <View style={styles.DivtextSignIn}>
                                <Text style={styles.textSignIn}>Para continuar, debes iniciar sesión en tu cuenta</Text>
                            </View>
                            <TouchableOpacity style={styles.btnContinuar} onPress={redirectSignIn}>
                                <Text style={styles.btnText}>Iniciar sesión</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    {isLoggedIn && (
                        <TouchableOpacity style={styles.btnContinuar} onPress={handleSubmit}>
                            <Text style={styles.btnText}>Continuar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </Formik>
      );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hp('3%')
    },
    input: {
      width: wp('80%'),
      height: hp('6%'),
      borderColor: 'gray',
      borderWidth: wp('0.5%'),
      marginBottom: wp('3%'),
      borderRadius: wp('3%'),
      paddingHorizontal: wp('5%'),
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
    picker: {
      width: wp('80%'),
      height: hp('6%'),
      marginBottom: 10,
    },
    btnContinuar: {
        backgroundColor: "#FF6633",
        width: wp('100%'),
        justifyContent: "center",
        alignItems: "center",
        height: hp("6%"),
    },
    btnText: {
        color: "#fff",
        fontWeight: "900",
        fontSize: wp('5%')
    },
    DivtextSignIn: {
        width: wp('90%'),
        justifyContent: 'center',
        alignItems: 'center',
        padding: hp('1%'),
        marginVertical: hp('2%'),
        borderColor: "#FF6633",
        borderWidth: wp('0.5%'),
        borderRadius: wp('2%'),
        backgroundColor: "#ffcebd"
    },
    textSignIn: {
        fontSize: wp('3.7%'),
        fontWeight: '500'
    }
  });