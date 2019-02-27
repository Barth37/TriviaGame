$(document).ready(function() {

    
    var game = {
        questions: [
        {
            question: 'Which of the following was not a daughter of Zeus and Mnemosyne?',
            choices: ['Calliope', 'Clio', 'Euterpe', 'Paris'],
            id: 'question-one',
            answer: 3
        }, {
            question: 'What mythological beast has the head of a man, the body of a lion, and the tail and feet of a dragon?',
            choices: ['A Minotaur', 'A Sphynx', 'A Manticore', 'A Griffon', 'A Phoenix'],
            id: 'question-two',
            answer: 2
        }, {
            question: 'The diet of what mythical beast periodically included seven youths and seven maidens?',
            choices: ['A Minotaur', 'A Sphynx', 'A Manticore', 'A Griffon', 'A Phoenix'],
            id: 'question-three',
            answer: 0
        }, {
            question: 'In Greek mythology, who was the goddess of the rainbow?',
            choices: ['Artemis', 'Iris', 'Hera', 'Athena', 'Demeter'],
            id: 'question-four',
            answer: 1
        }, {
            question: 'In ancient Athens, what tree wa considered sacred with all its fruit belonging to the state and death to anyone caught cutting one down?',
            choices: ['The Pine Tree', 'The Date Tree', 'The Apple Tree', 'The Olive Tree', 'The Fig Tree'],
            id: 'question-five',
            answer: 3
        }, {
            question: 'What legendary fire-breathing female monster had a lions head, a goats body, and a dragons tail?',
            choices: ['A Chimera', 'A Minotaur', 'A Manticore', 'FA Griffon', 'A Sphynx'],
            id: 'question-six',
            answer: 0

        }, {
            question: 'What famous structure was built by a man named Epeius?',
            choices: ['The Parthenon', 'The Trojan Horse', 'Hadrians Wall', 'The Eiffel Tower'],
            id: 'question-seven',
            answer: 1
        }, {
            question: 'According to legend, who fired the arrow that hit Achilles in the heel?',
            choices: ['Artemis', 'Odysseus', 'Agamemnon', 'Paris', 'Hector'],
            id: 'question-eight',
            answer: 3
        }, {
            question: 'What mythological god was protrayed as the Colosses of Rhodes?',
            choices: ['Heracles', 'Zeus', 'Ares', 'Poseidon', 'Helios'],
            id: 'question-nine',
            answer: 4
        }, {
            question: 'In Greek mythology, who were Arges, Brontes, and Steropes?',
            choices: ['The Fates', 'The heads of the Hydra', 'The Cyclopes', 'The heads of Cerberus'],
            id: 'question-ten',
            answer: 2
        }, {
            question: 'In Greek mythology, who was the queen of the underworld and wife of Hades?',
            choices: ['Persephone', 'Demeter', 'Hera', 'Hera', 'Alita'],
            id: 'question-eleven',
            answer: 0
        }, {
            question: 'Who was the ancient Greek god of dreams?',
            choices: ['Morpheus', 'Ares', 'Odysseus', 'Hades', 'Neo'],
            id: 'question-twelve',
            answer: 0
        }, {
            question: 'What bird was credited with saving Rome from attack by the Gauls in 390BC?',
            choices:['The Falcon','The Phoenix','The Hawk','The Goose'],
            id: 'question-thirteen'
        }, {
            question: 'According to classical mythology, who was the first mortal woman?',
            choices: ['Mary','Diana','Pandora','Hera'],
            id: 'question-fourteen',
            answer: 2
        }, {
            question: 'Janus, the ancient Roman god of good beginnings, is pictured on early coins with two faces.  What did the faces represent?',
            choices: ['Good and Evil','Heaven and Earth','War and Peace','Past and Future'],
            id: 'question-fifteen',
            answer: 3
        }
        ]}
    
        var message = 'Game Over!';
    
    // This initializes the button that starts the game 
        $('.startGame').on('click', function () {
    // when the start button clicked, the div with the questions that was hidden is shown
            
            $('.wrapper').show();
            $(this).hide();
            
        
    
        // These events start the timer: set the number of seconds the guesser has 
        var number = 180;
        $('#timeLeft').on('click', run);
    
        // This function enables the number of seconds to decrease with time, and to display
        // the result of that decrease until time is up. 
        function decrement(){
            // Decrease number by one.
            number--;
            $('#timeLeft').html('<h2>' + number + ' seconds' + '</h2>');
            if (number === 0){
                stop();
            // Alert the user that time is up
            $('#message').html('time up!');
            checkAnswers();
                }
            }
        
        // Sets timing of decrement
        function run(){
            counter = setInterval(decrement, 1000);
        }
        function stop(){
            clearInterval(counter);
        }
    
        // Execute the run function.
        run();
            
        });
    // Game inputs
    function formTemplate(data) {
    // sets up question and answer options
        var qString = "<form id='questionOne'>"+ data.question +"<br>";
        var choices = data.choices;
    // Setting up a loop w radio buttons
        for (var i = 0; i < choices.length; i++) {
            var possible = choices[i];
            console.log(possible);
            qString = qString + "<input type='radio' name='"+data.id+"' value="+ i +">"+possible;
        }
        return qString + "</form>";
    }
    window.formTemplate = formTemplate;
    
    // uses template to build question
    function buildQuestions(){
        var questionHTML = ''
        for (var i = 0; i<game.questions.length; i++) {
            questionHTML = questionHTML + formTemplate(game.questions[i]);
        }
        $('#questions-container').append(questionHTML);    
    }
     
    function isCorrect(question){
        var answers = $('[name='+question.id+']');
        var correct = answers.eq(question.answer);
        var isChecked = correct.is(':checked');
        return isChecked;
    }
    
    // call the buildQuestions function
    buildQuestions();
    
    // function to build the display of guesser results
    function resultsTemplate(question){
        var htmlBlock = '<div>'
        htmlBlock = htmlBlock + question.question + ': ' + isChecked;
        return htmlBlock + "</div>";
    }
    
    // function to tabulate the guesser results
    function checkAnswers (){
    
    // variables needed to hold results
        var resultsHTML = '';
        var guessedAnswers = [];
        var correct = 0;
        var incorrect = 0;
        var unAnswered =0
    
        for (var i = 0; i<game.questions.length; i++) {
            if (isCorrect(game.questions[i])) {
                correct++;
            } else {
 
                if (checkAnswered(game.questions[i])) {
                    incorrect++;
                } else {
                    unAnswered++;
                }
            }
    
        }
    
        $('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
    }
    
    // was an answer checked
    function checkAnswered(question){
        var anyAnswered = false;
        var answers = $('[name='+question.id+']');
  
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                anyAnswered = true;
            }
        }
    // returns if questions unanswered
        return anyAnswered;
    
    }
    
    
        $('#doneButton').on('click', function() {
        checkAnswers();
        stop();
        $("#messageDiv").html("Game Over!");
        })
    });