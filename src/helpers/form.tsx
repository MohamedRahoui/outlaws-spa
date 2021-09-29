import { TextField } from '@mui/material';
import { useField } from 'formik';

const MyTextField = ({ label, multiline = false, rows = 0, ...props }: any) => {
  const [field, meta] = useField<any>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      color='secondary'
      variant='standard'
      type='text'
      label={label}
      helperText={errorText}
      error={!!errorText}
      {...field}
      multiline={multiline}
      rows={rows}
      sx={{
        width: '100%',
      }}
    />
  );
};
const MyFieldLabel = ({
  label,
  error = false,
}: {
  label: string;
  error: boolean;
}) => {
  return (
    <div
      style={{
        color: error ? '#f44336' : 'rgba(255, 255, 255, 0.7)',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: '1.4375em',
        letterSpacing: '0.00938em',
        marginBottom: 10,
      }}
    >
      {label}
    </div>
  );
};

const MyFieldError = ({ error }: { error: string }) => {
  return (
    <p
      style={{
        color: '#f44336',
        fontSize: '0.75rem',
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
        marginTop: 3,
      }}
    >
      {error}
    </p>
  );
};

export { MyTextField, MyFieldLabel, MyFieldError };
