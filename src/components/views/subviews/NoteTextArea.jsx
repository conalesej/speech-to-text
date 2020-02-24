import React, { Component } from 'react';

class NoteTextArea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transcriptArray: [],
			currentNotesIndex: 0,
			currentNotes: ''
		};
	}
	render() {
		addTranscriptToArray = (transcript) => {
			this.setState(
				{
					transcriptArray: transcript
						? this.state.transcriptArray.concat(
								transcript.charAt(0).toUpperCase() + transcript.substring(1) + '. '
							)
						: this.state.transcriptArray
				},
				() => {
					if (transcript) {
						this.joinTranscriptArrayToCurrentNotes();
					}
				}
			);
		};

		joinTranscriptArrayToCurrentNotes = () => {
			if (!this.state.currentNotes) {
				console.log('Empty');
			}
			// var joined = this.state.currentNotes.concat(this.state.transcriptArray.map((i) => i).join(''));
			this.setState({
				// this.state.currentNotes.length === 0
				currentNotes: this.state.transcriptArray.map((i) => i).join('')
			});
		};
		return <div />;
	}
}

export default NoteTextArea;
