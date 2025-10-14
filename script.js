//const form = document.getElementById("formPersona");
//const btnAggiungi = document.getElementById("btn-aggiungi");
//const btnRimuovi = document.getElementById("btn-rimuovi");
//const tableBody = document.querySelector("#tabellaPersone tbody"); //ci serve tbody della tabella
let issues = JSON.parse(localStorage.getItem("issues")) || []; // controlla se c'è qualche dato salvato sennò crea l'array vuoto
aggiornaBoard();
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
function nascondiPopup(){
    let html = document.getElementById("popup");
    html.classList.replace("show","hidden");
}




//aggiungi issue
function aggiungiIssue(){
    const utente = document.getElementById("nomeUtente").value.trim();
    const messaggio = document.getElementById("descrizione").value.trim();
    if(!utente || !messaggio){
        alert("Per favore inserisci i dati mancanti")
        return;
    }
    const stato = document.getElementById("Backlog").checked ? "Backlog" :
                  document.getElementById("inProgress").checked ? "In Progress" :
                  document.getElementById("Review").checked ? "Review" :
                  document.getElementById("Done").checked ? "Done" : "Backlog";

    const issue = {utente, messaggio, stato};
    
    issues.push(issue);
    console.log(issues);
    salvaInLocalStorage();
    aggiornaBoard();
    let html = document.getElementById("popup");
    html.classList.replace("show","hidden");
}

//Rimuovi singola issue
function rimuoviSingolaIssue(index){
    issues.splice(index, 1)// index issue rimossa, numero di issue da rimuovere
    salvaInLocalStorage();
    aggiornaBoard();
};

function salvaInLocalStorage(){
    localStorage.setItem("issues", JSON.stringify(issues));//inserisco i dati nel localStorage
}

function aggiornaBoard(){
//per ogni issue aggiungo nella colonna giusta (in base allo stato) con il nome utente e messaggio
console.log(issues);
    const backlogColumn = document.getElementById("backlog");
    const inProgressColumn = document.getElementById("in-progress");
    const reviewColumn = document.getElementById("review");
    const doneColumn = document.getElementById("done");
    backlogColumn.innerHTML = "";
    inProgressColumn.innerHTML = "";
    reviewColumn.innerHTML = "";
    doneColumn.innerHTML = "";
    document.getElementById("number1").innerText = issues.filter(issue => issue.stato === "Backlog").length;
    document.getElementById("number2").innerText = issues.filter(issue => issue.stato === "In Progress").length;
    document.getElementById("number3").innerText = issues.filter(issue => issue.stato === "Review").length;
    if(document.getElementById("number4")) {
        document.getElementById("number4").innerText = issues.filter(issue => issue.stato === "Done").length;
    }
    issues.forEach((issue, index) => {
        const card = document.createElement("div");
        card.className = "card bg-base-100 shadow-sm outline-1 outline-gray-300 p-4 mb-4";
        card.innerHTML = `
            <div class="card-body">
                <h2 class="card-title">${issue.utente}</h2>
                <p>${issue.messaggio}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-sm btn-outline btn-primary" onclick="sposta(${index})">Sposta</button>
                    <button class="btn btn-sm btn-error" onclick="rimuoviSingolaIssue(${index})">Rimuovi</button>
                </div>
            </div>
        `;
        if(issue.stato === "Backlog"){
            backlogColumn.appendChild(card);
        } else if(issue.stato === "In Progress"){
            inProgressColumn.appendChild(card);
        } else if(issue.stato === "Review"){
            reviewColumn.appendChild(card);
        } else if(issue.stato === "Done"){
            doneColumn.appendChild(card);
        } 
    });
}

function sposta(index){
    const select = document.getElementById("sposta");
    issues[index].stato = issues[index].stato == "Backlog" ? "In Progress" :
                            issues[index].stato == "In Progress" ? "Review" :
                            issues[index].stato == "Review" ? "Done" :
                            issues[index].stato == "Done" ? "Backlog" : "Backlog";
    salvaInLocalStorage();
    aggiornaBoard();
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

















