import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getLists, deleteList } from '../api';

const ViewListScreen = () => {
  const [lists, setLists] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await getLists();
      if (response && response.length > 0) {
        setLists(response);
      } else {
        setLists([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las listas:', error);
      setLoading(false);
      Alert.alert('Error', 'Ha ocurrido un error al intentar obtener las listas.');
    }
  };

  const handleDeleteListItem = async (_id) => {
    try {
      Alert.alert(
        'Confirmar eliminación',
        '¿Está seguro de que desea eliminar este elemento?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              await deleteList(_id);
              fetchLists();
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error al eliminar el elemento de la lista:', error);
      Alert.alert('Error', 'Ha ocurrido un error al intentar eliminar el elemento.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {lists.length > 0 ? (
        lists.map((item) => (
          <View key={item._id} style={styles.card}>
            <View style={styles.cardBody}>
              <Text style={styles.textItem}>Humedad actual: {item.humedad} %</Text>
              <Text style={styles.textItem}>Temperatura actual: {item.temperatura} °C</Text>
              <Text style={styles.textItem}>Distancia detectada: {item.distanciaObjeto} cm</Text>
            </View>
            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={() => handleDeleteListItem(item._id)}
            >
              <Text style={styles.buttonText}>Eliminar registro</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View style={styles.noDataContainer}>
          <Text>No hay datos para mostrar</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 25,
    backgroundColor:"#C7D3F5",
  },
  card: {
    width: '70%',
    backgroundColor: '#87A3DF',
    borderRadius: 2,
    marginBottom: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  cardBody: {
    marginBottom: 10,
  },
  textItem: {
    fontSize: 15,
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonDelete: {
    backgroundColor: '#D60000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewListScreen;
