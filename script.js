let inputBoxes = document.querySelectorAll(".inputboxx");
let addBtns = document.querySelectorAll(".add-btn");
let listContainers = document.querySelectorAll(".todo-list");

addBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => addTask(index));
});
inputBoxes.forEach((inputBox, index) => {
    inputBox.addEventListener("keypress", (event) => {
        if (event.keyCode === 13) { 
            addTask(index);
        }
     });
});

function addTask(index){
   let inputBox = inputBoxes[index];
   let listContainer = listContainers[index];

   if(inputBox.value === ""){
    alert("You must write something")
   } else {
        let li = document.createElement("li");
        li.className = "list-item";
        li.draggable = true;
        li.style.cursor = "grab"
        let textInput = document.createElement("input");
        textInput.className = "text-input";
        textInput.type = "text";
        textInput.value = inputBox.value;
        textInput.disabled = true; 
        
        let editBtn = document.createElement("button");
        editBtn.className = 'editBtn';
        editBtn.textContent = "Edit";
        editBtn.style.cursor = "pointer"
        editBtn.addEventListener("click", () => editItem(textInput, editBtn));
        
        li.appendChild(textInput);
        li.appendChild(editBtn);
        listContainer.appendChild(li);
        
        li.addEventListener("dragstart", dragStart);
        li.addEventListener("dragend", dragEnd);
        inputBox.value = "";
    }
}
function editItem(inputField, editBtn) {
    if (inputField.disabled) {
        inputField.disabled = false;
        inputField.focus();
        inputField.style.outline = "none";
        editBtn.textContent = "Save";  
        editBtn.style.color = "red"
    } else {
        inputField.disabled = true;
        editBtn.textContent = "Edit"; 
        editBtn.style.color = "#B6C2CF"
        editBtn.style.cursor = "pointer"
    }
}
let draggedItem = null;

function dragStart(event) {
    draggedItem = event.target;
    event.dataTransfer.setData("text/plain", ""); 
    event.target.style.opacity = "0.5";
}

function dragEnd(event) {
    event.target.style.opacity = "1";
    draggedItem = null;
}

listContainers.forEach((listContainer) => {
    listContainer.addEventListener("dragover", (event) => {
        event.preventDefault(); 
    });

    listContainer.addEventListener("drop", (event) => {
        event.preventDefault();

        if (draggedItem && draggedItem.parentNode !== listContainer) {
            listContainer.appendChild(draggedItem);
        }
    });
});