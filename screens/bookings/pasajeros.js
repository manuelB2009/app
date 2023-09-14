import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker';

export default function Pasajeros() {

    const [count, setCount] = useState(1); // El valor mínimo es 1

    const incrementCount = () => {
      if (count < 5) setCount(count + 1);
    };
  
    const decrementCount = () => {
      if (count > 1) {
        setCount(count - 1);
      }
    };

    const generateFormElements = () => {
        const textElements = [];
        for (let i = 1; i <= count; i++) {
          textElements.push(
            <Formik
              initialValues={{ email: '' }}
              onSubmit={values => console.log(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    <Text>Pasajero {i}</Text>
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
                    <TextInput
                        onChangeText={handleChange('documento')}
                        value={values.documento}
                        placeholder="Documento"
                        style={styles.input}
                    />
                    <TextInput
                        onChangeText={handleChange('nombres')}
                        value={values.nombres}
                        placeholder="Nombres"
                        style={styles.input}
                    />
                    <TextInput
                        onChangeText={handleChange('apellidos')}
                        value={values.apellidos}
                        placeholder="Apellidos"
                        style={styles.input}
                    />
                    <TextInput
                      onChangeText={handleChange('email')}
                      value={values.email}
                      placeholder="Correo electrónico"
                      style={styles.input}
                    />
                    <TextInput
                        onChangeText={handleChange('telefono')}
                        value={values.telefono}
                        placeholder="Telefono"
                        style={styles.input}
                    />
                </View>
              )}
            </Formik>
          );
        }
        return textElements;
    };
  

    return (
        <>
            <View style={styles.container}>
                <View style={styles.counterContainer}>
                    <Text style={{marginHorizontal: 1, fontSize: wp("5%")}}>Cantidad de pasajeros</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={decrementCount}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <View style={styles.countContainer}>
                      <Text style={styles.counterText}>{count}</Text>
                  </View>
                  <TouchableOpacity style={styles.button} onPress={incrementCount}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                {
                    generateFormElements().map((element, index) => (
                        <View style={styles.formsItem} key={index}>
                            {element}
                            <View style={styles.hr}><Text>asd</Text></View>
                        </View>
                    ))
                }
            </ScrollView>
            <TouchableOpacity style={styles.btnContinuar}>
                        <Text style={styles.btnText}>Continuar</Text>
            </TouchableOpacity>
        </>
      );
}


const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    counterContainer: {
      alignItems: 'center',
      justifyContent: "center",
      marginBottom: 20,
    },
    countContainer: {
        alignItems: 'center',
        justifyContent: "center",
    },
    counterText: {
      fontSize: wp("8%"),
      fontWeight: "600"
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    button: {
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#DCDCDC',
        paddingVertical: wp("1%"),
        paddingHorizontal: wp("3%"),
        marginHorizontal: 10,
        width: wp("10%"),
        height: wp("10%"),
        borderRadius: wp("10%"),
    },
    buttonText: {
      color: 'black',
      fontSize: wp("6%"),
      fontWeight: 'bold',
    },
    picker: {
        width: wp('80%'),
        height: hp('6%'),
        marginBottom: 10,
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
    formsItem: {
        justifyContent: "center",
        alignItems: "center"
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
    hr: {
        width: wp("80%"),
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#cccccc",
        height: hp("0.3%")
    },
  });