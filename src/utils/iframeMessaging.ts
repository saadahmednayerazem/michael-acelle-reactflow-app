export const sendMessageToParent = (type: string, data: any) => {
  if (window.parent !== window) {
    window.parent.postMessage({
      type,
      data,
    }, '*');
  }
};