import React, { Component } from 'react';
import '../CSS/TestMain.css';
import GeneratePDF from './PDFExport';
import { withFirebase } from '../../firebase/context';
class TestMain extends Component {
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

		var editButton = this.state.isEditingNotes ? (
			<button
				className="btn btn-outline-success"
				onClick={() =>
					this.setState({
						isEditingNotes: false
					})}
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
							<div class="inbox_notes">
								<div class="headind_srch">
									<h4>Doctor Notes Transcriber</h4>
									<hr />
									<div class="recent_heading">
										<h4>
											Recent <p className="text-muted">Notes</p>
										</h4>
									</div>
									<div class="srch_bar">
										<div class="stylish-input-group">
											<img
												src="https://i.imgur.com/1loYhAT.png"
												style={{ height: '30%', width: '30%' }}
											/>
											<span class="input-group-addon" />{' '}
										</div>
									</div>
								</div>
								<div class="inbox_chat">
									<div class="chat_list active_chat">
										<div class="chat_people">
											<div class="chat_img">
												{' '}
												<img
													src="https://i.pinimg.com/originals/64/34/d7/6434d72ce9e16251c4f41f4e5a146567.png"
													alt="sunil"
												/>{' '}
											</div>
											<div class="chat_ib">
												<h5>
													Test User <span class="chat_date">Dec 25</span>
												</h5>
												<p>
													Test, which is a new approach to have all solutions astrology under
													one roof.
												</p>
											</div>
										</div>
									</div>
									<div class="chat_list">
										<div class="chat_people">
											<div class="chat_img">
												{' '}
												<img
													src="https://cdn.dribbble.com/users/1050535/screenshots/5466232/doc-icon_2x.png"
													alt="sunil"
												/>{' '}
											</div>
											<div class="chat_ib">
												<h5>
													Test User <span class="chat_date">Dec 25</span>
												</h5>
												<p>
													Test, which is a new approach to have all solutions astrology under
													one roof.
												</p>
											</div>
										</div>
									</div>
									<div class="chat_list">
										<div class="chat_people">
											<div class="chat_img">
												{' '}
												<img
													src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeYPnCXIXP8ZOPk91l2K3ExXoUhIN1s5i3cnYTp6TpwZSWid7Q&s"
													alt="sunil"
												/>{' '}
											</div>
											<div class="chat_ib">
												<h5>
													Test User <span class="chat_date">Dec 25</span>
												</h5>
												<p>
													Test, which is a new approach to have all solutions astrology under
													one roof.
												</p>
											</div>
										</div>
									</div>
									<div class="chat_list">
										<div class="chat_people">
											<div class="chat_img">
												{' '}
												<img
													src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeYPnCXIXP8ZOPk91l2K3ExXoUhIN1s5i3cnYTp6TpwZSWid7Q&s"
													alt="sunil"
												/>{' '}
											</div>
											<div class="chat_ib">
												<h5>
													Test User <span class="chat_date">Dec 25</span>
												</h5>
												<p>
													Test, which is a new approach to have all solutions astrology under
													one roof.
												</p>
											</div>
										</div>
									</div>
									<div class="chat_list">
										<div class="chat_people">
											<div class="chat_img">
												{' '}
												<img
													src="https://image.flaticon.com/icons/png/512/1869/1869354.png"
													alt="sunil"
												/>{' '}
											</div>
											<div class="chat_ib">
												<h5>
													Test User <span class="chat_date">Dec 25</span>
												</h5>
												<p>
													Test, which is a new approach to have all solutions astrology under
													one roof.
												</p>
											</div>
										</div>
									</div>
									<div class="chat_list">
										<div class="chat_people">
											<div class="chat_img">
												{' '}
												<img
													src="https://ptetutorials.com/images/user-profile.png"
													alt="sunil"
												/>{' '}
											</div>
											<div class="chat_ib">
												<h5>
													Test User <span class="chat_date">Dec 25</span>
												</h5>
												<p>
													Test, which is a new approach to have all solutions astrology under
													one roof.
												</p>
											</div>
										</div>
									</div>
									<div class="chat_list">
										<div class="chat_people">
											<div class="chat_img">
												{' '}
												<img
													src="https://ptetutorials.com/images/user-profile.png"
													alt="sunil"
												/>{' '}
											</div>
											<div class="chat_ib">
												<h5>
													Test User <span class="chat_date">Dec 25</span>
												</h5>
												<p>
													Test, which is a new approach to have all solutions astrology under
													one roof.
												</p>
											</div>
										</div>
									</div>
								</div>
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
