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
      apiKey="shnyf4d14xq4614v6a2d3qgb91nl39yfqqhvkqmsm7a3l9mf"
      value={value}
      init={{
        height: 500,
        menubar: false,
        plugins: ["table","code","preview","image","media","lists","directionality","link","searchreplace","anchor","charmap"],
        toolbar: "fullScreen code  charmap  preview formatselect undo redo blocks fontfamily fontsize  formatselect " + "anchor link unlink openlink bold italic  underline backcolor  alignleft aligncenter alignright alignjustify " + "searchreplace  bullist numlist ltr rtl outdent indent  " + "removeformat table tabledelete tableprops tablerowprops tablecellprops tablemergecells tableinsertrowbefore tableinsertrowafter tabledeleterow  tableinsertcolbefore tableinsertcolafter tabledeletecol tablerowheader tablecolheader image media superscript subscript",
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TinyMCEEditor;
