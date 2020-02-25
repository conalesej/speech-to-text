import React, { Component } from 'react';
import '../CSS/TestMain.css';
import GeneratePDF from './PDFExport';
import { withFirebase } from '../../firebase/context';
var x = Math.floor(Math.random() * 99999 + 1);
class TestMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notesArray: [],
			transcriptArray: [],
			currentNotesId: x.toString(),
			currentNotes: ' ',
			isSpeaking: false,
			isEditingNotes: true
		};
	}

	componentDidMount() {
		this.getAllNotesFromDb();
	}

	saveNotesToDb() {
		var today = new Date();
		var date = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
		var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
		var dateTime = date + ' ' + time;

		const db = this.props.firebase.notes();
		db.doc(this.state.currentNotesId).set({
			currentNotes: this.state.currentNotes,
			dateTime
		});
	}

	addNotesToDb() {
		var today = new Date();
		var date = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
		var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
		var dateTime = date + ' ' + time;
		var x = Math.floor(Math.random() * 99999 + 1);
		// var notesLength = this.state.notesArray.length;
		const db = this.props.firebase.notes();
		db.doc(x.toString()).set({
			currentNotes: ' ',
			dateTime
		});
	}

	deleteNotesFromDb() {
		const db = this.props.firebase.notes();
		db.doc(this.state.currentNotesId).delete();
	}

	getAllNotesFromDb() {
		const db = this.props.firebase.notes();

		db.onSnapshot((snapshot) => {
			const data = snapshot.docs.map((doc) => {
				var notesData = doc.data();
				var id = doc.id;
				return { ...notesData, id };
			});
			this.setState({
				notesArray: data
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

		var deleteNotesButton = (
			<button className="btn btn-outline-danger" onClick={() => this.deleteNotesFromDb()}>
				Delete
			</button>
		);

		var editButton = this.state.isEditingNotes ? (
			<button
				className="btn btn-outline-success"
				onClick={() => {
					this.saveNotesToDb();
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
				className="form-control notes-shadow "
				name="message"
				rows="15"
				cols="50"
				style={{ backgroundColor: 'white' }}
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
			<textarea
				className="form-control notes-shadow "
				name="message"
				rows="15"
				cols="50"
				style={{ backgroundColor: 'whitesmoke' }}
				disabled
				value={this.state.currentNotes}
			/>
		);

		var exportPDFButton = (
			<button
				className="btn btn-outline-dark m-2"
				onClick={() => GeneratePDF(this.state.currentNotes)}
				style={{ height: '8%', width: '8%', marginBottom: '3px', marginTop: '3px' }}
			>
				<img src="https://www.shieldui.com/sites/default/files/blogs/pdf-icon.png" alt="my image" />
			</button>
		);

		var addNotesButton = (
			<button className="btn btn-info" onClick={() => this.addNotesToDb()}>
				+
			</button>
		);

		var NotesBox = this.state.notesArray.map((notes) => {
			var activeNotes = notes.id === this.state.currentNotesId ? 'notes_list active_notes' : 'notes_list';
			var deleteNotes = notes.id === this.state.currentNotesId ? deleteNotesButton : null;
			var notesDisplay =
				notes.currentNotes.length < 50 ? notes.currentNotes : notes.currentNotes.substring(0, 50) + '...';

			return (
				<div
					onClick={() => {
						this.setState(
							{
								currentNotesId: notes.id,
								currentNotes: notes.currentNotes,
								transcriptArray: []
							},
							() => {
								this.setState({
									transcriptArray: this.state.transcriptArray.concat(notes.currentNotes),
									isEditingNotes: true
								});
							}
						);
					}}
				>
					<div class={activeNotes}>
						<div class="notes_individual">
							<div class="notes_img">
								<img
									src="https://i.pinimg.com/originals/64/34/d7/6434d72ce9e16251c4f41f4e5a146567.png"
									alt="sunil"
								/>
							</div>
							<div class="notes_content">
								<h5>
									Test {notes.id} <span class="chat_date">{notes.dateTime}</span>
								</h5>
								<p>{notesDisplay}</p> {deleteNotes}
							</div>
						</div>
					</div>
				</div>
			);
		});

		return (
			<div>
				<link
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
					type="text/css"
					rel="stylesheet"
				/>
				<div class="container">
					<div class="app-container">
						<div class="notes-container">
							<div class="transcriber_notes">
								<div class="headind_srch">
									<h4>Doctor Notes Transcriber</h4>
									<hr />
									<div class="recent_heading">
										<h4>
											Recent <p className="text-muted">Notes</p>
										</h4>
									</div>

									<div class="side_logo">
										<div class="stylish-input-group">
											<img
												src="https://i.imgur.com/1loYhAT.png"
												style={{ height: '30%', width: '30%' }}
											/>
											<span class="input-group-addon" />{' '}
										</div>
									</div>
									<div>{addNotesButton}</div>
								</div>

								{NotesBox}
								<div class="notes_box" />
							</div>
							<div class="web-speech" style={{ backgroundColor: 'whitesmoke' }}>
								<h5>Take Notes </h5>

								<hr />
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
										this.setState({
											isEditingNotes: true
										});
									}}
								>
									✓
								</button>
								{listening ? <span className="text-muted">Recording...</span> : null}
								<textarea
									type="text"
									disabled
									className="form-control "
									placeholder="Sentence..."
									style={{ backgroundColor: 'white' }}
									value={transcript}
								/>
								{exportPDFButton}
								{editButton}
								<br />
								{notesTextArea}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withFirebase(TestMain);
