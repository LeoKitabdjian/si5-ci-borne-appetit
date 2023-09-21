import React from 'react';
import styles from "./App.module.sass";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Standby from "../pages/Standby/Standby";
import Ordering from "../pages/Ordering/Ordering";
import Order from "../pages/Order/Order";

const App = () => {
    return (<div className={styles.App}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Standby/>}/>
                <Route path="/ordering" element={<Ordering/>}/>
                <Route path="/order" element={<Order/>}/>
                <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
        </BrowserRouter>
    </div>);
};

export default App;
