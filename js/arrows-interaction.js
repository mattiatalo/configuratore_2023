let currentClickableIndex = 0;

// Funzione per rilevare gli elementi <a> con classe "clickable"
function getClickableElements() {
  const clickableAnchors = document.querySelectorAll('a.clickable');
  return Array.from(clickableAnchors);
}

// Funzione per gestire la navigazione tra gli elementi cliccabili con le frecce sinistra e destra
function handleArrowNavigation(e) {
  const clickableElements = getClickableElements();
  if (clickableElements.length === 0) {
    return;
  }

  if (e.key === 'ArrowRight') {
    currentClickableIndex = (currentClickableIndex + 1) % clickableElements.length;
  } else if (e.key === 'ArrowLeft') {
    currentClickableIndex = (currentClickableIndex - 1 + clickableElements.length) % clickableElements.length;
  } else {
    return;
  }

  clickableElements[currentClickableIndex].click();
  clickableElements[currentClickableIndex].focus();

}

// Aggiunge l'ascoltatore di eventi per la pressione dei tasti
document.addEventListener('keydown', handleArrowNavigation);
