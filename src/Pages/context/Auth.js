import {useState, useContext,useEffect ,createContext} from "react";
import axios from "axios";
const AuthContext = createContext();
const AuthProvider = ({children}) =>{
    const [auth, setAuth] = useState({
        users: "",
        token: "",
    });
    //default-axios
    axios.defaults.headers.common["Authorization"]= auth?.token;
    useEffect(()=>{
        const data = localStorage.getItem("auth");
        if(data){
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                users: parseData.users,
                token: parseData.token,
              });
        }
        // eslint-disable-next-line
    },[]);
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () =>useContext(AuthContext);
export {useAuth, AuthProvider};
