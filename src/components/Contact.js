import React from 'react';
import Container from './Container';
import '../styles/contact.scss';

const Contact = () => {
  return (
    <Container title="Contact">
      <form className="form-container flexc column-double" method="post">
        <input id="name" placeholder="Name" type="text" name="name" />
        <input id="mail" placeholder="Email" type="text" name="mail" />
        <textarea id="message" placeholder="Message" type="text" name="message" />
        <input type="submit" name="submit" value="Send" />
      </form>
    </Container>
  )
}

export default Contact;