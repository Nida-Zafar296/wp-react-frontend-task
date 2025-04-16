import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import custom components
import BlogPosts from './BlogPosts';
import PostDetails from './PostDetail';

// Import global styles
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Site Title */}
        <header className="text-center my-4">
          <h1>My React Blog</h1>
        </header>

        {/* Define Routes using React Router */}
        <Routes>
          {/* Route for the list of blog posts */}
          <Route path="/" element={<BlogPosts />} />

          {/* Route for individual post details, using dynamic ID */}
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

