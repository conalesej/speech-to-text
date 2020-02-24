import React, { Component } from 'react';
import '../CSS/Main.css';
import GeneratePDF from './PDFExport';
import { withFirebase } from '../../firebase/context';
class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notesArray: [],
			transcriptArray: [],
			currentNotes: '',
			isSpeaking: false,
			isEditingNotes: false
		};
	}

	componentDidMount() {
		console.log(this.props.firebase.notes);

		const db = this.props.firebase.notes();
		db.onSnapshot((snapshot) => {
			snapshot.docs.forEach((doc) => {
				this.setState({
					notesArray: this.state.notesArray.concat({ ...doc.data(), id: doc.id })
				});
			});
		});
	}

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

	addCurrentNotesToNotesArray = () => {
		const db = this.props.firebase.notes();
		console.log(this.state.notesArray);
	};
	render() {
		var {
			transcript,
			resetTranscript,
			browserSupportsSpeechRecognition,
			startListening,
			stopListening,
			listening,
			recognition
		} = this.props;

		var editButton = this.state.isEditingNotes ? (
			<button
				className="btn btn-outline-success"
				onClick={() => {
					this.setState({
						isEditingNotes: false
					});
				}}
			>
				Save
			</button>
		) : (
			<button
				className="btn btn-outline-warning"
				onClick={() =>
					this.setState({
						isEditingNotes: true
					})}
			>
				Edit
			</button>
		);

		var notesTextArea = this.state.isEditingNotes ? (
			<textarea
				className="form-control"
				name="message"
				value={this.state.currentNotes}
				onChange={(e) => {
					var value = e.target.value;
					this.setState(
						{
							currentNotes: value,
							transcriptArray: []
						},
						() => {
							this.setState({
								transcriptArray: this.state.transcriptArray.concat(value)
							});
						}
					);
				}}
			/>
		) : (
			<textarea className="form-control" name="message" disabled value={this.state.currentNotes} />
		);

		var exportPDFButton = (
			<button
				className="btn btn-outline-dark m-2"
				onClick={() => GeneratePDF(this.state.currentNotes)}
				style={{ height: '4%', width: '4%', marginBottom: '3px', marginTop: '3px' }}
			>
				<img src="https://www.shieldui.com/sites/default/files/blogs/pdf-icon.png" alt="my image" />
			</button>
		);

		var NotesBox = this.state.notesArray.map((notes) => {
			return (
				<div>
					Hello
					{notes.id}
					<button onClick={() => console.log(notes)}>View Me</button>
				</div>
			);
		});

		return (
			<div>
				{NotesBox}
				<h1>Web Speech API</h1>

				{!this.state.isSpeaking ? (
					<button
						className="btn btn-primary m-2"
						onClick={() => {
							startListening();
							this.setState({
								isSpeaking: true
							});
						}}
					>
						Start Listening 🎙️
					</button>
				) : (
					<button
						className="btn btn-danger m-2"
						onClick={() => {
							stopListening();

							this.setState({
								isSpeaking: false
							});
						}}
					>
						Stop Listening ||
					</button>
				)}

				<button
					className="btn btn-outline-success m-2"
					onClick={() => {
						this.addTranscriptToArray(transcript);
						resetTranscript();
					}}
				>
					✓
				</button>
				{listening ? <span className="text-muted">Recording...</span> : null}

				<textarea type="text" className="form-control" placeholder="Voice to text..." value={transcript} />
				{exportPDFButton}
				{editButton}
				<button onClick={() => this.addCurrentNotesToNotesArray()}>Print Notes Array</button>
				{notesTextArea}
			</div>
		);
	}
}

export default withFirebase(Main);
