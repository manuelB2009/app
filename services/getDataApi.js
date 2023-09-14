import axios from 'axios';

export const getProductosByCityAndDate = async (value, formattedDate) => {
  try {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 19226|Y1nMNzLSdPvrj8A97ortzsA4S7MNC7soALFV3MLn'
    };
    
    let data = await axios.get(`https://backend.cosmostravel.tech/public/api/reserva_listar_producto_app?ciudad=${value}&fecha=${formattedDate}`, { headers: headers })
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const getCitys = async () => {
    try {
        let data = await axios.get('https://backend.cosmostravel.tech/public/api/get_ciudades_app')
        return data;
    } catch (error) {
        throw error;   
    }
}

export const getProductosDestacados = async () => {
  try {
    let data = await axios.get('https://backend.cosmostravel.tech/public/api/productosDestacadosApp')
    return data;
  } catch (error) {
      throw error;   
  }
}