import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, FlatList }
    from "react-native";
import { db } from './firebaseConfig';

export default function App() {
    const [novoTexto, setNovoTexto] = useState("");
    const [mensagens, setMensagens] = useState<any[]>([]);

    useEffect(() => {
        const consulta = onSnapshot(
                collection(db, "mensagens"), 
                (snapshot) => {
                    const lista: any[] = [];
                    snapshot.forEach((doc) => {
                        lista.push({id: doc.id, ...doc.data() })
                    });
                    setMensagens(lista);
        });
        return () => consulta();
    }, []);

    const adicionarTarefa = async () => {
        if(novoTexto.trim() === ""){
            return;
        }
        await addDoc(collection(db, "mensagens"), {
            texto: novoTexto,
            data: new Date().toISOString(),
        });
        setNovoTexto("");
    }

    const atualizarTarefa = async (id: string) => {
        const docReferencia = doc(db, "mensagens", id);
        await updateDoc(docReferencia, {
            texto: "TAREFA ATUALIZADA!"
        });
    }

    const deletarTarefa = async (id: string) => {
        const docReferencia = doc(db, "mensagens", id);
        await deleteDoc(docReferencia);
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{
                fontSize: 22,
                marginTop: 50,
                marginBottom: 20
            }}
            >
                CRUD Tarefas ✅
            </Text>
            <TextInput
                placeholder='Digite a tarefa...'
                value={novoTexto}
                onChangeText={setNovoTexto}
                style={{
                    borderWidth: 1,
                    padding: 5,
                    marginBottom: 10,
                    borderRadius: 5,
                }}
            />
            <Button
                title='Adicionar Tarefa'
                onPress={adicionarTarefa}
            />
            <FlatList
                data={mensagens}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                        style={{
                            padding: 8,
                            borderEndWidth: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Text>{item.texto}</Text>
                        <Button
                            title='Edit'
                            onPress={() => atualizarTarefa(item.id)}
                        />
                        <Button
                            title='Delete'
                            onPress={() => deletarTarefa(item.id) }
                        />
                    </View>
                )}
            />
        </View>
    )
}