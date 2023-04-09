// Array di elementi
 const elements = [
    { name: 'Elemento 1' },
    { name: 'Elemento 2' },
    { name: 'Elemento 3' },
    { name: 'Elemento 4' },
    { name: 'Elemento 5' },
    { name: 'Elemento 6' },
    { name: 'Elemento 7' },
    { name: 'Elemento 8' },
    { name: 'Elemento 9' },
    { name: 'Elemento 10' },
    { name: 'Elemento 11' },
    { name: 'Elemento 12' },
    { name: 'Elemento 13' },
    { name: 'Elemento 14' },
    { name: 'Elemento 15' },
    { name: 'Elemento 16' },
    { name: 'Elemento 17' },
    { name: 'Elemento 18' },
    { name: 'Elemento 19' },
    { name: 'Elemento 20' },
  ];
  
  export {elements};
  // Seleziona il body della tabella
  const tableBody = document.getElementById('table-body');
  
  // Popola la tabella con i dati dell'array
  for (let i = 0; i < elements.length; i++) {
    // Crea una nuova riga
    const row = document.createElement('tr');
  
    // Crea la prima cella con il numero progressivo
    const indexCell = document.createElement('td');
    indexCell.textContent = i + 1;
    row.appendChild(indexCell);
  
    // Crea la seconda cella con il nome dell'elemento
    const nameCell = document.createElement('td');
    nameCell.textContent = elements[i].name;
    nameCell.classList.add('clickable');
    row.appendChild(nameCell);
  
    // Aggiungi un listener di click alla cella del nome
    nameCell.addEventListener('click', function() {
      // Innesca la funzione api.goToAnnotation(index)
      //api.goToAnnotation(i);
      console.log(i);
    });
  
    // Aggiungi la riga alla tabella
    tableBody.appendChild(row);
  }
  