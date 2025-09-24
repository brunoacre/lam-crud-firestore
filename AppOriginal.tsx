import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function App() {
 console.log("Firestore DB:", db);
 
 const [mensagens, setMensagens] = useState([]);

 useEffect(() => {
   const carregarDados = async () => {
     try {
       const querySnapshot = await getDocs(collection(db, "mensagens"));
       const lista = [];
       querySnapshot.forEach((doc) => {
         lista.push({ id: doc.id, ...doc.data() });
       });
       setMensagens(lista);
     } catch (error) {
       console.log("Erro ao conectar:", error);
     }
   };
   carregarDados();
 }, []);

 return (
   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 100, marginBottom: 50 }}>
       Firebase conectado!!!
     </Text>
     <FlatList
       data={mensagens}
       keyExtractor={(item) => item.id}
       renderItem={({ item }) => <Text>{item.texto}</Text>}
     />
   </View>
 );

}