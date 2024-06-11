// components/TinyMCEEditor.js
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import htmlToRichText from "../utils/htmlToRichText";

const TinyMCEEditor = ({ sdk }) => {
  const [value, setValue] = useState(sdk.field.getValue() || "");

  useEffect(() => {
    const detachValueChangeHandler = sdk.field.onValueChanged((newValue) => {
      setValue(newValue);
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
      apiKey="your-tinymce-api-key"
      value={value}
      init={{
        height: 500,
        menubar: false,
        plugins: "link image code",
        toolbar:
          "undo redo | formatselect | bold italic | alignleft aligncenter alignright | code",
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TinyMCEEditor;
