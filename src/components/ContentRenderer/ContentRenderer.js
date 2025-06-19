// src/components/ContentRenderer/ContentRenderer.js

import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import Image from 'next/image';
import InArticleMiddleAd from '../AdSlots/InArticleMiddleAd';
import InlineRelatedPosts from '../InlineRelatedPosts/InlineRelatedPosts'; // 1. IMPORT KOMPONEN BARU

// 2. TERIMA PROPS BARU (categories, currentPostId)
const ContentRenderer = ({ htmlContent, categories, currentPostId }) => {
  if (typeof htmlContent !== 'string') {
    return null;
  }
  
  let pCount = 0;
  const AD_AFTER_PARAGRAPH = 6;
  const RELATED_POSTS_AFTER_PARAGRAPH = 4; // Tentukan posisi related posts

  const options = {
    replace: (domNode) => {
      // Logic to insert components after certain paragraphs
      if (domNode.name === 'p') {
        pCount++;

        // 3. LOGIKA UNTUK MENYISIPKAN KOMPONEN
        const componentsToInject = [];

        if (pCount === RELATED_POSTS_AFTER_PARAGRAPH) {
          componentsToInject.push(
            <InlineRelatedPosts 
              key="inline-related"
              categories={categories} 
              currentPostId={currentPostId} 
            />
          );
        }
        
        if (pCount === AD_AFTER_PARAGRAPH) {
          componentsToInject.push(<InArticleMiddleAd key="inline-ad" />);
        }

        if (componentsToInject.length > 0) {
          return (
            <React.Fragment>
              <p>{domToReact(domNode.children, options)}</p>
              {componentsToInject}
            </React.Fragment>
          );
        }
      }

      // Logic to replace <img> tags with next/image
      if (domNode.name === 'img' && domNode.attribs) {
        const { src, alt, width, height, class: className } = domNode.attribs;

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

  return <div>{parse(htmlContent, options)}</div>;
};

export default ContentRenderer;