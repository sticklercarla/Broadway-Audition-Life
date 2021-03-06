import React from 'react';
import { connect } from "react-redux";
import userActions from "../Actions/userActions";
import pageActions from "../Actions/pageActions"
import { slideInUp, slideInLeft, slideInRight } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
  slideInUp: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInUp, 'slideInUp')
  },
  slideInLeft: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInLeft, 'slideInLeft')
  },
  slideInRight: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInRight, 'slideInRight')
  }
}


class Signup extends React.Component {
    state = {
        name: "",
        username: "",
        password: "",
        password_confirmation: "",
        profile_pic: "/images/octocat.png"
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        if (!this.state.username || this.state.password !== this.state.password_confirmation) {
            alert("Username does not exist/Passwords don't match")
            this.props.history.push("/signup")
        } else {
            const { createNewUserToDB } = this.props;
            createNewUserToDB(this.state).then(()=> {
                console.log(localStorage.token)
                if (localStorage.token) {
                    this.props.history.push("/profile")
                    this.props.updatePage("profile")
                } 
            })
        }
    }

    render() {
        return (
            <div>
                
            <React.Fragment>
                <StyleRoot style={styles.slideInRight}>
                <form onSubmit={this.handleSubmit} className="signup-form">
                    <h2>Create New Account</h2>
                    <input
                        required
                        className="login-input"
                        type="text"
                        onChange={this.handleChange}
                        name="name"
                        value={this.state.name}
                        placeholder="first name"
                    />
                    <input
                        required
                        className="login-input"
                        type="text"
                        onChange={this.handleChange}
                        name="username"
                        value={this.state.username}
                        placeholder="username"
                    />
                    <input
                        required
                        className="login-input"
                        type="password"
                        onChange={this.handleChange}
                        name="password"
                        value={this.state.password}
                        placeholder="password"
                    />
                    <input 
                        required
                        className="login-input"
                        type="password"
                        onChange={this.handleChange}
                        name="password_confirmation"
                        value={this.state.password_confirmation}
                        placeholder="confirm password"
                    />
                    <input 
                        className="login-button"
                        type="submit" 
                    />
                </form>
                </StyleRoot>
            </React.Fragment>
            </div>
        )
    }
}

const mapDispatchToProps = {
    createNewUserToDB: userActions.createNewUserToDB,
    updatePage: pageActions.updatePage
};

const mapStateToProps = state => ({ user: state });

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Signup);
