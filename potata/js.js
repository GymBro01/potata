let field={};

field.play=false;   
nX=10;
nY=10;

function chooseLvl(lvl)
{

switch (+lvl)
{
    case 1:
        document.body.innerHTML+=`<style>
        .node:hover
        {
            z-index: 11;
            scale: 1.1 1.1;
        }
        </style>
        `;
        nX=10;
        nY=10;
    break;

    case 2: 
    document.body.innerHTML+=`<style>
    .node:hover
    {
        z-index: 11;
        scale: 1.2 1.2;
    }
    </style>
    `;
        nX=15;
        nY=15;
    break

    case 3:
        document.body.innerHTML+=`<style>
        .node:hover
        {
            z-index: 11;
            scale: 1.25 1.25;
        }
        </style>
        `;
        if(window.innerHeight>window.innerWidth)
        {
        nX=16;
        nY=25;
        }
        else
        {
        nY=16;
        nX=25;        
        }
    break;
}
document.getElementById("lvl").innerHTML="";
start();
}


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
    mines=nX*nY*0.15;
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
    for(i of field.field)
    for(r of i)
    {
        r.n=r.checkB();
        if(r.n>0)
        {
            field.near++;
        document.querySelector(`[y="${r.y}"][x="${r.x}"]`).innerHTML+=`<img src="png/${+r.n}.png" alt="">`;
        }
    }
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
    }

    fill()
    {
        this.isEmpty=false;
        this.isFilled=true;
        document.querySelector(`[y="${this.y}"][x="${this.x}"]`).innerHTML+=`<img src="png/bag.png" alt="">`;
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
            {
                document.querySelector(`[y="${this.y}"][x="${this.x}"]`).innerHTML+=`<img src="png/po.png" alt="">`;    
            }
            else if(this.isNear)
            {
           field.near--;
            if(field.near==0)
            {
                WIN();
            }
            }


        document.querySelector(`[y="${this.y}"][x="${this.x}"]`).getElementsByClassName("im")[0].style.animation="anime 0.3s cubic-bezier(0.7, 0, 0.84, 0)";
        setTimeout(`document.querySelector('[y="${this.y}"][x="${this.x}"]').getElementsByClassName("bl")[0].remove()`,300);
        this.opened=true;

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
    document.getElementById("lvl").innerHTML=`<div id="lvl"><img id="bgLvl"  src="png/lvl.png" alt=""><div id="bs"><div onclick="chooseLvl(this.attributes.lvl.value)" lvl="1" class="lvlB"> <img class="nh" src="png/lvl1.png" alt=""><img class="h" src="png/lvl1H.png" alt=""></div><div onclick="chooseLvl(this.attributes.lvl.value)" lvl="2" class="lvlB"> <img class="nh" src="png/lvl2.png" alt=""><img class="h" src="png/lvl2H.png" alt=""></div><div onclick="chooseLvl(this.attributes.lvl.value)" lvl="3" class="lvlB"> <img class="nh" src="png/lvl3.png" alt=""><img class="h" src="png/lvl3H.png" alt=""></div></div></div>`;
    document.getElementById("end").innerHTML=`<img id="win" src="png/win.png" alt=""><img id="lose" src="png/lose.png" alt="">       <div onmouseover="document.getElementById('reW').style.opacity='0';document.getElementById('reL').style.opacity='0';document.getElementById('reWH').style.opacity='1';document.getElementById('reLH').style.opacity='1';" onclick="restart()" id="re"><img id="reW" src="png/reW.png" alt=""><img  id="reWH" src="png/reWH.png" alt="">    <img id="reL" src="png/reL.png" alt=""> <img id="reLH" src="png/reLH.png" alt="">  </div>`;
}

function start()
{ 

    field.html=document.getElementById("field");
    if(window.innerWidth/nX<window.innerHeight/nY)
    w=window.innerWidth/(nX+2);   
    else
    w=window.innerHeight/(nY+2);   
    field.html.style.setProperty('grid-template-columns', 'repeat(' + nX + ', '+ w +'px)');
    field.html.style.setProperty('grid-template-rows', 'repeat(' + nY + ','+ w +'px)');
    
    for(i=0;i<nY;i++)
    {
        for(r=0;r<nX;r++)
        {
    field.html.innerHTML+=`<div onclick="tap(this)" class="node" y="${i}" x="${r}"><div oncontextmenu="flag(this)" class="bl"><img class="im" src="png/fl.png" alt=""></div></div>`;
        }
    }
    
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
            field.field[i][r]=newC;

        }
    };
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
