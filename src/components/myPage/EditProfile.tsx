import React, { useState } from 'react';
import styled from 'styled-components';
import { createClient } from '@supabase/supabase-js';
import { useDropzone, Accept, FileRejection } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '../../types/supabase';
//1. supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('supabase의 환경변수가 없습니다.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
//2
export type Users = Database['public']['Tables']['users']['Row'];

const EditProfile = ({ user }: { user: Users }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editMode, setEditMode] = useState<string>('');
  //3. drop-zone
  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };
  //4. 사진 업로드
  const handleUpload = async () => {
    console.log('handleUpload started');
    if (!selectedFile) {
      console.log('No selected file');
      return;
    }

    // const fileExists = await checkIfFileExists(selectedFile);

    // if (fileExists) {
    //   console.log('File already exists in storage. Skipping upload.');
    //   return;
    // }
    //4-1. 사진UUID생성
    const fileExtension = selectedFile.name.split('.').pop(); // 파일 확장자 추출
    const newFileName = `${uuidv4()}.${fileExtension}`;
    const profileFilePath = `public/${newFileName}`;

    console.log(selectedFile);

    try {
      const { data, error: uploadError } = await supabase.storage
        .from('Profile Images')
        .upload(profileFilePath, selectedFile);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return;
      }

      console.log('File uploaded successfully!');
      //4-2. 파일 users테이블에 업로드
      try {
        const { data, error: uploadError } = await supabase.storage
          .from('Profile Images')
          .upload(profileFilePath, selectedFile);

        if (uploadError) {
          console.error(uploadError);
          return;
        }

        console.log('File uploaded successfully!');

        const { data: userData, error: userUpdateError } = await supabase
          .from('users')
          .update({ profile_img_url: profileFilePath }) // 업데이트 쿼리
          .eq('id', user.id);

        if (userUpdateError) {
          console.error(userUpdateError);
          return;
        }

        console.log('User profile updated successfully!!!!');
      } catch (error) {
        console.error(error);
      }

      const { data: userData, error: userUpdateError } = await supabase
        .from('users')
        .update({ profile_img_url: profileFilePath }) // 업데이트 쿼리
        .eq('id', user.id);

      if (userUpdateError) {
        console.error('User update error:', userUpdateError);
        return;
      }

      console.log('User profile updated successfully!!!!~~');
    } catch (error) {
      console.error(error);
    }
    //5. 중복된 파일 업로드
    // const checkIfFileExists = async (file: File): Promise<boolean> => {
    //   const { data: files, error } = await supabase.storage
    //     .from('Profile Images')
    //     .list(`${user.id}/`);

    //   if (error) {
    //     console.error(error);
    //     return false;
    //   }

    //   return files.some((existingFile: any) => existingFile.size === file.size);
    // };
  };
  // insert into users (profile_img_url)
  // select profileFilePath
  // From
  // where
  // const { error } = await supabase
  //   .from('countries')
  //   .insert('users')

  //(번외)드롭존
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' as unknown as Accept,
    multiple: false,
  });

  const renderContent = () => {
    return (
      <Container>
        <Item>
          <Label>사진</Label>
          {editMode === 'photo' ? (
            <>
              <div {...getRootProps()}>
                <Input type="file" {...getInputProps()} />
              </div>
              <Input
                type="file"
                onChange={(event) => {
                  if (event.target.files) {
                    setSelectedFile(event.target.files[0]);
                  }
                }}
              />
              <Button onClick={() => setEditMode('')}>취소</Button>
              <Button
                onClick={() => {
                  handleUpload();
                  setEditMode('');
                }}
              >
                완료
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditMode('photo')}>변경</Button>
          )}
        </Item>
        {/* 여기에 이메일이랑 비번 변경 들어감 */}
      </Container>
    );
  };

  return <div>{renderContent()}</div>;
};

export default EditProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: none;
`;

const Button = styled.button`
  padding: 8px;
  border-radius: 4px;
  border: none;
`;
