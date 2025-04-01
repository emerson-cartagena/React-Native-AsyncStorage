import AsyncStorage from '@react-native-async-storage/async-storage';

export const guardarDatos = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error('Error al guardar los datos', e);
    }
};

export const obtenerDatos = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value !== null ? value : null;
    } catch (e) {
        console.error('Error al obtener los datos', e);
    }
};

export const eliminarDatos = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error('Error al eliminar los datos', e);
    }
};
