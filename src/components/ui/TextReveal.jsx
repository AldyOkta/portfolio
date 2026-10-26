import React from 'react';
import TextMaskReveal from './TextMaskReveal';

export default function TextReveal({ text, className = '', delay = 0, as = 'h2', trigger = true }) {
  return (
    <TextMaskReveal
      text={text}
      className={className}
      delay={delay}
      as={as}
      trigger={trigger}
    />
  );
}
