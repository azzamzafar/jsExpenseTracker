import {processform,editEvent,deleteEvent} from './eventlisteners.js'
import {getExpenses} from './network_calls.js'
const expense_form = document.getElementById('add-expense');
const expense_list = document.getElementById('expense-list');

expense_form.addEventListener('submit',processform)
expense_list.addEventListener('click',editEvent)
expense_list.addEventListener('click',deleteEvent)

window.onload = async () =>{
    expense_form.reset()
    const resp = await getExpenses('expenses')
    if (!resp.message){
        populateExpenseList(resp)
    }else alert(resp.message)
}
function populateExpenseList(data) {
    for (const item of data){
        const li = document.createElement('li')
        li.setAttribute('data-id',item.id)
        li.innerHTML = `<b>Amount</b>:${item.amount},<b>Category</b>:${item.category},<b>Description</b>:${item.description}`
        li.appendChild(createEditButton())
        li.appendChild(createDeleteButton())
        expense_list.appendChild(li)
    }
}

function createEditButton(){
    let editbtn = document.createElement('button');
    editbtn.className = 'btn btn-primary edit';
    editbtn.textContent='Edit'
    return editbtn;
}


function createDeleteButton(){
    let deletebtn = document.createElement('button');
    deletebtn.className = 'btn btn-danger delete';
    deletebtn.textContent="Delete"
    return deletebtn;
}
