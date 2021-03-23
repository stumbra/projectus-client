import React from 'react';
import { Blockquote, Paragraph, Small } from './Quote.styled';

const Quote = ({ text, author }) => {
  return (
    <Blockquote>
      <Paragraph>{text}</Paragraph>
      <Small>{author}</Small>
    </Blockquote>
  );
};

export default Quote;
