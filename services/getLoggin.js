import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getTokenLoggin = async () => {
    let isLogged = false;
    let token = await AsyncStorage.getItem('token')
    if (token) isLogged = true;
    else isLogged = false;
    return isLogged;
}

export const setTokenLoggin = async (token) => {
    try {
        await AsyncStorage.setItem('token', token);
        console.log('Token guardado con éxito.');
    } catch (error) {
        console.error('Error al guardar el token:', error);
    }
}
export const setIdUsuario = async (id) => {
    try {
        await AsyncStorage.setItem('idUsuario', id);
        console.log('id guardado con éxito.');
    } catch (error) {
        console.error('Error al guardar el id:', error);
    }
}
export const set_id_agencia = async (id) => {
    try {
        await AsyncStorage.setItem('id_agencia', id);
        console.log('id guardado con éxito.');
    } catch (error) {
        console.error('Error al guardar el id:', error);
    }
}

export const removeTokenLoggin = async () => {
    try {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('idUsuario')
        await AsyncStorage.removeItem('id_agencia')
        return true;
    } catch (error) {
        console.error('Error al remover el token:', error);
        return false;
    }
}

export const loginApp = async (email, password) => {
    try {
        let datos = {
            email,
            password
        }
        let data = await axios.post('https://backend.cosmostravel.tech/public/api/tercero_inicio_sesion_app', datos)
        return data;
    } catch (error) {
        throw error;   
    }
}

export const registerApp = async (email, password, nombres, apellidos) => {
    try {
        let datos = {
            email,
            password,
            nombres,
            apellidos,
        }
        let data = await axios.post('https://backend.cosmostravel.tech/public/api/tercero_registro_app', datos)
        return data;
    } catch (error) {
        throw error;   
    }
}