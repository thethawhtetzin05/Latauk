import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<{ role: string, text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!inputText) return;

    const newMessages = [...messages, { role: 'user', text: inputText }];
    setMessages(newMessages);
    setInputText('');
    setLoading(true);

    try {
      // Backend URL (Cloudflare Worker URL ထည့်ရန်)
      const response = await fetch('https://your-worker-url.workers.dev/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, projectId: 'default', instructions: '' }),
      });
      const data = await response.json();
      
      setMessages([...newMessages, { role: 'zin-lay', text: data.result }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'zin-lay', text: 'အမှားတစ်ခု ဖြစ်သွားပါပြီ ဆရာ။' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Zin Lay (Master Agent)</Text>
        <Text style={styles.headerSub}>ဆရာ့ရဲ့ အနီးကပ်လက်ထောက် 💻</Text>
      </View>

      <ScrollView style={styles.chatArea}>
        {messages.map((msg, index) => (
          <View key={index} style={[styles.bubble, msg.role === 'user' ? styles.userBubble : styles.zinLayBubble]}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
        {loading && <ActivityIndicator color="#0000ff" />}
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput 
          style={styles.input}
          placeholder="မောင်ပြန်ကို ဘာခိုင်းချင်လဲ ဆရာ..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onClick={handleSend}>
          <Text style={styles.sendButtonText}>ပို့မည်</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcfcfc' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', fontFamily: 'Myanmar Text' },
  headerSub: { fontSize: 12, color: '#888', fontFamily: 'Myanmar Text' },
  chatArea: { flex: 1, padding: 15 },
  bubble: { padding: 12, borderRadius: 15, marginBottom: 10, maxWidth: '80%' },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#007AFF' },
  zinLayBubble: { alignSelf: 'flex-start', backgroundColor: '#E9E9EB' },
  messageText: { color: '#000', fontSize: 16, fontFamily: 'Myanmar Text' },
  inputArea: { flexDirection: 'row', padding: 15, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#fff' },
  input: { flex: 1, borderPadding: 10, backgroundColor: '#f9f9f9', borderRadius: 20, paddingHorizontal: 15, fontFamily: 'Myanmar Text' },
  sendButton: { marginLeft: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', borderRadius: 20, paddingHorizontal: 20 },
  sendButtonText: { color: '#fff', fontWeight: 'bold', fontFamily: 'Myanmar Text' }
});
