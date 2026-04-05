import React from 'react';
import html2canvas from 'html2canvas';

function ExportButton() {
  const handleExport = async () => {
    const exportArea = document.getElementById('canvas-export-area');
    if (!exportArea) return;

    // ── Step 1: Deep-clone the canvas element ──────────────────────────────
    // Cloning (rather than mutating) keeps the live element's flex layout
    // intact. The clone is appended to <body> so it lays out independently.
    const clone = exportArea.cloneNode(true);

    Object.assign(clone.style, {
      position:        'fixed',
      top:             '0',
      left:            '-9999px',
      width:           '800px',
      height:          '450px',
      transform:       'none',
      transformOrigin: 'top left',
      borderRadius:    '0',
      boxShadow:       'none',
      zIndex:          '-1',
      overflow:        'hidden',
      // Restore display so the flex column (body + footer) renders correctly
      display:         'flex',
      flexDirection:   'column',
    });

    document.body.appendChild(clone);

    // ── Step 2: Fix letter-spacing inside the clone ────────────────────────
    // html2canvas mis-renders negative letter-spacing (chars overlap).
    // Zero it out on every element in the clone before capture.
    clone.querySelectorAll('*').forEach(el => {
      el.style.letterSpacing = 'normal';
    });

    // ── Step 3: Wait for the browser to reflow the clone ──────────────────
    await new Promise(resolve => setTimeout(resolve, 200));

    try {
      const canvas = await html2canvas(clone, {
        scale:        2,       // 2× → 1600×900 px retina output
        useCORS:      true,
        backgroundColor: null,
        width:        800,
        height:       450,
        windowWidth:  800,
        windowHeight: 450,
        x:            0,
        y:            0,
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link  = document.createElement('a');
      link.download = 'visualization.png';
      link.href     = image;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
      alert('Failed to export visualization');
    } finally {
      // ── Step 4: Always remove the clone ───────────────────────────────────
      document.body.removeChild(clone);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleExport}>
      Download Image
    </button>
  );
}

export default ExportButton;
