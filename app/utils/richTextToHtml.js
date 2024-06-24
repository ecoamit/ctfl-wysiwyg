// utils/richTextToHtml.js
export default function richTextToHtml(richText) {
    if (!richText || !richText.content) {
      return '';
    }
  
    const convertNode = node => {
      if (node.nodeType === 'text') {
        let value = node.value;
       
        return value;
      }
  
      if (node.nodeType === 'paragraph') {
        return `${node.content.map(convertNode).join('')}`;
      }
  
  
      return '';
    };
  
    return richText.content.map(convertNode).join('');
  }
  