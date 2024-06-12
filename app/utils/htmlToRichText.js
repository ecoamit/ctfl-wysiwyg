// utils/htmlToRichText.js
import { ContentState, convertFromHTML, convertToRaw } from 'draft-js';

const htmlToRichText = (html) => {
  const blocksFromHTML = convertFromHTML(html);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const raw = convertToRaw(state);
  
  return {
    nodeType: 'document',
    content: raw.blocks.map(block => ({
      nodeType: 'paragraph',
      content: block.text.split('\n').map(text => ({
        nodeType: 'text',
        value: text,
        marks: [],
      })),
    })),
  };
};

export default htmlToRichText;
