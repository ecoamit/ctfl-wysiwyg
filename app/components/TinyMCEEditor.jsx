'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import htmlToRichText from '../utils/htmlToRichText';

// Dynamically load the TinyMCE editor to prevent SSR issues
const Editor = dynamic(() => import('@tinymce/tinymce-react').then((mod) => mod.Editor), {
  ssr: false,
});

const TinyMCEEditor = ({ sdk }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const initialValue = sdk.field.getValue();
    if (initialValue && initialValue.nodeType) {
      // If initial value is already rich text, convert it to HTML
      const blocks = initialValue.content.map(block => block.content.map(textNode => textNode.value).join('\n')).join('\n');
      setValue(blocks);
    } else {
      setValue(initialValue || '');
    }

    const detachValueChangeHandler = sdk.field.onValueChanged((newValue) => {
      if (newValue && newValue.nodeType) {
        // If new value is rich text, convert it to HTML
        const blocks = newValue.content.map(block => block.content.map(textNode => textNode.value).join('\n')).join('\n');
        setValue(blocks);
      } else {
        setValue(newValue || '');
      }
    });

    sdk.window.startAutoResizer();

    return () => {
      detachValueChangeHandler();
    };
  }, [sdk]);

  const handleEditorChange = (content) => {
    const richTextValue = htmlToRichText(content);
    setValue(content);
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
        toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | code',
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TinyMCEEditor;
