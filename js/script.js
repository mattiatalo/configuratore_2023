// import { rimuoviClasse, aggiungiClasse } from "./functions.js";

// Sketchfab Viewer API: Start/Stop the viewer
let version = "1.12.1";
let uid = "6c6f6b9b63324f8b9abdcc72ed0c67cc";
//let uid = "6c6f6b9b63324f8b9abdcc72ed0c67cc";76019ce17423460a9e40dced94538a4f

// Creo le variabili per le parti della nave sulla quale interagirò

let iframe = document.getElementById("api-frame");
let client = new Sketchfab(iframe);
var part0 = 72; //vele
let part1 = 304; //4
let part2 = 1127; //3048
let part3 = 1577; //5251
let part4 = 1920; //7090
const bgVar = "bg-red";

let error = function error() {
  console.error("Sketchfab API error");
};

//creo le funzioni direttamente dentro il file perché su oxygen non posso importre facilemnte file js
function rimuoviClasse(param) {
  param.classList.remove(bgVar);
}

function aggiungiClasse(param) {
  param.classList.add(bgVar);
}

// creo la letiabile success dentro la quale viene salvata la funzione di avvio del viewer
//
let success = function success(api) {
  api.addEventListener("viewerready", function () {
    document.getElementById("panel").classList.remove("hidden");
 /*     api.getSceneGraph(function (err, result) {
      if (err) {
        console.log("Error getting nodes");
        return;
      } // get the id from that log
      //console.log(result);
    }); */
 
    //inizializzo la variabili dei piani
    let floors = ["fl1", "fl2", "fl3", "fl4", "sails"];

    for (let i = 0; i < floors.length; i++) {
      //console.log(floors[i]);
      floors[i] = document.getElementById(floors[i]);
      //console.log(floors[i]);
    }

    function mostraTutteParti() {
      for (let a = 0; a < 5; a++) {
        api.show(eval("part" + a));
      }
    }

    function nascondoSingoloPiano(x) {
      for (let i = 0; i <= x; i++) {
        console.log("cliccato su nascondi");
        api.hide(eval("part" + i));
      }
    }

    function nascondiParti(b) {
      for (let a = 0; a < 5; a++) {
        api.hide(eval("part" + a));
      }
    }


    function annotationCheck(a){
      if (a == 1){
        document.getElementById("annotation").checked = true;
      }

    if (a==0){
      document.getElementById("annotation").checked = false;

    }
    }





    // PULSANTE TEMPORANEO VELE
    //aggiungo evento se viene cliccato il tasto
    floors[4].addEventListener("click", () => {
      if (floors[4].innerHTML.indexOf("visible") != -1) {
        //ripuliusco classe bg-red

        for (let i = 0; i < floors.length; i++) {
          floors[i].innerHTML = "floor " + (i + 1) + " - visible";
          rimuoviClasse(floors[i]);
        }
        floors[4].innerHTML = "Sails - visible";

        mostraTutteParti();
        //spegno il piano della nave
        nascondoSingoloPiano(0);
        //assegno classe bg-red al selezionato
        floors[4].innerHTML = "Sails - hidden";
        aggiungiClasse(floors[4]);
        return;
      }

      if (floors[4].innerHTML.indexOf("hidden") != -1) {
        mostraTutteParti();
        //console.log("visualizzato il primo piano");
        for (let i = 0; i < floors.length; i++) {
          floors[i].innerHTML = "floor " + (i + 1) + " - visible";
          rimuoviClasse(floors[i]);
        }
        floors[4].innerHTML = "Sails - visible";

        return;
      }
    });
    
// PULSANTE FLOOR 1 

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
    
// FLOOR 2

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

// INIZIO ANIMAZIONI
    api.setCycleMode("one", function (err) {
      if (!err) {
        window.console.log("Set animation cycle mode");
      }
    });

    api.getAnimations(function (err, animations) {
      if (!err) {
        //dichiaro le prime due animazioni
        var firstAnimation = animations[0][0];
        var secondAnimation = animations[1][0];
        var staticPose = "0";
        console.log(animations);
        api.setCurrentAnimationByUID("0", function (err) {
          /*   if (!err) {
                window.console.log("Set animation track to", firstAnimation);
              } */
        });

        document.getElementById("animV").addEventListener("click", function () {
          api.setCurrentAnimationByUID(firstAnimation);
          annotationCheck(0);
          // api.seekTo(0);
          api.play();
        });

        document.getElementById("animH").addEventListener("click", function () {
          annotationCheck(1);
          api.setCurrentAnimationByUID(secondAnimation);
          // api.seekTo(0);
          api.play();
        });

        document
          .getElementById("static")
          .addEventListener("click", function () {
            api.setCurrentAnimationByUID(staticPose);
          });
      }
    });
// FINE ANIMAZIONI

  
  //ANNOTATION

  const checkBox = document.getElementById("annotation");

  checkBox.addEventListener('change', e => {
    api.getAnnotationList(function(err, annotations) {
      console.log("cambia stato");
    if(e.target.checked === true) {
        if (!err) {
            window.console.log(annotations);
        }
        for (let i = 0; i < annotations.length; i++) {
          api.hideAnnotation(i, function (err, index) {
            if (!err) {
              window.console.log('Hiding annotation', i + 1);
            }
          });
        }
    }
        else 
        {
       // console.log("annotazione ri-premuta");
        for (let i = 0; i < annotations.length; i++) {
          api.showAnnotation(i, function (err, index) {
            if (!err) {
             // window.console.log("Showing annotation", i + 1);
            }
          });
        }
        }   //fine else
      });
      });

      //FINE ANNOTATION

});
}

client.init(uid, {
  success: success,
  error: error,
  autostart: 0,
  preload: 0,
});



