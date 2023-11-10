import React from 'react';
import styles from "./App.module.sass";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Table from "../pages/Table/Table";
import Game from "../pages/Game/Game";
import Payment from "../pages/Payment/Payment";
import Error from "../pages/Error/Error";

const App = () => {
    return (<div className={styles.App}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Table/>}/>
                <Route path="/game" element={<Game/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/error" element={<Error/>}/>
                <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
        </BrowserRouter>
    </div>);
};

export default App;
