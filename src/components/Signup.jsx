import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending data:", { name, email, password, password_confirmation: passwordConfirmation });

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }),
            });

            const responseText = await response.text();
            console.log("Response text:", responseText);

            let data;
            try {
                data = JSON.parse(responseText);
                console.log("Parsed response data:", data);
            } catch (error) {
                console.error("Failed to parse response as JSON:", responseText);
                throw new Error("Failed to parse response as JSON");
            }

            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                console.error('Signup failed:', data.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Confirm Password" required />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
