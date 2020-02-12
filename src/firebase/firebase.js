import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBNVe5Xpf1KDwMygz19NJEl544vzTnNepg',
	authDomain: 'notes-transcriber-app.firebaseapp.com',
	databaseURL: 'https://notes-transcriber-app.firebaseio.com',
	projectId: 'notes-transcriber-app',
	storageBucket: 'notes-transcriber-app.appspot.com',
	messagingSenderId: '667616803386',
	appId: '1:667616803386:web:d67541751444bbf1669303',
	measurementId: 'G-B75TF2JJGJ'
};

class Firebase {
	constructor() {
		console.log('Firebase initialized');
		app.initializeApp(firebaseConfig);

		this.auth = app.auth();
		this.db = app.firestore();

		const settings = {
			//Default in future release so no need to declare
			//timestampsInSnapshots: true
		};

		this.db.settings(settings);
	}

	// ============================================================================
	// == Firebase Authentication API
	// ============================================================================
	doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

	doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

	doSignOut = () => this.auth.signOut();

	// ============================================================================
	// == Firestore API
	// ============================================================================

	// == Users Document == //
	// users = () => this.db.collection('users');
	// this.db.collection('users'); this.props.firebase.users().doc()
	// == Patients Document == //

	// == Notes Document == //
	notes = () => this.db.collection('notes');
}

export default Firebase;
