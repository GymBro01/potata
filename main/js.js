localStorage.setItem("x",10);
localStorage.setItem("y",10);
localStorage.setItem("water",9);
fl=JSON.stringify([
"oollllllll",
"oollllllll",
"llllllllll",
"llllllllll",
"llllllllll",
"llllllllll",
"llllllllll",
"llllllllll",
"llllllllll",
"llllllllll"
]);
localStorage.setItem("field", fl);
fild=JSON.parse(localStorage.field);


class cell
{
    constructor(y,x)
    {
        this.open=false;
        this.diged=false;
        this.dirt=false;
        this.x=x;
        this.y=y;
        this.grass=true;
        this.seeded=false;
        this.wet=false;
    }

    fill()
    {
        this.isEmpty=false;
        this.isFilled=true;
        document.querySelector(`[y="${this.y}"][x="${this.x}"]`).innerHTML+=`<img src="png/bag.png" alt="">`;
    }

    dig()
    {      
        if(!this.diged)
        {
        document.querySelector(`[y="${this.y}"][x="${this.x}"]`).innerHTML=`<img class="d" src="png/nodeDD.png" alt="">`+ document.querySelector(`[y="${this.y}"][x="${this.x}"]`).innerHTML;
        document.querySelector(`[y="${this.y}"][x="${this.x}"]`).getElementsByClassName("g")[0].style.animation="anime 0.3s cubic-bezier(0.7, 0, 0.84, 0)";
        setTimeout(`document.querySelector('[y="${this.y}"][x="${this.x}"]').getElementsByClassName("g")[0].remove()`,300);
        this.opened=true;
        }
    }
   
}

let tool="n";
let choosed=1;
let field={x:+localStorage.x, y:+localStorage.y, field:[], water:9, coins:localStorage.coins}

function printField()
{
    field.html=document.getElementById("field");
    if(window.innerWidth*0.94/field.x<window.innerHeight*0.81/field.y)
    wid=Math.floor(window.innerWidth*0.94/(field.x+2));   
    else
    wid=Math.floor(window.innerHeight*0.81/(field.y+2));   
    field.html.style.width=`${wid*field.x}px`;
    field.html.style.height=`${wid*field.y}px`;
    field.html.style.marginRight=`${wid}px`;
    field.html.style.setProperty('grid-template-columns', 'repeat(' + field.x + ', '+ wid +'px)');
    field.html.style.setProperty('grid-template-rows', 'repeat(' + field.y + ','+ wid +'px)');
    
    for(i=0;i<field.y;i++)
    {
        field.field.push([]);
        for(r=0;r<field.x;r++)
        {
            newC=new cell(i,r);
            field.field[i][r]=newC;
            if(fild[i][r]=='o')
            {
                
            field.html.innerHTML+=`<div onclick="if(event.target.nodeName=='IMG') tap(event.target.offsetParent);else tap(event.target)" class="bl2" y="${i}" x="${r}"><img class="g" src="png/nodeG.png" alt=""></div>`;
            }
            else
            {
            field.field[i][r].open=true;
            field.html.innerHTML+=`<div onclick="if(event.target.nodeName=='IMG') tap(event.target.offsetParent);else tap(event.target)" class="bl2" y="${i}" x="${r}"><img class="g" src="png/nodeL.png" alt=""></div>`;
            }
        }
    }

    document.body.innerHTML=document.body.innerHTML.replace("wtf", `${field.water}`);
}

function choose(x)
{
    elem=document.getElementsByClassName("scl")[0];
    if(elem!=undefined)
    {
    tool="n";
    elem.classList.remove("scl");
    }
    document.getElementsByClassName("nepon")[0].attributes.class.value="pon";
    x.attributes.class.value="nepon";
    choosed=x.attributes.x.value;
    switch (choosed)
    {
        case '1':
            document.getElementById(`container1`).classList.remove("op0");
            document.getElementById(`container2`).classList.remove("op1");
            document.getElementById(`container3`).classList.remove("op1");
            document.getElementById(`container3`).classList.add("op0");
            document.getElementById(`container2`).classList.add("op0");
            document.getElementById(`container1`).classList.add("op1");
        break;
        case '2':
            document.getElementById(`container2`).classList.remove("op0");
            document.getElementById(`container1`).classList.remove("op1");
            document.getElementById(`container3`).classList.remove("op1");
            document.getElementById(`container1`).classList.add("op0");
            document.getElementById(`container3`).classList.add("op0");
            document.getElementById(`container2`).classList.add("op1");
        break;
        case '3':
            document.getElementById(`container3`).classList.remove("op0");
            document.getElementById(`container1`).classList.remove("op1");
            document.getElementById(`container2`).classList.remove("op1");
            document.getElementById(`container1`).classList.add("op0");
            document.getElementById(`container2`).classList.add("op0");
            document.getElementById(`container3`).classList.add("op1");
        break;
    }
    
    update();
}

