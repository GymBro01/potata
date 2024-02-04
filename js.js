let nX=5;
let nY=5;
let field={};

function WIN()
{
    document.getElementById("re").style.width="11%";
    document.getElementById("re").style.height="11%";
    document.getElementById("reW").style.width="100%";
    document.getElementById("reW").style.height="100%";
    document.getElementById("reWH").style.width="100%";
    document.getElementById("reWH").style.height="100%";
    for(i of field.bags)
    {
        i.open();
    }
    setTimeout(`
    document.getElementById("win").style.height="100%";
    document.getElementById("win").style.width="100%";
    field.play=false;
    document.getElementById("end").style.animation="end 1s cubic-bezier(0.7, 0, 0.84, 0)";
    setTimeout('document.getElementById("end").style.scale="1 1"; document.getElementById("re").style.opacity="1";document.getElementById("reW").style.opacity="1";',1000)`,1000);
}

function LOSE()
{
    document.getElementById("re").style.width="11%";
    document.getElementById("re").style.height="11%";
    document.getElementById("reL").style.width="100%";
    document.getElementById("reL").style.height="100%";
    document.getElementById("reLH").style.width="100%";
    document.getElementById("reLH").style.height="100%";
    for(i of field.bags)
    {
        i.open();
    }
    setTimeout(`
    document.getElementById("lose").style.height="100%";
    document.getElementById("lose").style.width="100%";
    field.play=false;
    document.getElementById("end").style.animation="end 1s cubic-bezier(0.7, 0, 0.84, 0)";
    setTimeout('document.getElementById("end").style.scale="1 1"; document.getElementById("re").style.opacity="1";document.getElementById("reL").style.opacity="1";',1000)`,1000);
}

function rand(max) {
    return Math.floor(Math.random() * max);
  }
 
  function spawn(r,c)
  {
    mines=(2*nX+2*nY)/1.8;
    while(mines>0)
    {
             fail=false;
             m=rand(nX);
             n=rand(nY);       
        if(field.field[n][m].isEmpty)
        {
            for(i=+r-1;+i<=+r+1;+i++)
            {
                for(w=+c-1;+w<=+c+1;+w++)
                {
                    if(n==i&&m==w)
                    {
                       fail=true;
                    }
                }
            }
            if(fail)
            {
                continue;
            }
            
            mines--;
            field.field[n][m].fill();
            field.bags.push( field.field[n][m]);
        }
    }
    for(i=0;i<nY;i++)
    {
        for(r=0;r<nX;r++)
        {
            n=field.field[i][r].checkB();
             if(n>0)
            {
                field.near++;
              
            }
        }
    }
           
    }

  function flag(val)
  {

    x=val.parentElement.attributes.x.value;
    y=val.parentElement.attributes.y.value;
    field.html.querySelector(`[x="${x}"][y="${y}"]`).getElementsByClassName("bl")[0].innerHTML=field.html.querySelector(`[x="${x}"][y="${y}"]`).getElementsByClassName("bl")[0].innerHTML.replace("fl","mark");
  }

  function fTap(val)
  { 
    isF=false;
    spawn(val.attributes.y.value,val.attributes.x.value);
  }
 
 class cell
 {
    constructor(y,x)
    {
        this.opened=false;
        this.x=x;
        this.y=y;
        this.isEmpty=true;
        this.isFilled=false;
        this.isNear=false;
        field.html.innerHTML+=`<div onclick="tap(this)" class="node" y="${y}" x="${x}"><div oncontextmenu="flag(this)" class="bl"><img class="im" src="png/fl.png" alt=""></div></div>`;
    }


    fill()
    {
        this.isEmpty=false;
        this.isFilled=true;
    }

    checkB()
    {
        let n=0;
        if(!this.isFilled)
        for(let u=-1;u<2;u++)
            {
                 if(this.y==0&&u==-1)
                    u=0;
                    if(this.y==nY-1&&u==1)
                    continue;
                for(let p=-1;p<2;p++)
                {
                    if(u==0&&p==0)
                    continue;
                    if(this.x==0&&p==-1)
                    p=0;
                    if(this.x==nX-1&&p==1)
                    break;
                    if(field.field[this.y+u][this.x+p].isFilled)
                    {
                        n++;
                        this.isNear=true;
                        this.isEmpty=false;
                    }
                }
        }
        return n;
    }

    open()
    {
        if(!this.opened)
        {
            if(this.isEmpty)
            document.querySelector(`[y="${this.y}"][x="${this.x}"]`).innerHTML+='<img src="png/po.png" alt="">'
            else if(this.isFilled)
            document.querySelector(`[y="${this.y}"][x="${this.x}"]`).innerHTML+='<img src="png/bag.png" alt="">'
            else if(this.isNear)
            document.querySelector(`[y="${this.y}"][x="${this.x}"]`).innerHTML+='<img src="png/bag.png" alt="">'
            
        document.querySelector(`[y="${this.y}"][x="${this.x}"]`).getElementsByClassName("im")[0].style.animation="anime 0.3s cubic-bezier(0.7, 0, 0.84, 0)";
        setTimeout(`document.querySelector('[y="${this.y}"][x="${this.x}"]').getElementsByClassName("bl")[0].remove()`,300);
        this.opened=true;
        if(this.isNear)
        {
            field.near--;
            if(field.near==0)
            {
                WIN();
            }
        }
        }
    }
    openArea()
    {
        this.open();
        if(this.y-1!=-1)
        {
            if(field.field[this.y-1][this.x].isEmpty)
            {
            if(!field.field[this.y-1][this.x].opened)
            field.field[this.y-1][this.x].openArea();
            }
            else
            {
                field.field[this.y-1][this.x].open();
            }
            

        }
        if(this.y+1!=nY)
        {
            if(field.field[this.y+1][this.x].isEmpty)
            {
            if(!field.field[this.y+1][this.x].opened)
            field.field[this.y+1][this.x].openArea();
            }
            else
            {
                field.field[this.y+1][this.x].open();
            }
        }
        if(this.x-1!=-1)
        {
            if(field.field[this.y][this.x-1].isEmpty)
            {
            if(!field.field[this.y][this.x-1].opened)
            field.field[this.y][this.x-1].openArea();
            }
            else
            {
                field.field[this.y][this.x-1].open();
            }
        }
        if(this.x+1!=nX)
        {
            if(field.field[this.y][this.x+1].isEmpty)
            {
            if(!field.field[this.y][this.x+1].opened)
            field.field[this.y][this.x+1].openArea();
            }
            else
            {
                field.field[this.y][this.x+1].open();
            }
        }
        if(this.x+1!=nX&&this.y+1!=nY)
        {
            if(field.field[this.y+1][this.x+1].isEmpty)
            {
            if(!field.field[this.y+1][this.x+1].opened)
            field.field[this.y+1][this.x+1].openArea();
            }
            else
            {
                field.field[this.y+1][this.x+1].open();
            }
        }
        if(this.x-1!=-1&&this.y-1!=-1)
        {
            if(field.field[this.y-1][this.x-1].isEmpty)
            {
            if(!field.field[this.y-1][this.x-1].opened)
            field.field[this.y-1][this.x-1].openArea();
            }
            else
            {
                field.field[this.y-1][this.x-1].open();
            }
        }
        if(this.x+1!=nX&&this.y-1!=-1)
        {
            if(field.field[this.y-1][this.x+1].isEmpty)
            {
            if(!field.field[this.y-1][this.x+1].opened)
            field.field[this.y-1][this.x+1].openArea();
            }
            else
            {
                field.field[this.y-1][this.x+1].open();
            }
        }
        if(this.x-1!=-1&&this.y+1!=nY)
        {
            if(field.field[this.y+1][this.x-1].isEmpty)
            {
            if(!field.field[this.y+1][this.x-1].opened)
            field.field[this.y+1][this.x-1].openArea();
            }
            else
            {
                field.field[this.y+1][this.x-1].open();
            }
        }
    }
 }
