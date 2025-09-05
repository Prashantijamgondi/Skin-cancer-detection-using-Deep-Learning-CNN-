// import { Component } from "react";
// import axios from "axios";

// import "./App.css"; // Import the CSS file

// class App  extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       file: null,
//       prediction: null,
//       error: null
//     };
//   }

//   handleFileChange = (e) => {
//     this.setState({
//       file: e.target.files[0],
//       prediction: null,
//       error: null
//     });
//   };

//   handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!this.state.file) {
//       alert("Please select an image file!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", this.state.file);

//     try {
//       const response = await axios.post("http://localhost:8001/predict", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       this.setState({ prediction: response.data.prediction });
//     } catch (err) {
//       this.setState({ error: "Error processing your request." });
//     }
//   };

//   render() {
//     const { loading, error, prediction } = this.state;
    
//     return (
//       <div>
//         <nav className="navbar">
//           <ul>
//             <li><a href="/">Home</a></li>
//             <li><a href="https://ijpsprojects.ccbp.tech/">Contact</a></li>
//           </ul>
//         </nav>

//         <div className="container">
//           <h1>Skin Cancer Detection</h1>
//           <form onSubmit={this.handleSubmit}>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={this.handleFileChange}
//             />
//             <button type="submit" disabled={loading}>
//               {loading ? "Processing..." : "Upload and Predict"}
//             </button>
//           </form>

//           {error && (
//             <div className="error">
//               <h3>Error:</h3>
//               <p>{error}</p>
//             </div>
//           )}

//           {prediction && (
//             <div className="prediction">
//               <h3>Prediction Result:</h3>
//               <p>
//                 <strong>{prediction}</strong>
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// } 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}


 export default App;
