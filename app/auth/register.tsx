// app/auth/register.tsx (family self-registration demo)
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { api } from '../../lib/firebase';
import { COLORS } from '../../lib/theme';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [relation, setRelation] = useState('');

  const onSubmit = async () => {
    if (!name || !email || !relation) return Alert.alert('Missing', 'All fields required');
    await api.registerFamily(name, email);
    Alert.alert('Submitted', 'Your account is pending approval and patient linking.');
    router.replace('/auth/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a family account</Text>
      <TextInput style={styles.input} placeholder="Full name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Relation to patient" value={relation} onChangeText={setRelation} />
      <TouchableOpacity style={styles.button} onPress={onSubmit}><Text style={styles.buttonText}>Register</Text></TouchableOpacity>
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
