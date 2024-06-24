// utils/htmlToRichText.js
import { ContentState, convertToRaw } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';

export default function htmlToRichText(html) {
  const contentState = stateFromHTML(html);
  const rawContentState = convertToRaw(contentState);

  return {
    nodeType: 'document',
    data: {},
    content: rawContentState.blocks.slice(0, 1).map(block => ({
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: html,
          marks: [],
          data: {},
        },
      ],
      data: {},
    })),
  };
}
