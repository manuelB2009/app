import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { registerApp, setTokenLoggin } from '../../services/getLoggin';

export default function SignUp() {

  const navigation = useNavigation();

  function redirectSignIn() {
    navigation.navigate('InicioSesion')
  }

  function registerFunction(values) {
    registerApp(values.email, values.password, values.firstName, values.lastName)
    .then((resp) => {
      if (resp.data.access_token) {
        setTokenLoggin(resp.data.access_token)
        return navigation.navigate('Main')
      }
    })
    .catch((err) => console.log(err));
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Campo requerido'),
    lastName: Yup.string().required('Campo requerido'),
    email: Yup.string().email('Correo electrónico no válido').required('Campo requerido'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Campo requerido'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Campo requerido'),
  })

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contImg}>
          <Image source={require('../../assets/icon.png')} style={styles.imgLogo}/>
        </View>
        <View style={styles.divTitle}>
          <Text style={styles.divTitleText}>Registro</Text>
        </View>
        <View>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => registerFunction(values)}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                
                <TextInput
                  onChangeText={handleChange('firstName')}
                  placeholder='Nombres'
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  style={styles.input}
                />
                {touched.firstName && errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
                
                <TextInput
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  placeholder='Apellidos'
                  style={styles.input}
                />
                {touched.lastName && errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                
                <TextInput
                  onChangeText={handleChange('email')}
                  placeholder='Correo electrónico'
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  style={styles.input}
                />
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            
                <TextInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder='Contraseña'
                  secureTextEntry
                  style={styles.input}
                />
                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            
                <TextInput
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  placeholder='Confirmar contraseña'
                  secureTextEntry
                  style={styles.input}
                />
                {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            
                <TouchableOpacity style={styles.btnContinuar} onPress={handleSubmit}>
                  <Text style={styles.btnText}>Crear cuenta</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
        <View style={styles.line}><Text></Text></View>
        <View style={styles.divRegisterBtn}>
          <Text style={styles.textRegister}>¿Ya tienes cuenta?</Text>
          <TouchableOpacity style={styles.btnRegister} onPress={redirectSignIn}>
            <Text style={styles.btnTextRegister}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  divTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp("2%")
  },
  divTitleText: {
    fontSize: wp("5%"),
    fontWeight: "600",
    color: "#666666"
  },
  contImg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('1%')
  },
  imgLogo: {
    width: wp("54%"), 
    height: hp("15%")
  },
  input: {
    marginVertical: hp("1%"),
    paddingHorizontal: wp("3%"),
    height: hp("5%"),
    borderRadius: wp("2%"),
    borderColor: "grey",
    borderWidth: wp("0.6%")
  },
  errorText: {
    color: "#FF5353",
    paddingBottom: hp("1%"),
    paddingHorizontal: wp("2%"),
    fontWeight: "800",
    fontSize: wp("3.5%")
  },
  btnContinuar: {
    backgroundColor: "#FF6633",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp("1.5%"),
    marginTop: hp("1.5%"),
    width: wp("80%")
  },
  btnText: {
    color: "white",
    fontWeight: "800",
    fontSize: hp("2.5%"),
    padding: hp("1.5%")
  },

  line: {
    backgroundColor: "#949494",
    marginVertical: hp("2%"),
    width: wp("80%"),
    height: hp("0.3%")
  },


  divRegisterBtn: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textRegister: {
    fontSize: wp("3.6%"),
    paddingBottom: hp("1%")
  },

  btnRegister: {
    backgroundColor: "#336699",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp("1.5%"),
    width: wp("80%")
  },
  btnTextRegister: {
    color: "white",
    fontWeight: "500",
    fontSize: hp("2.5%"),
    padding: hp("1%")
  },
})