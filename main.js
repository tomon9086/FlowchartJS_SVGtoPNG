// https://github.com/adrai/flowchart.js/blob/master/example/index.html

window.onload = () => {
	const cvs = document.getElementById('canvas');
	const ctx = cvs.getContext('2d');
	const resolution = 10;
	cvs.setAttribute("width", 300 * resolution);
    cvs.setAttribute("height",300 * resolution);
    ctx.scale(resolution, resolution);

	const input = document.getElementById("input");
	input.innerHTML = "st=>start: Start|past:>http://www.google.com[blank]\ne=>end: End:>http://www.google.com\nop1=>operation: My Operation|past\nop2=>operation: Stuff|current\nsub1=>subroutine: My Subroutine|invalid\ncond=>condition: Yes\nor No?|approved:>http://www.google.com\nc2=>condition: Good idea|rejected\nio=>inputoutput: catch something...|request\n\nst->op1(right)->cond\ncond(yes, right)->c2\ncond(no)->sub1(left)->op1\nc2(yes)->io->e\nc2(no)->op2->e";
	let chart;
	setInterval(() => {
		const source = input.value;
		if(chart) {
			chart.clean();
		}
		chart = flowchart.parse(source);
		chart.drawSVG('svg_container', {
			// 'x': 30,
			// 'y': 50,
			'line-width': 3,
			'maxWidth': 3,//ensures the flowcharts fits within a certian width
			'line-length': 50,
			'text-margin': 10,
			'font-size': 14,
			'font': 'normal',
			'font-family': 'Helvetica',
			'font-weight': 'normal',
			'font-color': 'black',
			'line-color': 'black',
			'element-color': 'black',
			'fill': 'white',
			'yes-text': 'yes',
			'no-text': 'no',
			'arrow-end': 'block',
			'scale': 1,
			'symbols': {
				'start': {
					// 'font-color': 'red',
					// 'element-color': 'green',
					// 'fill': 'yellow'
				},
				'end':{
					'class': 'end-element'
				}
			},
			'flowstate' : {
				// 'past' : { 'fill' : '#CCCCCC', 'font-size' : 12},
				// 'current' : {'fill' : 'yellow', 'font-color' : 'red', 'font-weight' : 'bold'},
				// 'future' : { 'fill' : '#FFFF99'},
				// 'request' : { 'fill' : 'blue'},
				// 'invalid': {'fill' : '#444444'},
				// 'approved' : { 'fill' : '#58C4A3', 'font-size' : 12, 'yes-text' : 'APPROVED', 'no-text' : 'n/a' },
				// 'rejected' : { 'fill' : '#C45879', 'font-size' : 12, 'yes-text' : 'n/a', 'no-text' : 'REJECTED' }
			}
		});
		const img = new Image();
		const DOMURL = self.URL || self.webkitURL || self;
		// console.log(document.getElementById("svg_container").innerHTML);
		const svgEl = document.getElementById("svg_container");
		const svg = new Blob([svgEl.innerHTML], {type: "image/svg+xml;charset=utf-8"});
		const URL = DOMURL.createObjectURL(svg);
		img.src = URL;
		img.onload = function() {
			ctx.clearRect(0, 0, cvs.getAttribute("width"), cvs.getAttribute("height"));
			ctx.drawImage(img, 0, 0, cvs.getAttribute("width") / resolution, cvs.getAttribute("width") / resolution * svgEl.firstChild.getAttribute("height") / svgEl.firstChild.getAttribute("width"));
			DOMURL.revokeObjectURL(URL);
		};
		// img.onload = function() {
		// 	ctx.drawImage(img, 0, 0, 200, 200);
		// }
		// console.log(chart);
		// document.getElementById("svg_container").innerHTML = "";
	}, 100);
};
