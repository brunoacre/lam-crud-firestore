import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    FlatList
} from 'react-native';
import { db, auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function App() {

    const [lista, setLista] = useState<any[]>([]);
    const [tarefa, setTarefa] = useState("");

    useEffect(() => {
        const consulta = onSnapshot(
            collection(db, "mensagens"), (snapshot) => {
                const listaAux: any[] = [];
                snapshot.forEach((doc) => {
                    listaAux.push({ id: doc.id, ...doc.data() })
                })
                setLista(listaAux);
            })
        return () => consulta();
    }, []);

    const adicionarTarefa = async () => {
        if (tarefa.trim() === "") {
            return;
        }
        try {
            await addDoc(collection(db, "mensagens"), {
                texto: tarefa,
                datat: new Date().toISOString(),
            });
            console.log("Documento inserido!");
            setTarefa("");
        } catch (error) {
            console.log(error);
        }
    }

    const atualizarTarefa = async (id: string) => {
        try {
            const docReferencia = doc(db, "mensagens", id);
            await updateDoc(docReferencia, {
                texto: "TAREFA ATUALIZADA!!!"
            });
        } catch (error) {
            console.log("ERRO UPDATE", error);
        }
    }

    const deletarTarefa = async (id: string) => {
        await deleteDoc(doc(db, "mensagens", id));
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{
                fontSize: 20,
                marginTop: 50,
                marginBottom: 20
            }}
            >
                CRUD de Tarefas ✅
            </Text>

            <TextInput placeholder='Digite a tarefa'
                value={tarefa}
                onChangeText={setTarefa}
                style={{
                    borderWidth: 2,
                    padding: 5,
                    borderRadius: 5,
                    marginBottom: 10
                }}
            />
            <Button
                title='Adicionar Tarefa'
                onPress={adicionarTarefa}
            />
            <FlatList
                data={lista}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{
                        padding: 10,
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                    >
                        <Text>{item.texto}</Text>
                        <Button
                            title="Editar"
                            onPress={() => atualizarTarefa(item.id)}
                        />
                        <Button
                            title="Delete"
                            onPress={() => deletarTarefa(item.id)}
                        />
                    </View>
                )}
            />
            <Button
                title="Sair"
                onPress={() => signOut(auth)}
            
            />
        </View>
    );

}

