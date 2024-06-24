// components/TinyMCEEditor.jsx
'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import htmlToRichText from '../utils/htmlToRichText';
import richTextToHtml from '../utils/richTextToHtml';

// Dynamically load the TinyMCE editor to prevent SSR issues
const Editor = dynamic(() => import('@tinymce/tinymce-react').then((mod) => mod.Editor), {
  ssr: false,
});

const TinyMCEEditor = ({ sdk }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const initialValue = sdk.field.getValue();
    const htmlValue = richTextToHtml(initialValue);
    console.log(htmlValue);
    setValue(htmlValue);

    const detachValueChangeHandler = sdk.field.onValueChanged(newValue => {
      const updatedHtmlValue = richTextToHtml(newValue);
      setValue(updatedHtmlValue);
    });

    sdk.window.startAutoResizer();

    return () => {
      detachValueChangeHandler();
    };
  }, [sdk]);

  const handleEditorChange = (content) => {
    setValue(content);
    const richTextValue = htmlToRichText(content);
    sdk.field.setValue(richTextValue);
  };

  return (
    <Editor
      apiKey="qmbztyhcjkiqtsxhrycd7lzdghfno2fbgit2eo1uhrf0ylw3"
      value={value}
      init={{
        height: 500,
        menubar: false,
        plugins: 'link image code',
        toolbar: 'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | code',
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TinyMCEEditor;
