// utils/htmlToRichText.js
import { ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

const convertDraftToRichText = (raw) => {
  const content = [];

  raw.blocks.forEach((block) => {
    const node = {
      nodeType: BLOCKS.PARAGRAPH,
      content: [],
      data: {},  // Ensure data property is present
    };

    block.text.split('\n').forEach((text) => {
      node.content.push({
        nodeType: 'text',
        value: text,
        marks: block.inlineStyleRanges.map((range) => {
          switch (range.style) {
            case 'BOLD':
              return { type: MARKS.BOLD };
            case 'ITALIC':
              return { type: MARKS.ITALIC };
            default:
              return null;
          }
        }).filter(Boolean),
        data: {},  // Ensure data property is present
      });
    });

    content.push(node);
  });

  return {
    nodeType: BLOCKS.DOCUMENT,
    content,
    data: {},  // Ensure data property is present
  };
};

const htmlToRichText = (html) => {
  const blocksFromHTML = convertFromHTML(html);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const raw = convertToRaw(state);

  return convertDraftToRichText(raw);
};

export default htmlToRichText;