function update()
{
    
}

function getTool(ele)
{   
    document.getElementById('m').classList.add("op0");
    document.getElementById('m').classList.remove("op1");
    document.getElementById('v').classList.add("op0");
    document.getElementById('v').classList.remove("op1");
    document.getElementById('l').classList.add("op0");
    document.getElementById('l').classList.remove("op1");
    t=document.getElementsByClassName("tool");
    t[0].classList.remove("scl");
    t[1].classList.remove("scl");
    t[2].classList.remove("scl");
    switch (ele.target.offsetParent.attributes.id.value)
    {
        case "motiga":
            if(tool!="m")
            {
                document.getElementById('m').classList.add("op1");
                document.getElementById('m').classList.remove("op0");
                t[0].classList.add("scl");
                tool="m";
            }
            else
            {
                tool="n";
            }
        break;


        case "vedro":
            if(tool!="v")
            {
                document.getElementById('v').classList.add("op1");
                document.getElementById('v').classList.remove("op0");
                t[1].classList.add("scl");
                tool="v";
            }
            else
            {
                tool="n";
            }
        break;


        case "lopata":
            if(tool!="l")
            {
                document.getElementById('l').classList.add("op1");
                document.getElementById('l').classList.remove("op0");
                t[2].classList.add("scl");
                tool="l";
            }
            else
            {
                tool="n";
            }
        break;


        default:
        break;
    }


}

document.getElementById("container2").addEventListener("mouseleave",(event)=>
{
    document.getElementById("tl").classList.remove("op1");
    document.getElementById("tl").classList.add("op0");
});
document.getElementById("container2").addEventListener("mouseenter",()=>
{
    document.getElementById("tl").classList.remove("op0");
    document.getElementById("tl").classList.add("op1");
});
let lol=document.getElementById("container2").querySelectorAll("img");
for(i of lol)
{
    i.addEventListener("mouseenter",()=>
{
    document.getElementById("tl").classList.remove("op0");
    document.getElementById("tl").classList.add("op1");
});
}
document.body.addEventListener("mousemove",(event)=>
{
    document.getElementById("tl").style.left=`${event.pageX+1}px`;
    document.getElementById("tl").style.top=`${event.pageY}px`;
    
});

function tap(el)
{
    x=el.attributes.x.value;
    y=el.attributes.y.value;
    switch (tool)
    {
        case "l":
            if(field.field[y][x].grass==true)
            {
            field.field[y][x].grass=false;
            field.field[y][x].dirt=true;
            document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML=document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML.replace("G","N");
            }
            else if(field.field[y][x].seeded==true)
            {
            field.field[y][x].seeded=false;
            field.field[y][x].dirt=true;
            document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML=document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML.replace("S","N");
            }
            else if(field.field[y][x].diged==true)
            {
                if(field.field[y][x].wet==true)
                {
                field.field[y][x].diged=false;
                field.field[y][x].wet=false;
                field.field[y][x].dirt=true;
                document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML=document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML.replace("DW","N");
                }
                else
                {
                field.field[y][x].diged=false;
                field.field[y][x].dirt=true;
                document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML=document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML.replace("DD","N");
                }
            }
        break;

        case "m":
            if(field.field[y][x].seeded==true)
            {
            field.field[y][x].seeded=false;
            field.field[y][x].diged=true;
            document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML=document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML.replace("S","DD");
            }
            else if(field.field[y][x].dirt==true)
            {
            field.field[y][x].dirt=false;
            field.field[y][x].diged=true;
            document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML=document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML.replace("N","DD");
            }
        break;

        case "v":
        if(field.water>0)
        {
            if(field.field[y][x].seeded==true&&field.field[y][x].wet==false)
            {
            field.field[y][x].wet=true;
            document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML=document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML.replace("DD","DW");
            field.water--;
            }
            else if(field.field[y][x].diged==true&&field.field[y][x].wet==false)
            {
            field.field[y][x].wet=true;
            document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML=document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML.replace("DD","DW");
            field.water--;
            }
            document.getElementById("vn").attributes.src.value=`png/${field.water}.png`;
        }
        break;
    
        default:
        break;
    }
}

update();
printField();