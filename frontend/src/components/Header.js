import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const Header = () => {
		const headerStyle = {
				backgroundColor: 'hsla(60, 100%, 50%, 95%)',

		};

		return (
				<>
					<Navbar className="left-0">
							<Link to={"/"} className="navbar-brand" >로고</Link>
							<Nav className='me-auto'>
									<Link to={"#"} className="nav-link">에라(에뤄 롸위불호뤼)</Link>
									<Link to={"/list"} className="nav-link">쒜어</Link>
									<Link to={"#"} className="nav-link">프로삘</Link>
							</Nav>

							<div>뤠그인 풰이지</div>

					</Navbar>
				</>
		);
};

export default Header;