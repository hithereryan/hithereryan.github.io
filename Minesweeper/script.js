var table = document.getElementById("grid");
var spot;
var minesLeft = 99;
var minecount = document.getElementById("minesleft");
var clicked = [];
var done = false;
var time=0;
var secSplit = 0;
var timenum;

var mines = 99;
var rows = 16;
var columns = 30;

var resetbutton = document.getElementById("reset");
setuptable()
setBombs();

function setuptable(){
  //create timer
  timenum = document.createElement("p");
  timenum.innerHTML="0";
  timenum.style.display = "none";
  timenum.style.color = "red";
  timenum.style.border = "1px solid black";
  timenum.style.width = "100px";
  document.body.insertBefore(timenum, document.getElementsByClassName("box")[0]);
  //event listeners for first click to start timer and reset button
  table.addEventListener("click", timestart, {once: true});
  resetbutton.addEventListener("click", reset, {once: false});
  // document.getElementById("easy").addEventListener("click", function(){mines = 10}, {once: false});
  // document.getElementById("intermediate").addEventListener("click", function(){mines = 10}, {once: false});
  // document.getElementById("easy").addEventListener("click", function(){mines = 10}, {once: false});
  for (var i = 0; i<rows; i++){
    //create table, rows and columns
    let tr = document.createElement("tr");
    tr.id = "row" + i;
    for (var j = 0; j<columns; j++){
      let td = document.createElement("td");
      td.id = "r" + i + "+" + j;
      //give each cell an id and set image to blank cell
      td.innerHTML="<p class = 'num' id = '" + i + "+" + j + "'>a</p> <img src='Minesweeper_unopened_square.svg.png' height = '24px' alt='hello'/>"
      tr.appendChild(td);
      //left and right click listeners calling check-cell and flag
      td.addEventListener("click", checkBomb, {once: true});
      td.addEventListener("contextmenu", rightClick, false, {once: false});
      //stores position of the td associated w event listener
      td.ax=i;
      td.ay=j;
    }
    table.appendChild(tr);
  }
}
function reset(){
  //turn done back off (done signals end of thing)
  done = true;
  minesLeft = mines;
  minecount.innerHTML= minesLeft;
  console.log(minesLeft, mines);
  for (var i = 0; i<rows; i++){
    for (var j = 0; j<columns; j++){
      let td = document.getElementById("r"+i+"+"+j);
      let tr = document.getElementById(i+"+"+j);
      //for each cell, clear event listeners and add new ones
      td.removeEventListener("click", checkBomb);
      td.removeEventListener("contextmenu", rightClick, false);
      // reset images
      td.childNodes[2].src="Minesweeper_unopened_square.svg.png"
      td.addEventListener("click", checkBomb, {once: true});
      td.addEventListener("contextmenu", rightClick, false, {once: false});
      td.ax=i;
      td.ay=j;
      tr.innerHTML="a";
    }
  }
  table.addEventListener("click", timestart, {once: true});
  setBombs();
  clicked = [];
}
function setBombs(){
  var minesplaced = 0;
  while (minesplaced < mines) {
      //random grid
      let x = Math.floor(Math.random()*rows);
      let y = Math.floor(Math.random()*columns);
      //find id
      let cell = document.getElementById(x + "+"+y);
      //check if already a bomb, if not mine ++
      if (cell.innerHTML.valueOf() !== "x".valueOf()){
        minesplaced ++;
        cell.innerHTML = "x";
      }
  }
  for (var i = 0; i<rows; i++){
    for (var j = 0; j<columns; j++){
      //for each cell
      let cell = document.getElementById(i+"+"+j);
      var mineNum = 0;
      if (cell.innerHTML === "a"){
          //if not-bomb, check the 8 surrounding and count if bombs
          for (var m = -1; m<2; m++){
              for (var n = -1; n<2; n++){
                let x = i+m;
                let y = j+n;
                if (x>= 0 && x <=15 && y >= 0 && y <=29){
                  let checkedCell = document.getElementById(x+"+"+y);
                  if (checkedCell.innerHTML.valueOf() == "x"){
                    mineNum++;

                  }
                }
              }
          }
          //save numbombs to innerhtml
          cell.innerHTML=String(mineNum);
      }
    }
  }
}

