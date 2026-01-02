import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MediAi = ({ route }) => {
  // 👉 Doktor: true | Hasta: undefined → false
  const showHeader = route?.params?.showHeader ?? false;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  /* Sayfa açılınca AI ilk mesaj */
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: 'Merhaba 👋 Ben MediAI. Sana nasıl yardımcı olabilirim?',
        fromUser: false,
      },
    ]);
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: input,
        fromUser: true,
      },
      {
        id: (Date.now() + 1).toString(),
        text: 'Anladım 😊 Biraz daha detay verebilir misin?',
        fromUser: false,
      },
    ]);

    setInput('');
  };

  const renderItem = ({ item }) =>
    item.fromUser ? (
      <View style={styles.userRow}>
        <View style={styles.userBubble}>
          <Text style={styles.userText}>{item.text}</Text>
        </View>
      </View>
    ) : (
      <View style={styles.aiRow}>
        <Image
          source={require('../../assets/icons8-robot-50.png')}
          style={styles.robotImage}
        />
        <View style={styles.aiBubble}>
          <Text style={styles.aiText}>{item.text}</Text>
        </View>
      </View>
    );

  return (
    <SafeAreaView style={styles.safe}>
      {/* 🔵 HEADER – sadece doktor tarafında */}
      {showHeader && (
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/medilogo.png')}
              style={styles.headerLogo}
            />
            <Text style={styles.headerTitle}>MediAI</Text>
          </View>

        
        </View>
      )}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* 💬 CHAT */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.chatContainer}
          showsVerticalScrollIndicator={false}
        />

        {/* ✍️ MESAJ GİRİŞ */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="MediAI'ye bir şey sor..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MediAi;

/* 🎨 STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },

  /* HEADER */
  header: {
    backgroundColor: '#1483C7',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  headerLogo: {
    width: 44,
    height: 44,
    borderRadius: 20,
    backgroundColor: '#fff',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },

  /* CHAT */
  chatContainer: {
    padding: 16,
    paddingBottom: 10,
  },

  /* 👤 USER */
  userRow: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },

  userBubble: {
    backgroundColor: '#2C4CCF',
    padding: 12,
    borderRadius: 18,
    maxWidth: '75%',
    borderTopRightRadius: 4,
  },

  userText: {
    color: '#fff',
    fontWeight: '600',
  },

  /* 🤖 AI */
  aiRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  robotImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 8,
    marginTop: 4,
  },

  aiBubble: {
    backgroundColor: '#E8EEF6',
    padding: 12,
    borderRadius: 18,
    maxWidth: '75%',
    borderTopLeftRadius: 4,
  },

  aiText: {
    color: '#1F2937',
    fontWeight: '500',
  },

  /* ✍️ INPUT */
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 14,
  },

  sendBtn: {
    backgroundColor: '#2C4CCF',
    borderRadius: 20,
    padding: 12,
  },
});
