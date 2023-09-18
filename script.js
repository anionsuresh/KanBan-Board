//select 

const modalContainer = document.querySelector('.modal-cont');
const addBtn = document.querySelector(".add-btn");
const colorModalArr = document.querySelectorAll('.color_modal');
const priorityColorsArr = document.querySelectorAll(".toolbox-priority-cont .color");
const textArea = document.querySelector(".textarea-cont");
const mainContainer = document.querySelector("main");
const Deletebtn = document.querySelector(".remove-btn");
const DeleteIcon = document.querySelector(".fa-trash");





// random Id generator library 
const uid = new ShortUniqueId({ length: 5 });
const colorsArray = ["red", "blue", "green", "purple"];
let deleteFlag = false;

addBtn.addEventListener('click', function () {
    modalContainer.style.display = "flex";
})

//select all the color boxes 
for (let i = 0; i < colorModalArr.length; i++) {
    let currentColorElem = colorModalArr[i];
    currentColorElem.addEventListener('click', function (event) {
        //remive the selected from everyone
        for (let i = 0; i < colorModalArr.length; i++) {
            colorModalArr[i].classList.remove("selected");
        }

        
        //add to that element that was clicked 
        const targetColorElem = event.target;
        targetColorElem.classList.add("selected");
    })
}

// Add event listener on textarea to make sure 
// as soon as you press enter then pop up should disappear 
textArea.addEventListener("keypress", function (event) {
    if (event.key == "Enter" && event.shiftKey == false) {
        modalContainer.style.display = "none";
        // -> create the ticket
        // text 
        const task = textArea.value;
        // currentcolor
        const currColorElem = modalContainer.querySelector(".selected");
        const taskColor = currColorElem.getAttribute("currColor");
        // console.log(task, taskColor);
        
        // ->  reset your modal to default
        textArea.value = "";
        createTicket(taskColor, task);
    }
})

function createTicket(taskColor, task) {
    /*************added the UI of ticket************/
    const id = uid.rnd();
    // constructing our ticket 
    const ticketContainer = document.createElement("div");
    ticketContainer.setAttribute("class", "ticket-cont");
    ticketContainer.innerHTML = `<div class="ticket-color ${taskColor}"></div>
            <div class="ticket-id">#${id}</div>
            <div class="ticket-area">${task}</div>
             <i class="fa-solid fa-lock lock_icon"></i>
            `;
            
    mainContainer.appendChild(ticketContainer);

    /***  lock unclock feature */
    const lockButton = ticketContainer.querySelector(".lock_icon");
    const ticketArea = ticketContainer.querySelector(".ticket-area");
    const ticketColorElem = ticketContainer.querySelector(".ticket-color");

    handlelockButton(lockButton,ticketArea);

    // add the logic of oscillating color 
    handleChangecolor(ticketColorElem)
    
    // handle logic for ticket deletion 
    handleDelete(ticketContainer, id);

    

}


function handlelockButton(lockButton,ticketArea) {
    lockButton.addEventListener("click", function () {
        // Lock button : <i class="fa-solid fa-lock "></i>
        // Unlock button:     < i class="fa-solid fa-lock-open" ></ >
        const isLocked = lockButton.classList.contains("fa-lock");

        if (isLocked == true) {
            // have unlock it
            lockButton.classList.remove("fa-lock");
            lockButton.classList.add("fa-lock-open");
            // make my ticket area: editable 
            ticketArea.setAttribute("contenteditable","true");
        } else {
            // lock it 
            lockButton.classList.remove("fa-lock-open");
            lockButton.classList.add("fa-lock");
            // make my ticket area : non editable 
            ticketArea.setAttribute("contenteditable","false");
            
        }


    })
}

function handleChangecolor(ticketColorElem){
    // on the ticket we just need to change classes 
    // one color after another inside the array of colors 
    ticketColorElem.addEventListener("click", function(){
        let cColor = ticketColorElem.classList[1];
        let cidx= colorsArray.indexOf(cColor);

        // ["red", "blue", "green", "purple"]
        // it should loop through current + 1 elem 
        let nidx = (cidx+1) % colorModalArr.length;

        // now you got the next index 
        let nextColor= colorsArray[nidx];
        ticketColorElem.classList.remove(cColor);
        ticketColorElem.classList.add(nextColor);

    })

}

// Filter Logic for tickets 
for(let i =0; i<priorityColorsArr.length; i++){
    let currentToolColor = priorityColorsArr[i];
    currentToolColor.addEventListener("click", function(e){
        // registering the color
        for ( let i=0 ; i<priorityColorsArr.length; i++){
            priorityColorsArr[i].classList.remove("selected")
        }
         // add to that element thta was clicked
        let SelectedColor= e.target;
        SelectedColor.classList.add("selected");
        /********************ui********************/

        const currentSelectedColor = colorsArray[i];
         filterTickets(currentSelectedColor);
    })
}

function filterTickets(currentSelectedColor){
    //Select all latest tickets 
    const Ticketsarr = mainContainer.querySelectorAll(".ticket-cont");

    // loop through all tickets 
    for (let i=0; i<Ticketsarr.length; i++){
        const cTicket =Ticketsarr[i];
        let ispresent = cTicket.querySelector(`.${currentSelectedColor}`);
        if(ispresent == null){
            cTicket.style.display='none';
        }else{
            cTicket.style.display='block';
        }
    }
 // only make ticket visible if ticket has current selected color 
}

/*****************On dbl click remove**********************/
for(let i =0; i<priorityColorsArr.length; i++){
    let currentToolColor = priorityColorsArr[i];
    currentToolColor.addEventListener("dblclick", function(e){
        // registering the color
        for ( let i=0 ; i<priorityColorsArr.length; i++){
            priorityColorsArr[i].classList.remove("selected")
        }
         // add to that element thta was clicked
        let SelectedColor= e.target;
        SelectedColor.classList.add("selected");
        /********************ui********************/

        showAllTickets();
    })
}

function showAllTickets() {
    // 1. select all the latest tickets
    const ticketsArr = mainContainer.querySelectorAll(".ticket-cont");
    //  loop through all the tickets
    for (let i = 0; i < ticketsArr.length; i++) {
        const cTicket = ticketsArr[i];
        cTicket.style.display = "block";
        // only make the ticket visible when the ticket color ==currentColor
    }
}


// this function is called when ticket is created, io
function handleDelete(ticketContainer, id){
    ticketContainer.addEventListener('click', function(){
        if(deleteFlag == true){
            let res = confirm("Do you want to delete the ticket ?");
            if(res){
                ticketContainer.remove();
            }
        }
    })

}

// *********Delete Ticket feature *******
Deletebtn.addEventListener('click', function(){
    if(deleteFlag == false){
        DeleteIcon.style.color="red";
        deleteFlag = true;
    }else{
        DeleteIcon.style.color="black";
        deleteFlag = false;
    }
})




