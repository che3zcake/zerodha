import { createContext, useState, useContext } from "react";

// @ts-ignore
const CompanyContext = createContext();

// @ts-ignore
export function CompanyProvider({ children }) {
    const [company, setCompany] = useState("");

    return (
        <CompanyContext.Provider value={{ company, setCompany }}>
            {children}
        </CompanyContext.Provider>
    );
}

export function useCompany() {
    return useContext(CompanyContext);
}
