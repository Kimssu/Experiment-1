    const letter = ['B', 'F', 'K', 'L', 'M', 'N', 'P', 'R', 'T'];
    const width = [100, 200, 300, 400, 500, 600, 700, 800, 900];
    var all_imgs = [];
    for (let l = 0; l < letter.length; l++) {
      for (let w = 0; w < width.length; w++) {
        all_imgs.push('https://kimssu.github.io/Experiment-1/letter-imgs_110/'+letter[l]+'_'+width[w]+'.png');
      }
    }
    all_imgs.push('https://kimssu.github.io/Experiment-1/letter-imgs/rcue-img.png');
    all_imgs.push('https://kimssu.github.io/Experiment-1/letter-imgs/cue-img.png');
    all_imgs.push('https://kimssu.github.io/Experiment-1/letter-imgs/procedure.png');
    all_imgs.push('https://kimssu.github.io/Experiment-1/letter-imgs/div_h.png');
    all_imgs.push('https://kimssu.github.io/Experiment-1/letter-imgs/div_l1.png');  
    all_imgs.push('https://kimssu.github.io/Experiment-1/letter-imgs/div_l2.png');


    const adj_row = [
      [1, 2],
      [0, 2],
      [1, 3],
      [2, 4],
      [2, 3],
    ];
    const far_row = [
      [3, 4],
      [3, 4],
      [0, 4],
      [0, 1],
      [0, 1],
    ];

    var jsPsych = initJsPsych({
      on_finish: function() {
        if (window.hasOwnProperty('RUN_ID') && window.hasOwnProperty('LAST_MSG')) {  // cognition.run workaround
            var c = document.getElementById('jspsych-content');
            c.innerHTML = window.LAST_MSG;
        } else {
            jsPsych.data.displayData();
            // prolofic integration
            //window.location = "https://app.prolific.co/submissions/complete?cc=XXXXXXX";
        }
      }
    });

    // prolific integration
    /*var subject_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
    var study_id = jsPsych.data.getURLVariable('STUDY_ID');
    var session_id = jsPsych.data.getURLVariable('SESSION_ID');
    jsPsych.data.addProperties({
      subject_id: subject_id,
      study_id: study_id,
      session_id: session_id
    });*/

    var timeline = [];

    var browser_check = {
        type: jsPsychBrowserCheck,
        skip_features: ['webaudio', 'webcam', 'microphone'],
        inclusion_function: function(data) {
          return ['chrome', 'edge-chromium', 'firefox'].includes(data.browser) && (data.mobile === false);
        },
        exclusion_message: function(data) {
          var last_msg = data.mobile ?
            '<p>You must use a desktop/laptop computer to participate in this experiment.</p>' :
            ('edge' == data.browser ?
              '<p>You must use a newer version of Edge (released in or after 2020) to participate in this experiment.</p>' :
              '<p>You must use Chrome, Edge, or Firefox to participate in this experiment.</p>');
          if (window.hasOwnProperty('RUN_ID')) {  // cognition.run workaround
            window.LAST_MSG = last_msg;
            return '';
          } else {
            return last_msg;
          }
        }
    };
    timeline.push(browser_check);
  
    var preload = {
      type: jsPsychPreload,
      images: all_imgs
    }
    timeline.push(preload);

    var enterFS = {
      type: jsPsychFullscreen,
      fullscreen_mode: true
    };
    timeline.push(enterFS);

    var instructions = {
      type: jsPsychInstructions,
      pages: [
      'Welcome to the experiment. <br>Click next to begin.',
      '<img src="https://kimssu.github.io/Experiment-1/letter-imgs/procedure.png"> \
      <br><br> In this experiment, a row-sized square, the 25-letter array and a letter-sized square will appear in the center of the screen.\
      <br> The main task was to remember the letter at the location of a letter-sized square.\
      <br> A letter-sized square will appear within a row-sized square location.\
      <br> When a letter-sized square appears on the screen, Click the letter at that location.',
      '<img src="https://kimssu.github.io/Experiment-1/letter-imgs/div_l2.png"> \
      <img src="https://kimssu.github.io/Experiment-1/letter-imgs/div_l1.png"> \
      <img src="https://kimssu.github.io/Experiment-1/letter-imgs/div_h.png"> \
      <br> font-weight diversity question \
      <br> After reporting the letter, Click the button to indicate the font-weight diversity level (low or high)',
      'practice trial'
      ],
      button_label_next: "Continue",
      button_label_previous: "Previous",
      show_clickable_nav: true
    };
    timeline.push(instructions);

    var test_stimuli = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 2; j++) {
        for (let k = 0; k < 2; k++) {
          let trial_info = {
            precue_loc: i + 1,
            target_loc: Math.floor(Math.random() * 5) + 1,
            adj_div: j,
            far_div: k
          };
          test_stimuli.push(trial_info);
        }
      }
    }

    /* define fixation and test trials */

    var fixation = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div class="squareback" style="font-size: 60px;" "font-weigh: bold;">+</div>',
      choices: "NO_KEYS",
      trial_duration: 500, //milliseconds
      data: {
        task: 'fixation'
      }
    };

    var cue = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function() {
        var row = jsPsych.timelineVariable('precue_loc');
        return  `<table class="grid-5x1 show-rcue-`+row+`x1" cellpadding="0" cellspacing="0">
      <tr>
        <td class="rcue-1x1 rcue-img"></td>
      </tr>
      <tr>
        <td class="rcue-2x1 rcue-img"></td>
      </tr>
      <tr>
        <td class="rcue-3x1 rcue-img"></td>
      </tr>
      <tr>
        <td class="rcue-4x1 rcue-img"></td>
      </tr>
      <tr>
        <td class="rcue-5x1 rcue-img"></td>
      </tr>
    </table>`},
        choices: "NO_KEYS",
        trial_duration: 300,
        data: {
            task: 'cue'
        }
    };

    var array = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '',
      choices: "NO_KEYS",
      trial_duration: 300, 
      on_start: function(trial) {
        trial.stimulus =
          `<table class="grid-5x5" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[0]+`_`+trial.data.width_array[0]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[1]+`_`+trial.data.width_array[1]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[2]+`_`+trial.data.width_array[2]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[3]+`_`+trial.data.width_array[3]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[4]+`_`+trial.data.width_array[4]+`.png)"></td>
            </tr>
            <tr>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[5]+`_`+trial.data.width_array[5]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[6]+`_`+trial.data.width_array[6]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[7]+`_`+trial.data.width_array[7]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[8]+`_`+trial.data.width_array[8]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[9]+`_`+trial.data.width_array[9]+`.png)"></td>
            </tr>
            <tr>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[10]+`_`+trial.data.width_array[10]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[11]+`_`+trial.data.width_array[11]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[12]+`_`+trial.data.width_array[12]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[13]+`_`+trial.data.width_array[13]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[14]+`_`+trial.data.width_array[14]+`.png)"></td>
            </tr>
            <tr>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[15]+`_`+trial.data.width_array[15]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[16]+`_`+trial.data.width_array[16]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[17]+`_`+trial.data.width_array[17]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[18]+`_`+trial.data.width_array[18]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[19]+`_`+trial.data.width_array[19]+`.png)"></td>
            </tr>
            <tr>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[20]+`_`+trial.data.width_array[20]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[21]+`_`+trial.data.width_array[21]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[22]+`_`+trial.data.width_array[22]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[23]+`_`+trial.data.width_array[23]+`.png)"></td>
              <td style="background-image: url(https://kimssu.github.io/Experiment-1/letter-imgs_110/`+trial.data.letter_array[24]+`_`+trial.data.width_array[24]+`.png)"></td>
            </tr>
          </table>`;
      },
      data: function () {
        var trial_letter = Array(25);
        for (let i = 0; i < 25; i++) {
          trial_letter[i] = letter[Math.floor(Math.random()*9)];
        }
        
        var trial_width = Array(25);
        var row = jsPsych.timelineVariable('precue_loc') - 1;
        var adj_div = jsPsych.timelineVariable('adj_div');
        var far_div = jsPsych.timelineVariable('far_div');
        var ld_base = Math.floor(Math.random() * 7);
        for (let i = 0; i < 5; i++) {
          if (adj_div == 0 && far_div == 0) {
            trial_width[row * 5 + i] = width[ld_base + 1];
          }
          else if (adj_div == 1 && far_div == 1) {
            trial_width[row * 5 + i] = width[4];
        }
          else {
            switch (ld_base) {
              case 0:
              case 1:
                trial_width[row * 5 + i] = width[3];
                break;
              case 2:
              case 3:
              case 4:
                trial_width[row * 5 + i] = width[4];
                break;
              case 5:
              case 6:
                trial_width[row * 5 + i] = width[5];
                break;
            }
          }
        }
        for (let i = 0; i < 2; i++) {
          if (adj_div == 0) { // less diverse
            let shuffled = [0,1,2,0,1,2]
              .map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value);
            for (let j = 0; j < 5; j++) {
              trial_width[adj_row[row][i] * 5 + j] = width[ld_base + shuffled[j]];
            }
          } else {
            let shuffled = [0,1,2,3,4,5,6,7,8]
              .map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value);
            for (let j = 0; j < 5; j++) {
              trial_width[adj_row[row][i] * 5 + j] = width[shuffled[j]];
            }
          }
        }
        for (let i = 0; i < 2; i++) {
          if (far_div == 0) { // less diverse
            let shuffled = [0,1,2,0,1,2]
              .map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value);
            for (let j = 0; j < 5; j++) {
              trial_width[far_row[row][i] * 5 + j] = width[ld_base + shuffled[j]];
            }
          } else {
            let shuffled = [0,1,2,3,4,5,6,7,8]
              .map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value);
            for (let j = 0; j < 5; j++) {
              trial_width[far_row[row][i] * 5 + j] = width[shuffled[j]];
            }
          }
        }

        return {
          letter_array: trial_letter,
          width_array: trial_width,
          cue: row + 1,
          adj_div: adj_div,
          far_div: far_div,
          task: 'array'
        };
      }
    };

    var blank = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div class="squareback"></div>',
      choices: "NO_KEYS",
      trial_duration: 900,
      data: {
        task: 'blank'
      }
    };

    var test = {
      type: jsPsychHtmlButtonResponse,
      stimulus: function() {
        var row = jsPsych.timelineVariable('precue_loc');
        var col = jsPsych.timelineVariable('target_loc');
        return `<table style="margin: 64px auto 30px;"
        class="grid-5x5 show-cue-` + row + `x` + col + `" cellpadding="0" cellspacing="0">
      <tr>
        <td class="cue-1x1 cue-img"></td>
        <td class="cue-1x2 cue-img"></td>
        <td class="cue-1x3 cue-img"></td>
        <td class="cue-1x4 cue-img"></td>
        <td class="cue-1x5 cue-img"></td>
      </tr>
      <tr>
        <td class="cue-2x1 cue-img"></td>
        <td class="cue-2x2 cue-img"></td>
        <td class="cue-2x3 cue-img"></td>
        <td class="cue-2x4 cue-img"></td>
        <td class="cue-2x5 cue-img"></td>
      </tr>
      <tr>
        <td class="cue-3x1 cue-img"></td>
        <td class="cue-3x2 cue-img"></td>
        <td class="cue-3x3 cue-img"></td>
        <td class="cue-3x4 cue-img"></td>
        <td class="cue-3x5 cue-img"></td>
      </tr>
      <tr>
        <td class="cue-4x1 cue-img"></td>
        <td class="cue-4x2 cue-img"></td>
        <td class="cue-4x3 cue-img"></td>
        <td class="cue-4x4 cue-img"></td>
        <td class="cue-4x5 cue-img"></td>
      </tr>
      <tr>
        <td class="cue-5x1 cue-img"></td>
        <td class="cue-5x2 cue-img"></td>
        <td class="cue-5x3 cue-img"></td>
        <td class="cue-5x4 cue-img"></td>
        <td class="cue-5x5 cue-img"></td>
      </tr>
    </table>`;
    },
      choices: letter,
      data: function() {
        var precue_loc = jsPsych.timelineVariable('precue_loc');
        var target_loc = jsPsych.timelineVariable('target_loc');
        var letter_array = jsPsych.data.get().last(2).values()[0].letter_array;
        var corr_resp = letter_array[(precue_loc - 1) * 5 + (target_loc - 1)];
        return {
          task: 'response',
          adj_div: jsPsych.timelineVariable('adj_div'),
          far_div: jsPsych.timelineVariable('far_div'),
          precue_loc: precue_loc,
          target_loc: target_loc,
          correct_response: corr_resp
        };
      },
      on_finish: function(data){
        data.correct = (letter[data.response] == data.correct_response);
      },
    };

    var diversity = {
      type: jsPsychHtmlButtonResponse,
      stimulus: '<div class="squareback" style= "margin: 64px auto 30px;" "font-size: 30px;">font weight diversity?</div>',
      choices: ['Low', 'High'],
      data: function() {
        return {
          task: 'diversity',
          adj_div: jsPsych.timelineVariable('adj_div'),
          far_div: jsPsych.timelineVariable('far_div'),
          precue_loc: jsPsych.timelineVariable('precue_loc'),
          letter_correct: jsPsych.data.get().last(1).values()[0].correct
        };
      }
    };

    /* practice (w/o diversity response) */
    var prac1_stimuli = [];
    for (let i = 0; i < 10; i++) {
      let trial_div = Math.floor(Math.random() * 2);
      let trial_info = {
        precue_loc: Math.floor(Math.random() * 5) + 1,
        target_loc: Math.floor(Math.random() * 5) + 1,
        adj_div: trial_div,
        far_div: trial_div
      };
      prac1_stimuli.push(trial_info);
    }

    var prac1_procedure = {
      timeline: [fixation, cue, array, blank, test],
      timeline_variables: prac1_stimuli,
      repetitions: 1,
      randomize_order: false
    };
    timeline.push(prac1_procedure);

    var practice = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div style= "font-size: 30px;" "font-weigh: bold">add question\
        <br>Press any key to begin</div>',
    };
    timeline.push(practice);

    var prac2_procedure = {
      timeline: [fixation, cue, array, blank, test, diversity],
      timeline_variables: test_stimuli,
      repetitions: 1,
      randomize_order: true
    };
    timeline.push(prac2_procedure);

    var start = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div style= "font-size: 30px;" "font-weigh: bold">experiment start\
        <br>Press any key to begin</div>',
    };
    timeline.push(start);


    /* define test procedure */

    var test_procedure = {
      timeline: [fixation, cue, array, blank, test, diversity],
      timeline_variables: test_stimuli,
      repetitions: 2,
      randomize_order: true
    };
    timeline.push(test_procedure);

    var breaktime = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div style= "font-size: 30px;" "font-weigh: bold">breaktime</div>',
      choices: "NO_KEYS",
      trial_duration: 15000, 
    };
    timeline.push(breaktime);

    timeline.push(test_procedure);


    /* define debrief */
    var debrief_block = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<p>Press any key to complete the experiment. Thank you!</p>',
      on_finish: function(data) {
        jsPsych.data.addProperties({
          completed: true
        });
      }
    };
    timeline.push(debrief_block);

    var leaveFS = {
      type: jsPsychFullscreen,
      fullscreen_mode: false
    };
    timeline.push(leaveFS);

    /* start the experiment */
    jsPsych.run(timeline);