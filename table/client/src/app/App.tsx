import React from 'react';
import styles from "./App.module.sass";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Standby from "../pages/Standby/Standby";
import Ordering from "../pages/Ordering/Ordering";
import Error from "../pages/Error/Error";
import Game from "../pages/Game/Game";
import Payment from "../pages/Payment/Payment";

const App = () => {
    return (<div className={styles.App}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Standby/>}/>
                <Route path="/ordering" element={<Ordering/>}/>
                <Route path="/error" element={<Error/>}/>
                <Route path="/game" element={<Game/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
        </BrowserRouter>
    </div>);
};

export default App;
