import React from "react";
import Home from "./home";
import Profile from "./profile";
import MySubGreddit from "./my_sub_greddit";
import SubGreddit from "./sub-greddit";
import SubGreddits from "./sub-greddits";
import Post from "./post";
import Save from "./save";

import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

function App() {
  return (
    <div>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-sub-greddiits" element={<MySubGreddit />} />
            <Route path="/sub-greddiit/:id" element={<SubGreddit />} />
            <Route path="/sub-greddiits" element={<SubGreddits />} />
            <Route path="/sub-greddiits/:id" element={<Post />} />
            <Route path="/saved-posts" element={<Save />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}

export default App;
