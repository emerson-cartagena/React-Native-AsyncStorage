import * as SecureStore from 'expo-secure-store';

// Guardar un valor
export const saveSecureData = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (e) {
        console.error('Error al guardar seguro', e);
    }
};

// Leer un valor
export const getSecureData = async (key) => {
    try {
        const result = await SecureStore.getItemAsync(key);
        return result ? result : null;
    } catch (e) {
        console.error('Error al obtener seguro', e);
    }
};

// Eliminar un valor
export const deleteSecureData = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (e) {
        console.error('Error al eliminar seguro', e);
    }
};
