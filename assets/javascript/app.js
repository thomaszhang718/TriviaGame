$(document).ready(function(){

    //Audio for the game on a loop. It's the Pokemon Theme Song
    var themeAudio = new Audio("assets/sounds/Don't Let Me Down (Illenium Remix).mp3");
    themeAudio.loop = true;
    themeAudio.play();

    var q3Audio = new Audio("assets/sounds/Sandstorm.mp3");

    //Adding the on click functions for the Play/Pause/Restart button
    $(".musicPlayButton").on("click", function(){
        themeAudio.play();
    });

    $(".musicPauseButton").on("click", function(){
        themeAudio.pause();
    });

    $(".musicRestartButton").on("click", function(){
        themeAudio.currentTime = 0;
        themeAudio.play();
    });

    //Add Start Button for Trivia game

    $("#startButton").on("click", function(){
        $("#startButtonDiv").remove();
        triviaGame.startGame();
    });

    //Array of questions, choices, answers

    var questionsArray = [{
        question: "What is Deadmau5's real name?",
        choices: ["David", "Francis", "Joel", "Kevin"], 
        correctChoice: "Joel"
    }, {
        question: "What is the largest (attendance-wise) EDM-Only Festival in the United States?",
        choices: ["Ultra Music Festival", "EDC Las Vegas", "TomorrowWorld", "Coachella Valley Music and Arts Festival"],
        correctChoice: "EDC Las Vegas"
    }, {
        question: "Song Name?",
        choices: ["Hardwell - Spaceman", "Dimitri Vegas, Martin Garrix, Like Mike - Tremor", "Darude - Sandstorm", "Sarah McLachlan - Angel"],
        correctChoice: "Darude - Sandstorm"
    }, {
        question: "What song launched Martin Garrix into fame in 2013?",
        choices: ["Wizard", "Animals", "Proxy", "Gold Skies"],
        correctChoice: "Animals"
    }, {
        question: "Who is Dillon Francis' Deep House Alter Ego?",
        choices: ["DJ Hanzel (One Deeper)", "Greg", "DJ Rich as Fuck", "Becky"],
        correctChoice: "DJ Hanzel (One Deeper)"
    }, {
        question: "What are the fans of the DJ named Jauz called?",
        choices: ["Nemo", "Jauzers", "Friends, Not Food", "Shark Squad"],
        correctChoice: "Shark Squad"
    }, {
        question: "What animal is featured in many of by Galantis' music videos? (e.g. Smile, Runaway (U & I), No Money)",
        choices: ["Seafox", "Sealion", "Seaslug", "Seaurchin"],
        correctChoice: "Seafox"
    }, {
        question: "What city did House music originate from?",
        choices: ["Detroit", "New York", "Los Angeles", "Chicago"],
        correctChoice: "Chicago"
    }, {
        question: "According to Forbes, the world's highest paid DJ of 2015 was who?",
        choices: ["Skrillex", "Calvin Harris", "David Guetta", "Tiesto"],
        correctChoice: "Calvin Harris"
    }, {
        question: "According to the International Music Summit, the Global Electronic Industry is now worth how much (2015/16)?",
        choices: ["$6.2 Billion", "$7.1 Billion", "$6.9 Billion", "$4.5 Billion"],
        correctChoice: "$7.1 Billion"
    }

    ];

//Creating app as an object called triviaGame

var triviaGame = {

        //Variables that we'll be using
        questionTimeToGuess: 30,
        questionNumber: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        unAnswered: 0,
        guessPicked: false,
        firstRun: true,

        //Functions used in trivia game

        start: function(){ //Start function with countdown on 1 second timer
            $('#correctAnswerDiv').empty();
            counter = setInterval(triviaGame.timer, 1000); 
        },

        stop: function(){ //stop function
            clearInterval(counter);
        },

        timer: function(){ //timer function
            

            //decrease time to guess by one and update the display

            triviaGame.questionTimeToGuess--;
            $('#timeRemaining').html('<p id="timeRemainingText">Time Remaing: ' + triviaGame.questionTimeToGuess + ' Seconds</p>');
         


            if (!triviaGame.guessPicked) { //check to make sure a guess isn't already picked

                //If statement to display what happens if time runs out. Will stop timer, say you ran out of time, display the correct answer, and then update the unAnswered count and questionNumber

                if (triviaGame.questionTimeToGuess === 0){
                    triviaGame.stop();
                    $('#questionAndResultsDiv').html('<p id="outOfTimeText">Out of Time!</p>');
                    $('#choiceOneDiv, #choiceTwoDiv, #choiceThreeDiv, #choiceFourDiv').empty();


                    $('#correctAnswerDiv').html('<p id="correctAnswerText">The Correct Answer was: ' + questionsArray[triviaGame.questionNumber].correctChoice + '</p>');
                    triviaGame.unAnswered++;
                    triviaGame.questionNumber++;


                    //Reset timer to 30 and then go to next question after 3 seconds
                    triviaGame.questionTimeToGuess = 30;
                    shortPause = setTimeout(triviaGame.startGame, 3000);
                }
            }
        },

        printQuestions: function() { //function to display the question and the choices from the question array
            
            $('#questionAndResultsDiv').html(questionsArray[triviaGame.questionNumber].question);
            
            //I ended up adding the answer as a class to the div. I tried setting it up as a data point and couldn't get my code to work so I used this way and the JQuery hasClass method to check if the answer was correct

            $('#choiceOneDiv').html(questionsArray[triviaGame.questionNumber].choices[0]);
            $('#choiceOneDiv').addClass(questionsArray[triviaGame.questionNumber].choices[0]); 

            $('#choiceTwoDiv').html(questionsArray[triviaGame.questionNumber].choices[1]);
            $('#choiceTwoDiv').addClass(questionsArray[triviaGame.questionNumber].choices[1]);
            
            $('#choiceThreeDiv').html(questionsArray[triviaGame.questionNumber].choices[2]);
            $('#choiceThreeDiv').addClass(questionsArray[triviaGame.questionNumber].choices[2]);

            $('#choiceFourDiv').html(questionsArray[triviaGame.questionNumber].choices[3]);
            $('#choiceFourDiv').addClass(questionsArray[triviaGame.questionNumber].choices[3]);
        },

        startGame: function(){ //startGame function

            //check if this is the first time playing the game. If yes, then assign the checkGuess function to the choice divs

            if (triviaGame.questionNumber == 0 && triviaGame.firstRun == true) {
                $("#choiceOneDiv, #choiceTwoDiv, #choiceThreeDiv, #choiceFourDiv").on("click", triviaGame.checkGuess);
            }

            //Question 3 requires you to identify a song. Check to see if it's question 3 which will pause the theme music and play the song for question 3. Will stop the audio and resume the original theme music on question 4 


            if (triviaGame.questionNumber == 2) {
                themeAudio.pause();
                
                q3Audio.play();
            }

            if (triviaGame.questionNumber == 3) {
                q3Audio.pause();
                themeAudio.play();
            }

            //Checks if all the questions are done and then displays the score and generates the restart button

            if (triviaGame.questionNumber == 10) {
                $('#choiceOneDiv, #choiceTwoDiv, #choiceThreeDiv, #choiceFourDiv').empty();
                $("#questionAndResultsDiv").html("All done, here's how you did!");

                $("#correctAnsweredDiv").html("Correct Answers: " + triviaGame.correctAnswers);
                $("#incorrectAnsweredDiv").html("Incorrect Answers: " + triviaGame.wrongAnswers);
                $("#unAnsweredDiv").html("Unanswered: " + triviaGame.unAnswered);


                $("#restartButtonDiv").html('<button id="startButton">Restart</button>');

                $("#restartButtonDiv").on("click", function(){
                    triviaGame.reset();
                });
            }

            //For all questions, displays the time remaining, starts the timer, prints the questions

            else {
                $('#timeRemaining').html('<p id="timeRemainingText">Time Remaing: ' + triviaGame.questionTimeToGuess + ' Seconds</p>');
                triviaGame.guessPicked = false;
                triviaGame.start();
                triviaGame.printQuestions();            
            }
        },

        checkGuess: function(){ //Function for checking if the div clicked on is the correct answer

            //Answer has been picked, pause timer, clear the choices

            triviaGame.guessPicked = true;
            triviaGame.stop();
            $('#choiceOneDiv, #choiceTwoDiv, #choiceThreeDiv, #choiceFourDiv').empty();

            //I ended up assigning the answer as a class to the choices divs and then checking to see if the clicked answer was listed in those classes to determine if the answer was correct. Then increment the counts for questionNumber and correctAnswers

            if ($(this).hasClass(questionsArray[triviaGame.questionNumber].correctChoice)) {
                $("#questionAndResultsDiv").html("Correct!");
                triviaGame.questionNumber++;
                triviaGame.correctAnswers++;

                //Reset timer to 30 and then go to next question after 3 seconds
                triviaGame.questionTimeToGuess = 30;
                shortPause = setTimeout(triviaGame.startGame, 3000);
            }

            //Else statement to display if the answer was incorrect, the correct answer, and then increment the counts for questionNumber and wrongAnswers

            else {
                $("#questionAndResultsDiv").html("Nope!");
                $('#correctAnswerDiv').html('<p id="correctAnswerText">The Correct Answer was: ' + questionsArray[triviaGame.questionNumber].correctChoice + '</p>');
                triviaGame.questionNumber++;
                triviaGame.wrongAnswers++;
                
                //Reset timer to 30 and then go to next question after 3 seconds
                triviaGame.questionTimeToGuess = 30;
                shortPause = setTimeout(triviaGame.startGame, 3000);
            }
        },

        reset: function(){ //Reset function setting up all the variables back to starting values and clearing all the divs used in the game.
            triviaGame.questionTimeToGuess = 30;
            triviaGame.questionNumber = 0;
            triviaGame.correctAnswers = 0;
            triviaGame.wrongAnswers = 0;
            triviaGame.unAnswered = 0;
            triviaGame.firstRun = false;
            $('#correctAnsweredDiv, #incorrectAnsweredDiv, #unAnsweredDiv, #restartButtonDiv').empty();

            triviaGame.startGame();
        },
};


});


