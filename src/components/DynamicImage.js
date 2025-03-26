import React, { useState, useEffect } from 'react';
import { Image, Skeleton } from '@chakra-ui/react';
import defaultImage from '../assets/projectImg/default.png';

const DynamicImage = ({ repoName }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        // Check if the image exists
        const imageModule = await import(`../assets/projectImg/${repoName}.png`);
        setImageSrc(imageModule.default);
      } catch (error) {
        // If the image does not exist, use the default image
        setImageSrc(defaultImage);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [repoName]);

  return (
    <>
      {isLoading ? (
        <Skeleton height="200px" />
      ) : (
        <Image src={imageSrc} alt={repoName} objectFit={'cover'} h={'auto'} />
      )}
    </>
  );
};

export default DynamicImage;
