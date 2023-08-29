import React, { useRef, useMemo, useState, useCallback } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import 'react-quill/dist/quill.snow.css';
import './EditorStyle.css';
import { toolbarOptions, formats } from './EditorConfigs';
import * as uploadApi from '../../api/imageUpload';
Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);
type Props = {
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

const placeHolder =
  '커뮤니티 가이드라인에 맞지 않는 콘텐츠는 통보없이 숨겨질수 있습니다.\n\n1.남을 비방하지 말아주세요.\n2.남에게 성적인 수치심을 느낄만한 말을 하지 말아주세요.\n3.뉴진스멤버의 칭찬을 적어도 한문장이상 포함해야합니다. ex)이번 뮤뱅EAT라이브때 민지 폼 미치지않았냐?';

const EditorComponent = (props: Props) => {
  const changeContent = useCallback((content: any) => {
    props.onChange(content);
  }, []);
  const quillRef = useRef<any>();
  const imageHandler = async () => {
    try {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.addEventListener('change', async () => {
        const file = input.files![0];
        const src = await uploadApi.uploadImage(file);
        const editor = quillRef.current!.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', src);
        editor.setSelection(range.index + 1);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const modules = useMemo(
    () => ({
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  return (
    <ReactQuill
      ref={quillRef}
      onChange={changeContent}
      className="myEditor"
      theme="snow"
      placeholder={placeHolder}
      modules={modules}
      formats={formats}
    />
  );
};

export default EditorComponent;
