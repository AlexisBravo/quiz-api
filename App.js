import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TextInput } from 'react-native';

export default function App() {
  const [nombrePokemon, setnombrePokemon] = useState('');
  const [datosPokemon, setdatosPokemon] = useState(null);
  
  const getPokemon = () => {
    if (!nombrePokemon) {
      alert('Por favor, ingresa el nombre de un Pokémon');
      return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`)
      .then(response => response.json())
      .then(data => setdatosPokemon(data))
      .catch(() => alert('Verifica el nombre e intenta de nuevo.'));
  };

  return (

    <View style={styles.container}>
      <TextInput
        style={styles.input}
        
        placeholder="Ingrese el nombre"
        value={nombrePokemon}
        onChangeText={setnombrePokemon}
      />
      <Button onPress={getPokemon} title='Ver Pokémon'/>
      
      {datosPokemon && (
        <View style={styles.containerPokemon}>
          <Text>Id: {datosPokemon.id}</Text>
          <Text>Nombre: {datosPokemon.name}</Text>
          <Text>Altura: {datosPokemon.height}</Text>
          <Text>Peso: {datosPokemon.weight}</Text>
          <Text>Habilidades:</Text>
            {datosPokemon.abilities.map(ability => (
            <Text key={ability.ability.id}>- {ability.ability.name}</Text>
            ))}
          <Image
            source={{ uri: datosPokemon.sprites.front_default }}
            style={styles.imagenPokemon}
          />
        </View>
      )}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8DE9A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '20%',
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 10,
  },
  containerPokemon: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#55DB8C',
    marginVertical: 10,
  },
  imagenPokemon: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});



