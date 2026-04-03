import React from 'react';
import html2canvas from 'html2canvas';

function ExportButton() {
  const handleExport = async () => {
    const canvasElement = document.getElementById('canvas-export-area');
    if (!canvasElement) return;

    try {
      // Small timeout to ensure everything is rendered
      setTimeout(async () => {
        const canvas = await html2canvas(canvasElement, {
          scale: 2, // High resolution
          useCORS: true,
          backgroundColor: '#ffffff'
        });
        
        const image = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = 'visualization.png';
        link.href = image;
        link.click();
      }, 100);
    } catch (err) {
      console.error("Export failed", err);
      alert("Failed to export visualization");
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleExport}>
      Download Image
    </button>
  );
}

export default ExportButton;
