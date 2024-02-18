localStorage.setItem("x",10);
localStorage.setItem("y",10);
let choosed=1;
let field={x:+localStorage.x, y:+localStorage.y}

function printField()
{
    field.html=document.getElementById("field");
    if(window.innerWidth*0.94/field.x<window.innerHeight*0.81/field.y)
    wid=window.innerWidth*0.94/(field.x+2);   
    else
    wid=window.innerHeight*0.81/(field.y+2);   
    field.html.style.width=`${wid*field.x-1.5}px`;
    field.html.style.height=`${wid*field.y}px`;
    field.html.style.marginRight=`${wid}px`;
    field.html.style.setProperty('grid-template-columns', 'repeat(' + field.x + ','+ wid +'px)');
    field.html.style.setProperty('grid-template-rows', 'repeat(' + field.y + ','+ wid +'px)');
    
    for(i=0;i<field.y;i++)
    {
        for(r=0;r<field.x;r++)
        {
            field.html.innerHTML+=`<div class="bl2" y="${i}" x="${r}"></div>`;
        }
    }
}

function choose(x)
{
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

update();
printField();