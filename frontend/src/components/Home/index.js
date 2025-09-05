import { Component } from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import Heading from '../Heading'

class Home extends Component {
  state = {
    file: null, 
    prediction: null, 
    error: null,
    loading: false
  };

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = () => {
    const isAuth = Cookies.get('Register-skin-cancer');
    if (isAuth === undefined) {
      window.location.href = '/login';
    }
  }

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      prediction: null,
      error: null
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.state.file) {
      alert("Please select an image file!");
      return;
    }

    this.setState({ loading: true });
    const formData = new FormData();
    formData.append("file", this.state.file);

    try {
      const response = await axios.post("http://localhost:8001/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      this.setState({ 
        prediction: response.data.prediction,
        error: null 
      });
    } catch (err) {
      this.setState({ 
        error: "Error processing your request.",
        prediction: null 
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, error, prediction } = this.state;
        
    return (
      <div>
        <Heading />
        
        <div className="container">
          <h1>Skin Cancer Detection</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={this.handleFileChange}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Upload and Predict"}
            </button>
          </form>

          {error && (
            <div className="error">
              <h3>Error:</h3>
              <p>{error}</p>
            </div>
          )}

          {prediction && (
            <div className="prediction">
              <h3>Prediction Result:</h3>
              <p>
                <strong>{prediction}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
