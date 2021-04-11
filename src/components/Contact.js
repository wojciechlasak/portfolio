import React, { useState, useEffect } from 'react';
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
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoding] = useState(false);
  const [isShowSuccess, setIsShowSuccess] = useState(false);
  const [isSendError, setIsSendError] = useState(false);

  const validateName = () => {
    name.trim() === '' ? setIsNameError(true) : setIsNameError(false);
  };

  const validateEmail = () => {
    EMAIL_REGEX.test(email.toLowerCase())
      ? setIsEmailError(false)
      : setIsEmailError(true);
  };

  useEffect(() => {
    if (isNameTouched) {
      validateName();
    }
  }, [name, isNameTouched]);

  useEffect(() => {
    if (isEmailTouched) {
      validateEmail();
    }
  }, [email, isEmailTouched]);

  const sendMessage = event => {
    event.preventDefault();
    if (isEmailError || isNameError) return;

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };
    setIsLoding(true);
    setIsSendError(false);
    setIsShowSuccess(false);
    emailjs
      .send(
        EMAILJS.serviceID,
        EMAILJS.templateID,
        templateParams,
        EMAILJS.userID
      )
      .then(res => {
        setIsLoding(false);
        setIsShowSuccess(true);
      })
      .catch(e => {
        setIsSendError(true);
        setIsLoding(false);
      });

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
        onChange={e => {
          setName(e.target.value);
          setIsNameTouched(true);
        }}
        value={name}
        style={{
          borderBottom: isNameError ? '3px solid #c72510' : 'none',
        }}
      />
      {isNameError && (
        <div className="send-notification error">This field is required</div>
      )}
      <input
        placeholder="Email"
        type="email"
        name="email"
        onChange={e => {
          setEmail(e.target.value);
          setIsEmailTouched(true);
        }}
        value={email}
        style={{
          borderBottom: isEmailError ? '3px solid #c72510' : 'none',
        }}
      />
      {isEmailError && (
        <div className="send-notification error">Type valid email</div>
      )}
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
        value={isLoading ? 'Sending...' : 'Send'}
        onClick={sendMessage}
        disabled={isNameError || isEmailError || isLoading}
      />
      <div
        className={
          isSendError ? 'send-notification error' : 'send-notification'
        }
      >
        {isShowSuccess &&
          'Your email has been sent. I will replay to you as soon as possible.'}
        {isSendError &&
          `Oops... Something went wrong. Try again or write directly to ${(
            <a href="mailto:wojciech.lasak@outlook.com">
              wojciech.lasak@outlook.com
            </a>
          )}`}
      </div>
    </form>
  );
};

export default Contact;