function checkBomba(bx, by){
  spot = bx+"+"+by;
  var cell = document.getElementById(spot);
  var td = document.getElementById("r"+spot);
  clicked.push(bx+","+by);
  if (cell.innerHTML === "0"){
    td.childNodes[2].src="0.png";
    for (var m = -1; m<2; m++){
        for (var n = -1; n<2; n++){
          let x = bx+m;
          let y = by+n;
          if (x>= 0 && x <=15 && y >= 0 && y <=29){
            if (clicked.includes(x+","+y) === false){
              checkBomba(x, y);
            }
          }
        }
    }
  }
  //
  else{
      td.childNodes[2].src=cell.innerHTML+".png";
  }
}

function checkBomb(e){
  bx=e.currentTarget.ax;
  by=e.currentTarget.ay;
  console.log(bx, by);
  clicked.push(bx+","+by);
  spot = bx+"+"+by;
  //get cell that is being checked
  var cell = document.getElementById(spot);
  var td = document.getElementById("r"+spot);
  if (e.which == 1){
    //if bomb
    if (td.childNodes[2].src!="file:///C:/Users/Ryan/OneDrive/Desktop/Projects/Atom%20Files/Minesweeper/flagged.png"){
      if (cell.innerHTML === "x"){
          td.childNodes[2].src="bomb.png";
          gameOver();
          done = true;
      }
      //if empty, open surrounding cells
      else if (cell.innerHTML === "0"){
        td.childNodes[2].src="0.png";
        for (var m = -1; m<2; m++){
            for (var n = -1; n<2; n++){
              let x = bx+m;
              let y = by+n;
              if (x>= 0 && x <=15 && y >= 0 && y <=29){
                if (clicked.includes(x+","+y) === false){
                  //recursive to check 8 surrounding cells and surrounding of surrounding 0s
                  checkBomba(x, y);
                }
              }
            }
        }
      }
      //if find a num, reveal
      else{
          td.childNodes[2].src=cell.innerHTML+".png";
      }
    }
  }
  //if win by clicking all boxes
  if (clicked.length == 381 && done == false){
    window.alert("congratulations! you won!");
  }
}

function gameOver(){
    window.alert("game over");
    for (var i = 0; i<rows; i++){
      for (var j = 0; j<columns; j++){
        //for each cell
        let cell = document.getElementById(i+"+"+j);
        let td = document.getElementById("r"+i+"+"+j)
        //reveal bombs
        if (cell.innerHTML === "x"){
          if (td.childNodes[2].src!="file:///C:/Users/Ryan/OneDrive/Desktop/Projects/Atom%20Files/Minesweeper/flagged.png"){
            td.childNodes[2].src="bomb.png";
          }
        }
        else{
          //if falsely flagged, show with x over it
          if (td.childNodes[2].src=="file:///C:/Users/Ryan/OneDrive/Desktop/Projects/Atom%20Files/Minesweeper/flagged.png"){
            td.childNodes[2].src="bombx.PNG";
          }
        }
      }
    }
}
function rightClick(e){
  e.preventDefault();
  var x = e.currentTarget.ax;
  var y = e.currentTarget.ay;
  td = document.getElementById("r"+x+"+"+y);
  if (clicked.includes(x+","+y)===false){
    //on click, flip between flag and unclicked. Then update mine counter
    if (td.childNodes[2].src=="file:///C:/Users/Ryan/OneDrive/Desktop/Projects/Atom%20Files/Minesweeper/flagged.png"){
      td.childNodes[2].src="Minesweeper_unopened_square.svg.png";
      minesLeft++;
    }
    else if (td.childNodes[2].src=="file:///C:/Users/Ryan/OneDrive/Desktop/Projects/Atom%20Files/Minesweeper/Minesweeper_unopened_square.svg.png"){
      td.childNodes[2].src="flagged.png";
      minesLeft -=1;
    }
    minecount.innerHTML= minesLeft;
  }
  return false;
}

function timer() {
  //every 60 sec, timer up
  if (secSplit == 60){
    time++;
    secSplit = 0;
  }
  secSplit++;
  timenum.innerHTML= "time: " + time;
  if (!done){
    window.requestAnimationFrame(timer);
  }
}
function timestart(){
  //part of start and reset. onclick, start timer, set time to 0, make it display
  done = false;
  window.requestAnimationFrame(timer);
  time = 0;
  secSplit = 0;
  timenum.style.display = "inline-block";
}
timer();
