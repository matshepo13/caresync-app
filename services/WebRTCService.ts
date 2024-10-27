import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc';
import io from 'socket.io-client';

class WebRTCService {
  private socket: ReturnType<typeof io>;
  private peerConnection: RTCPeerConnection | null = null;
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
    this.socket = io('http://your-signaling-server-url:5000');
    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to signaling server');
      this.socket.emit('register', this.userId);
    });

    this.socket.on('incomingCall', async ({ from, offer }) => {
      console.log('Incoming call from:', from);
      await this.handleIncomingCall(from, offer);
    });

    this.socket.on('callAnswered', async ({ answer }) => {
      console.log('Call answered');
      await this.handleCallAnswered(answer);
    });

    this.socket.on('iceCandidate', ({ candidate }) => {
      console.log('Received ICE candidate');
      this.handleIceCandidate(candidate);
    });
  }

  private async setupPeerConnection() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    this.peerConnection.addEventListener('icecandidate', (event) => {
      if (event.candidate) {
        this.socket.emit('iceCandidate', {
          to: this.userId === 'patient' ? 'doctor' : 'patient',
          candidate: event.candidate
        });
      }
    });

    // Add more event listeners as needed (e.g., ontrack for handling remote streams)
  }

  public async initiateCall(to: string) {
    await this.setupPeerConnection();
    const offer = await this.peerConnection!.createOffer({});
    await this.peerConnection!.setLocalDescription(offer);
    this.socket.emit('call', { from: this.userId, to, offer });
  }

  private async handleIncomingCall(from: string, offer: RTCSessionDescription) {
    await this.setupPeerConnection();
    await this.peerConnection!.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.peerConnection!.createAnswer();
    await this.peerConnection!.setLocalDescription(answer);
    this.socket.emit('answerCall', { to: from, answer });
  }

  private async handleCallAnswered(answer: RTCSessionDescription) {
    await this.peerConnection!.setRemoteDescription(new RTCSessionDescription(answer));
  }

  private async handleIceCandidate(candidate: RTCIceCandidate) {
    await this.peerConnection!.addIceCandidate(new RTCIceCandidate(candidate));
  }
}

export default WebRTCService;
