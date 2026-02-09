'use client';

import { useState } from 'react';
import { useSocialShare } from '@/hooks/useSocialShare';

export const SocialShare = ({ url, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { shareOnWhatsApp, shareOnTwitter, copyToClipboard } = useSocialShare(url, title);

  const handleShareClick = () => {
    setIsOpen(!isOpen);
  };

  const handleWhatsApp = () => {
    shareOnWhatsApp();
    setIsOpen(false);
  };

  const handleTwitter = () => {
    shareOnTwitter();
    setIsOpen(false);
  };

  const handleCopy = async () => {
    await copyToClipboard();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleShareClick}
        type="button"
        className="w-6 h-6 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
        aria-label="Share"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 7.5 2.25m-7.5-2.25-7.5 2.25m7.5-2.25v2.186m0 0v2.186c0 .397-.103.77-.283 1.093m.283-1.093 7.5 2.25m-7.5-2.25-7.5-2.25m7.5 2.25v2.186m0 0c0 .397-.103.77-.283 1.093M15.717 13.907l-7.5-2.25m7.5 2.25v-2.186m0 0c0-.397.103-.77.283-1.093m-.283 1.093-7.5-2.25"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mr-2 top-1/2 -translate-y-1/2 flex flex-row gap-1 bg-white rounded-lg shadow-lg p-1 z-10">
          <button
            onClick={handleWhatsApp}
            type="button"
            className="p-1 rounded-full hover:bg-green-50 transition-colors"
            aria-label="Share on WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-green-600"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </button>

          <button
            onClick={handleTwitter}
            type="button"
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Share on X"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>

          <button
            onClick={handleCopy}
            type="button"
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Copy link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

