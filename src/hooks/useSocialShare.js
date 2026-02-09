export const useSocialShare = (url, title) => {
  const encodedUrl = encodeURIComponent(url);
  
  const shareText = title ? `${title} ${url}` : url;
  const encodedShareText = encodeURIComponent(shareText);

  const whatsappUrl = `https://api.whatsapp.com/send/?text=${encodedUrl}&type=custom_url&app_absent=0`;
  const twitterUrl = `https://x.com/intent/post?text=${encodedShareText}`;

  const shareOnWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const shareOnTwitter = () => {
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return {
    shareOnWhatsApp,
    shareOnTwitter,
    copyToClipboard,
  };
};

