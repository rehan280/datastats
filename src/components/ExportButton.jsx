import React from 'react';
import html2canvas from 'html2canvas';

function ExportButton() {
  const handleExport = async () => {
    const exportArea = document.getElementById('canvas-export-area');
    if (!exportArea) return;

    try {
      // Small timeout to ensure everything is rendered
      setTimeout(async () => {
        exportArea.style.transform = 'none';

        const rect = exportArea.getBoundingClientRect();
        const targetWidth = 800;
        const dynamicScale = Math.max(2, (targetWidth / rect.width) * 2);

        const canvas = await html2canvas(exportArea, {
          scale: dynamicScale,
          useCORS: true,
          backgroundColor: null
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
