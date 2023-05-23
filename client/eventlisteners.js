import {putExpense,postExpense,getExpense,deleteExpense} from './network_calls.mjs'
import {reg_form} from './main.mjs'

const inputs = reg_form.querySelectorAll('input[name]')
export async function processform(e){
    e.preventDefault()
    const formdata = {}
    const method = reg_form.querySelector('input[name="_method"]').value;
    for (const input of inputs){
        if (input.name="_method") continue;
        else if(input.name="id") continue;
        formdata[`${input.name}`]=input.value;
    }
    if (method=="PUT"){
        const expenseId = reg_form.querySelector('input[name="id"]').value;
        const resp = await putExpense(expenseId,formdata);
        if (!resp.message)location.reload()
        else alert(resp.message)
    }else{
        // POST Case
        const resp = await postExpense(formdata);
        if (!resp.message)location.reload()
        else alert(resp.message)
    }
}

export async function editEvent(e){
    if (e.target.classList.contains('edit')){
        const expenseId = e.target.parentElement.getAttribute('data-id');
        const response = await getExpense(expenseId);
        if (response && response.message){
            for (const input of inputs){
                if (input.name=='_method')input.value="PUT"
                else if (input.name=='amount') input.value = response.amount
                else if (input.name=='category') input.value=response.category;
                else if (input.name=='description')input.value=response.description;
                else if (input.name=='id')input.value = expenseId;
            }
        }else alert(response)   
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