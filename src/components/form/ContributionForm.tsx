import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Strings } from '../../constants/strings';
import { getCurrentLocation } from '../../utils/locationHelper';
import Card from '../common/Card';

// Essa interface deve ser definida em src/types/common.ts
export interface ContributionFormInput {
  bioindicadorId: string;
  observacoes: string;
  ph: number | null;
  temperaturaAgua: number | null;
  imagemUrl?: string | null;
}

const validationSchema = Yup.object().shape({
  bioindicadorId: Yup.string().required('A espécie é obrigatória'),
  observacoes: Yup.string().max(250, 'As observações não podem exceder 250 caracteres'),
  ph: Yup.number().typeError('pH deve ser um número').min(0, 'pH inválido').max(14, 'pH inválido').nullable(),
  temperaturaAgua: Yup.number().typeError('Temperatura deve ser um número').nullable(),
});

interface ContributionFormProps {
  onClose: () => void;
  initialCoordinates?: { latitude: number; longitude: number };
}

// TODO: Implementar a função de envio para a API
const submitToApi = async (payload: any) => {
  // Exemplo de como a requisição para o backend poderia ser feita
  // const response = await fetch('http://sua-api.com/api/v1/ocorrencias', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(payload),
  // });
  // if (!response.ok) {
  //   throw new Error('Falha na requisição da API');
  // }
  // return response.json();
  
  return new Promise(resolve => setTimeout(resolve, 2000));
};

const ContributionForm: React.FC<ContributionFormProps> = ({ onClose, initialCoordinates }) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (initialCoordinates) {
      setLocation(initialCoordinates);
    } else {
      const fetchLocation = async () => {
        const currentLocation = await getCurrentLocation();
        if (currentLocation) {
          setLocation(currentLocation);
        } else {
          Alert.alert(Strings.alerts.locationDenied, 'Não foi possível obter sua localização.');
          onClose();
        }
      };
      fetchLocation();
    }
  }, [initialCoordinates, onClose]);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(Strings.alerts.imagePermissionDenied, 'Precisamos de permissão para acessar sua galeria de fotos para continuar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async (values: ContributionFormInput, { setSubmitting, resetForm }: any) => {
    Keyboard.dismiss();
    
    if (!location) {
      Alert.alert(Strings.alerts.errorTitle, 'Localização não disponível. Tente novamente.');
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...values,
        latitude: location.latitude,
        longitude: location.longitude,
        imagemUrl: image,
      };
      
      console.log('Enviando dados para a API:', payload);
      await submitToApi(payload);

      Alert.alert(Strings.alerts.successTitle, Strings.alerts.successMessage);
      resetForm();
      onClose();
    } catch (error) {
      console.error(error);
      Alert.alert(Strings.alerts.errorTitle, Strings.alerts.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>{Strings.contributionForm.title}</Text>
        <Formik<ContributionFormInput>
          initialValues={{
            bioindicadorId: '',
            observacoes: '',
            ph: null,
            temperaturaAgua: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
            <Card containerStyle={styles.cardContainer}>
              <View>
                <Text style={styles.label}>{Strings.contributionForm.speciesLabel}</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('bioindicadorId')}
                  onBlur={handleBlur('bioindicadorId')}
                  value={values.bioindicadorId}
                  placeholder={Strings.contributionForm.speciesPlaceholder}
                  placeholderTextColor={Colors.textSecondary}
                />
                {touched.bioindicadorId && errors.bioindicadorId && (
                  <Text style={styles.errorText}>{errors.bioindicadorId}</Text>
                )}
              </View>

              <View style={styles.imagePickerContainer}>
                <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
                  <Ionicons name="camera-outline" size={24} color={Colors.primary} />
                  <Text style={styles.imageButtonText}>{Strings.contributionForm.pickImage}</Text>
                </TouchableOpacity>
                {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{Strings.contributionForm.notesLabel}</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  onChangeText={handleChange('observacoes')}
                  onBlur={handleBlur('observacoes')}
                  value={values.observacoes}
                  placeholder={Strings.contributionForm.notesPlaceholder}
                  placeholderTextColor={Colors.textSecondary}
                  multiline
                />
                {touched.observacoes && errors.observacoes && (
                  <Text style={styles.errorText}>{errors.observacoes}</Text>
                )}
              </View>

              <View style={styles.row}>
                <View style={styles.inputGroupRow}>
                  <Text style={styles.label}>{Strings.contributionForm.phLabel}</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setFieldValue('ph', text === '' ? null : parseFloat(text))}
                    onBlur={handleBlur('ph')}
                    value={values.ph !== null ? values.ph.toString() : ''}
                    keyboardType="numeric"
                    placeholder="7.5"
                    placeholderTextColor={Colors.textSecondary}
                  />
                  {touched.ph && errors.ph && (
                    <Text style={styles.errorText}>{errors.ph}</Text>
                  )}
                </View>

                <View style={styles.inputGroupRow}>
                  <Text style={styles.label}>{Strings.contributionForm.tempLabel}</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setFieldValue('temperaturaAgua', text === '' ? null : parseFloat(text))}
                    onBlur={handleBlur('temperaturaAgua')}
                    value={values.temperaturaAgua !== null ? values.temperaturaAgua.toString() : ''}
                    keyboardType="numeric"
                    placeholder="25.0"
                    placeholderTextColor={Colors.textSecondary}
                  />
                  {touched.temperaturaAgua && errors.temperaturaAgua && (
                    <Text style={styles.errorText}>{errors.temperaturaAgua}</Text>
                  )}
                </View>
              </View>

              <TouchableOpacity
                style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                onPress={isSubmitting ? undefined : () => handleSubmit()}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color={Colors.textLight} />
                ) : (
                  <Text style={styles.submitButtonText}>{Strings.common.submit}</Text>
                )}
              </TouchableOpacity>
            </Card>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  cardContainer: {
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 0,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.textPrimary,
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
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: Colors.primary + '80',
  },
  submitButtonText: {
    color: Colors.textLight,
    fontWeight: 'bold',
    fontSize: 16,
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.border,
    padding: 10,
    borderRadius: 8,
  },
  imageButtonText: {
    marginLeft: 8,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default ContributionForm;
