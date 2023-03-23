// get form element
let addform = document.getElementById('add-expense');
addform.addEventListener('submit',addItem)
// get list elements
let expenditures = document.getElementById('expenditures')
expenditures.addEventListener('click',editItem);
expenditures.addEventListener('click',deleteItem)
// get form inputs
let formControls = document.querySelectorAll('.form-control')
//get cardbody containing lists
let listCardbody = expenditures.parentElement;
// load list of expenses on every page load.
loadexpenditures()
// clear form input on page reload.
window.onload = ()=>{
    addform.reset()
}
function loadexpenditures(){
    if (localStorage.length==0){
        listCardbody.insertBefore((createpelem("No Expenditures!")),expenditures)
    }
    else if (listCardbody.childElementCount>2){
        listCardbody.removeChild(listCardbody.children[1])
    }
    else{
        for (const key of Object.keys(localStorage)){
            let listItem = createExpenditureItem(JSON.parse(localStorage.getItem(key)))
            expenditures.appendChild(listItem);
        }
    }
}
function addItem(e){
    e.preventDefault()
    let description=document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let amount = document.getElementById('amount').value;
    if (!description || !category || !amount){
        let msg = document.querySelector('.msg')
        msg.classList.add('error');
        msg.innerText='Please enter all fields';
        setTimeout(()=>msg.remove(),3000)
    }
    else{
        setlocalStorage(description,category,Number(amount))
        location.reload()
        e.target.reset();
    }
}
function setlocalStorage(description,category,amount){
    let entry = JSON.stringify({'description':description,
    'category':category,'amount':amount})
    localStorage.setItem(description.split(" ")[0],entry)
}
function createExpenditureItem(ExpenseObj){
    let description=ExpenseObj['description']
    let category = ExpenseObj['category']
    let amount = ExpenseObj['amount']
    let newlistItem = document.createElement('li')
    newlistItem.className="list-group-item";
    let listItemText = createListItemText(description,category,amount)
    newlistItem.innerHTML=listItemText
    newlistItem.appendChild(createEditButton())
    newlistItem.appendChild(createDeleteButton())
    return newlistItem
}
function createListItemText(description,category,amount){
    p="<p>"
    p+=`<strong>Amount:</strong>`
    p+=`${amount} `
    p+=`<strong>Category:</strong>`
    p+=`${category} ` 
    p+=`<strong>Description:</strong>`
    p+=`${description} `
    p+='</p>'
    return p
}
function createpelem(text){
    let p = document.createElement('p')
    p.textContent=text;
    p.id="empty-list"
    return p
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
function editItem(e){
    if (e.target.classList.contains('edit')){
        let objkey = getKey(e.target.parentElement)
        let expenseObj = JSON.parse(localStorage.getItem(objkey));
        for (const [key,val] of Object.entries(expenseObj)){
            document.getElementById(key).value=val;
        }
        localStorage.removeItem(objkey);
        expenditures.removeChild(e.target.parentElement);
    }
}

function deleteItem(e){
    if (e.target.classList.contains('delete')){
        if (confirm("Are you sure?")){
            let objkey = getKey(e.target.parentElement)
            console.log(objkey)
            localStorage.removeItem(objkey)
            expenditures.removeChild(e.target.parentElement)
            location.reload()
        }
    }
}

function getKey(listelement){
    console.log(listelement.textContent)
    let text = listelement.textContent.split(' ');
    for (const sub of text){
        subsplit = sub.split(":")
        if (subsplit.length>1 && subsplit[0]=="Description"){
            return subsplit[1]   
        }
    }
}