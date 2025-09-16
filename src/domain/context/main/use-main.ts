import { useContext } from "react";
import { MainContext } from "./main-provider";

export const useMain = () => {
    const context = useContext(MainContext);
    if (!context) {
        throw new Error("useMain must be used within a MainProvider");
    }
    return context;
};