import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function CadastroScreen({ navigation }) {
   const [email, setEmail] = useState("");
   const [senha, setSenha] = useState("");
   const [erro, setErro] = useState("");
  
    const cadastrar = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, senha);
            navigation.navigate("Login");
        } catch (error){
            setErro("Erro ao cadastrar: " + error);
        }
    }

   return (
       <View style={styles.container}>
           <Text style={styles.title}>Cadastro</Text>
           <TextInput
               placeholder="Email"
               value={email}
               onChangeText={setEmail}
               autoCapitalize="none"
               style={styles.input}
           />

           <TextInput
               placeholder="Senha"
               value={senha}
               onChangeText={setSenha}
               secureTextEntry
               style={styles.input}
           />

           {erro ? <Text style={styles.error}>{erro}</Text> : null}

           <Button title="Cadastrar" onPress={cadastrar} />
           <Button title="Voltar ao Login" onPress={() => navigation.goBack()} />
       </View>
   );
}
const styles = StyleSheet.create({
   container: {
       flex: 1,
       justifyContent: "center",
       padding: 20
   },
   title: {
       fontSize: 24,
       marginBottom: 20,
       textAlign: "center"
   },
   input: {
       borderWidth: 1,
       padding: 10,
       marginBottom: 10,
       borderRadius: 5,
   },
   error: {
       color: "red",
       marginBottom: 10
   },
});