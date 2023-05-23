const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:3000/'
})
export async function getExpenses(){
    try{
        const resp = await axiosInstance.get('expenses');
        if (resp && resp.status==200){
            const data = await resp.data;
            return data;
        }else{
            throw(Error)
        }
    }catch(err){
        return err;
    }
}

export async function getExpense(id){
    try{
        const resp = await axiosInstance.get(`expenses/${id}`);
        if (resp && resp.status==200){
            const data = await resp.data;
            return data;
        }else{throw Error}
    }catch(err){
        return err;
    }
}

export async function postExpense(body) {
    try{
        const resp = await axiosInstance.post('expenses',body);
        if (resp.status<300) return resp;
        else throw(Error)
    }catch(err){
        return err;
    }
}

export async function putExpense(id,body){
    try{
        const resp = await axiosInstance.put(`expenses/${id}`,body);
        if (resp.status<300) return resp
        else throw(Error)
    }catch(err){
        return err;
    }
}

export async function deleteExpense(id){
    try{
        const resp = await axiosInstance.delete(`expenses/${id}`);
        if (resp.status<300) return resp;
        else throw(Error)
    }catch(err){
        return err;
    }
}