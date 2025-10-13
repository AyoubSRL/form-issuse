//const form = document.getElementById("formPersona");
//const btnAggiungi = document.getElementById("btn-aggiungi");
//const btnRimuovi = document.getElementById("btn-rimuovi");
//const tableBody = document.querySelector("#tabellaPersone tbody"); //ci serve tbody della tabella
//
//let people = JSON.parse(localStorage.getItem("people")) || []; // controlla se c'è qualche dato salvato sennò crea l'array vuoto
//aggiornaTabella();
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('newIssue');
const closeBtn = document.getElementById('save');

  openBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
  });
  function popup(){
    let html = document.getElementById("popup");
    html.classList.replace("hidden","show");
}


function save(){
    let html = document.getElementById("popup");
    html.classList.replace("show","hidden");
}

//aggiungi persona
//btnAggiungi.addEventListener("click", () =>{
//    const nome = document.getElementById("nome").value.trim();
//    const cognome = document.getElementById("cognome").value.trim();
//    const email = document.getElementById("email").value.trim();
//    const dob = document.getElementById("dataDiNascita").value;
//
//    if(!nome || !cognome|| !email || !dob){
//        alert("Per favore inserisci i dati mancanti")
//        return;
//    }
//
//    //creo un oggetto js cioè una "scheda" con 4 coppie chiave valore
//    const person = {nome, cognome, email, dob};
//    people.push(person);
//
//    saveInLocalStorage();
//    aggiornaTabella();
//    form.reset();
//});


//function aggiornaTabella(){
//    tableBody.innerHTML=""
//    people.forEach((person, index) => {
//        const row = document.createElement("tr");  
//        row.innerHTML = `
//        <td>${person.nome}</td>
//        <td>${person.cognome}</td>
//        <td>${person.email}</td>
//        <td>${person.dob}</td>
//        <td><button onclick = "rimuoviSingolaPersona(${index})">Rimuovi</Button></td>`;
//        tableBody.appendChild(row);
//    });
//
//}
//
////Rimuovi singola persona
//function rimuoviSingolaPersona(index){
//    people.splice(index, 1)// index persona rimossa, numero di persone da rimuovere
//    saveInLocalStorage();
//    aggiornaTabella();
//};
//
//function saveInLocalStorage(){
//    localStorage.setItem("people", JSON.stringify(people));//inserisco i dati nel localstorage
//}
//
//
//btnRimuovi.addEventListener("click", () =>{
//    people = [];
//    localStorage.removeItem("people");
//    aggiornaTabella();
//});

















