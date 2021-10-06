import { isEqual } from 'lodash';
import { Autocomplete } from '@material-ui/lab';
import { CircularProgress, TextField } from '@material-ui/core';

interface SelectProps<T> {
  options: Array<T>,
  visualOptionName: keyof T,
  inputLabel: string,
  selected: T | null,
  disabled?: boolean,
  isLoading?: boolean,
  onChange: (arg0: T | null) => void
}

function Select<T>({
  options,
  visualOptionName,
  inputLabel,
  disabled,
  selected,
  onChange,
  isLoading,
}: SelectProps<T>) {
  return (
    <Autocomplete
      value={selected}
      options={options}
      disabled={disabled}
      onChange={(ev, newValue) => onChange(newValue)}
      style={{ maxWidth: 450, width: '100%' }}
      getOptionLabel={(option) => String(option[visualOptionName])}
      getOptionSelected={(option, value) => isEqual(option, value)}
      renderInput={(params) => (
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          label={inputLabel}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress data-testid="progressLoadingInput" color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

Select.defaultProps = {
  disabled: false,
  isLoading: false,
};

export default Select;
