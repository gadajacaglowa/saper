function Cell(i,j, siz) {
  this.i = i;
  this.j = j;
  this.siz = siz;
  this.x = this.i * this.siz;
  this.y = this.j * this.siz;
  this.mina = false;
  this.odkryty = false;
  this.ile = 0;
  this.flag = false;
}

Cell.prototype.Render = function() {
  rect(this.x,this.y,this.siz,this.siz);
  if(this.odkryty) {
    push();
    fill(200);
    rect(this.x,this.y,this.siz,this.siz);
    pop();
    if(this.mina) {
      push();
      fill(200,45,10);
      ellipse(this.x+this.siz/2,this.y+this.siz/2, 8);
      pop();
    }
    else if(this.ile > 0) {
      textSize(20/kol*19 );
      textAlign(CENTER);
      text(this.ile,this.x+this.siz/2,this.y+this.siz/2+6);
    }
  }
  else if (this.flag) {
    push();
    fill(244,0,0);
    rect(this.x+this.siz/4,this.y+this.siz/4,this.siz/2,this.siz/2);
    pop();
  }
};

Cell.prototype.Klik = function (mx,my, cell, k) {
    if(mx > this.x && mx < this.x+this.siz && my > this.y && my < this.y+this.siz) {
      if(k == 1) {  // lewy przycisk
        this.odkryty = true;
        if(this.mina) {
          stop = true;
          win = false;
        }
       else Wypeln(this,cell);
      }
      else { // prawy przycisk

        if(this.flag && !this.odkryty) {
          this.flag = false;
          ++iloscBomb;
        }
        else if(!this.odkryty) {
          this.flag = true;
          --iloscBomb;
        }
      }
    }
};

Cell.prototype.Count = function (cell)  {
  var totalC = 0;
  if(this.mina) {
    this.ile = -1;
    return;
  }
  else {
    for(var xoff = this.i-1; xoff <= this.i+1 ; ++xoff ) {
      for(var yoff = this.j-1; yoff <= this.j+1 ; ++yoff ) {
        if(xoff >= 0 && xoff < wier && yoff >= 0 && yoff < kol ) {
          if (cell[xoff][yoff].mina) ++totalC;
        }
      }
    }
  }
  this.ile = totalC;
};

function Wypeln(n,cell) { // wypelnianie zer
  if (n.ile == 0) {
    for(var xff = n.i-1; xff <= n.i+1 ; ++xff ) {
      for(var yff = n.j-1; yff <= n.j+1 ; ++yff ) {
        if(xff >= 0 && xff < wier && yff >= 0 && yff < kol && !cell[xff][yff].odkryty ) {
          cell[xff][yff].odkryty = true;
          Wypeln(cell[xff][yff],cell);
        }
      }
    }
  } else return;
}
