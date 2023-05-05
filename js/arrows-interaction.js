let currentClickableIndex = 0;
let currentButtonIndex = 0;

// Funzione per rilevare gli elementi <a> con classe "clickable"
function getClickableElements() {
  const clickableAnchors = document.querySelectorAll('a.clickable');
  return Array.from(clickableAnchors);
}


// Funzione per gestire la navigazione tra gli elementi cliccabili con le frecce sinistra e destra
function handleArrowNavigation(e) {
  const clickableElements = getClickableElements();
  const ButtonIndex = floors.name;
  if (clickableElements.length === 0) {
    return;
  }

  if (e.key === 'ArrowRight') {
    currentClickableIndex = (currentClickableIndex + 1) % clickableElements.length;
    console.log("DEXTRA");
    api.gotoAnnotation(currentClickableIndex);
  } 
  else if (e.key === 'ArrowLeft') {
    currentClickableIndex = (currentClickableIndex - 1 + clickableElements.length) % clickableElements.length;
    console.log("SX");
    api.gotoAnnotation(currentClickableIndex);
  } 
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    currentButtonIndex = (currentButtonIndex + 1) % floors.length;
    console.log("UP");

  } 
  else if (e.key === 'ArrowUp') {
    e.preventDefault();
    currentButtonIndex = (currentButtonIndex - 1 + floors.length) % floors.length;
    console.log("DOWN");
  } 
   else {
    return;
  }

  floors[currentButtonIndex].name.click();
  audio.play();
  //clickableElements[currentClickableIndex].click();


}
document.querySelector("#testoSel").click();
// Aggiunge l'ascoltatore di eventi per la pressione dei tasti
document.addEventListener('keydown', (e)=>{
  handleArrowNavigation(e);
  console.log("premuto");
});

