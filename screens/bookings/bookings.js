import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Tarjeta from '../../components/card';
import { getCitys, getProductosByCityAndDate, getProductosDestacados } from '../../services/getDataApi';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';

import NetInfo from "@react-native-community/netinfo";

export default function ReservasScreen() {

  useFocusEffect(
    React.useCallback(() => {
      NetInfo.fetch().then(state => {
        // console.log("Connection type", state.type);
        // console.log("Is connected?", state.isConnected);
        if (state.isConnected) setConection(true)
        else setConection(false)
      });
    }, [])
  );



    const [date, setDate] = useState(new Date());

    const [results, setResults] = useState([]);
    const [cities, setCities] = useState([]);
    const [productosDestacados, setProductosDestacados] = useState([]);


    const [loading, setLoading] = useState(false);
    const [notFound, setnotFound] = useState(false);
    const [banner, setBanner] = useState(true);
    const [conection, setConection] = useState(true);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
      setLoading(true)
      getCitys()
      .then((result) => setCities(result.data))
      .catch((err) => console.log(err));
      getProductosDestacados()
      .then((result) => {
        setProductosDestacados(result.data)
        setBanner(false)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
    }, []);

    const fetchData = async () => {
      setResults([])
      setLoading(true)
      setnotFound(false)
      try {
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, "0");
        const day = String(dateObject.getDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;
        
        getProductosByCityAndDate(value, formattedDate)
        .then((result) => {
          if (result.length > 0) {
            setResults(result)
            setBanner(false)
            setnotFound(false)
          }else setnotFound(true)
          setLoading(false)
        }).catch((err) => {
          console.log(err);
          setLoading(false)
        });
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
  
    const handleSearch = () => {
      if (value == "" || value == undefined || value == null) return Toast.show({
        type: 'error',
        text1: 'Debes seleccionar una ciudad',
        visibilityTime: 1000
      });
      fetchData();
    };
  
    const handleDatePress = () => {
      setDatePickerVisibility(true);
    };
    
    return (
      <>
        <View style={styles.container}>
          <View style={styles.dropdownDiv}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: '#336699' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={cities}
              search
              maxHeight={350}
              labelField="ciudad"
              valueField="id"
              placeholder={!isFocus ? 'Ciudad' : '...'}
              searchPlaceholder="Buscar..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.id);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? '#336699' : 'black'}
                  name="Safety"
                  size={20}
                />
              )}
            />
          </View>

          <View style={styles.dateDiv}>
            <TouchableOpacity onPress={handleDatePress}>
                <TextInput
                  placeholder="Fecha"
                  value={date.toLocaleDateString()}
                  style={styles.input}
                  editable={false}
                />
            </TouchableOpacity>
            {isDatePickerVisible && (
              <DateTimePicker
                style={styles.datePicker}
                value={date}
                mode="date"
                display="spinner"
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setDate(selectedDate);
                  }
                  setDatePickerVisibility(false);
                }}
              />
            )}
          </View>
          <Spinner
            visible={loading}
            textContent={'Cargando...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.btnDiv}>
            <TouchableOpacity style={styles.boton} onPress={handleSearch}>
              <Text style={styles.textoBoton}>Buscar</Text>
            </TouchableOpacity>
          </View>
        </View>
        {
          conection == true
          ?
            <View>
              <ScrollView style={styles.scrollView}>
                {
                  results.length != 0
                  ?
                  <>
                    <Text style={styles.destacadosText}>Resultados de tu busqueda</Text>
                    {
                      results.map((dato) => (
                        <Tarjeta key={dato.id} dato={dato} />
                      ))
                    }
                  </>
                  :
                  ''
                }
                {
                  productosDestacados.length != 0
                  ?
                  <>
                    <Text style={styles.destacadosText}>Productos destacados</Text>
                    {
                      productosDestacados.map((dato) => (
                        <Tarjeta key={dato.id} dato={dato} />
                      ))
                    }
                  </>
                  :
                  ""
                }
                {
                  notFound
                  ?
                  <View style={styles.NotResults}>
                    <Text style={styles.textNotF}>No hay resultados</Text>
                  </View>
                  :
                  ''
                }
                {
                  banner
                  ?
                  <View style={styles.contImg}>
                    <Image source={require('../../assets/fondoOpacity.png')} style={{ width: 200, height: 100 }}/>
                  </View>
                  : ''
                }
              </ScrollView>
            </View>
          :
            <View style={styles.divNotConection}>
              <Image source={require('../../assets/img/noConection.png')} style={{ width: wp('25%'), height: hp('15%') }}/>
              <Text style={styles.textNotConection}>Parece que no estás conectado a internet</Text>
            </View>
        }
      </>
    );      
}

const styles = StyleSheet.create({

  contImg: {
    flex: 1,
    paddingTop: hp("30%"),
    alignItems: 'center'
  },
  scrollView:{
    padding: 10,
    marginTop: 10,
    marginBottom: hp("20%")
  },

  spinnerTextStyle: {
    color: '#FFF',
  },

  textNotF: {
    fontSize: wp("4.5%"),
    fontWeight: '600'
  },

  NotResults: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: wp("10%")
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

  container: {
    marginTop: Constants.statusBarHeight+10,
    flexDirection: 'row',
  },

  dropdownDiv: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateDiv: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: hp("1%")
  },
  btnDiv: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: hp("2%")
  },


  input: {
    width: wp("25%"),
    height: hp("6%"),
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  datePicker: {
    flex: 1,
    marginLeft: 8,
  },
  containersImps: {
    justifyContent: 'center',
    padding: 5,
    alignItems: 'center'
  },
  textLabel: {
    fontWeight: 'bold'
  },

  dropdown: {
    height: hp("6%"),
    width: wp("40%"),
    borderColor: '#336699',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  destacadosText: {
    fontSize: wp('4.5%'),
    marginVertical: hp("1.5%"),
    marginHorizontal: wp('3%'),
    fontWeight: '700'
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