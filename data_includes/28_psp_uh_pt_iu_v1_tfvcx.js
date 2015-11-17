
var answerHashTable = {};
answerHashTable["pitiputu"] = ["P  EE", "T  EE", "P  OO", "T  OO"];
answerHashTable["pititupu"] = ["P  EE", "T  EE", "T  OO", "P  OO"];
answerHashTable["tipitupu"] = ["T  EE", "P  EE", "T  OO", "P  OO"];
answerHashTable["tipiputu"] = ["T  EE", "P  EE", "P  OO", "T  OO"];
answerHashTable["putupiti"] = ["P  OO", "T  OO", "P  EE", "T  EE"];
answerHashTable["pututipi"] = ["P  OO", "T  OO", "T  EE", "P  EE"];
answerHashTable["tuputipi"] = ["T  OO", "P  OO", "T  EE", "P  EE"];
answerHashTable["tupupiti"] = ["T  OO", "P  OO", "P  EE", "T  EE"];


function getRandomSubarray(arrx, sizex) {
    var shuffled = arrx.slice(0), i = arrx.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, sizex);
}


var stimgrouplist = ["pitiputu", "pititupu", "tipitupu", "tipiputu", "putupiti", "pututipi", "tuputipi", "tupupiti"];
var stimgroup = getRandomSubarray(stimgrouplist, 1)[0];


define_ibex_controller({
	name: "Trial",
	jqueryWidget: {
		_init: function () {
			this.options.transfer = null; // Remove ’click to continue message’.
			this.options.hideProgressBar = true; 
			this.element.VBox({
				options: this.options,
				triggers: [1],
				children: [
					"Message", this.options,
					"QuestionFourBox", this.options,
				]
			});
		}
	},
	properties: { }
});


var defaults = [
    "AcceptabilityJudgment", { 
		presentAsScale: true, 
		hideProgressBar: true },
    "QuestionFourBox", { 
		as: answerHashTable[stimgroup], //
//		instructions: "Which sound?", 
		hasCorrect: false, 
		showNumbers: false,
		randomOrder: false, 
		presentAsScale: true, 
		timeout: 4350, 
		hideProgressBar: true },
    "Separator", { transfer: 500, normalMessage: "", errorMessage: "", hideProgressBar: true },
    "Message", { hideProgressBar: true },
    "Trial", { hideProgressBar: true},
    "Form", { hideProgressBar: true} //,

];


var shuffleSequence = seq(
	"intro", 
	//"conditionbutton",
	//"answerlist",
	"questionnaire",
	"headphones", 
	"soundcheck", 
	"instructions", 
	"instructionsSpeed", 
	"practiceIntro", 
	"practiceInstruct",
	
	"ready",
	"herewego",
	sepWith("ITI", precedeEachWith(seq("cross", "aftercross"), randomize( startsWith('pnt_')) )), 

	"practiceTimeout",
	
	"ready",
	"herewego",
	sepWith("ITI", precedeEachWith(seq("cross", "aftercross"), randomize( startsWith("pto_")) )), 
	"thatsitpractice",
	
	"noAnswer", 
	"ready",
	"herewego",

	sepWith("ITI", precedeEachWith(seq("cross", "aftercross"), randomize( startsWith('t_') )) ),
	sepWith("ITI", precedeEachWith(seq("cross", "aftercross"), randomize( startsWith('t_') )) ),
	"pause",
	sepWith("ITI", precedeEachWith(seq("cross", "aftercross"), randomize( startsWith('t_') )) ),
	sepWith("ITI", precedeEachWith(seq("cross", "aftercross"), randomize( startsWith('t_') )) ),
	"pause",
	sepWith("ITI", precedeEachWith(seq("cross", "aftercross"), randomize( startsWith('t_') )) ),
	sepWith("ITI", precedeEachWith(seq("cross", "aftercross"), randomize( startsWith('t_') )) ),

	"midbreak",

	sepWith("ITI", precedeEachWith(seq("cross", "aftercross"), randomize( startsWith('t_') )) ),
	sepWith("ITI", precedeEachWith(seq("cross", "aftercross"), randomize( startsWith('t_') )) ),
	"pause",
	sepWith("ITI", precedeEachWith(seq("cross", "aftercross"), randomize( startsWith('t_') )) ),
	sepWith("ITI", precedeEachWith(seq("cross", "aftercross"), randomize( startsWith('t_') )) ),
	"pause",
	sepWith("ITI", precedeEachWith(seq("cross", "aftercross"), randomize( startsWith('t_') )) ),
	sepWith("ITI", precedeEachWith(seq("cross", "aftercross"), randomize( startsWith('t_') )) ),

	"debrief",
	"exit2"
);




