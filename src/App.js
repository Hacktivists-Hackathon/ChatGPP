import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Chat from "./components/chat/Chat";
import Reset from "./components/reset/Reset";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import NotFound from "./components/notFound/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='*' element={<NotFound />}/>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;