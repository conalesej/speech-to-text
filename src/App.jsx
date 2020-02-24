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
				<script
					src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
					integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
					crossorigin="anonymous"
				/>
				<script
					src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"
					integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh"
					crossorigin="anonymous"
				/>
				<script
					src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"
					integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ"
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
