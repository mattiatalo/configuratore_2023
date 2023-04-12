// import { rimuoviClasse, aggiungiClasse } from "./functions.js";

// Sketchfab Viewer API: Start/Stop the viewer
let version = "1.12.1";
let uid = "82ebcb7f3306423293df06dcd3b7f830";
//let uid = "0d5b3aa442f64fd5a4bcb3adae792637";

// Creo le variabili per le parti della nave sulla quale interagirò

let iframe = document.getElementById("api-frame");
let client = new Sketchfab(iframe);
let part1 = 318;
let part2 = 1182;
let part3 = 1642;
let part4 = 2065;
const bgVar = "bg-red";

let error = function error() {
  console.error("Sketchfab API error");
};

//creo le funzioni direttamente dentro il file perché su oxygen non posso importre agilmente file js
// Le funzioni ripuliscono tutti i tasti

function rimuoviClasse(param) {
  param.classList.remove(bgVar);
  return;
}

function aggiungiClasse(param) {
  param.classList.add(bgVar);
  return;
}

// creo la variabile SUCCESS dentro la quale viene salvata la funzione di avvio del viewer
//
let success = function success(api) {
  api.addEventListener("viewerready", function () {
    api.getSceneGraph(function (err, result) {
      if (err) {
        console.log("Error getting nodes");
        return;
      } // get the id from that log
      //console.log(result);
    });


    //assegno ad un array la variabili dei piani
    let floors = ["fl1", "fl2", "fl3", "fl4"];
    for (let i = 0; i < floors.length; i++) {
      console.log(floors[i]);
      floors[i] = document.getElementById(floors[i]);
      console.log(floors[i]);
    }

    function mostraTutteParti() {
      for (let a = 1; a < 5; a++) {
        api.show(eval("part" + a));
      }
    }
    function nascondoSingoloPiano(x) {
      for (let i = 1; i <= x; i++) {
        console.log("cliccato su nascondi");
        api.hide(eval("part" + i));
      }
    }

    function nascondiParti(b) {
      for (let a = 1; a < 5; a++) {
        api.hide(eval("part" + a));
      }
    }


    /*  
    
    PULSANTE FLOOR 1 
    Lavoro codice del primo piano. Il primo codice si basava sul titolo del tasto
    
    */
    //aggiungo evento se viene cliccato il tasto
    floors[0].addEventListener("click", () => {
      if (floors[0].innerHTML.indexOf("visible") != -1) {
        //ripuliusco classe bg-red
        for (let i = 0; i < floors.length; i++) {
          floors[i].innerHTML = "floor " + (i + 1) + " - visible";
          rimuoviClasse(floors[i]);
        }
        mostraTutteParti();
        //spegno il piano della nave
        nascondoSingoloPiano(1);
        //assegno classe bg-red al selezionato
        floors[0].innerHTML = "floor 1 - hidden";
        aggiungiClasse(floors[0]);
        return;
      }
      if (floors[0].innerHTML.indexOf("hidden") != -1) {
        mostraTutteParti();
        //console.log("visualizzato il primo piano");
        for (let i = 0; i < floors.length; i++) {
          floors[i].innerHTML = "floor " + (i + 1) + " - visible";
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
        for (let i = 0; i < floors.length; i++) {
          floors[i].innerHTML = "floor " + (i + 1) + " - visible";
          rimuoviClasse(floors[i]);
        }
        mostraTutteParti();
        nascondoSingoloPiano(2);
        //assengo la calsse bg-red solo al floor specifico
        floors[1].innerHTML = "floor 2 - hidden";
        aggiungiClasse(floors[1]);
        return;
      }
      if (floors[1].innerHTML.indexOf("hidden") != -1) {
        mostraTutteParti();
        for (let i = 0; i < floors.length; i++) {
          floors[i].innerHTML = "floor " + (i + 1) + " - visible";
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
        for (let i = 0; i < floors.length; i++) {
          floors[i].innerHTML = "floor " + (i + 1) + " - visible";
          rimuoviClasse(floors[i]);
        }

        mostraTutteParti();
        nascondoSingoloPiano(3);
        //assengo la calsse bg-red solo al floor specifico
        floors[2].innerHTML = "floor 3 - hidden";
        aggiungiClasse(floors[2]);
        return;
      }
      if (floors[2].innerHTML.indexOf("hidden") != -1) {
        mostraTutteParti();
        for (let i = 0; i < floors.length; i++) {
          floors[i].innerHTML = "floor " + (i + 1) + " - visible";
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
        for (let i = 0; i < floors.length; i++) {
          floors[i].innerHTML = "floor " + (i + 1) + " - visible";
          rimuoviClasse(floors[i]);
        }
        mostraTutteParti();
        nascondoSingoloPiano(4);
        //assengo la calsse bg-red solo al floor specifico
        floors[3].innerHTML = "floor 4 - hidden";
        aggiungiClasse(floors[3]);
        return;
      }
      if (floors[3].innerHTML.indexOf("hidden") != -1) {
        mostraTutteParti();
        for (let i = 0; i < floors.length; i++) {
          floors[i].innerHTML = "floor " + (i + 1) + " - visible";
          rimuoviClasse(floors[i]);
          console.log(floors[i]);
        }
        return;
      }
    });
  });
};

client.init(uid, {
  success: success,
  error: error,
  autostart: 0,
  preload: 0,
});

/*
/////////////////////////////////
// GUI Code
//////////////////////////////////

function initGui() {
  let controls = document.getElementById("controls");
  let buttonsText = "";
  buttonsText += '<button id="show1">Part1-Show</button>';
  buttonsText += '<button id="hide1">Part1-Hide</button>';

  buttonsText += '<button id="show2">Part2-Show</button>';
  buttonsText += '<button id="hide2">Part2-Hide</button>';

  buttonsText += '<button id="show3">Part3-Show</button>';
  buttonsText += '<button id="hide3">Part3-Hide</button>';

  buttonsText += '<button id="show4">Part4-Show</button>';
  buttonsText += '<button id="hide4">Part4-Hide</button>';
  controls.innerHTML = buttonsText;
}


initGui();
*/

//////////////////////////////////
// GUI Code end
//////////////////////////////////
