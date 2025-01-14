import { createContext } from "react";

export const authContext = createContext(null)

const Authprovider = ({children}) => {

    

    const authInfo = {
        name: 'anik'
    }

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default Authprovider;