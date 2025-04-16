import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginRegisterLayout from '../components/LoginRegisterLayout';

function LoginPage({ apiEndpoint }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiEndpoint}/login`, {
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

      localStorage.setItem("token", data.access_token);
      setMessage("Logged in successfully!");

      navigate("/");
      window.location.reload();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <LoginRegisterLayout 
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    label="Login"
    errorMessage={message}
    bottomText="Don't have an account?"
    linkText=" Register here"
    />
  );
}

export default LoginPage;
