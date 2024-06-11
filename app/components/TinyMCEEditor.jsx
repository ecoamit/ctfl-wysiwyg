import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

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
    setValue(content);
    sdk.field.setValue(content);
  };

  return (
    <Editor
      apiKey="qmbztyhcjkiqtsxhrycd7lzdghfno2fbgit2eo1uhrf0ylw3"
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
