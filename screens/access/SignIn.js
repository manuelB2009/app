import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { getTokenLoggin, loginApp, setIdUsuario, setTokenLoggin, set_id_agencia } from '../../services/getLoggin';

import NetInfo from "@react-native-community/netinfo";

export default function SignIn() {

  useEffect(() => {
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });

    const isLogged = async () => {
      let loggued = await getTokenLoggin();
      if (loggued) navigation.navigate('Main')
    }

    isLogged()
  }, []);

  const navigation = useNavigation();

  function redirectSignUp() {
    navigation.navigate('Registro')
  }

  function loginFunction(values) {
    loginApp(values.email, values.password)
    .then((resp) => {
      if (resp.data.access_token) {
        setTokenLoggin(resp.data.access_token)
        return navigation.navigate('Main')
      }
      if (resp.data.idUsuario) setIdUsuario(resp.data.idUsuario)
      if (resp.data.id_agencia) set_id_agencia(resp.data.id_agencia)
      

    })
    .catch((err) => console.log(err));
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Correo electrónico no válido').required('Campo requerido'),
    password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('Campo requerido'),
  });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contImg}>
          <Image source={require('../../assets/icon.png')} style={styles.imgLogo}/>
        </View>
        <View style={styles.divTitle}>
          <Text style={styles.divTitleText}>Iniciar sesión</Text>
        </View>
        <View>
          <Formik
            initialValues={{ email: '', password: '' }}l
            validationSchema={validationSchema}
            onSubmit={values => loginFunction(values)}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
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
                  placeholder='Contraseña'
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                  style={styles.input}
                />
                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                <TouchableOpacity style={styles.btnOlvidePass}>
                  <Text style={styles.btnOlvidePassText}>¿Has olvidado la contraseña?</Text>
                </TouchableOpacity>
            
                <TouchableOpacity style={styles.btnContinuar} onPress={handleSubmit}>
                  <Text style={styles.btnText}>Iniciar sesión</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
        <View style={styles.line}><Text></Text></View>
        <View style={styles.divRegisterBtn}>
          <Text style={styles.textRegister}>¿Aún no tienes cuenta?</Text>
          <TouchableOpacity style={styles.btnRegister} onPress={redirectSignUp}>
            <Text style={styles.btnTextRegister}>Regístrate aquí</Text>
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
    width: wp("85%"), 
    height: hp("20%"),
    marginVertical: hp("5%")
  },
  input: {
    marginVertical: hp("1%"),
    paddingHorizontal: wp("3%"),
    height: hp("5%"),
    borderRadius: wp("2%"),
    borderColor: "grey",
    borderWidth: wp("0.6%"),
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
    width: wp("80%")
  },
  btnText: {
    color: "white",
    fontWeight: "800",
    fontSize: hp("2.5%"),
    padding: hp("1.5%")
  },

  btnOlvidePass: {
    marginBottom: hp("0.7%"),
    paddingVertical: hp("0.7%"),
    paddingHorizontal: wp("1%")
  },
  btnOlvidePassText: {
    fontSize: wp("3.5%"),
    fontWeight: "600"
  },

  line: {
    backgroundColor: "#949494",
    marginVertical: hp("3%"),
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