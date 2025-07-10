import React from 'react';

const PromoCard = ({ title, subtitle, buttonText, bgColor, textColor, children, onClick }) => (
  <div className={`${bgColor} ${textColor} rounded-lg overflow-hidden relative h-full`}>
    <div className="p-6 h-full flex flex-col">
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        {subtitle && <p className="text-sm mb-4">{subtitle}</p>}
        <button 
          onClick={onClick}
          className="text-sm font-semibold underline hover:no-underline"
        >
          {buttonText}
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {children}
      </div>
    </div>
  </div>
);

export default PromoCard;
