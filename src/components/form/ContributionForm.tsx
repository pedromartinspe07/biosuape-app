import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ContributionForm: React.FC = () => {
  const [species, setSpecies] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const handleSubmit = () => {
    // Lógica para enviar os dados para o backend
    console.log('Dados submetidos:', { species, notes });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome da Espécie:</Text>
      <TextInput
        style={styles.input}
        value={species}
        onChangeText={setSpecies}
        placeholder="Ex: Alga Vermelha"
      />
      
      <Text style={styles.label}>Observações:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Detalhes sobre a saúde do organismo ou ambiente"
        multiline
      />

      <Button title="Enviar Contribuição" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default ContributionForm;