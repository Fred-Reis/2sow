import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Input from 'src/components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render highlight on input focus an blur', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const inputContainer = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(inputContainer).toHaveStyle('border-color: #2d374e');
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(inputContainer).not.toHaveStyle('border-color: #2d374e');
    });
  });
});
