import React from 'react';

// Extract table of contents from memorial content
export const extractTableOfContents = (content: string): string[] => {
  const toc: string[] = [];
  const tocRegex = /<목차>(.*?)<\/목차>/g;
  let match;

  while ((match = tocRegex.exec(content)) !== null) {
    toc.push(match[1]);
  }

  return toc;
};

// Simple content parser for memorial content
// Supports basic tags: <목차>, <사진>, <동영상>, <강조>, <다음 />
export const parseMemorialContent = (content: string): React.ReactNode[] => {
  const elements: React.ReactNode[] = [];
  let indexIdx = 0;

  const tagRegex =
    /<목차>(.*?)<\/목차>|<사진\s*\{(.*?)\}>(.*?)<\/사진>|<동영상>(.*?)<\/동영상>|<강조>(.*?)<\/강조>|<다음\s*\/>/g;
  let lastIndex = 0;
  let match;

  while ((match = tagRegex.exec(content)) !== null) {
    // Process previous plain text
    if (match.index > lastIndex) {
      const text = content.slice(lastIndex, match.index).trim();
      if (text) {
        text.split('\n').forEach((line, idx) => {
          if (line.trim()) {
            elements.push(<p key={`text-${lastIndex}-${idx}`}>{line}</p>);
          }
        });
      }
    }

    if (match[1]) {
      // 목차 (index/section title)
      indexIdx += 1;
      elements.push(
        <React.Fragment key={`목차-${match.index}`}>
          <hr
            style={{
              width: '100%',
              height: '0.1rem',
              backgroundColor: '#cccccc',
              border: 'none',
              margin: '20px 0',
            }}
          />
          <h2
            style={{
              color: 'var(--Stroke, #e774dd)',
              fontFamily: 'Galmuri11',
              fontSize: '1.5rem',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              margin: '0 0 20px 0',
            }}
          >
            {indexIdx}. {match[1]}
          </h2>
        </React.Fragment>,
      );
    } else if (match[2] && match[3]) {
      // 사진 (image with width)
      elements.push(
        <img
          key={`사진-${match.index}`}
          src={match[3].trim()}
          alt=""
          style={{ width: match[2].trim(), maxWidth: '100%' }}
        />,
      );
    } else if (match[4]) {
      // 동영상 (video)
      const videoUrl = match[4].trim();
      let embedUrl = '';

      // Convert YouTube links to embed format
      if (videoUrl.includes('youtube.com/watch?v=')) {
        embedUrl = videoUrl.replace('watch?v=', 'embed/').split('&')[0];
      } else if (videoUrl.includes('youtu.be/')) {
        const videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else {
        embedUrl = videoUrl;
      }

      elements.push(
        <iframe
          key={`동영상-${match.index}`}
          src={embedUrl}
          width="100%"
          height="200"
          style={{ maxWidth: '560px', border: 'none' }}
          allowFullScreen
        />,
      );
    } else if (match[5]) {
      // 강조 (bold/emphasis)
      elements.push(<strong key={`강조-${match.index}`}>{match[5]}</strong>);
    } else if (match[0].startsWith('<다음')) {
      // 다음 (line break)
      elements.push(
        <p key={`br-${match.index}`}>
          <br />
        </p>,
      );
    }

    lastIndex = tagRegex.lastIndex;
  }

  // Process remaining text
  if (lastIndex < content.length) {
    const remainingText = content.slice(lastIndex).trim();
    if (remainingText) {
      remainingText.split('\n').forEach((line, idx) => {
        if (line.trim()) {
          elements.push(<p key={`text-end-${lastIndex}-${idx}`}>{line}</p>);
        }
      });
    }
  }

  return elements;
};
