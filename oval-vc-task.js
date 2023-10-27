// utility functions
Number.prototype.pad = function(n) {
  var s = this.toString();
  return '0'.repeat(n - s.length) + s;
};
Array.prototype.shuffle = function() {
  return this.map(a => ({k: Math.random(), v: a})).sort((a, b) => a.k - b.k).map(a => a.v);
};
Array.prototype.sum = function() {
  return this.reduce((a, b) => a + b);
};
Array.prototype.mean = function() {
  return this.sum() / this.length;
};
Array.prototype.std = function() {
  var mean = this.mean();
  return Math.sqrt(this.map(a => Math.pow(a - mean, 2)).sum() / (this.length - 1));
};
Array.prototype.normalize = function(m, s) {
  var mean = this.mean();
  var std = this.std();
  return this.map(e => (e - mean) / std * s + m);
};

// feature space variables
const colorSpace = ['#80b9ff','#82b9ff','#84b9ff','#86b8ff','#88b8ff','#8bb7ff','#8db7ff','#8fb7fe','#91b6fe','#93b6fe','#95b5fe','#97b5fe','#99b4fd','#9bb4fd','#9db4fd','#9fb3fd','#a1b3fc','#a2b2fc','#a4b2fc','#a6b1fb','#a8b1fb','#aab0fa','#acb0fa','#aeb0f9','#afaff9','#b1aff8','#b3aef8','#b5aef7','#b7adf7','#b8adf6','#baacf6','#bcacf5','#bdabf4','#bfabf4','#c1abf3','#c2aaf2','#c4aaf1','#c5a9f1','#c7a9f0','#c8a8ef','#caa8ee','#cca7ee','#cda7ed','#cea7ec','#d0a6eb','#d1a6ea','#d3a5e9','#d4a5e8','#d5a4e7','#d7a4e6','#d8a4e5','#d9a3e5','#dba3e4','#dca2e3','#dda2e2','#dea2e1','#e0a1df','#e1a1de','#e2a0dd','#e3a0dc','#e4a0db','#e59fda','#e69fd9','#e79fd8','#e89ed7','#e99ed6','#ea9ed5','#eb9ed3','#ec9dd2','#ed9dd1','#ee9dd0','#ef9ccf','#f09cce','#f09ccc','#f19ccb','#f29bca','#f39bc9','#f39bc7','#f49bc6','#f59bc5','#f59ac4','#f69ac3','#f79ac1','#f79ac0','#f89abf','#f89abe','#f99abc','#f999bb','#fa99ba','#fa99b9','#fa99b7','#fb99b6','#fb99b5','#fb99b4','#fc99b2','#fc99b1','#fc99b0','#fd99af','#fd99ad','#fd99ac','#fd99ab','#fd99aa','#fd99a8','#fe99a7','#fe99a6','#fe9aa5','#fe9aa3','#fe9aa2','#fe9aa1','#fe9aa0','#fe9a9f','#fe9a9d','#fe9b9c','#fd9b9b','#fd9b9a','#fd9b99','#fd9b98','#fd9c96','#fd9c95','#fc9c94','#fc9c93','#fc9d92','#fb9d91','#fb9d90','#fb9d8f','#fa9e8e','#fa9e8d','#fa9e8c','#f99f8a','#f99f89','#f89f88','#f8a087','#f7a086','#f7a085','#f6a185','#f6a184','#f5a183','#f5a282','#f4a281','#f3a280','#f3a37f','#f2a37e','#f2a47d','#f1a47d','#f0a47c','#efa57b','#efa57a','#eea679','#eda679','#eca678','#eca777','#eba777','#eaa876','#e9a875','#e8a975','#e7a974','#e7a973','#e6aa73','#e5aa72','#e4ab72','#e3ab71','#e2ac71','#e1ac70','#e0ac70','#dfad6f','#dead6f','#ddae6f','#dcae6e','#dbaf6e','#daaf6e','#d9af6d','#d8b06d','#d7b06d','#d6b16d','#d5b16c','#d4b26c','#d2b26c','#d1b26c','#d0b36c','#cfb36c','#ceb46c','#cdb46c','#ccb46c','#cab56c','#c9b56c','#c8b66c','#c7b66c','#c6b66c','#c4b76c','#c3b76c','#c2b86c','#c1b86d','#bfb86d','#beb96d','#bdb96d','#bcba6e','#baba6e','#b9ba6e','#b8bb6f','#b7bb6f','#b5bb70','#b4bc70','#b3bc71','#b1bc71','#b0bd71','#afbd72','#adbd73','#acbe73','#abbe74','#a9be74','#a8bf75','#a6bf76','#a5bf76','#a4c077','#a2c078','#a1c078','#9fc079','#9ec17a','#9dc17b','#9bc17c','#9ac27c','#98c27d','#97c27e','#95c27f','#94c380','#93c381','#91c382','#90c383','#8ec483','#8dc484','#8bc485','#8ac486','#88c487','#87c588','#85c589','#84c58b','#82c58c','#81c68d','#7fc68e','#7dc68f','#7cc690','#7ac691','#79c692','#77c793','#76c795','#74c796','#72c797','#71c798','#6fc799','#6dc89a','#6cc89c','#6ac89d','#69c89e','#67c89f','#65c8a0','#63c8a2','#62c8a3','#60c8a4','#5ec9a5','#5dc9a7','#5bc9a8','#59c9a9','#57c9aa','#56c9ac','#54c9ad','#52c9ae','#50c9b0','#4ec9b1','#4dc9b2','#4bc9b3','#49c9b5','#47c9b6','#45cab7','#43cab8','#41caba','#3fcabb','#3dcabc','#3bcabe','#39cabf','#37cac0','#35cac1','#33cac3','#31cac4','#2fcac5','#2dcac6','#2bcac8','#29cac9','#27c9ca','#25c9cb','#23c9cd','#21c9ce','#1fc9cf','#1cc9d0','#1ac9d1','#18c9d3','#16c9d4','#14c9d5','#12c9d6','#10c9d7','#0ec9d8','#0dc9d9','#0bc9db','#0ac8dc','#09c8dd','#09c8de','#08c8df','#09c8e0','#0ac8e1','#0bc8e2','#0cc8e3','#0ec7e4','#10c7e5','#12c7e6','#14c7e7','#16c7e8','#18c7e9','#1bc6ea','#1dc6eb','#1fc6eb','#22c6ec','#24c6ed','#27c5ee','#29c5ef','#2bc5f0','#2ec5f0','#30c5f1','#33c4f2','#35c4f3','#37c4f3','#3ac4f4','#3cc3f5','#3ec3f5','#41c3f6','#43c3f6','#46c2f7','#48c2f8','#4ac2f8','#4dc1f9','#4fc1f9','#51c1fa','#54c1fa','#56c0fb','#58c0fb','#5ac0fb','#5dbffc','#5fbffc','#61bffd','#64befd','#66befd','#68befd','#6abdfe','#6cbdfe','#6fbdfe','#71bcfe','#73bcfe','#75bbff','#77bbff','#7abbff','#7cbaff','#7ebaff'];
const feat2Space = Array.from(Array(91).keys()).map(i => 'oval-' + Number(i).pad(2) + '.png');



