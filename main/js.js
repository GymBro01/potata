
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
        this.lvl=0;
        this.psheno=false;
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

if(localStorage.field==undefined)
{
    printField();
}
else
{
    let field=JSON.parse(localStorage.field);
    field.html=document.getElementById("field");
document.getElementById("cnN").innerText=field.coins;
document.getElementById("kvN").innerText=field.kvas;
    if(window.innerWidth*0.94/10<window.innerHeight*0.81/10)
    wid=Math.floor(window.innerWidth*0.94/(10+2));   
    else
    wid=Math.floor(window.innerHeight*0.81/(10+2));   
    field.html.style.width=`${wid*10}px`;
    field.html.style.height=`${wid*10}px`;
    field.html.style.marginRight=`${wid}px`;
    field.html.style.setProperty('grid-template-columns', 'repeat(' + 10 + ', '+ wid +'px)');
    field.html.style.setProperty('grid-template-rows', 'repeat(' + 10 + ','+ wid +'px)');
    for(i=0;i<10;i++)
        {
            for(r=0;r<10;r++)
            {
                if(field.field[i][r].open)
                {
                if(field.field[i][r].dirt)
                field.html.innerHTML+=`<div onclick="if(event.target.nodeName=='IMG') tap(event.target.offsetParent);else tap(event.target)" class="bl2" y="${i}" x="${r}"><img class="g" src="png/nodeN.png" alt=""></div>`;
                else if(field.field[i][r].grass)
                field.html.innerHTML+=`<div onclick="if(event.target.nodeName=='IMG') tap(event.target.offsetParent);else tap(event.target)" class="bl2" y="${i}" x="${r}"><img class="g" src="png/nodeG.png" alt=""></div>`;
                else if(field.field[i][r].diged)
                    {
                        if(field.field[i][r].wet)
                    field.html.innerHTML+=`<div onclick="if(event.target.nodeName=='IMG') tap(event.target.offsetParent);else tap(event.target)" class="bl2" y="${i}" x="${r}"><img class="g" src="png/nodeDW.png" alt=""></div>`;
                        else
                    field.html.innerHTML+=`<div onclick="if(event.target.nodeName=='IMG') tap(event.target.offsetParent);else tap(event.target)" class="bl2" y="${i}" x="${r}"><img class="g" src="png/nodeDD.png" alt=""></div>`;
                    }
                else if(field.field[i][r].seeded)
                    field.html.innerHTML+=`<div onclick="if(event.target.nodeName=='IMG') tap(event.target.offsetParent);else tap(event.target)" class="bl2" y="${i}" x="${r}"><img class="g" src="png/node${field.field[i][r].lvl}.png" alt=""></div>`;
                else if(field.field[i][r].psheno)
                    field.html.innerHTML+=`<div onclick="if(event.target.nodeName=='IMG') tap(event.target.offsetParent);else tap(event.target)" class="bl2" y="${i}" x="${r}"><img class="g" src="png/nodePSH.png" alt=""></div>`;
                }
                else
                {
                field.html.innerHTML+=`<div onclick="if(event.target.nodeName=='IMG') tap(event.target.offsetParent);else tap(event.target)" class="bl2" y="${i}" x="${r}"><img class="g" src="png/nodeL.png" alt=""></div>`;
                }
            }
        }
}

function printField()
{
    let field={};
    field.field=[];
    field.coins=0;
    field.water=0;
    field.lvl=0;
    field.seeds=0;
    field.kvas=0;
    field.psheno=0;
    field.html=document.getElementById("field");
    document.getElementById("cnN").innerText=field.coins;
    document.getElementById("kvN").innerText=field.kvas;
        if(window.innerWidth*0.94/10<window.innerHeight*0.81/10)
        wid=Math.floor(window.innerWidth*0.94/(10+2));   
        else
        wid=Math.floor(window.innerHeight*0.81/(10+2));   
        field.html.style.width=`${wid*10}px`;
        field.html.style.height=`${wid*10}px`;
        field.html.style.marginRight=`${wid}px`;
        field.html.style.setProperty('grid-template-columns', 'repeat(' + 10 + ', '+ wid +'px)');
        field.html.style.setProperty('grid-template-rows', 'repeat(' + 10 + ','+ wid +'px)');
    for(i=0;i<10;i++)
    {
        field.field.push([]);
        for(r=0;r<10;r++)
        {
            newC=new cell(i,r);
            field.field[i][r]=newC;
            if(i<=1&&r<=1)
            {
                field.field[i][r].open=true;
            field.html.innerHTML+=`<div onclick="if(event.target.nodeName=='IMG') tap(event.target.offsetParent);else tap(event.target)" class="bl2" y="${i}" x="${r}"><img class="g" src="png/nodeG.png" alt=""></div>`;
            }
            else
            {
            field.field[i][r].open=false;
            field.html.innerHTML+=`<div onclick="if(event.target.nodeName=='IMG') tap(event.target.offsetParent);else tap(event.target)" class="bl2" y="${i}" x="${r}"><img class="g" src="png/nodeL.png" alt=""></div>`;
            }
        }
    }
    localStorage.setItem("field",JSON.stringify(field));
}



let tool="n";
let choosed=1;
let field=JSON.parse(localStorage.field);

   


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
    document.getElementById("vn").src=`png/${field.water}.png`;
    document.getElementById("sn").src=`png/${field.seeds}.png`;
    document.getElementById("cnN").innerText=field.coins;
    document.getElementById("kvN").innerText=field.kvas;
    localStorage.setItem("field",JSON.stringify(field));
}

