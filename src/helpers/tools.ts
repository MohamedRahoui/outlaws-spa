const CopyTextToClipboard = async (text: string) => {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
};
const scrollTop = () => {
  try {
    window?.scrollTo(0, 0);
    document?.querySelector('.globalWrap')?.scrollTo(0, 0);
    document?.querySelector('body')?.scrollTo(0, 0);
  } catch (_) {}
};
export { CopyTextToClipboard, scrollTop };
