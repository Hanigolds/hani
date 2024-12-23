import { Children, createContext, useContext, useReducer } from "react";
import reducer from "../Reducers/User";
const url = import.meta.env.VITE_API_URL;


const UserContext =  createContext();
const initialState ={
    isLoading:false,isError:false,
    msg:"",
    users:[],
    isDelete:false
}

const UserProvider = ({children}) =>{
    const[state,dispatch] =useReducer( reducer,  initialState);
    const getAllUser = async()=>{
        const url2 = `${url}/api/users`
        dispatch({
            type:"SET_LOADING"
        })
        const response = await fetch(url2,{
            method:"GET",headers:{
                'Content-Type':"application/json"
            },
        });
        const data = await response.json()
        if(data.success){
            dispatch({
                type:"SET_SUCCESS",
                payload:{
                    users:data.allUser
                }
            })
        }

    }
    // todo update user
    const handleUpdate = async(id) =>{
        
            const url3 = `${url}/api/updateuser/${id}`
            dispatch({
                type:"SET_LOADING"
            })
            const response = await fetch(url3,{
                method:"PATCH",headers:{
                    'Content-Type':"application/json"
                },
            });
            const data = await response.json()
            if(data.success){
                dispatch({
                    type:"SET_UPDATE",
                   
                })
                getAllUser()   
        }
    }
    const handleDelete = async(id) =>{
        
            const url4 = `${url}/api/deleteuser/${id}`
            dispatch({
                type:"SET_LOADING"
            })
            const response = await fetch(url4,{
                method:"DELETE",headers:{
                    'Content-Type':"application/json"
                },
            });
            const data = await response.json()
            if(data.success){
                dispatch({
                    type:"SET_DELETE",
                   
                })
                getAllUser()   
        }
    }
    return <UserContext.Provider value={{state,getAllUser,handleUpdate,handleDelete}}>{children}</UserContext.Provider>

    

}
const useUser = ()=>{
   return useContext(UserContext)
}
export {UserProvider,useUser}