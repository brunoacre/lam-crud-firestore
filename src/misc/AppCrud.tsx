import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, FlatList } from "react-native";
import { db } from "./firebaseConfig";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc,} from "firebase/firestore";

export default function App() {
  const [mensagens, setMensagens] = useState<any[]>([]);
  const [novoTexto, setNovoTexto] = useState("");

  // Leitura em tempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "mensagens"), (snapshot) => {
      const lista: any[] = [];
      snapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setMensagens(lista);
    });

    return () => unsubscribe();
  }, []);

  // Criar mensagem
  const adicionarMensagem = async () => {
    if (novoTexto.trim() === "") return;
    await addDoc(collection(db, "mensagens"), {
      texto: novoTexto,
      data: new Date().toISOString(),
    });
    setNovoTexto("");
  };

  // Atualizar mensagem
  const atualizarMensagem = async (id: string) => {
    const docRef = doc(db, "mensagens", id);
    await updateDoc(docRef, { texto: "Atualizado!" });
  };

  // Deletar mensagem
  const deletarMensagem = async (id: string) => {
    const docRef = doc(db, "mensagens", id);
    await deleteDoc(docRef);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, marginTop: 30 }}>
        App de Tarefas 📝  📘 
      </Text>

      <TextInput
        placeholder="Digite uma mensagem"
        value={novoTexto}
        onChangeText={setNovoTexto}
        style={{
          borderWidth: 1,
          padding: 8,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />
      <Button title="Adicionar" onPress={adicionarMensagem} />

      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>{item.texto}</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Button title="✏️" onPress={() => atualizarMensagem(item.id)} />
              <Button title="🗑️" onPress={() => deletarMensagem(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}
