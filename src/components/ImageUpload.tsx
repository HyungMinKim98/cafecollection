import React from 'react';

const ImageUpload = () => {
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('http://localhost:5001/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        alert('Upload successful!');
      } catch (error) {
        console.error('Error:', error);
        alert('Upload failed.');
      }
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleUpload} />
    </div>
  );
};

export default ImageUpload;
