import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginRegisterLayout from '../components/LoginRegisterLayout';


function RegisterPage({apiEndpoint}) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiEndpoint}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Something went wrong');
      }

      setMessage("Registered successfully! You can now log in.");
      navigate("/login");
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <LoginRegisterLayout 
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    label="Register"
    errorMessage={message}
    bottomText="Already have an account?"
    linkText="Login here"
    />
  );
}

export default RegisterPage;
