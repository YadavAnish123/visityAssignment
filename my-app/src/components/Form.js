import React, { useState } from "react";
import "./Form.css";

const Form = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			Name: name,
			Email: email,
			Mobile: phone,
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
		};

		fetch("http://27.0.0.1:5000/insertUser", requestOptions)
			.then((result) => {
				console.log(result);
				setName("");
				setEmail("");
				setPhone("");
			})
			.catch((error) => console.log("error", error));
		// Reset form fields
	};
	return (
		<div className="form-container">
			<h2>Fill out the Form</h2>
			{/* <form onSubmit={handleSubmit}> */}
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Enter your name"
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="phone">Phone Number</label>
					<input
						type="tel"
						id="phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder="Enter your phone number"
						required
					/>
				</div>

				<button type="submit" onClick={handleSubmit}>Submit</button>
			{/* </form> */}
		</div>
	);
};

export default Form;