import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import WebSocket from 'react-native-websocket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { insertList } from '../api';

export default function HomeScreen() {
  const [temperatura, setTemperatura] = useState('0');  
  const [humedad, setHumedad] = useState('0');
  const [distanciaObjeto, setDistanciaObjeto] = useState('0');
  const navigation = useNavigation();

  useEffect(() => {
  }, []);

  const handleData = (message) => {
    try {
      const data = message.data.split(',');
      if (data.length === 3) {
        setTemperatura(parseFloat(data[0]).toFixed(2));
        setHumedad(parseFloat(data[1]).toFixed(2));
        setDistanciaObjeto(parseFloat(data[2]).toFixed(2));
      } else {
        console.error('Datos recibidos no válidos:', data);
      }
    } catch (error) {
      console.error('Error al procesar los datos:', error);
    }
  };

  const onOpen = () => {
    console.log("Conexión con WebSocket");
  };

  const guardarDatos = async () => {
    try {
      const datosAGuardar = {
        temperatura: parseFloat(temperatura),
        humedad: parseFloat(humedad),
        distanciaObjeto: parseFloat(distanciaObjeto)
      };

      await insertList(datosAGuardar);
      
      console.log('Datos guardados y enviados a la base de datos:', datosAGuardar);
      Alert.alert('Guardado exitoso', 'Los datos se han guardado correctamente.');
  
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      Alert.alert('Error', 'Ha ocurrido un error al intentar guardar los datos.');
    }
  };
  
  const verLista = () => {
    navigation.navigate('ViewListScreen');
  };

  const iconoTemperatura = 
  <FontAwesome5 name="thermometer-half" size={40} color="#333" />;
  const iconoHumedad = 
  <FontAwesome5 name="tint" size={40} color="#333" />;
  const iconoDistancia = 
  <FontAwesome5 name="ruler" size={40} color="#333" />;

  return (
    <View style={styles.contenedor}>
      <View style={styles.tarjetasSuperior}>
        <View style={styles.tarjetaH}>
          <View>
            <Text style={styles.texto}>Humedad</Text>
            <Text style={styles.valor}>{humedad} %   {iconoHumedad}</Text>
          
          </View>
        </View>

        <View style={styles.tarjetaT}>
          <View>
            <Text style={styles.texto}>Temperatura</Text>
            <Text style={styles.valor}>{temperatura} °C   {iconoTemperatura}</Text>
          </View>
        </View>
      </View>

      <View style={styles.tarjetaCentral}>
        <View style={styles.tarjetaD}>
          <View>
            <Text style={styles.texto}>Distancia</Text>
            <Text style={styles.valor}>{distanciaObjeto} cm  {iconoDistancia}</Text>
          </View>
        </View>
      </View>

      <View style={styles.botones}>
        <TouchableOpacity style={styles.boton} onPress={guardarDatos}>
          <Text style={styles.textoBoton}>Guardar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={verLista}>
          <Text style={styles.textoBoton}>Ver Lista</Text>
        </TouchableOpacity>
      </View>

      <WebSocket
        url="ws://192.168.0.20:81"
        onOpen={onOpen}
        onMessage={handleData}
        onError={(error) => console.log('Error de WebSocket:', error)}
        reconnect={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B7BAE0',
  },
  tarjetasSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
  },
  tarjetaCentral: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  tarjetaH: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CBD3DF',
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius: 60,
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  tarjetaT: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DC2DF', 
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius: 60,
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  tarjetaD: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C6D3DE',
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 60,
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  texto: {
    fontSize: 28,
    color: '#333',
    marginBottom: 5,
  },
  valor: {
    fontSize: 24,
    color: '#333',
    marginBottom: 5,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 70,
  },
  boton: {
    backgroundColor: '#3D3E5A',
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 20,
  },
});
