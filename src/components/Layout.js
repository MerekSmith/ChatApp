import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../Events'
import LoginForm from './LoginForm'
import ChatContainer from './chats/ChatContainer'

const socketUrl = "http://localhost:3231";
export default class Layout extends Component {

	constructor(props) {
		super(props);

		this.state = {
			socket: null,
			user: null
		};
	}

	componentDidMount() {
		this.initSocket();
	}

	// This will allow us to run this once or whenever we need to then store the socket in state.
	initSocket = () => {
		const socket = io(socketUrl)
		socket.on('connect', () => {
			console.log('Connected as socket Id: ' + socket.id);
		})
		this.setState({ socket })
	}


	/*
	* 	Sets the user property in state 
	*	@param user {id:number, name:string}
	*/
	setUser = (user) => {
		const { socket } = this.state
		console.log('4. layout setuser hit', {socket}, user);
		socket.emit(USER_CONNECTED, user);
		this.setState({user})
	}

	/*
	*	Sets the user property in state to null.
	*/
	logout = () => {
		const { socket } = this.state
		socket.emit(LOGOUT)
		this.setState({ user: null })

	}

	render() {
		const { socket, user } = this.state;
		return (
			<div className='container'>
				{
					!user ?
					<LoginForm socket={socket} setUser={this.setUser} />
					:
					<ChatContainer socket={socket} user={user} logout={this.logout} />
				}
			</div>
		);
	}
}


