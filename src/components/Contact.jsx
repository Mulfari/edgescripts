import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

const Contact = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !message) {
      setError('Title and message are required.');
      return;
    }

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, message }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error sending the message. Please try again.');
      }

      setSuccess('Message sent successfully.');
      setTitle('');
      setMessage('');
    } catch (error) {
      setError(error.message);
    }
  };

  if (!user) {
    return <p>You need to be logged in to use this section.</p>;
  }

  return (
    <div>
      <h2>Contact Us</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