var items = [



["conditionbutton", "Separator", {transfer: "keypress", normalMessage: stimgroup, hideProgressBar: true, ignoreFailure: true}],
["answerlist", "Separator", {transfer: "keypress", normalMessage: answerHashTable[stimgroup].join(' : '), hideProgressBar: true, ignoreFailure: true}],


// Messages to subject

// Introduction to experiment - the very first screen the subject sees
["intro", "Form", {html: {include: "A_intro.html"}, checkedValue: stimgroup.concat( answerHashTable[stimgroup].join(',') ), saveReactionTime: true} ],


// A linguistic history questionnaire
["questionnaire", "Form", {html: {include: "B_questionnaire.html"}, saveReactionTime: true} ], 

["headphones", "Form", {html: {include: "C_headphones.html"}, saveReactionTime: true} ],

// Instructions
["soundcheck", "Message", {transfer: "click", html: {include: "D_soundcheck.html"} } ],
["instructions", "Message", {transfer: "keypress", html: {include: "E_instructions.html"} } ],
["instructionsSpeed", "Message", {transfer: "keypress", html: {include: "F_instructionsSpeed.html"} } ],

// Practice
["practiceIntro", "Message", {transfer: "keypress", html: {include: "G_practiceIntro.html"} } ],
["practiceInstruct", "Message", {transfer: "keypress", html: {include: "H_practiceInstruct.html"} } ],
["practiceTimeout", "Message", {transfer: "keypress", html: {include: "I_practiceTimeout.html"} } ],


// Tells subject that they are done with the practice items
["thatsitpractice", "Message", {transfer: "keypress", html: {include: "J_practiceDone.html"} } ],
["noAnswer", "Message", {transfer: "keypress", html: {include: "K_noAnswer.html"} } ],
["ready", "Message", {transfer: "keypress", html: {include: "_ready.html"} } ],
["herewego", "Message", {transfer: 600, html: {include: "_go.html"} } ],

["pause", "Message", {transfer: "keypress", html: {include: "_pause.html"} } ],
["midbreak", "Message", {transfer: "keypress", html: {include: "_break.html"} } ],


// debriefing
["debrief", "Form", {html: {include: "Y_debrief.html"},
                  saveReactionTime: true
                 } ], 


// Creates unique ID to paste into AMT recruitment page
["exit2", "Form", {html: { include: "Z_exit2.html" },
                   requiresConsent: true,
				   continueMessage: "Press here to conclude the experiment.",
                   saveReactionTime: true
			      } ],

["aftercross", "Separator", {transfer: 210, normalMessage: "", hideProgressBar: true, ignoreFailure: true}],
["ITI", "Separator", {transfer: 700, normalMessage: "", hideProgressBar: true, ignoreFailure: true}],
["cross", "Separator", {transfer: 475, normalMessage: "+", hideProgressBar: true, ignoreFailure: true}],


// Begin experimental items

// practice trials
// no timeout

['pnt_b_1', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_iu_01_pt_01.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_iu_01_pt_01.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', q: "&nbsp;&nbsp;&nbsp;&nbsp;click on the sound", hasCorrect: false, timeout: null, hideProgressBar: true}, "Separator", 150, "Message", {html: "<div style='text-align: center;'> answer: </div><div style='text-align: center; font-size: 150%; margin-top: 12pt;'> P </div>", transfer: 1900}],
['pnt_b_18', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_iu_01_pt_18.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_iu_01_pt_18.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', q: "&nbsp;&nbsp;&nbsp;&nbsp;click on the sound", hasCorrect: false, timeout: null, hideProgressBar: true}, "Separator", 150, "Message", {html: "<div style='text-align: center;'> answer: </div><div style='text-align: center; font-size: 150%; margin-top: 12pt;'> T </div>", transfer: 1900}],
['pnt_sp_1', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_iu_01_pt_01.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_iu_01_pt_01.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', q: "&nbsp;&nbsp;&nbsp;&nbsp;click on the sound", hasCorrect: false, timeout: null, hideProgressBar: true}, "Separator", 150, "Message", {html: "<div style='text-align: center;'> answer: </div><div style='text-align: center; font-size: 150%; margin-top: 12pt;'> P </div>", transfer: 1900}],
['pnt_sp_18', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_iu_01_pt_18.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_iu_01_pt_18.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', q: "&nbsp;&nbsp;&nbsp;&nbsp;click on the sound", hasCorrect: false, timeout: null, hideProgressBar: true}, "Separator", 150, "Message", {html: "<div style='text-align: center;'> answer: </div><div style='text-align: center; font-size: 150%; margin-top: 12pt;'> T </div>", transfer: 1900}],


// practice trials
// with timeouts
['pto_sp_1', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_iu_01_pt_01.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_iu_01_pt_01.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', q: "&nbsp;&nbsp;&nbsp;&nbsp;click on the sound", hasCorrect: false, timeout: 4000, hideProgressBar: true}, "Separator", 125, "Message", {html: "<div style='text-align: center;'> answer: </div><div style='text-align: center; font-size: 150%; margin-top: 12pt;'> P </div>", transfer: 1500}],
['pto_sp_18', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_iu_01_pt_18.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_iu_01_pt_18.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', q: "&nbsp;&nbsp;&nbsp;&nbsp;click on the sound", hasCorrect: false, timeout: 4000, hideProgressBar: true}, "Separator", 125, "Message", {html: "<div style='text-align: center;'> answer: </div><div style='text-align: center; font-size: 150%; margin-top: 12pt;'> T </div>", transfer: 1500}],
['pto_b_1', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_iu_01_pt_01.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_iu_01_pt_01.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', q: "&nbsp;&nbsp;&nbsp;&nbsp;click on the sound", hasCorrect: false, timeout: 4000, hideProgressBar: true}, "Separator", 125, "Message", {html: "<div style='text-align: center;'> answer: </div><div style='text-align: center; font-size: 150%; margin-top: 12pt;'> P </div>", transfer: 1500}],
['pto_b_18', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_iu_01_pt_18.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_iu_01_pt_18.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', q: "&nbsp;&nbsp;&nbsp;&nbsp;click on the sound", hasCorrect: false, timeout: 4000, hideProgressBar: true}, "Separator", 125, "Message", {html: "<div style='text-align: center;'> answer: </div><div style='text-align: center; font-size: 150%; margin-top: 12pt;'> T </div>", transfer: 1500}],


// test trials
['t_b_pt_1_iu_2', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_02.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_02.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_2', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_02.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_02.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_2', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_02.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_02.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_2', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_02.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_02.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_2', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_02.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_02.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_1_iu_17', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_17.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_17.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_17', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_17.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_17.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_17', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_17.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_17.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_17', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_17.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_17.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_17', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_17.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_17.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_1_iu_18', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_18.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_18.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_18', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_18.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_18.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_18', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_18.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_18.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_18', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_18.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_18.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_18', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_18.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_18.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_1_iu_19', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_19.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_19.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_19', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_19.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_19.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_19', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_19.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_19.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_19', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_19.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_19.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_19', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_19.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_19.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_1_iu_23', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_23.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_23.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_23', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_23.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_23.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_23', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_23.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_23.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_23', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_23.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_23.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_23', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_23.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_23.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_1_iu_24', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_24.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_24.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_24', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_24.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_24.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_24', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_24.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_24.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_24', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_24.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_24.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_24', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_24.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_24.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_1_iu_25', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_25.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_25.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_25', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_25.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_25.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_25', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_25.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_25.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_25', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_25.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_25.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_25', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_25.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_25.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_1_iu_26', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_26.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_26.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_26', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_26.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_26.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_26', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_26.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_26.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_26', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_26.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_26.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_26', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_26.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_26.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_1_iu_27', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_27.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_27.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_27', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_27.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_27.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_27', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_27.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_27.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_27', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_27.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_27.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_27', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_27.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_27.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_1_iu_28', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_28.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_28.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_28', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_28.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_28.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_28', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_28.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_28.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_28', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_28.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_28.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_28', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_28.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_28.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_1_iu_30', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_30.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_30.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_30', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_30.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_30.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_30', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_30.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_30.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_30', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_30.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_30.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_30', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_30.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_30.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_1_iu_31', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_31.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_31.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_31', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_31.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_31.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_31', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_31.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_31.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_31', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_31.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_31.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_31', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_31.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_31.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_1_iu_32', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_32.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_32.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_32', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_32.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_32.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_32', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_32.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_32.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_32', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_32.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_32.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_32', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_32.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_32.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_1_iu_35', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_35.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_35.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_35', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_35.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_35.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_35', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_35.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_35.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_35', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_35.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_35.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_35', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_35.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_35.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_1_iu_36', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_36.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_36.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_36', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_36.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_36.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_36', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_36.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_36.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_36', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_36.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_36.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_36', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_36.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_36.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_1_iu_37', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_37.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_37.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_37', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_37.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_37.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_37', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_37.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_37.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_37', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_37.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_37.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_37', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_37.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_37.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_1_iu_53', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_53.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_01_iu_53.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_6_iu_53', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_53.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_06_iu_53.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_7_iu_53', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_53.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_07_iu_53.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_8_iu_53', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_53.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_08_iu_53.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_b_pt_18_iu_53', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_53.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/p_uh_pt_18_iu_53.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_2', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_02.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_02.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_2', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_02.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_02.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_2', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_02.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_02.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_2', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_02.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_02.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_2', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_02.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_02.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_17', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_17.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_17.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_17', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_17.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_17.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_17', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_17.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_17.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_17', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_17.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_17.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_17', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_17.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_17.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_18', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_18.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_18.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_18', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_18.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_18.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_18', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_18.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_18.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_18', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_18.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_18.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_18', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_18.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_18.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_19', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_19.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_19.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_19', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_19.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_19.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_19', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_19.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_19.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_19', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_19.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_19.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_19', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_19.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_19.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_23', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_23.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_23.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_23', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_23.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_23.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_23', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_23.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_23.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_23', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_23.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_23.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_23', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_23.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_23.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_24', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_24.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_24.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_24', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_24.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_24.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_24', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_24.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_24.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_24', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_24.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_24.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_24', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_24.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_24.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_25', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_25.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_25.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_25', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_25.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_25.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_25', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_25.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_25.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_25', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_25.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_25.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_25', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_25.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_25.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_26', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_26.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_26.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_26', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_26.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_26.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_26', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_26.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_26.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_26', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_26.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_26.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_26', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_26.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_26.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_27', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_27.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_27.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_27', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_27.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_27.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_27', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_27.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_27.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_27', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_27.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_27.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_27', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_27.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_27.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_28', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_28.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_28.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_28', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_28.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_28.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_28', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_28.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_28.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_28', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_28.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_28.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_28', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_28.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_28.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_30', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_30.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_30.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_30', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_30.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_30.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_30', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_30.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_30.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_30', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_30.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_30.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_30', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_30.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_30.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_31', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_31.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_31.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_31', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_31.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_31.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_31', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_31.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_31.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_31', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_31.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_31.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_31', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_31.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_31.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_32', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_32.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_32.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_32', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_32.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_32.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_32', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_32.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_32.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_32', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_32.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_32.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_32', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_32.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_32.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_35', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_35.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_35.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_35', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_35.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_35.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_35', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_35.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_35.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_35', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_35.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_35.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_35', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_35.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_35.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_36', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_36.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_36.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_36', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_36.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_36.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_36', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_36.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_36.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_36', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_36.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_36.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_36', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_36.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_36.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_37', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_37.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_37.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_37', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_37.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_37.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_37', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_37.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_37.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_37', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_37.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_37.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_37', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_37.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_37.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_1_iu_53', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_53.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_01_iu_53.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_6_iu_53', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_53.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_06_iu_53.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_7_iu_53', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_53.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_07_iu_53.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_8_iu_53', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_53.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_08_iu_53.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],
['t_sp_pt_18_iu_53', "Trial", {html: '<audio autoplay="autoplay"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_53.wav" type="audio/wav"> <source src="https://udrive.oit.umass.edu/kmullin/_exp/sp_uh_pt_18_iu_53.mp3" type="audio/mpeg"> Your browser does not support the audio element.</audio>', hideProgressBar: true}],


[["itdoesntmatchanything", 124], "Trial", {s: ""}] 
// Be sure there's no comma after the LAST ITEM !!

];