// jsPsych initialization
var jsPsych = initJsPsych({
  experiment_width: 800,
  on_finish: function(){
    jsPsych.data.displayData();
  }
});

// jsPsych timeline
var timeline = [];

// preload images
timeline.push({
  type: jsPsychPreload,
  images: feat2Space.map(i => 'imgs/' + i),
  message: `<p>Loading experiment&hellip;</p>`
});


// stimulus info
var test_stimuli = [];
var demo_display_stim = {
  a1_colorStd: 45,
  a1_nItems: 20,
  a1_gridCols: 5,
  a1_corrItems: 20
};
test_stimuli.push(demo_display_stim);

// array1 display
var array1 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 2000, 
  on_start: function(trial) {
    var nItems = jsPsych.timelineVariable('a1_nItems');
    var gridCols = jsPsych.timelineVariable('a1_gridCols');
    var tableHTML = `<table cellpadding="0" cellspacing="0">`;
    for (let i = 0; i < nItems; i++) {
      if (i % gridCols == 0) tableHTML = tableHTML + `<tr>`;
      tableHTML = tableHTML + `<td><img src="imgs/` + feat2Space[trial.data.feat2Rnd[i]] + `" style="background-color: ` + colorSpace[trial.data.colorRnd[i]]+ `" width="100" height="100"/></td>`;
      if (i % gridCols == (gridCols - 1)) tableHTML = tableHTML + `</tr>`;
    }
    tableHTML = tableHTML + `</table>`;
    trial.stimulus = tableHTML;
  },
  data: function () {
    var colorAvg = Math.floor(Math.random() * 360);
    var colorStd = jsPsych.timelineVariable('a1_colorStd');
    var nItems = jsPsych.timelineVariable('a1_nItems');
    var nCorrItems = jsPsych.timelineVariable('a1_nCorrItems');

    var colorRnd = Array.from({length: nItems}, () => Math.random())
        .normalize(colorAvg, colorStd)
        .map(a => Math.round(a)).map(a => ((a % 360) + 360) % 360).sort();
    var feat2Rnd = Array.from({length: nItems}, () => Math.floor(Math.random() * 91)).sort();

    if (nCorrItems < nItems) {
      let shuffleIdx = Array.from(Array(colorRnd.length).keys()).shuffle();
      colorRnd = shuffleIdx.map(i => colorRnd[i]);
      feat2Rnd = shuffleIdx.map(i => feat2Rnd[i]);
      colorRnd = colorRnd.slice(0, nCorrItems).concat(colorRnd.slice(nCorrItems).shuffle());
    }
    let locShuffle = Array.from(Array(colorRnd.length).keys()).shuffle();
    colorRnd = locShuffle.map(i => colorRnd[i]);
    feat2Rnd = locShuffle.map(i => feat2Rnd[i]);

    return {
      colorRnd: colorRnd,
      feat2Rnd: feat2Rnd,
      task: 'array1'
    };
  }
};

// ready? display
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p>Press the Space Bar</p>`,
  choices: [' ']
});


var demo_procedure = {
  timeline: [array1],
  timeline_variables: test_stimuli,
  repetitions: 5,
  randomize_order: true
};
timeline.push(demo_procedure);


// start the experiment
jsPsych.run(timeline);