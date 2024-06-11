// utils/htmlToRichText.js
import { BLOCKS } from '@contentful/rich-text-types';

const htmlToRichText = (html) => {
  // A simple example of converting HTML to Rich Text format
  // In a real-world scenario, you might want to use a library or more sophisticated logic
  return {
    nodeType: BLOCKS.DOCUMENT,
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        content: [
          {
            nodeType: 'text',
            value: html,
            marks: [],
          },
        ],
      },
    ],
  };
};

export default htmlToRichText;
