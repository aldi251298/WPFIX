// src/components/ContentRenderer/ContentRenderer.js (Versi Final Lebih Tangguh)

import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import Image from 'next/image';
import InArticleMiddleAd from '../AdSlots/InArticleMiddleAd';

const ContentRenderer = ({ htmlContent }) => {
  if (!htmlContent) return null;
  
  let pCount = 0;
  const AD_AFTER_PARAGRAPH = 6;

  const options = {
    replace: (domNode) => {
      // 1. Logika untuk Iklan di tengah artikel (tidak berubah)
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

      // 2. [PERBAIKAN] Logika baru yang lebih fleksibel untuk gambar
      if (domNode.name === 'img' && domNode.attribs) {
        const { src, alt, width, height, class: className } = domNode.attribs;

        // Jika SEMUA data ada untuk optimasi, gunakan next/image
        if (src && width && height) {
          return (
            <Image
              src={src}
              alt={alt || 'Gambar dari artikel'}
              width={parseInt(width, 10)}
              height={parseInt(height, 10)}
              className={className}
              sizes="(max-width: 768px) 100vw, 800px"
              style={{ height: 'auto', margin: '2rem 0', borderRadius: '8px' }}
            />
          );
        }

        // [FALLBACK] Jika width/height tidak ada, gunakan tag <img> biasa agar gambar tidak hilang
        if (src) {
            return (
                <img
                    src={src}
                    alt={alt || 'Gambar dari artikel'}
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