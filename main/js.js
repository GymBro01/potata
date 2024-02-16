let choosed=1;

update();

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