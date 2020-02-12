import React, { Component } from 'react';
import SpeechRecognition from 'react-speech-recognition';
import Main from './components/views/Main';
import TestMain from './components/views/TestMain';
import { withFirebase } from './firebase/context';
class Dictaphone extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// transcriptMessage: []
		};
	}
	render() {
		const {
			transcript,
			resetTranscript,
			browserSupportsSpeechRecognition,
			startListening,
			stopListening,
			listening,
			recognition
		} = this.props;
		// console.log(this.props);

		if (!browserSupportsSpeechRecognition) {
			return null;
		}

		return (
			<div>
				<link
					href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
					rel="stylesheet"
				/>
				<link
					rel="stylesheet"
					href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
					integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
					crossorigin="anonymous"
				/>
				<TestMain
					transcript={transcript}
					resetTranscript={resetTranscript}
					browserSupportsSpeechRecognition={browserSupportsSpeechRecognition}
					startListening={startListening}
					stopListening={stopListening}
					listening={listening}
					recognition={recognition}
				/>
				{/* <Main
					transcript={transcript}
					resetTranscript={resetTranscript}
					browserSupportsSpeechRecognition={browserSupportsSpeechRecognition}
					startListening={startListening}
					stopListening={stopListening}
					listening={listening}
					recognition={recognition}
				/> */}
			</div>
		);
	}
}
const options = {
	autoStart: false
};
export default withFirebase(SpeechRecognition(options)(Dictaphone));