function restart()
{
    
    document.getElementById("field").innerHTML="";
    document.getElementById("end").innerHTML=`<img id="win" src="png/win.png" alt=""><img id="lose" src="png/lose.png" alt="">       <div onmouseover="document.getElementById('reW').style.opacity='0';document.getElementById('reL').style.opacity='0';document.getElementById('reWH').style.opacity='1';document.getElementById('reLH').style.opacity='1';" onclick="restart()" id="re"><img id="reW" src="png/reW.png" alt=""><img  id="reWH" src="png/reWH.png" alt="">    <img id="reL" src="png/reL.png" alt=""> <img id="reLH" src="png/reLH.png" alt="">  </div>`;
    start();
}

function start()
{ 
     
    let lvl=3;
   switch(lvl)
   {
       case 1:
       {
           nX=10;
           nY=10;
            break;
       }
       case 2:
       {
           if(window.innerWidth>window.innerHeight)
           {
            nX=20;
            nY=10;
           }
           else if(window.innerWidth<window.innerHeight)
           {
            nX=10;
            nY=20;
           }
           else
           {
            nX=14;
            nY=14;
           }

           break;
       }
       case 3:
       {
           nX=20;
           nY=20;
           break;
       }
   }
  field.html=document.getElementById("field");
        w=0;
    if(window.innerWidth>window.innerHeight&&window.innerWidth/(nX+2)*(nY+2)<=window.innerHeight)
    {
        w=window.innerWidth/(nX+2);
    }
    else
    {
        w=window.innerHeight/(nY+2);
    }
    field.html.style.setProperty('grid-template-columns', 'repeat(' + nX + ', '+w+'px)');
    field.html.style.setProperty('grid-template-rows', 'repeat(' + nY + ','+w+'px)');
    field.html.style.width=`${w*nX}px`;
    field.html.style.height=`${w*nY}px`;
  
    localStorage.setItem("auf",15);
    field.bags=[];
    field.play=true;
    isF=true;    
    field.field=[];
    for(i=0;i<nY;i++)
    {
        field.field.push([]);
    }
    field.near=0;
    for(i=0;i<nY;i++)
    {
        for(r=0;r<nX;r++)
        {
            newC=new cell(i,r);
            field.field[i].push(newC);

        }
    }

}



function tap(val)
{
    if(field.play)
    {
    if(val.querySelector('img[src="png/mark.png"]')==undefined)
    {
    if(isF)
    {
    x=val.attributes.x.value;
    y=val.attributes.y.value;
    fTap(val);
    field.field[y][x].open();
    }
    else
    {
            x=val.attributes.x.value;
            y=val.attributes.y.value;
    }
    
    if(field.field[y][x].isNear)
    {
        field.field[y][x].open();
    }
    else if(field.field[y][x].isEmpty)
    {
        field.field[y][x].openArea();
    }
    if(field.field[y][x].isFilled)
    {
       LOSE();
    }

    }
    else
    {
        field.html.querySelector(`[y="${val.attributes.y.value}"][x="${val.attributes.x.value}"]`).innerHTML=field.html.querySelector(`[y="${val.attributes.y.value}"][x="${val.attributes.x.value}"]`).innerHTML.replace('mark','fl');
    }
    }   
}


start();



function reWH(x)
{
    x.style.width="0";
    document.getElementById("reWH").style.opacity="1";
}
function reW(x)
{
    x.style.width="0";
    document.getElementById("reW").style.opacity="1";
}