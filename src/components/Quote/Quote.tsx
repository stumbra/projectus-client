import React from 'react';
import { Blockquote, Paragraph, Small } from './Quote.styled';

type QuoteProps = {
  text: string;
  author: string;
};

const Quote = ({ text, author }: QuoteProps): React.ReactElement => {
  return (
    <Blockquote data-testid="quote.blockquote">
      <Paragraph>{text}</Paragraph>
      <Small>{author}</Small>
    </Blockquote>
  );
};

export default Quote;
