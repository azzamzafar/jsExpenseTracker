import {putExpense,postExpense,getExpense,deleteExpense} from './network_calls.js'
const expense_form = document.getElementById('add-expense')
const category = document.getElementById('category')
export async function processform(e){
    e.preventDefault()
    const formdata = {}
    const method = expense_form.querySelector('input[name="_method"]').value;
    const inputs = expense_form.querySelectorAll('input[name]')
    const category_selection = category.options[category.selectedIndex].value;
    console.log(category_selection)
    console.log(inputs)
    for (const input of inputs){
        if (input.name=="amount")formdata.amount = Number(input.value);
        else if (input.name=="description")formdata.description = input.value;
    }
    formdata.category = category_selection;
    if (method=="PUT"){
        const expenseId = expense_form.querySelector('input[name="id"]').value;
        const resp = await putExpense(expenseId,formdata);
        if (!resp.message)location.reload()
        else alert(resp.message)
    }else{
        // POST Case
        console.log(formdata)
        const resp = await postExpense(formdata);
        if (!resp.message)location.reload()
        else alert(resp.message)
    }
}

export async function editEvent(e){
    const inputs = expense_form.querySelectorAll('input[name]')
    if (e.target.classList.contains('edit')){
        const expenseId = e.target.parentElement.getAttribute('data-id');
        console.log(expenseId)
        const response = await getExpense(expenseId);
        if (!response.message){
            for (const input of inputs){
                if (input.name=='_method')input.value="PUT"
                else if (input.name=='amount') input.value = response.amount
                else if (input.name=='description')input.value=response.description;
                else if (input.name=='id')input.value = expenseId;
            }
            for (let i=0;i<category.options.length;i++){
                if (category.options[i].value==response.category){
                    category.selectedIndex=i;
                    break;
                }
            }
        }else alert(response.message)   
    }
}

export async function deleteEvent(e){
    if (e.target.classList.contains('delete')){
        const expenseId = e.target.parentElement.getAttribute('data-id');
        const response = await deleteExpense(expenseId);
        if (!response.message)location.reload()
        else alert(response.message)
    }
}
