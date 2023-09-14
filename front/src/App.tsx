import React from 'react';
import './App.sass';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Standby from "./pages/Standby/Standby";
import Ordering from "./pages/Ordering/Ordering";

const App = () => (<>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Standby/>}/>
            <Route path="/ordering" element={<Ordering/>}/>
        </Routes>
    </BrowserRouter>
</>);

export default App;
