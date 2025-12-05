import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [role, setRole] = useState<"caregiver" | "family" | null>(null);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!role || !userId || !password) {
      Alert.alert("Incomplete Information", "Please select a role and enter User ID/Password.");
      return;
    }

    if (role === "caregiver" && userId === "nurse" && password === "1234") {
      router.push("/caregiver");
    } else if (role === "family" && userId === "family" && password === "guest") {
      router.push("/family");
    } else {
      Alert.alert("Login Failed", "Invalid credentials or role selected.");
      setUserId("");
      setPassword("");
      setRole(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BridgeCare</Text>
      <Text style={styles.subtitle}>Patient-Family Communication Portal</Text>

      <View style={styles.roleSelector}>
        <TouchableOpacity
          style={[styles.roleButton, role === "caregiver" && styles.active]}
          onPress={() => setRole("caregiver")}
        >
          <Text>Caregiver (Staff)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === "family" && styles.active]}
          onPress={() => setRole("family")}
        >
          <Text>Family (Guest)</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={{ color: "white" }}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  logo: { fontSize: 32, fontWeight: "bold", marginBottom: 10 },
  subtitle: { marginBottom: 20 },
  roleSelector: { flexDirection: "row", marginBottom: 20 },
  roleButton: { padding: 10, marginHorizontal: 5, borderWidth: 1, borderRadius: 5 },
  active: { backgroundColor: "#E1F0FF" },
  input: { width: "100%", borderWidth: 1, padding: 10, marginBottom: 10 },
  loginButton: { backgroundColor: "#2A7FFF", padding: 15, borderRadius: 5, width: "100%", alignItems: "center" },
});
