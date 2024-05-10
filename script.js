// const notesContainer=document.querySelector(".notes-container");
// const createBtn=document.querySelector(".btn");
// let notes=document.querySelectorAll(".input-box");

// function showNotes(){
//     notesContainer.innerHTML = localStorage.getItem("notes")
// }

// showNotes();

// function updateStorage(){
//     localStorage.setItem("notes",notesContainer.innerHTML);
// }

// createBtn.addEventListener("click",()=>{
//     let inputBox=document.createElement("p");
//     let img=document.createElement("img");
//     inputBox.className="input-box";
//     inputBox.setAttribute("contenteditable","true");
//     img.src="delete.png";
//     notesContainer.appendChild(inputBox).appendChild(img);
// })

// notesContainer.addEventListener("click", function(e){
// if(e.target.tagName === "IMG")
// {
//     e.target.parentElement.remove();
//     updateStorage();
// }
// else if( e.target.tagName === "p"){
//     notes=document.querySelectorAll(".input-box");
//     notes.forEach(nt =>{
//         nt.onkeyup = function(){
//             updateStorage();
//         }
//     })
// }
// })

// document.addEventListener("keydown",event =>{
//     if(event.key === "Enter")
//     {
//         document.execCommand("inertLineBreak");
//         event.preventDefault();
//     }
// })

const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
    // Load notes from local storage
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        notesContainer.innerHTML = storedNotes;
        attachListenersToNotes();
    }
}

function attachListenersToNotes() {
    const notes = notesContainer.querySelectorAll(".input-box");
    notes.forEach(note => {
        note.addEventListener("keyup", updateStorage);
    });
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    const inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    const img = document.createElement("img");
    img.src = "delete.png";
    img.className = "delete-btn";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    inputBox.addEventListener("keyup", updateStorage);
    updateStorage();
});

notesContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        updateStorage();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && document.activeElement.classList.contains("input-box")) {
        event.preventDefault();
        document.execCommand("insertLineBreak");
    }
});

showNotes();
