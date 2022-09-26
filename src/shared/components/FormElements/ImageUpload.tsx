import styled from "@emotion/styled";
import React, { FC, useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { InputTypes } from "./Input";

interface ImageUploadT {
  id: InputTypes;
  onInput: (id: InputTypes, pickedFile: File | null, isValid: boolean) => void;
  errorText?: string;
}

export const ImageUpload: FC<ImageUploadT> = ({ id, onInput, errorText }) => {
  const [file, setFile] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null
  );
  const [isValid, setIsValid] = useState<boolean>(false);
  const filePickerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile = null;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    if (filePickerRef && filePickerRef.current) {
      filePickerRef.current.click();
    }
  };

  return (
    <FormControl>
      <Input
        id={id}
        ref={filePickerRef}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <ImageUploadWrap>
        <ImageUploadPreview>
          {previewUrl && (
            <ImgPreview src={previewUrl as string} alt="Preview" />
          )}
          {!previewUrl && <p>Please pick an image.</p>}
        </ImageUploadPreview>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
        {!isValid && <p>{errorText}</p>}
      </ImageUploadWrap>
    </FormControl>
  );
};

const FormControl = styled.div`
  margin: 1rem 0;
`;

const Input = styled.input`
  display: none;
`;

const ImageUploadWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ImageUploadPreview = styled.div`
  width: 13rem;
  height: 13rem;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
`;

const ImgPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
