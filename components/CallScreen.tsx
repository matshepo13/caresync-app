import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import WebRTCService from '../services/WebRTCService';

interface CallScreenProps {
  userId: string;
  otherUserId: string;
  isIncoming: boolean;
}

const CallScreen: React.FC<CallScreenProps> = ({ userId, otherUserId, isIncoming }) => {
  const [webRTCService, setWebRTCService] = useState<WebRTCService | null>(null);
  const [callStatus, setCallStatus] = useState<'initiating' | 'ongoing' | 'ended'>('initiating');

  useEffect(() => {
    const service = new WebRTCService(userId);
    setWebRTCService(service);

    if (!isIncoming) {
      service.initiateCall(otherUserId);
    }

    return () => {
      // Clean up WebRTC connection
    };
  }, []);

  const handleAnswerCall = () => {
    // Logic to answer the call
    setCallStatus('ongoing');
  };

  const handleEndCall = () => {
    // Logic to end the call
    setCallStatus('ended');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        {isIncoming ? 'Incoming call...' : `Calling ${otherUserId}...`}
      </Text>
      {isIncoming && callStatus === 'initiating' && (
        <TouchableOpacity style={styles.button} onPress={handleAnswerCall}>
          <Text style={styles.buttonText}>Answer</Text>
        </TouchableOpacity>
      )}
      {callStatus !== 'ended' && (
        <TouchableOpacity style={[styles.button, styles.endButton]} onPress={handleEndCall}>
          <Text style={styles.buttonText}>End Call</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  statusText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  endButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CallScreen;