function getTool(ele)
{   
    t=document.getElementsByClassName("tool");
    t[0].classList.remove("scl");
    t[1].classList.remove("scl");
    t[2].classList.remove("scl");
    t[3].classList.remove("scl");
    switch (ele.target.offsetParent.attributes.id.value)
    {
        case "motiga":
            if(tool!="m")
            {
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
                t[2].classList.add("scl");
                tool="l";
            }
            else
            {
                tool="n";
            }
        break;


        case "seed":
            if(tool!="s")
            {
                t[3].classList.add("scl");
                tool="s";
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






function tap(el)
{
    field.coins+=50;
    x=el.attributes.x.value;
    y=el.attributes.y.value;
    switch (tool)
    {
        case "l":
            if(field.field[y][x].seeded)
                {
                    field.field[y][x].seeded=false;
                    field.field[y][x].dirt=true;
                    document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML=document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML.replace(`${field.field[y][x].lvl}`,"N");
                    field.field[y][x].lvl=0;
                }
            else if(field.field[y][x].grass==true)
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
            if(field.field[y][x].seeded)
                break;
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
            if(field.field[y][x].seeded==true&&field.field[y][x].lvl<5)
            {
            document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML=document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML.replace(`${field.field[y][x].lvl}`,`${field.field[y][x].lvl+1}`);
            field.water--;
            update();
            field.field[y][x].lvl+=1;
            }
            else if(field.field[y][x].diged==true&&field.field[y][x].wet==false)
            {
            field.field[y][x].wet=true;
            document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML=document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML.replace("DD","DW");
            field.water--;
            update();
            }
            document.getElementById("vn").attributes.src.value=`png/${field.water}.png`;
        }
        break;

        case "s":
            if(field.field[y][x].seeded)
                break;
        if(field.seeds>0)
        {
            if(field.field[y][x].seeded!=true&&field.field[y][x].wet==true)
            {
            document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML=document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML.replace("DW","0");
            field.field[y][x].seeded=true;
            field.field[y][x].wet=false;
            field.field[y][x].diged=false;
            field.seeds--;
            update();
            }
            document.getElementById("sn").attributes.src.value=`png/${field.seeds}.png`;
        }
        break;
    
        default:
            if(field.field[y][x].lvl==5)
                {
                    field.field[y][x].lvl=0
                    field.field[y][x].diged=false;
                    field.field[y][x].dirt=false;
                    field.field[y][x].seeded=false;
                    field.field[y][x].wet=false;
                    field.field[y][x].psheno=true;
                    document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML=document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML.replace("5","PSH");
                }
            else if(field.field[y][x].psheno)
                {
                    field.psheno+=1;
                    field.field[y][x].dirt=true;
                    field.field[y][x].psheno=false;
                    document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML=document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML.replace("PSH","N");
                }
            else if(!field.field[y][x].open&&field.coins>=10)
                {
                    field.coins -= 10;
                    document.getElementById("cnN").innerText=field.coins
                    field.field[y][x].open=true;
                    document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML=document.querySelector(`[x="${x}"][y="${y}"]`).innerHTML.replace("L","G");
                }
        break;
    }
    update();
}

function pay(event)
{
    switch(event.target.offsetParent.id)
    {
        case "motig":
            {
                if(field.coins>=event.target.price)
                field.kvas-=event.target.price;
                switch(event.target.price)
                {
                    case '5':
                        {

                            event.target.price=10;
                            event.target.offsetParent.getElementById("price").src=ent.target.offsetParent.getElementById("price").src.replace('1','2')
                            event.target.offsetParent.getElementById("prev").src=ent.target.offsetParent.getElementById("price").src.replace('1','2')
                            break;
                        }
                        case '10':
                        {
                            event.target.price=15;
                            event.target.offsetParent.getElementById("price").src=ent.target.offsetParent.getElementById("price").src.replace('2','3')
                            event.target.offsetParent.getElementById("prev").src=ent.target.offsetParent.getElementById("price").src.replace('2','3')
                            break;
                        }
                        case '15':
                        {
                            event.target.price=20;
                            event.target.offsetParent.getElementById("price").src=ent.target.offsetParent.getElementById("price").src.replace('3','4')
                            event.target.offsetParent.getElementById("prev").src=ent.target.offsetParent.getElementById("price").src.replace('3','4')
                            break;
                        }
                        case '20':
                        {
                            event.target.price=50;
                            event.target.offsetParent.getElementById("price").src=ent.target.offsetParent.getElementById("price").src.replace('4','5')
                            event.target.offsetParent.getElementById("prev").src=ent.target.offsetParent.getElementById("price").src.replace('4','5')
                            break;
                        }
                }
                break;
            }
            case 'wat':
                {
                    if(field.water<9)
                        {
                            field.water+=1;
                            field.coins--;
                        }
                        break;
                }
                case 'sug':
                    {
                        if(field.coins>=4)
                            {
                        field.sugar++;
                        field.coins-=4;
                            }
                        break;
                    }
                case "sed":
                    {
                        if(field.coins>=2)
                        if(field.seeds<9)
                            {
                                field.coins-=2;
                                field.seeds++;
                            }
                            break;
                    }


    }
    update();
}
