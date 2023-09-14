import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function Tarjeta({ dato }) {

  const navigation = useNavigation();

  const handleTarjetaClick = () => {
    console.log(`ID del producto: ${dato.id}`);
    navigation.navigate('DatosTitular');
  };

  return (
    <>
      <TouchableOpacity onPress={handleTarjetaClick}>
        <View style={styles.tarjeta}>
          <View style={styles.contenedorImg}>
            <Image source={{ uri: dato.galeria_fotografica != "ninguna" ? `https://backend.cosmostravel.tech/public/uploads/imagenes/productos/${dato.galeria_fotografica}` : `https://img.freepik.com/foto-gratis/concepto-viaje-equipaje_23-2149153260.jpg?2&w=996&t=st=1693964908~exp=1693965508~hmac=f2cad160162a107373b0a447ecd1089642811fa13eeb4be102627df8fb243caa` }} style={styles.imgCard} />
          </View>
          <View style={styles.contTwo}>
            <Text style={styles.nombre}>{dato.nombre}</Text>
            <Text style={styles.descripcion}>Descripción: {dato.tags}</Text>
            <Text style={styles.precio}>Precio: {dato.precio_publico}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  imgCard: { 
    width: 100, 
    height: 120,
    borderRadius: 10
  },
  contenedorImg: {
    justifyContent: "center",
    alignItems: "center"
  },
  tarjeta: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    margin: 5,
    padding: 15,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 6,
    borderColor: "#B2B2B2",
    borderWidth: 1
  },
  contTwo: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxWidth: '80%'
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Texto claro
    maxWidth: wp("57%")
  },
  descripcion: {
    fontSize: 14,
    marginTop: 5,
    color: '#B2B2B2', // Texto claro más claro
    maxWidth: wp("57%")
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#666666', // Texto claro
  },
});

export default Tarjeta;