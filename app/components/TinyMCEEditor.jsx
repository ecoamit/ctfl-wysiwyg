// components/TinyMCEEditor.js
"use client";
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import htmlToRichText from "../utils/htmlToRichText";

const TinyMCEEditor = ({ sdk }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const initialValue = sdk.field.getValue();
    if (initialValue && initialValue.nodeType) {
      // Convert initial Rich Text value to HTML if necessary
      setValue(""); // Assuming initial value is handled as needed
    }

    const detachValueChangeHandler = sdk.field.onValueChanged((newValue) => {
      if (newValue && newValue.nodeType) {
        // Convert new Rich Text value to HTML if necessary
        setValue(""); // Assuming new value is handled as needed
      } else {
        setValue(newValue || "");
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
        plugins: "link image code",
        toolbar:
          "undo redo | formatselect | bold italic | alignleft aligncenter alignright | code",
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TinyMCEEditor;
