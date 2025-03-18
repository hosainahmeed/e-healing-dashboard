import React from 'react';
import { imageUrl } from '../../../../Utils/server';

const DocumentCard = ({ title, imageSrc }) => (
  <div className="bg-white shadow-sm rounded-lg p-4">
    <h4 className="font-medium mb-2">{title}</h4>
    <div className="mb-2 h-40 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
      <img
        src={imageUrl(imageSrc)}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

export default DocumentCard;

