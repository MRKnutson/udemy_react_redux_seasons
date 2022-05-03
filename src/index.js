import React from "react";
import ReactDOM from "react-dom/client";
import SeasonDisplay from "./SeasonDisplay";
import Loader from "./Loader";
// import "semantic-ui-css/semantic.min.css";

// const App = () => {
//   window.navigator.geolocation.getCurrentPosition(
//     (position) => console.log(position),
//     (err) => console.log(err)
//   );

//   return <div>Latitude: </div>;
// };

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  renderContent() {
    return (
      <>
        {this.state.lat ? <SeasonDisplay lat={this.state.lat} /> : null}
        {this.state.errorMessage.length
          ? `Error: ${this.state.errorMessage}`
          : null}
        {!this.state.lat && !this.state.errorMessage.length ? (
          <Loader message="Please allow location use" />
        ) : null}
      </>
    );
  }

  render() {
    return (
      <div style={{ border: "solid 10px black" }}>{this.renderContent()}</div>
    );
  }
}

// ReactDOM.render(<App />, document.querySelector("#root"));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
