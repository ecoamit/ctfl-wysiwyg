// utils/htmlToRichText.js
import { ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

const convertDraftToRichText = (raw) => {
  const content = [];

  raw.blocks.forEach((block) => {
    const node = {
      nodeType: BLOCKS.PARAGRAPH,
      content: [],
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
      });
    });

    content.push(node);
  });

  return {
    nodeType: BLOCKS.DOCUMENT,
    content,
  };
};

const htmlToRichText = (html) => {
  const contentBlock = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const raw = convertToRaw(contentState);

  return convertDraftToRichText(raw);
};

export default htmlToRichText;
