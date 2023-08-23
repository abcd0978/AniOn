import React, { useState } from "react";
import styled from "styled-components";
import { createClient } from "@supabase/supabase-js";
import { useDropzone, Accept, FileRejection } from "react-dropzone";
import { Database } from "../../types/supabase";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("supabase의 환경변수가 없습니다.");
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Users = Database["public"]["Tables"]["users"]["Row"];

const EditProfile = ({ user }: { user: Users }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editMode, setEditMode] = useState<string>("");

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" as unknown as Accept,
    multiple: false,
  });

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }
    const profileFilePath = `public/${selectedFile.name}`;
    console.log(selectedFile);
    try {
      const { data, error: uploadError } = await supabase.storage
        .from("Profile Images")
        .upload(profileFilePath, selectedFile);

      if (uploadError) {
        console.error(uploadError);
        return;
      }
      console.log("File uploaded successfully!");

      const { data: userData, error: userUpdateError } = await supabase
        .from("users")
        .update({ profile_img_url: data.path })
        .eq("id", user.id);

      if (userUpdateError) {
        console.error(userUpdateError);
        return;
      }
      console.log("User profile updated successfully!!!!");
    } catch (error) {
      console.error(error);
    }
  };
  const renderContent = () => {
    return (
      <Container>
        <Item>
          <Label>사진</Label>
          {editMode === "photo" ? (
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
              <Button onClick={() => setEditMode("")}>취소</Button>
              <Button
                onClick={() => {
                  handleUpload();
                  setEditMode("");
                }}
              >
                완료
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditMode("photo")}>변경</Button>
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
