var boxes = document.getElementById("prices").getElementsByTagName("tr");
var timer = document.getElementById("timer");
var scoreDisplay = document.getElementById("score1");
var right = document.getElementById("correct");
var wrong = document.getElementById("incorrect");
var question = document.getElementById("question");
var form = document.getElementById("form");
var name = document.getElementById("players")
var start = document.getElementById("start");
var p1Score = document.getElementById("score1");
var p2Score = document.getElementById("score2");
var p3Score = document.getElementById("score3");
var pSelect = document.getElementById("player-select");
var headers = document.getElementById("cat");
var answering = false;
var time = 30;
var secSplit = 0;
var column;
var row;
var score = 0;
var value;
var numNames = 0;
var questionsAnswered = 0;
var players = [["Player 1", 0], ["Player 2", 0], ["Player 3", 0]];

// list of questions
var questionList = [
["VIRAL CHALLENGES", "Police & fire departments across the nation are mouthing along to popular songs in these challenge", "In the Chubby Bunny challenge, you say the title phrase with as many of these fluffy sweets in your mouth as possible","Everyone was standing still to 'Black Beatles' by Rae Sremmurd in the challenge named for these dummies","The setup seen <a href='https://upload.wikimedia.org/wikipedia/commons/3/33/Charlie_Charlie_Challenge.jpg' target = '_blank'>here</a> is used to contact this ghostly boy in a spooky challenge", "In the challenge named for this film & Roald Dahl book, you try to make it look like kids have telekinetic powers"],
["MR. DWAYNE JOHNSON", "Channeling his Pacific island heritage, Dwayne was the voice of Maui in this animated movie", "In the last 4 films in this speedy franchise, Dwayne has played Luke Hobbs", "D.J. flew a rescue chopper & saved lives in this 'fault'-y disaster film", "In 'Central Intelligence', Dwayne teamed up to catch a spy with this actor of smaller stature", "Still billed as 'The Rock' in his film debut 'The Mummy Returns', Dwayne played this ruler restored to life by ancient magic"],
["PEACHY", "This dairy product is often paired with peaches to describe someone with a fair complexion", "The mushroom kingdom is the home of this bae of Mario", "The Chick-Fil-A Peach Bowl is a college football game played in this state capital", "The name of this smooth-skinned peach begins with the favored drink of the Greek gods", "Also the name of a job, it's the popular peachy dessert"],
["2018 ESPY WINNERS", "Martin Truex Jr. of this racing circuit sped away with Best Driver", "Best Player in this league was a layup for Maya Moore of the Minnesota Lynx", "Born Alexandra, this gymnast was one of the 'sister survivors' who won the Arthur Ashe Courage Award", "Alexander Ovechkin was 2018's Best Male Athlete for finally winning the Stanley Cup with this team", "Once the backup, this Eagles QB won Best Championship Performance for his work in Super Bowl 52"],
["'V'OCABULARY", "Title for the student with the highest academic ranking who delivers a speech at graduation", "It's a household appliance, or a space devoid of matter", "Hazy or unspecific", "This 8-letter word is a synonym for neighborhood","It's a member of the Camel family, seen <a href='https://upload.wikimedia.org/wikipedia/commons/5/59/Vicugna_vicugna_at_about_4%2C000m%2C_near_the_Chajnantor_Plateau%2C_NW_Chile._Simon_Green_17th_April_2018.jpg' target = '_blank'> here</a>"],
["WHERE IS THAT MOUNT", "Fuji", "Denali", "Parnassus & Helicon", "Zion & Sodom", "Phnom Aoral"]];
var answerList = [
["Lip Synch Challenges", "Marshmallows", "The Mannequin Challenge", "Charlie", "Matilda"],
["Moana", "Fast and Furious", "San Andreas", "Kevin Hart", "The Scorpion King"],
["Cream", "Princess Peach", "Atlanta", "Nectarine", "Cobbler"],
["NASCAR", "The WNBA", "Aly Raisman", "The Washington Capitals", "Nick Foles"],
["Valedictorian", "Vacuum", "Vague", "Vicinity", "Vicuna"],
["Japan", "United States", "Greece", "Israel", "Cambodia"]];
var catsUsed = [];
var override = function(){
  window.requestAnimationFrame(override);
}

