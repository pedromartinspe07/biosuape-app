import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Strings } from '../../constants/strings';
import { getCurrentLocation } from '../../utils/locationHelper';
import Card from '../common/Card';

const ContributionForm: React.FC = () => {
  const [species, setSpecies] = useState('');
  const [notes, setNotes] = useState('');
  const [pH, setPh] = useState('');
  const [temp, setTemp] = useState('');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);
    };
    fetchLocation();
  }, []);

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setLoading(true);

    if (!species.trim()) {
      Alert.alert('Erro', 'O nome da espécie é obrigatório.');
      setLoading(false);
      return;
    }

    // Simular o envio dos dados para a API de backend
    try {
      // Aqui você faria a chamada real à API
      // Ex: await api.post('/ocorrencias', { species, notes, pH, temp, ... });

      console.log('Dados a serem enviados:', { species, notes, pH, temp, location });
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simula tempo de resposta da rede

      Alert.alert(Strings.alertSuccess, 'Sua contribuição foi enviada com sucesso!');
      // Limpar formulário após o envio
      setSpecies('');
      setNotes('');
      setPh('');
      setTemp('');
    } catch (error) {
      Alert.alert(Strings.alertError, 'Houve um problema ao enviar a contribuição. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.title}>{Strings.contributionFormTitle}</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome da Espécie:</Text>
          <TextInput
            style={styles.input}
            value={species}
            onChangeText={setSpecies}
            placeholder={Strings.placeholderSpecies}
            placeholderTextColor={Colors.textMuted}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Observações:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder={Strings.placeholderNotes}
            placeholderTextColor={Colors.textMuted}
            multiline
          />
        </View>

        <View style={styles.row}>
          <View style={styles.inputGroupRow}>
            <Text style={styles.label}>pH:</Text>
            <TextInput
              style={styles.input}
              value={pH}
              onChangeText={setPh}
              keyboardType="numeric"
              placeholder="7.5"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
          <View style={styles.inputGroupRow}>
            <Text style={styles.label}>Temperatura (°C):</Text>
            <TextInput
              style={styles.input}
              value={temp}
              onChangeText={setTemp}
              keyboardType="numeric"
              placeholder="25.0"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
        </View>
        
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color={Colors.primary} />
          <Text style={styles.locationText}>
            Localização: {location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : 'Obtendo...'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={loading ? 'Enviando...' : Strings.buttonSubmit}
            onPress={handleSubmit}
            disabled={loading}
            color={Colors.primary}
          />
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.text,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputGroupRow: {
    flex: 1,
    marginHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.textMuted,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default ContributionForm;