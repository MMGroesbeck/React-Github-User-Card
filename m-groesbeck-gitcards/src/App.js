import React from "react";
import axios from "axios";
import GitHubCalendar from "github-calendar";
import Card from "./Card";
import "./App.css";

class App extends React.Component {
  state = {
    userName: "MMGroesbeck",
    queryStr: "",
    followersList: []
  };

  handleChanges = e => {
    this.setState({
      queryStr: e.target.value
    })
  }

  newUser = e => {
    // console.log("New user name: ", this.state.queryStr);
    if (this.state.queryStr !== this.state.userName){
      this.setState({
        userName: this.state.queryStr
      })
    axios
      .get(`https://api.github.com/users/${this.state.queryStr}/followers`)
      .then(res => {
        // console.log("Follower list updated.");
        this.setState({
          followersList: res.data.map(thisFoll => {
            // console.log(thisFoll);
            return thisFoll.login;
          })
        });
      })
      .catch(err => console.log(err));
    }
  }

  componentDidMount() {
    axios
      .get(`https://api.github.com/users/${this.state.userName}/followers`)
      .then(res => {
        this.setState({
          followersList: res.data.map(thisFoll => {
            // console.log(thisFoll);
            return thisFoll.login;
          })
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <input value={this.state.queryStr} onChange={this.handleChanges} />
        <button onClick={this.newUser}>Other GitHub User</button>
    <h1>GitHub Info For:</h1>
        <div className="cards">
          <Card userName={this.state.userName} />
        </div>
        <h1>GitHub Followers:</h1>
        <div className="cards">
          {this.state.followersList.map(follower => (
            <><Card userName={follower} /></>
          ))}
        </div>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <h1>GitHub Followers</h1>
//     </div>
//   );
// }

export default App;
