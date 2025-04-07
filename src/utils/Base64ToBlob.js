export const base64ToBlob = (base64) => {
  if (!base64 || typeof base64 !== 'string') {
      throw new Error('Invalid Base64 string');
  }
  const binary = atob(base64);
  const length = binary.length;
  const buffer = new ArrayBuffer(length);
  const view = new Uint8Array(buffer);

  for (let i = 0; i < length; i++) {
      view[i] = binary.charCodeAt(i);
  }

  return new Blob([buffer], { type: 'image/png' });
};
