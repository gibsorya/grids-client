import React, { Component } from "react"
import axios from "axios"

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    loadUsers() {
        axios
        .get("/api/version1/users")
        .then((res) => { 
            this.setState({ users: res.data });
        })
        .catch((error) => console.log(error))
    }

    componentDidMount() {
        this.loadUsers();
    }

    render() {
        return (

       
        <div className="wrapper">
            {this.state.users.map((user) => {
                return (
                    <p key={user.id}>{user.username}</p>
                );
            })}
        </div>
        );
    } 
}

export default Users;