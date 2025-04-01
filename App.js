import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';

import { saveSecureData, getSecureData, deleteSecureData } from './src/storage/SecureStorage';

export default function App() {
  const [tarea, setTarea] = useState('');
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const cargarTareas = async () => {
      const tareasGuardadas = await getSecureData('tareas');
      if (tareasGuardadas) {
        setTareas(JSON.parse(tareasGuardadas));
      }
    };
    cargarTareas();
  }, []);

  const agregarTarea = () => {
    if (tarea.trim() === '') {
      Alert.alert('Error', 'La tarea no puede estar vacía');
      return;
    }
    const nuevaTarea = { id: Date.now().toString(), texto: tarea };
    const nuevasTareas = [...tareas, nuevaTarea];
    setTareas(nuevasTareas);
    saveSecureData('tareas', JSON.stringify(nuevasTareas));
    setTarea('');
  };

  const eliminarTarea = (id) => {
    const nuevasTareas = tareas.filter((t) => t.id !== id);
    setTareas(nuevasTareas);
    saveSecureData('tareas', JSON.stringify(nuevasTareas));
  };

  return (
    <View style={styles.contenedor}>
      <TextInput
        style={styles.input}
        placeholder="Agregar nueva tarea"
        value={tarea}
        onChangeText={setTarea}
      />
      <Button title="Agregar" onPress={agregarTarea} />
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.texto}</Text>
            <TouchableOpacity onPress={() => eliminarTarea(item.id)}>
              <Text style={styles.eliminar}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
  },
  eliminar: {
    color: 'red',
  },
});
