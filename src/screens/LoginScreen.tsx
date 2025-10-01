import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { auth } from '../../firebaseConfig'

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const login = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, senha);
        }catch(error){
            setErro("Erro no login:" + error);
        }
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            padding: 20
        }}>
            <Text style={{
                fontSize: 20,
                marginBottom: 30,
                textAlign: 'center'
            }}>
                Login
            </Text>

            <TextInput
                placeholder='Email...'
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                style={{
                    borderWidth: 1,
                    marginBottom: 10,
                    borderRadius: 5,
                }}
            />
            <TextInput
                placeholder='Senha...'
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                style={{
                    borderWidth: 1,
                    marginBottom: 10,
                    borderRadius: 5,
                }}
            />

            {erro ? <Text style={{color: 'red'}}>
                    {erro}
                </Text> : null }

            <Button title="ENTRAR" onPress={login} />
            <Button title='Cadastrar Usuário'
                onPress={() =>
                    navigation.navigate("Cadastro")}
            />

        </View>
    );
}