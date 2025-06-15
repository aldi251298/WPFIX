// src/components/ContentRenderer/ContentRenderer.js (Versi Sederhana)
import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import InArticleMiddleAd from '../AdSlots/InArticleMiddleAd'; // Impor iklan tengah

const ContentRenderer = ({ htmlContent }) => {
  let pCount = 0;
  const AD_AFTER_PARAGRAPH = 6; // Posisi iklan sudah ditetapkan di sini

  const options = {
    replace: (domNode) => {
      if (domNode.name === 'p') {
        pCount++;
        if (pCount === AD_AFTER_PARAGRAPH) {
          return (
            <React.Fragment>
              <p>{domToReact(domNode.children, options)}</p>
              <InArticleMiddleAd />
            </React.Fragment>
          );
        }
      }
    },
  };

  return <div>{parse(htmlContent, options)}</div>;
};

export default ContentRenderer;