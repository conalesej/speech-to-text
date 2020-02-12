import React, { Component } from 'react';
import jsPDF from 'jspdf';

function GeneratePDF(transcript) {
	var today = new Date();
	var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
	var dateTime = date + ' ' + time;

	var doc = new jsPDF('p', 'mm');
	var splitTitle = doc.splitTextToSize(transcript, 180);
	doc.text(15, 20, dateTime);
	doc.text(15, 40, splitTitle);
	// doc.addPage();
	// doc.text(20, 20, 'TEST Page 2!');
	doc.save(dateTime + '.pdf');
}

export default GeneratePDF;
