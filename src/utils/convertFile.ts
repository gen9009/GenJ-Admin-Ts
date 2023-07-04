// File转换为Blob
export const convertFileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader?.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = err => {
      reject(err);
    };
    reader.readAsDataURL(file);
  });
};

// File转换为URL
export const convertFileToURL = (file: File) => {
  const fileURL = URL.createObjectURL(file);
  return fileURL;
};
