//const form = document.getElementById("formPersona");
//const btnAggiungi = document.getElementById("btn-aggiungi");
//const btnRimuovi = document.getElementById("btn-rimuovi");
//const tableBody = document.querySelector("#tabellaPersone tbody"); //ci serve tbody della tabella
let issues = JSON.parse(localStorage.getItem("issues")) || []; // controlla se c'è qualche dato salvato sennò crea l'array vuoto
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('newIssue');
const closeBtn = document.getElementById('save');
aggiornaBoard();
document.getElementById("popup").classList.add("hidden");

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
    const titolo = document.getElementById("nomeTitolo").value.trim();
    const priorita = document.getElementById("prioritaScelta").value;
    if(!utente || !messaggio){
        alert("Per favore inserisci i dati mancanti")
        return;
    }
    const stato = document.getElementById("Backlog").checked ? "Backlog" :
                  document.getElementById("inProgress").checked ? "In Progress" :
                  document.getElementById("Review").checked ? "Review" :
                  document.getElementById("Done").checked ? "Done" : "Backlog";

    const issue = {utente, messaggio, stato, titolo, priorita};
    
    issues.push(issue);
    console.log(issues);
    salvaInLocalStorage();
    aggiornaBoard();
    let html = document.getElementById("popup");
    html.classList.replace("show","hidden");
}

//Rimuovi singola issue
function rimuoviSingolaIssue(index){
    issues.splice(index, 1)
    salvaInLocalStorage();
    aggiornaBoard();
};

function salvaInLocalStorage(){
    localStorage.setItem("issues", JSON.stringify(issues));
}

function aggiornaBoard(filteredIssues = issues) {
    const backlogColumn = document.getElementById("backlog");
    const inProgressColumn = document.getElementById("in-progress");
    const reviewColumn = document.getElementById("review");
    const doneColumn = document.getElementById("done");

    backlogColumn.innerHTML = "";
    inProgressColumn.innerHTML = "";
    reviewColumn.innerHTML = "";
    doneColumn.innerHTML = "";

    document.getElementById("number1").innerText = filteredIssues.filter(issue => issue.stato === "Backlog").length;
    document.getElementById("number2").innerText = filteredIssues.filter(issue => issue.stato === "In Progress").length;
    document.getElementById("number3").innerText = filteredIssues.filter(issue => issue.stato === "Review").length;
    if (document.getElementById("number4")) {
        document.getElementById("number4").innerText = filteredIssues.filter(issue => issue.stato === "Done").length;
    }

    filteredIssues.forEach((issue, index) => {
        const card = document.createElement("div");
        card.className = "card bg-base-100 shadow-sm outline-1 outline-gray-300 p-4 mb-4";
        let priorityClass;
        switch (issue.priorita.toLowerCase()) {
            case "low":
            priorityClass = "badge-success"; 
            break;
            case "medium":
            priorityClass = "badge-warning"; 
            break;
            case "high":
            priorityClass = "badge-error";  
            break;
            default:
            priorityClass = "badge-accent";  
        }
        card.innerHTML = `
    <div class="card-body p-4 space-y-2">
            <span class="badge  h-7 ${priorityClass}  text-white absolute top-8 right-10 w-20">${issue.priorita}</span>
            <h2 class="card-title text-lg font-semibold text-gray-800 uppercase">${issue.titolo}</h2>
            <p class="text-sm text-gray-700">${issue.messaggio}</p>
            <div class="flex justify-between items-center mt-4">
            <span class="badge  outline badge-soft badge-neutral  h-7">${issue.utente}</span>
            <div class="flex space-x-2 shadow-sm">
                <button class="btn btn-sm btn-outline btn-primary" onclick="sposta(${index})">Sposta</button>
                <button class="btn btn-sm btn-outline btn-error" onclick="rimuoviSingolaIssue(${index})">Rimuovi</button>
            </div>
        </div>
    </div>
`;


        if (issue.stato === "Backlog") {
            backlogColumn.appendChild(card);
        } else if (issue.stato === "In Progress") {
            inProgressColumn.appendChild(card);
        } else if (issue.stato === "Review") {
            reviewColumn.appendChild(card);
        } else if (issue.stato === "Done") {
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



 
function cerca() {
    const input = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!input) {
        aggiornaBoard(); 
        return;
    }

    const risultati = issues.filter(issue =>
        issue.utente.toLowerCase().includes(input) ||
        issue.messaggio.toLowerCase().includes(input) ||
        issue.titolo.toLowerCase().includes(input)
    );

     if (!input || risultati.length === 0) {
        aggiornaBoard(); 
        return;
    }
    aggiornaBoard(risultati);
}



















