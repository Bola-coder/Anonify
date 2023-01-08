import  {useState} from 'react';

const UseToken = () => {
    
    const getTokenFromLocalStorage = () => {
        if(typeof(window) !== "undefined"){
            const tokenString = localStorage.getItem('token');
            if(tokenString){
                const userToken = JSON.parse(tokenString);
                return userToken;
            }
        }
    }

    const [token, setToken] = useState(getTokenFromLocalStorage());

    const setTokenToLocalStorage = (userToken) => {
        if(typeof(window) !== "undefined"){
            localStorage.setItem('token', JSON.stringify(userToken));
        }
         setToken(userToken)
    };

    return {
        setToken: setTokenToLocalStorage,
        token,
    }
}
 
export default UseToken;