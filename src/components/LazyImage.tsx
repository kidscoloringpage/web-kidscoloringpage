import React, { useState, useEffect, useRef } from 'react';

type Props = {
  src: string;
  alt?: string;
  [key: string]: any;
};

export const LazyImage = ({ src, alt, ...props }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : undefined}
      alt={alt || ''}
      {...props}
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s' }}
    />
  );
};
