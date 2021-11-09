import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { MyFieldError, MyFieldLabel } from './form';
import { useField } from 'formik';
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);

interface IFileInputs {
  values: any;
  fieldName: string;
  setFieldValue: any;
  label: string;
  innerLabel: string;
  maxFiles?: number;
  types?: string[];
  maxSize?: string;
  typesMessage?: string;
}

const FileUpload = ({
  values,
  fieldName,
  setFieldValue,
  label,
  innerLabel,
  maxFiles,
  types,
  maxSize,
  typesMessage,
}: IFileInputs) => {
  const [field, meta] = useField<any>(fieldName);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <div>
      <MyFieldLabel label={label} error={!!errorText} />
      <FilePond
        key={fieldName}
        files={values[fieldName]}
        onupdatefiles={(files) => {
          const filesList = files.map((fileItem) => fileItem.file);
          setFieldValue(fieldName, filesList);
        }}
        allowMultiple={true}
        maxFiles={maxFiles || 2}
        name='files'
        labelIdle={innerLabel}
        acceptedFileTypes={types || ['image/png', 'image/jpeg']}
        maxFileSize={maxSize || '20MB'}
        labelFileTypeNotAllowed={
          typesMessage
            ? `Que les fichiers de type ${typesMessage} sont acceptés`
            : 'Que les images de type JPG ou PNG sont acceptés'
        }
        labelMaxFileSize={
          maxSize
            ? `La taille de chaque fichier ne doit dépasser ${maxSize}`
            : 'La taille de chaque fichier ne doit dépasser 20MB'
        }
        labelMaxFileSizeExceeded='Choisissez un fichier plus petit'
      />
      {errorText && <MyFieldError error={errorText} />}
    </div>
  );
};

const filesSizeCheck = (files: File[], size = 20): boolean => {
  if (!files || !files.length) return false;
  return files.every((file) => {
    const mb = file.size / 1024 / 1024;
    return mb <= size;
  });
};
const filesTypeCheck = (files: File[], types: string[]): boolean => {
  if (!files || !files.length) return false;
  return files.every((file) => {
    return types.includes(file.type);
  });
};

export { FileUpload, filesSizeCheck, filesTypeCheck };
