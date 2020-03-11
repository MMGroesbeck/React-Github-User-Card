import React from "react";
import axios from "axios";
import GitHubCalendar from "github-calendar";

class Card extends React.Component {
  state = {
    user: {},
    userName: this.props.userName,
    expandClass: "extra-info hidden",
    expandHidden: true,
    expandButton: "\u25bc"
  };

  componentDidMount() {
    axios
      .get(`https://api.github.com/users/${this.props.userName}`)
      .then(res => {
        this.setState({
          user: res.data
        });
      })
      .catch(err => console.log(err));
      GitHubCalendar (`.ghcal${this.props.userName}`, this.props.userName, {responsive: true});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userName !== this.props.userName) {
      this.setState({
        userName: this.props.userName
      });
    //   console.log(
    //     "Card CDU ran; userName: ",
    //     this.props.userName,
    //     prevProps.userName
    //   );
      axios
        .get(`https://api.github.com/users/${this.props.userName}`)
        .then(res => {
          this.setState({
            user: res.data
          });
        })
        .catch(err => console.log(err));
    }
  }

  toggleExpand = () => {
    if (this.state.expandHidden) {
      this.setState({
        expandHidden: false,
        expandClass: "extra-info",
        expandButton: "\u25b2"
      });
    } else {
      this.setState({
        expandHidden: true,
        expandClass: "extra-info hidden",
        expandButton: "\u25bc"
      });
    }
  };

  render() {
    return (
      <div className="card">
        <div className="card-section">
          <img src={this.state.user.avatar_url} />
          <div className="card-info">
            <h3 className="name">{this.state.user.name}</h3>
            <p className="username">{this.state.user.login}</p>
            <p>{this.state.user.location}</p>
            <p>
              Profile:{" "}
              <a href={this.state.user.html_url}>{this.state.user.html_url}</a>
            </p>
            <p>Followers: {this.state.user.followers}</p>
            <p>Following: {this.state.user.following}</p>
            <p>
              {this.state.user.bio
                ? `Bio: ${this.state.user.bio}`
                : `GitHub bio not provided.`}
            </p>
          </div>
        </div>
        <div className={this.state.expandClass}>
          <div className={`ghcal${this.props.userName}`}>
            <h3>Calendar Goes Here</h3>
          </div>
        </div>
        <span className="expandButton" onClick={this.toggleExpand}>
          {this.state.expandButton}
        </span>
      </div>
    );
  }
}

export default Card;
