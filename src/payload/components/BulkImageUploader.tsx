import React, { useState } from 'react';
import { useField } from 'payload/components/forms';
import './uploader.css';

const backend = 'https://brassgate-backend.onrender.com';

const BulkImageUploader: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [log, setLog] = useState<string[]>([]);

  const logMessage = (msg: string) => setLog(prev => [...prev, msg]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleUpload = async () => {
    for (const file of files) {
      try {
        logMessage(`📤 Uploading ${file.name}...`);

        const formData = new FormData();
        formData.append('file', file);

        const upRes = await fetch(`${backend}/image-upload/`, { method: 'POST', body: formData });
        const upData = await upRes.json();
        if (!upRes.ok) throw new Error(upData.error || 'Upload failed');

        const filename = upData.filename;
        logMessage(`✅ Uploaded as ${filename}`);

        const capRes = await fetch(`${backend}/caption-image/${encodeURIComponent(filename)}`);
        const capData = await capRes.json();
        logMessage(`📝 Caption: ${capData.caption}`);

        const apprRes = await fetch(`${backend}/approve-image/${encodeURIComponent(filename)}`);
        if (!apprRes.ok) throw new Error('Approval failed');
        logMessage(`🧠 Approved ${filename}`);
      } catch (err: any) {
        logMessage(`❌ Error: ${err.message}`);
      }
    }
    logMessage('🎉 Done!');
  };

  return (
    <div>
      <h2>🖼 Bulk Image Uploader</h2>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: '2px dashed #ccc',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '1rem',
          borderRadius: '8px',
          background: '#f9f9f9',
          cursor: 'pointer'
        }}
      >
        Drag & drop images here
      </div>
      {files.length > 0 && <button onClick={handleUpload}>Start Processing ({files.length})</button>}
      <div style={{ marginTop: '1rem', fontFamily: 'monospace', background: '#eee', padding: '1rem', borderRadius: '6px', maxHeight: '200px', overflowY: 'auto' }}>
        {log.map((line, idx) => <div key={idx}>{line}</div>)}
      </div>
    </div>
  );
};

export default BulkImageUploader;
