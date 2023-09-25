import React from 'react';
import styles from "./App.module.sass";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Standby from "../pages/Standby/Standby";
import Ordering from "../pages/Ordering/Ordering";

const App = () => {
    return (<div className={styles.App}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Standby/>}/>
                <Route path="/ordering" element={<Ordering/>}/>
                <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
        </BrowserRouter>
    </div>);
};

export default App;
