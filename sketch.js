var wier=20;
var kol=20;
var bomby=70;
var siz;
var w = 600;
var h = 600;
var button;
var iloscBomb = bomby;
var tekst;
var stop = false;
var win = false;
var lop = true;
var ekran;
var input;
var roz;
var pole;
var time, delta = 0;
var i=0;

function setup() {
  ekran =createCanvas(w+1,h+1);
  ekran.parent('#cialo');
  input = createInput(bomby);
  roz = createInput(kol);
  tekst = select('#wynik');
  button = createButton('RESET');
  button.parent('#reset');
  roz.parent('#reset');
  input.parent('#reset');
  button.mousePressed(Reset);
  Reset();
  clear();
  for(var i = 0; i< wier ; ++i ) {
    for(var j = 0; j< kol ; ++j ) {
      pole[i][j].Render();
    }
  }
}

function draw() {
   tekst.html('Czas: ' + time + ' Pozostalo bomb: ' + iloscBomb);
   if (!stop && lop) {
       time = floor(millis()/1000) - delta;
   }
   else if(lop){
     if(win) {
     for(var i = 0; i< wier ; ++i ) {
       for(var j = 0; j< kol ; ++j ) {
         if(pole[i][j].mina) {
           pole[i][j].flag=true;
           pole[i][j].odkryty=false;
         }
         pole[i][j].Render();
       }
     }
    push();
    fill(0,0,255);
    textSize(40);
    textAlign(CENTER)
    text('UDALO CI SIE',width/2,height/2);
    pop();
  }
    else {
      for(var i = 0; i< wier ; ++i ) {
        for(var j = 0; j< kol ; ++j ) {
          pole[i][j].odkryty = true;
          pole[i][j].Render();
        }
      }
    }
    lop = false;
  }
}


function mousePressed(){
  if(mouseButton == LEFT  && !stop) {
    for(var i = 0; i< wier ; ++i ) {
      for(var j = 0; j< kol ; ++j ) {
        if(!pole[i][j].flag) pole[i][j].Klik(mouseX,mouseY, pole,1);
      }
    }
  }
  else if (mouseButton == RIGHT && !stop) {
    for(var i = 0; i< wier ; ++i ) {
      for(var j = 0; j< kol ; ++j ) {
        pole[i][j].Klik(mouseX,mouseY, pole,-1);
      }
    }
    if(Wygrana()) {
      stop=true;
    }
  }
  clear();
  for(var i = 0; i< wier ; ++i ) {
    for(var j = 0; j< kol ; ++j ) {
      pole[i][j].Render();
    }
  }
}




function Los(ile,kol,wier,cell) {
  var total = 0;
  var x = [];
  var y = [];
  for(var i = 0; i<ile ; ++ i) {
    do {
      x[i] = floor(random(wier));
      y[i] = floor(random(kol));
    }while(powt(total,x[i],y[i],x,y));
    pole[x[i]][y[i]].mina = true;
    ++total;
  }

}


function powt(total,a,b,x,y) {
  for(var i = 0; i < total ; ++i ){
    if(a == x[i] && b == y[i]  ) return true;
  }
  return false;
}

function gameOver() {
  time = floor(millis()/1000) - delta;
  for(var i = 0; i< wier ; ++i ) {
    for(var j = 0; j< kol ; ++j ) {
      pole[i][j].odkryty = true;
    }
  }
}

function Reset(){
  win = false;
  lop = true;
  delta = floor(millis()/1000);
  if(input.value()<= wier*kol)   bomby = input.value();
  wier = roz.value();
  kol = roz.value();
  pole = new Array(kol);
  for(var i = 0 ; i < kol; ++ i) {
    pole[i] = new Array(wier);
  }
  siz = w/wier;
  iloscBomb = bomby;
  stop = false;
  for(var i = 0; i< wier ; ++i ) {
    for(var j = 0; j< kol ; ++j ) {
      pole[i][j] = new Cell(i,j, siz);
    }
  }
    Los(bomby,kol,wier,pole);
    for(var i = 0; i< wier ; ++i ) {
      for(var j = 0; j< kol ; ++j ) {
        pole[i][j].Count(pole);
      }
    }
}

function Wygrana() {
  win =true;
  var totalW = 0;
  for(var i = 0; i< wier ; ++i ) {
    for(var j = 0; j< kol ; ++j ) {
      if( ( pole[i][j].flag && !pole[i][j].mina ) || ( !pole[i][j].flag && pole[i][j].mina ) ) return false;
    }
  }
  return true;
}
