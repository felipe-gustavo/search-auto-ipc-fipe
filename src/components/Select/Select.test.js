/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import { Autocomplete } from '@material-ui/lab';
import Select from '.';

jest.mock('@material-ui/core', () => ({
  ...jest.requireActual('@material-ui/core'),
  TextField: jest.fn().mockImplementation(
    (props) => (
      <div>{props.InputProps.endAdornment}</div>
    ),
  ),
}));
jest.mock('@material-ui/lab', () => ({
  Autocomplete: jest.fn().mockImplementation(
    (props) => {
      const ActualAutocomplete = jest.requireActual('@material-ui/lab').Autocomplete;
      return <ActualAutocomplete {...props} />;
    },
  ),
}));

const onChange = jest.fn();

const makeAutocomplete = ({
  disabled,
  isLoading,
} = {
  disabled: false,
  isLoading: false,
}) => (
  <Select
    options={[]}
    inputLabel="some-label"
    onChange={onChange}
    selected={null}
    visualOptionName="some-field"
    disabled={disabled}
    isLoading={isLoading}
  />
);

describe('<Select>', () => {
  it('check renders', () => {
    const { toJSON } = create(makeAutocomplete());

    expect(toJSON()).toMatchSnapshot();
  });

  describe('when onChange has been called', () => {
    beforeEach(() => {
      Autocomplete.mockImplementationOnce(
        (props) => {
          props.onChange('some-event', 'some-option');
          return <></>;
        },
      );
    });

    it('check onChange', () => {
      render(makeAutocomplete());

      expect(onChange).toBeCalledWith('some-option');
    });
  });

  describe('when disable select', () => {
    beforeEach(() => {
      Autocomplete.mockImplementationOnce();
    });

    it('check renders', () => {
      const { toJSON } = create(makeAutocomplete({ disabled: true, isLoading: false }));

      expect(toJSON()).toMatchSnapshot();
    });

    it('check if disabled props has been passed', () => {
      render(makeAutocomplete({ disabled: true, isLoading: false }));

      const { disabled } = Autocomplete.mock.calls[0][0];

      expect(disabled).toBeTruthy();
    });
  });

  describe('when select is loading', () => {
    beforeEach(() => {
      Autocomplete.mockImplementationOnce();
    });

    it('check renders', () => {
      const { toJSON } = create(makeAutocomplete({ disabled: true, isLoading: false }));

      expect(toJSON()).toMatchSnapshot();
    });

    it('check if loading render', () => {
      render(makeAutocomplete({ disabled: false, isLoading: true }));

      expect(screen.getByTestId('progressLoadingInput')).toBeInTheDocument();
    });
  });
});
