import { Component, OnInit } from '@angular/core';
import { JiraTimeTableService } from "../../services/jira.time.table.component.service";

import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import {Issue} from '../../models/Issue';
import {Project} from '../../models/Project';
import { AppHomeService } from '../../services/app-home.service';

@Component({
	selector: 'jira-time',
	templateUrl: 'app/components/jira-time-table/jira.time.table.component.html',
	styleUrls: ['app/components/jira-time-table/jira.time.table.component.css'],
	providers: [JiraTimeTableService]
})

export class JiraTimeTableComponent implements OnInit {
	public buildNumber = "null";
	public values: any[];
	public isProject: boolean;
	data: any;
	options: any;
	words = [];
	word = '';
	public issue: Issue;
	public project : Project;
	ngOnInit() {

	}
	constructor(public jiraTimeTableSevice: JiraTimeTableService) {
	}

	tokenizer(sentence) {
		var array = sentence.split(' ');
		console.log("sentence into words" + array)
		return array;
	}
	/**
	 * Convert from a word to pig altin format.
	 * @param form 
	 */
	convert(sentence, check) {
		console.log("print something")
		this.isProject = check;
		this.jiraTimeTableSevice.getWorkLogs(sentence).subscribe((data: any) => this.issue = data);
		//  this.jiraTimeTableSevice.getIssue('POAT-8').then(function(value){console.log(value)});//data => this.issue= data
		// });
		 console.log("this "+this.issue);
		//  console.log("print something"+this.jiraTimeTableSevice.getAllWorkLogs());
		// var outSentence="";
		// for (let token of this.tokenizer(sentence)) {
		// 	outSentence = outSentence+this.translate(token);
		// 	console.log('token :: '+ outSentence);
		// }
		// console.log('outSentence :: '+ outSentence);
		// if (this.words.length > 10) {
		// 	console.log('this is '+this.words.indexOf(this.words));
		// 	this.words.splice(this.words.indexOf(this.words), 1);
		// }

		// this.words.push(outSentence);
		// this.word() = null;
	}
	retrieveAllJira(projectkey, check){
		this.isProject = check;
		this.jiraTimeTableSevice.getAllWorkLogs(projectkey).subscribe((data: any) => this.project = data);
		console.log("this "+this.project);
		
		// console.log("this "+this.project.issue);
	}


	/**
	 *  check if its in Array of values
	 * @param vowels 
	 * @param letter 
	 */

	isInArray(vowels, letter) {

		return vowels.indexOf(letter.toLowerCase()) > -1;
	}
	/**
	 * 
	 * @param word Translate from a word to piglatin format
	 */
	translate(word) {
		console.log('in Translate)');
		var array = word.split('');
		var vowels = ['a', 'e', 'i', 'o', 'u'];
		var newWord = '';
		var suffix = "ay ";
		if (this.isInArray(vowels, word.charAt(0))) {
			suffix = "i ";
		}
		console.log(word.substr(1) + word.charAt(0) + suffix);
		return word.substr(1) + word.charAt(0) + suffix;
	}

}
