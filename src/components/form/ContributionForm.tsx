import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Yup from 'yup';
import { Colors } from '../../constants/colors';
import { Strings } from '../../constants/strings';
import { IContributionFormInput } from '../../types/common'; // Importa a interface do tipo common
import { Coords, getCurrentLocation, LocationError } from '../../utils/locationHelper';
import Card from '../common/Card';

const validationSchema = Yup.object().shape({
  bioindicadorId: Yup.string().required(Strings.alerts.speciesRequired),
  observacoes: Yup.string().max(250, 'As observações não podem exceder 250 caracteres'),
  ph: Yup.number().typeError('pH deve ser um número').min(0, 'pH inválido').max(14, 'pH inválido').nullable(),
  temperaturaAgua: Yup.number().typeError('Temperatura deve ser um número').nullable(),
});

interface ContributionFormProps {
  onClose: () => void;
  initialCoordinates?: Coords;
}

// TODO: Implementar a função de envio para a API
const submitToApi = async (payload: any) => {
  return new Promise(resolve => setTimeout(resolve, 2000));
};

const ContributionForm: React.FC<ContributionFormProps> = ({ onClose, initialCoordinates }) => {
  const [location, setLocation] = useState<Coords | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const currentLocation = await getCurrentLocation();
        setLocation(currentLocation);
      } catch (error) {
        if (error instanceof LocationError) {
          Alert.alert(Strings.alerts.errorTitle, error.message);
        } else {
          Alert.alert(Strings.alerts.errorTitle, 'Ocorreu um erro ao obter a localização.');
        }
        onClose();
      }
    };

    if (initialCoordinates) {
      setLocation(initialCoordinates);
    } else {
      fetchLocation();
    }
  }, [initialCoordinates, onClose]);

  const handleImagePick = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(Strings.alerts.imagePermissionDenied);
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

  const handleSubmit = async (values: IContributionFormInput, { setSubmitting, resetForm }: any) => {
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
    <KeyboardAvoidingView 
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{Strings.contributionForm.title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={32} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Formik<IContributionFormInput>
              initialValues={{
                bioindicadorId: '',
                observacoes: '',
                ph: null,
                temperaturaAgua: null,
                latitude: 0,
                longitude: 0,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
                <Card containerStyle={styles.cardContainer}>
                  {/* Campo Espécie */}
                  <View style={styles.inputGroup}>
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

                  {/* Seleção de Imagem */}
                  <View style={styles.imagePickerContainer}>
                    <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
                      <Ionicons name="camera-outline" size={24} color={Colors.textLight} />
                      <Text style={styles.imageButtonText}>{Strings.contributionForm.pickImage}</Text>
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
                  </View>

                  {/* Campo Observações */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>{Strings.contributionForm.notesLabel}</Text>
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      onChangeText={handleChange('observacoes')}
                      onBlur={handleBlur('observacoes')}
                      value={values.observacoes || ''}
                      placeholder={Strings.contributionForm.notesPlaceholder}
                      placeholderTextColor={Colors.textSecondary}
                      multiline
                    />
                    {touched.observacoes && errors.observacoes && (
                      <Text style={styles.errorText}>{errors.observacoes}</Text>
                    )}
                  </View>

                  {/* Campos de pH e Temperatura */}
                  <View style={styles.row}>
                    <View style={styles.inputGroupRow}>
                      <Text style={styles.label}>{Strings.contributionForm.phLabel}</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={(text) => setFieldValue('ph', text === '' ? null : parseFloat(text))}
                        onBlur={handleBlur('ph')}
                        value={values.ph !== null ? values.ph?.toString() : ''}
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
                        value={values.temperaturaAgua !== null ? values.temperaturaAgua?.toString() : ''}
                        keyboardType="numeric"
                        placeholder="25.0"
                        placeholderTextColor={Colors.textSecondary}
                      />
                      {touched.temperaturaAgua && errors.temperaturaAgua && (
                        <Text style={styles.errorText}>{errors.temperaturaAgua}</Text>
                      )}
                    </View>
                  </View>

                  {/* Botão de Envio */}
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
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 5,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  cardContainer: {
    padding: 20,
    borderRadius: 15,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputGroupRow: {
    flex: 1,
    marginHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.divider,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: Colors.error,
    fontSize: 13,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  submitButtonDisabled: {
    backgroundColor: Colors.divider,
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: Colors.textLight,
    fontWeight: 'bold',
    fontSize: 18,
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  imageButtonText: {
    marginLeft: 10,
    color: Colors.textLight,
    fontWeight: 'bold',
    fontSize: 16,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 15,
    borderColor: Colors.border,
    borderWidth: 1,
  },
});

export default ContributionForm;