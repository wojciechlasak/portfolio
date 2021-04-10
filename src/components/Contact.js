import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/contact.scss';

const EMAILJS = {
  serviceID: process.env.EMAILJS_SERVICE_ID,
  templateID: process.env.EMAILJS_TEMPLATE_ID,
  userID: process.env.EMAILJS_USER_ID,
};

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [message, setMessage] = useState('');

  const validateName = () => {
    name.trim() === '' ? setIsNameError(true) : setIsNameError(false);
  };

  const validateEmail = () => {
    EMAIL_REGEX.test(email.toLowerCase())
      ? setIsEmailError(false)
      : setIsEmailError(true);
  };

  const sendMessage = event => {
    event.preventDefault();
    if (isEmailError || isNameError) return;
    let success;

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };
    emailjs
      .send(
        EMAILJS.serviceID,
        EMAILJS.templateID,
        templateParams,
        EMAILJS.userID
      )
      .then(
        function (response) {
          success = true;
          console.log(response);
        },
        function (err) {
          success = false;
          console.log(err);
        }
      );
    // .then(() => this.handleSubmit(success));

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <form className="form-container flexc column-double" method="post">
      <input
        placeholder="Name"
        type="text"
        name="name"
        onChange={e => setName(e.target.value)}
        onFocus={validateName}
        onBlur={validateName}
        value={name}
        style={{
          borderBottom: isNameError ? '3px solid #c72510' : 'none',
        }}
      />
      <input
        placeholder="Email"
        type="email"
        name="email"
        onChange={e => setEmail(e.target.value)}
        onFocus={validateEmail}
        onBlur={validateEmail}
        value={email}
        style={{
          borderBottom: isEmailError ? '3px solid #c72510' : 'none',
        }}
      />
      <textarea
        placeholder="Message"
        type="text"
        name="message"
        onChange={e => setMessage(e.target.value)}
        value={message}
      />
      <input
        type="submit"
        name="submit"
        value="Send"
        onClick={sendMessage}
        disabled={isNameError || isEmailError}
      />
    </form>
  );
};

export default Contact;
