import React, { useEffect, useRef, useState, useCallback } from 'react';

import { Props as InputProps } from 'react-input-mask';
import { useField } from '@unform/core';

import { Container } from './styles';

interface Props extends InputProps {
  name: string;
}

const InputMask: React.FC<Props> = ({ name, ...rest }) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocused, setIsFocused] = useState(false);

  const [isFilled, setIsFilled] = useState(false);

  const inputRef = useRef(null);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container
      // isFilled={isFilled}

      isFocused={isFocused}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      defaultValue={defaultValue}
      ref={inputRef}
      {...rest}
    />
  );
};

export default InputMask;
