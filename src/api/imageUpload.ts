import supabase from '../supabaseClient';
export const uploadImage = async (selectedFile: any) => {
  const fileExtension = selectedFile.name.split('.').pop(); //파일확장자추출
  const newFileName = `${
    selectedFile.name.split('.')[0] + Math.random()
  }fileExtension}`;
  const sanitizedFileName = newFileName.replace(/[^a-zA-Z0-9]/g, ''); // 잘못된 문자 제거
  const postedFilePath = `public/Post_Images/${sanitizedFileName}`;

  try {
    const { data, error: uploadError } = await supabase.storage
      .from('Post Images')
      .upload(postedFilePath, selectedFile);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return;
    }
    const response = supabase.storage
      .from('Post Images')
      .getPublicUrl(postedFilePath);

    if (response.data) {
      const publicUrl = response.data.publicUrl;
    } else {
      console.error('No public URL found in response data.');
    }

    const publicUrl = response.data.publicUrl;
    return publicUrl;
  } catch (error) {
    console.error(error);
  }
};
