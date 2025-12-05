// app/auth/forgot-password.tsx
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { api } from '../../lib/firebase';
import { COLORS } from '../../lib/theme';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const onSubmit = async () => {
    if (!email) return Alert.alert('Missing', 'Email required');
    await api.requestReset(email);
    Alert.alert('Check your email', 'We sent a password reset link.');
    router.replace('/auth/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset your password</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TouchableOpacity style={styles.button} onPress={onSubmit}><Text style={styles.buttonText}>Send reset link</Text></TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.textDark, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#B0C4DE', borderRadius: 10, padding: 12, marginBottom: 12 },
  button: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: COLORS.textLight, fontWeight: '700' },
});
