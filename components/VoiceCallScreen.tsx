// import React, { useState, useEffect } from 'react';
// import { View, Button, Text, StyleSheet } from 'react-native';
// import { Audio } from 'expo-av';
// import AgoraRTC from 'agora-rtc-sdk';

// const appId = 'e7f6e9aeecf14b2ba10e3f40be9f56e7';
// const channelName = 'your-channel-name';

// const VoiceCallScreen = () => {
//   const [isJoined, setIsJoined] = useState(false);
//   const [client, setClient] = useState<any>(null);

//   useEffect(() => {
//     // Initialize Agora client
//     const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
//     setClient(agoraClient);

//     // Request audio permissions
//     Audio.requestPermissionsAsync();

//     return () => {
//       if (client) {
//         client.leave();
//       }
//     };
//   }, []);

//   const joinChannel = async () => {
//     if (!client) return;

//     try {
//       await client.join(appId, channelName, null, null);
//       setIsJoined(true);
//       // Create a local audio track
//       const localAudioTrack = await client.createMicrophoneAudioTrack();
//       await client.publish([localAudioTrack]);

//       console.log('Joined channel successfully');
//     } catch (error) {
//       console.error('Error joining channel:', error);
//     }
//   };

//   const leaveChannel = async () => {
//     if (!client) return;

//     await client.leave();
//     setIsJoined(false);
//     console.log('Left channel successfully');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Voice Call</Text>
//       {!isJoined ? (
//         <Button title="Join Call" onPress={joinChannel} />
//       ) : (
//         <Button title="Leave Call" onPress={leaveChannel} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
// });

// export default VoiceCallScreen;