var addName = function(e){
  var name = document.getElementById("players").value;
  e.preventDefault();
  if (numNames == 0){
    players[0][0] = name;
  }
  else if (numNames == 1){
    players[1][0] = name;
  }
  else{
    players[2][0] = name;
  }
  numNames ++;
  p1Score.textContent = players[0][0] + ": $" + players[0][1];
  p2Score.textContent = players[1][0] + ": $" + players[1][1];
  p3Score.textContent = players[2][0] + ": $" + players[2][1];
}
var begin = function(){
  form.style.display = "none";
  start.style.display = "none";
  for (var i = 0; i< 5; i++){
    for (var j =0; j<6; j++){
      var box = j*2+1;
      boxes[i].childNodes[box].addEventListener("click", callQuestion, {once: true});
    }
  }
  for (var k = 0; k<6; k++){
    var cat = Math.floor(Math.random()*questionList.length);
    catsUsed.push(questionList[cat]);
    questionList.splice(cat, 1);
    headers.childNodes[2*k+1].textContent = catsUsed[k][0];
  }
  for (var k = 0; k<6; k++){
    questionList.unshift(catsUsed[5-k]);
  }
  console.log(catsUsed, questionList);
}

var callQuestion = function(e){
  var text = document.getElementById("text");
  //currently showing the question
  answering = true;
  //show the timer
  timer.style.display = "block";
  //math for what box cursor was in
  column = Math.floor(e.clientX/(window.innerWidth * 0.1666));
  row = Math.floor((e.clientY-270)/90);
  // declaring and styling the question
  question.style.display = "block";
  right.style.display = "none";
  wrong.style.display = "none";
  pSelect.style.display = "none";
  var box = column*2+1;
  text.innerHTML = questionList[column][row+1];
  console.log(column);
  boxes[row].childNodes[box].innerHTML = "";
  value = boxes[row].className;
  text.style.top = "110px";
  time = 30;
  secSplit = 0;
  question.addEventListener("click", answer, {once: true});
  questionsAnswered += 1;
}
var answer = function(){
  answering = false;
  text.innerHTML = answerList[column][row];
  text.style.top = "160px";
  timer.style.display = "none";
  pSelect.style.display = "block";
  right.style.display = "block";
  wrong.style.display = "block";
  right.addEventListener("click", close, {once: true});
  wrong.addEventListener("click", close, {once: true});
  right.addEventListener("click", calcScore, {once: true});
  wrong.addEventListener("click", calcScore, {once: true});
}
var close = function(){
  question.style.display = "none";
  if (questionsAnswered == 30){
    showWinner();
  }
}
var startTimer = function(){
  if (time >= 10) {
    timer.textContent = "00:"+ time;
  }
  else{
    timer.textContent = "00:0" + time;
  }
  if (time > 0 && answering == true  && secSplit == 60){
    time --;
    secSplit = 1;
  }
  else {
    secSplit ++;
  }
  if (time == 0){
    answer();
  }
  window.requestAnimationFrame(startTimer);
}
var calcScore = function (){
  if (this.value == "correct"){
    if (pSelect.value == "p1"){
      players[0][1] += parseFloat(value);
    }
    else if (pSelect.value == "p2"){
      players[1][1] += parseFloat(value);
    }
    else if (pSelect.value == "p3"){
      players[2][1] += parseFloat(value);
    }
    wrong.removeEventListener("click", calcScore);
    wrong.removeEventListener("click", close);
  }
  else if (this.value == "incorrect"){
    if (pSelect.value == "p1"){
      players[0][1] -= parseFloat(value);
    }
    else if (pSelect.value == "p2"){
      players[1][1] -= parseFloat(value);
    }
    else if (pSelect.value == "p3"){
      players[2][1] -= parseFloat(value);
    }
    right.removeEventListener("click", calcScore);
    right.removeEventListener("click", close);
  }
  p1Score.textContent = players[0][0] + ": $" + players[0][1];
  p2Score.textContent = players[1][0] + ": $" + players[1][1];
  p3Score.textContent = players[2][0] + ": $" + players[2][1];
}
var showWinner = function(){
  var winner = "";
  if (Math.max(players[0][1], players[1][1], players[2][1]) == players[0][1]){
    winner = winner + players[0][0] + " "
  }
  if (Math.max(players[0][1], players[1][1], players[2][1]) == players[1][1]){
    winner = winner + players[1][0] + " "
  }
  if (Math.max(players[0][1], players[1][1], players[2][1]) == players[2][1]){
    winner = winner + players[2][0] + " "
  }
  var reward = document.getElementById("reward");
  reward.style.display = "block";
  var won = document.getElementById("winner");
  won.textContent = "1st Place: " + winner;
}

form.addEventListener("submit", addName);
start.addEventListener("click", begin, {once: true});
startTimer();
override();
