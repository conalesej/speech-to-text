import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBPANkth4IhkvOM_ACTy1n4AUxkN3Tq4hw',
	authDomain: 'web-speech-api-a7549.firebaseapp.com',
	databaseURL: 'https://web-speech-api-a7549.firebaseio.com',
	projectId: 'web-speech-api-a7549',
	storageBucket: 'web-speech-api-a7549.appspot.com',
	messagingSenderId: '42175960066',
	appId: '1:42175960066:web:5b2ae13dcd1b59b8c0c31b',
	measurementId: 'G-L5Y6F7TXJC'
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
	// == Counter Document == //
	counter = () => this.db.collection('counter');
}

export default Firebase;
