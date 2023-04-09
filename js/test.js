import { rimuoviClasse, aggiungiClasse } from "./functions.js";


let floors = ["fl1", "fl2", "fl3","fl4", "fl5", "fl6", "fl7", "fl8"];
for (let i=0; i<floors.length; i++){
    console.log(floors[i]);
    floors[i]= document.getElementById(floors[i]);
    console.log(floors[i]);
}



/*
            FLOOR 1 

*/

floors[0].addEventListener("click", () => {
    if (floors[0].innerHTML.indexOf("visible") != -1) {
        //ripuliusco classe bg-red
        for (let i = 0; i<floors.length; i++){
            floors[i].innerHTML = "floor " +(i+1) + " - visible";
            rimuoviClasse(floors[i]);
        }
        //assegno classe bg-red al selezionato
            floors[0].innerHTML = "floor 1 - hidden";
            aggiungiClasse(floors[0]);
        return;
    }
    if (floors[0].innerHTML.indexOf("hidden") != -1) {
        // api.show(part1);
        // api.show(part2);
        // api.show(part3);
        // api.show(part4);
        //console.log("visualizzato il primo piano");
        for (let i = 0; i<floors.length; i++){
            floors[i].innerHTML = "floor " +(i+1) + " - visible";
            rimuoviClasse(floors[i]);
        }
        return;
    }
});

/*
        FLOOR 2 - 
*/

floors[1].addEventListener("click", () => {
    //ripulusco le classi bg-red
    if (floors[1].innerHTML.indexOf("visible") != -1) {
        for (let i = 0; i<floors.length; i++){
            floors[i].innerHTML = "floor " +(i+1) + " - visible";
            rimuoviClasse(floors[i]);
        }
        //assengo la calsse bg-red solo al floor specifico
            floors[1].innerHTML = "floor 2 - hidden";
            aggiungiClasse(floors[1]);
        return;
    }
    if (floors[1].innerHTML.indexOf("hidden") != -1) {
        // api.show(part1);
        // api.show(part2);
        // api.show(part3);
        // api.show(part4);
        //console.log("visualizzato il primo piano");
        for (let i = 0; i<floors.length; i++){
            floors[i].innerHTML = "floor " +(i+1) + " - visible";
            rimuoviClasse(floors[i]);
            console.log(floors[i]);
        }
        return;
    }
});


/* 

        FLOOR 3
*/


floors[2].addEventListener("click", () => {
    //ripulusco le classi bg-red
    if (floors[2].innerHTML.indexOf("visible") != -1) {
        for (let i = 0; i<floors.length; i++){
            floors[i].innerHTML = "floor " +(i+1) + " - visible";
            rimuoviClasse(floors[i]);
        }
        //assengo la calsse bg-red solo al floor specifico
            floors[2].innerHTML = "floor 3 - hidden";
            aggiungiClasse(floors[2]);
        return;
    }
    if (floors[2].innerHTML.indexOf("hidden") != -1) {
        // api.show(part1);
        // api.show(part2);
        // api.show(part3);
        // api.show(part4);
        //console.log("visualizzato il primo piano");
        for (let i = 0; i<floors.length; i++){
            floors[i].innerHTML = "floor " +(i+1) + " - visible";
            rimuoviClasse(floors[i]);
            console.log(floors[i]);
        }
        return;
    }
});

/* 
        FLOOR 4

*/
floors[3].addEventListener("click", () => {
    //ripulusco le classi bg-red
    if (floors[3].innerHTML.indexOf("visible") != -1) {
        for (let i = 0; i<floors.length; i++){
            floors[i].innerHTML = "floor " +(i+1) + " - visible";
            rimuoviClasse(floors[i]);
        }
        //assengo la calsse bg-red solo al floor specifico
            floors[3].innerHTML = "floor 4 - hidden";
            aggiungiClasse(floors[3]);
        return;
    }
    if (floors[3].innerHTML.indexOf("hidden") != -1) {
        // api.show(part1);
        // api.show(part2);
        // api.show(part3);
        // api.show(part4);
        //console.log("visualizzato il primo piano");
        for (let i = 0; i<floors.length; i++){
            floors[i].innerHTML = "floor " +(i+1) + " - visible";
            rimuoviClasse(floors[i]);
            console.log(floors[i]);
        }
        return;
    }
});