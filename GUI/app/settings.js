import {Parser} from "./Parser.js"

        
        export const settings = {
	"name": "Neurofeedback Template",
	"devices": [
		"EEG"
	],
	"author": "Garrett Flynn",
	"description": "Get started building a neurofeedback app!",
	"categories": [
		"learn"
	],
	"instructions": "Coming soon...",
	"display": {
		"production": false,
		"development": true
	},
	"intro": {
		"title": false
	},
	"graph": {
		"nodes": [
			{
				"id": "eeg",
				"class":brainsatplay.plugins.biosignals.EEG,
				"params": {},
				"style": "transform: scale(0.5); top: 18%; left: 20%;"
			},
			{
				"id": "neurofeedback",
				"class":brainsatplay.plugins.algorithms.Neurofeedback,
				"params": {
					"metric": "Alpha Coherence",
					"output": "Mean",
					"default": 0
				},
				"style": "transform: scale(0.5); top: 44.6667%; left: 20%;"
			},
			{
				"id": "brainstorm",
				"class":brainsatplay.plugins.networking.Brainstorm,
				"params": {},
				"style": "transform: scale(0.5); top: 71.3333%; left: 20%;"
			},
			{
				"id": "parser",
				"class":Parser,
				"params": {},
				"style": "transform: scale(0.5); top: 18%; left: 46.6667%;"
			},
			{
				"id": "ui",
				"class":brainsatplay.plugins.interfaces.UI,
				"params": {
					"style": "\n          .brainsatplay-ui-container {\n            width: 100%;\n            height: 100%;\n          }\n\n          #content {\n            width: 100%;\n            height: 100%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n          }\n          ",
					"opacity": 1,
					"html": "<div id='content'></div>"
				},
				"style": "transform: scale(0.5); top: 44.6667%; left: 46.6667%;"
			}
		],
		"edges": [
			{
				"source": "eeg:atlas",
				"target": "neurofeedback"
			},
			{
				"source": "neurofeedback",
				"target": "brainstorm"
			},
			{
				"source": "brainstorm:neurofeedback",
				"target": "parser"
			},
			{
				"source": "parser:element",
				"target": "ui:content"
			}
		]
	},
	"version": "experimental",
	"image": null,
	"connect": true
};