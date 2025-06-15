// src/components/ContentRenderer/ContentRenderer.js

import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import Image from 'next/image';
import InArticleMiddleAd from '../AdSlots/InArticleMiddleAd';

const ContentRenderer = ({ htmlContent }) => {
  // Ensure htmlContent is a string before parsing to prevent errors.
  if (typeof htmlContent !== 'string') {
    return null;
  }
  
  let pCount = 0;
  const AD_AFTER_PARAGRAPH = 6;

  const options = {
    replace: (domNode) => {
      // Logic to insert an ad after the 6th paragraph
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

      // Logic to replace <img> tags with next/image for optimization
      if (domNode.name === 'img' && domNode.attribs) {
        const { src, alt, width, height, class: className } = domNode.attribs;

        // Use next/image if width and height are available
        if (src && width && height) {
          return (
            <Image
              src={src}
              alt={alt || 'Image from article'}
              width={parseInt(width, 10)}
              height={parseInt(height, 10)}
              className={className}
              sizes="(max-width: 768px) 100vw, 800px"
              style={{ height: 'auto', margin: '2rem 0', borderRadius: '8px' }}
            />
          );
        }

        // Fallback to a standard <img> tag if dimensions are missing
        if (src) {
            return (
                <img
                    src={src}
                    alt={alt || 'Image from article'}
                    className={className}
                    loading="lazy"
                />
            );
        }
      }
    },
  };

  // The main return statement that parses the content
  return <div>{parse(htmlContent, options)}</div>;
};

export default ContentRenderer;