// ===================================
// TELUGU TEXT EDITOR & IMAGE MAKER
// Main JavaScript File
// ===================================

// ===================================
// STATE MANAGEMENT
// ===================================
const state = {
    // Text Properties
    text: 'స్వాగతం',
    fontFamily: "'Noto Sans Telugu', sans-serif",
    fontSize: 72,
    textColor: '#ffffff',
    letterSpacing: 0,
    lineSpacing: 1.5,
    isBold: false,
    isItalic: false,
    
    // Text Effects
    shadowEnabled: false,
    shadowColor: '#000000',
    shadowBlur: 10,
    strokeEnabled: false,
    strokeColor: '#000000',
    strokeWidth: 2,
    
    // Background
    bgColor: '#1a1a2e',
    bgImage: null,
    
    // Text Position & Alignment
    textX: 0.5, // Percentage (0-1)
    textY: 0.5, // Percentage (0-1)
    textAlign: 'center',
    
    // Canvas
    resolution: '1080', // '1080' or '4k'
    canvasWidth: 1920,
    canvasHeight: 1080,
    
    // Custom Fonts
    customFonts: []
};

// ===================================
// DOM ELEMENTS
// ===================================
const elements = {
    // Text Input
    textInput: document.getElementById('textInput'),
    
    // Font Controls
    fontFamily: document.getElementById('fontFamily'),
    fontUpload: document.getElementById('fontUpload'),
    fontSize: document.getElementById('fontSize'),
    fontSizeValue: document.getElementById('fontSizeValue'),
    
    // Text Styling
    textColor: document.getElementById('textColor'),
    letterSpacing: document.getElementById('letterSpacing'),
    letterSpacingValue: document.getElementById('letterSpacingValue'),
    lineSpacing: document.getElementById('lineSpacing'),
    lineSpacingValue: document.getElementById('lineSpacingValue'),
    boldBtn: document.getElementById('boldBtn'),
    italicBtn: document.getElementById('italicBtn'),
    
    // Effects
    shadowEnabled: document.getElementById('shadowEnabled'),
    shadowControls: document.getElementById('shadowControls'),
    shadowColor: document.getElementById('shadowColor'),
    shadowBlur: document.getElementById('shadowBlur'),
    shadowBlurValue: document.getElementById('shadowBlurValue'),
    strokeEnabled: document.getElementById('strokeEnabled'),
    strokeControls: document.getElementById('strokeControls'),
    strokeColor: document.getElementById('strokeColor'),
    strokeWidth: document.getElementById('strokeWidth'),
    strokeWidthValue: document.getElementById('strokeWidthValue'),
    
    // Background
    bgImageUpload: document.getElementById('bgImageUpload'),
    bgColor: document.getElementById('bgColor'),
    clearBgBtn: document.getElementById('clearBgBtn'),
    
    // Alignment
    alignLeft: document.getElementById('alignLeft'),
    alignCenter: document.getElementById('alignCenter'),
    alignRight: document.getElementById('alignRight'),
    
    // Export
    resolution: document.getElementById('resolution'),
    downloadBtn: document.getElementById('downloadBtn'),
    
    // Canvas
    canvas: document.getElementById('previewCanvas'),
    canvasContainer: document.getElementById('canvasContainer'),
    draggableText: document.getElementById('draggableText'),
    canvasResolution: document.getElementById('canvasResolution'),
    
    // Custom Fonts Group
    customFontsGroup: document.getElementById('customFontsGroup')
};

// Get canvas context
const ctx = elements.canvas.getContext('2d');

// ===================================
// INITIALIZATION
// ===================================
function init() {
    setupEventListeners();
    updateCanvas();
    updateDraggableText();
}

// ===================================
// EVENT LISTENERS SETUP
// ===================================
function setupEventListeners() {
    // Text Input
    elements.textInput.addEventListener('input', (e) => {
        state.text = e.target.value;
        updateCanvas();
        updateDraggableText();
    });
    
    // Font Family
    elements.fontFamily.addEventListener('change', (e) => {
        state.fontFamily = e.target.value;
        updateCanvas();
        updateDraggableText();
    });
    
    // Font Upload
    elements.fontUpload.addEventListener('change', handleFontUpload);
    
    // Font Size
    elements.fontSize.addEventListener('input', (e) => {
        state.fontSize = parseInt(e.target.value);
        elements.fontSizeValue.textContent = state.fontSize;
        updateCanvas();
        updateDraggableText();
    });
    
    // Text Color
    elements.textColor.addEventListener('input', (e) => {
        state.textColor = e.target.value;
        document.querySelector('.color-value').textContent = e.target.value;
        updateCanvas();
        updateDraggableText();
    });
    
    // Letter Spacing
    elements.letterSpacing.addEventListener('input', (e) => {
        state.letterSpacing = parseInt(e.target.value);
        elements.letterSpacingValue.textContent = state.letterSpacing;
        updateCanvas();
        updateDraggableText();
    });
    
    // Line Spacing
    elements.lineSpacing.addEventListener('input', (e) => {
        state.lineSpacing = parseFloat(e.target.value);
        elements.lineSpacingValue.textContent = state.lineSpacing;
        updateCanvas();
        updateDraggableText();
    });
    
    // Bold Button
    elements.boldBtn.addEventListener('click', () => {
        state.isBold = !state.isBold;
        elements.boldBtn.dataset.active = state.isBold;
        updateCanvas();
        updateDraggableText();
    });
    
    // Italic Button
    elements.italicBtn.addEventListener('click', () => {
        state.isItalic = !state.isItalic;
        elements.italicBtn.dataset.active = state.isItalic;
        updateCanvas();
        updateDraggableText();
    });
    
    // Shadow Enabled
    elements.shadowEnabled.addEventListener('change', (e) => {
        state.shadowEnabled = e.target.checked;
        elements.shadowControls.style.display = state.shadowEnabled ? 'block' : 'none';
        updateCanvas();
        updateDraggableText();
    });
    
    // Shadow Color
    elements.shadowColor.addEventListener('input', (e) => {
        state.shadowColor = e.target.value;
        document.querySelector('.color-value-shadow').textContent = e.target.value;
        updateCanvas();
        updateDraggableText();
    });
    
    // Shadow Blur
    elements.shadowBlur.addEventListener('input', (e) => {
        state.shadowBlur = parseInt(e.target.value);
        elements.shadowBlurValue.textContent = state.shadowBlur;
        updateCanvas();
        updateDraggableText();
    });
    
    // Stroke Enabled
    elements.strokeEnabled.addEventListener('change', (e) => {
        state.strokeEnabled = e.target.checked;
        elements.strokeControls.style.display = state.strokeEnabled ? 'block' : 'none';
        updateCanvas();
        updateDraggableText();
    });
    
    // Stroke Color
    elements.strokeColor.addEventListener('input', (e) => {
        state.strokeColor = e.target.value;
        document.querySelector('.color-value-stroke').textContent = e.target.value;
        updateCanvas();
        updateDraggableText();
    });
    
    // Stroke Width
    elements.strokeWidth.addEventListener('input', (e) => {
        state.strokeWidth = parseInt(e.target.value);
        elements.strokeWidthValue.textContent = state.strokeWidth;
        updateCanvas();
        updateDraggableText();
    });
    
    // Background Image Upload
    elements.bgImageUpload.addEventListener('change', handleBgImageUpload);
    
    // Background Color
    elements.bgColor.addEventListener('input', (e) => {
        state.bgColor = e.target.value;
        document.querySelector('.color-value-bg').textContent = e.target.value;
        updateCanvas();
    });
    
    // Clear Background
    elements.clearBgBtn.addEventListener('click', () => {
        state.bgImage = null;
        elements.bgImageUpload.value = '';
        updateCanvas();
    });
    
    // Alignment Buttons
    [elements.alignLeft, elements.alignCenter, elements.alignRight].forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            document.querySelectorAll('.align-btn').forEach(b => b.classList.remove('active'));
            // Add to clicked
            e.target.classList.add('active');
            state.textAlign = e.target.dataset.align;
            
            // Update X position based on alignment
            if (state.textAlign === 'left') state.textX = 0.1;
            else if (state.textAlign === 'center') state.textX = 0.5;
            else if (state.textAlign === 'right') state.textX = 0.9;
            
            updateCanvas();
            updateDraggableText();
        });
    });
    
    // Resolution Change
    elements.resolution.addEventListener('change', (e) => {
        state.resolution = e.target.value;
        if (state.resolution === '1080') {
            state.canvasWidth = 1920;
            state.canvasHeight = 1080;
        } else {
            state.canvasWidth = 3840;
            state.canvasHeight = 2160;
        }
        elements.canvas.width = state.canvasWidth;
        elements.canvas.height = state.canvasHeight;
        elements.canvasResolution.textContent = `${state.canvasWidth} × ${state.canvasHeight}`;
        updateCanvas();
    });
    
    // Download Button
    elements.downloadBtn.addEventListener('click', downloadImage);
    
    // Draggable Text
    setupDraggable();
}

// ===================================
// CUSTOM FONT UPLOAD
// ===================================
async function handleFontUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
        const fontName = file.name.split('.')[0];
        const fontBuffer = await file.arrayBuffer();
        
        // Create a font face
        const fontFace = new FontFace(fontName, fontBuffer);
        await fontFace.load();
        
        // Add to document
        document.fonts.add(fontFace);
        
        // Add to state
        state.customFonts.push(fontName);
        
        // Add to dropdown
        const option = document.createElement('option');
        option.value = `'${fontName}', sans-serif`;
        option.textContent = fontName;
        elements.customFontsGroup.appendChild(option);
        
        // Select the new font
        elements.fontFamily.value = `'${fontName}', sans-serif`;
        state.fontFamily = `'${fontName}', sans-serif`;
        
        updateCanvas();
        updateDraggableText();
        
        alert(`Font "${fontName}" uploaded successfully!`);
    } catch (error) {
        console.error('Font upload error:', error);
        alert('Failed to upload font. Please ensure it\'s a valid font file (.ttf, .otf, .woff)');
    }
}

// ===================================
// BACKGROUND IMAGE UPLOAD
// ===================================
function handleBgImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            state.bgImage = img;
            updateCanvas();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// ===================================
// CANVAS RENDERING
// ===================================
function updateCanvas() {
    // Clear canvas
    ctx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);
    
    // Draw background
    if (state.bgImage) {
        // Draw image to cover entire canvas
        const imgAspect = state.bgImage.width / state.bgImage.height;
        const canvasAspect = state.canvasWidth / state.canvasHeight;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (imgAspect > canvasAspect) {
            // Image is wider
            drawHeight = state.canvasHeight;
            drawWidth = state.bgImage.width * (state.canvasHeight / state.bgImage.height);
            offsetX = (state.canvasWidth - drawWidth) / 2;
            offsetY = 0;
        } else {
            // Image is taller
            drawWidth = state.canvasWidth;
            drawHeight = state.bgImage.height * (state.canvasWidth / state.bgImage.width);
            offsetX = 0;
            offsetY = (state.canvasHeight - drawHeight) / 2;
        }
        
        ctx.drawImage(state.bgImage, offsetX, offsetY, drawWidth, drawHeight);
    } else {
        // Draw solid color
        ctx.fillStyle = state.bgColor;
        ctx.fillRect(0, 0, state.canvasWidth, state.canvasHeight);
    }
    
    // Prepare text rendering
    drawTextOnCanvas();
}

function drawTextOnCanvas() {
    if (!state.text) return;
    
    // Calculate actual font size for canvas (scale based on resolution)
    const scaleFactor = state.resolution === '4k' ? 2 : 1;
    const actualFontSize = state.fontSize * scaleFactor;
    
    // Set font properties
    let fontWeight = state.isBold ? 'bold' : 'normal';
    let fontStyle = state.isItalic ? 'italic' : 'normal';
    ctx.font = `${fontStyle} ${fontWeight} ${actualFontSize}px ${state.fontFamily}`;
    ctx.fillStyle = state.textColor;
    ctx.textAlign = state.textAlign;
    
    // Set shadow if enabled
    if (state.shadowEnabled) {
        ctx.shadowColor = state.shadowColor;
        ctx.shadowBlur = state.shadowBlur * scaleFactor;
        ctx.shadowOffsetX = 2 * scaleFactor;
        ctx.shadowOffsetY = 2 * scaleFactor;
    } else {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
    
    // Calculate position
    const x = state.textX * state.canvasWidth;
    const y = state.textY * state.canvasHeight;
    
    // Split text into lines
    const lines = state.text.split('\n');
    const lineHeight = actualFontSize * state.lineSpacing;
    
    // Calculate starting Y position for centered multi-line text
    const totalHeight = lines.length * lineHeight;
    let startY = y - (totalHeight / 2) + (lineHeight / 2);
    
    // Draw each line
    lines.forEach((line, index) => {
        const lineY = startY + (index * lineHeight);
        
        // Draw stroke if enabled
        if (state.strokeEnabled) {
            ctx.strokeStyle = state.strokeColor;
            ctx.lineWidth = state.strokeWidth * scaleFactor;
            ctx.lineJoin = 'round';
            ctx.miterLimit = 2;
            
            // Apply letter spacing for stroke
            if (state.letterSpacing !== 0) {
                drawTextWithLetterSpacing(line, x, lineY, state.letterSpacing * scaleFactor, true);
            } else {
                ctx.strokeText(line, x, lineY);
            }
        }
        
        // Draw fill text
        if (state.letterSpacing !== 0) {
            drawTextWithLetterSpacing(line, x, lineY, state.letterSpacing * scaleFactor, false);
        } else {
            ctx.fillText(line, x, lineY);
        }
    });
}

// Draw text with custom letter spacing
function drawTextWithLetterSpacing(text, x, y, spacing, isStroke) {
    const chars = Array.from(text); // Handle Telugu conjuncts properly
    let currentX = x;
    
    // Adjust starting position based on alignment
    if (state.textAlign === 'center') {
        const totalWidth = chars.reduce((sum, char) => {
            return sum + ctx.measureText(char).width + spacing;
        }, 0) - spacing;
        currentX = x - (totalWidth / 2);
    } else if (state.textAlign === 'right') {
        const totalWidth = chars.reduce((sum, char) => {
            return sum + ctx.measureText(char).width + spacing;
        }, 0) - spacing;
        currentX = x - totalWidth;
    }
    
    chars.forEach((char) => {
        if (isStroke) {
            ctx.strokeText(char, currentX, y);
        } else {
            ctx.fillText(char, currentX, y);
        }
        currentX += ctx.measureText(char).width + spacing;
    });
}

// ===================================
// UPDATE DRAGGABLE TEXT OVERLAY
// ===================================
function updateDraggableText() {
    elements.draggableText.textContent = state.text;
    elements.draggableText.style.fontFamily = state.fontFamily;
    elements.draggableText.style.fontSize = `${state.fontSize}px`;
    elements.draggableText.style.color = state.textColor;
    elements.draggableText.style.fontWeight = state.isBold ? 'bold' : 'normal';
    elements.draggableText.style.fontStyle = state.isItalic ? 'italic' : 'normal';
    elements.draggableText.style.letterSpacing = `${state.letterSpacing}px`;
    elements.draggableText.style.lineHeight = state.lineSpacing;
    elements.draggableText.style.textAlign = state.textAlign;
    
    // Apply shadow
    if (state.shadowEnabled) {
        elements.draggableText.style.textShadow = 
            `2px 2px ${state.shadowBlur}px ${state.shadowColor}`;
    } else {
        elements.draggableText.style.textShadow = 'none';
    }
    
    // Apply stroke (using webkit text stroke)
    if (state.strokeEnabled) {
        elements.draggableText.style.webkitTextStroke = 
            `${state.strokeWidth}px ${state.strokeColor}`;
    } else {
        elements.draggableText.style.webkitTextStroke = 'none';
    }
    
    // Update position
    elements.draggableText.style.left = `${state.textX * 100}%`;
    elements.draggableText.style.top = `${state.textY * 100}%`;
}

// ===================================
// DRAGGABLE TEXT FUNCTIONALITY
// ===================================
function setupDraggable() {
    let isDragging = false;
    let startX, startY;
    
    elements.draggableText.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        elements.draggableText.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        const rect = elements.canvasContainer.getBoundingClientRect();
        const newX = state.textX + (deltaX / rect.width);
        const newY = state.textY + (deltaY / rect.height);
        
        // Clamp values between 0 and 1
        state.textX = Math.max(0, Math.min(1, newX));
        state.textY = Math.max(0, Math.min(1, newY));
        
        startX = e.clientX;
        startY = e.clientY;
        
        updateCanvas();
        updateDraggableText();
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            elements.draggableText.style.cursor = 'move';
        }
    });
    
    // Touch events for mobile
    elements.draggableText.addEventListener('touchstart', (e) => {
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        
        const rect = elements.canvasContainer.getBoundingClientRect();
        const newX = state.textX + (deltaX / rect.width);
        const newY = state.textY + (deltaY / rect.height);
        
        state.textX = Math.max(0, Math.min(1, newX));
        state.textY = Math.max(0, Math.min(1, newY));
        
        startX = touch.clientX;
        startY = touch.clientY;
        
        updateCanvas();
        updateDraggableText();
        e.preventDefault();
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
}

// ===================================
// IMAGE EXPORT / DOWNLOAD
// ===================================
async function downloadImage() {
    // Hide draggable text during export
    elements.draggableText.style.display = 'none';
    
    // Show loading state
    elements.downloadBtn.textContent = 'Generating...';
    elements.downloadBtn.disabled = true;
    
    // Wait for fonts to load
    await document.fonts.ready;
    
    // Small delay to ensure everything is rendered
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Redraw canvas to ensure it's up to date
    updateCanvas();
    
    // Convert canvas to blob
    elements.canvas.toBlob((blob) => {
        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const timestamp = new Date().getTime();
        const resolutionName = state.resolution === '1080' ? '1080p' : '4K';
        link.download = `telugu-text-${resolutionName}-${timestamp}.png`;
        link.href = url;
        link.click();
        
        // Cleanup
        URL.revokeObjectURL(url);
        
        // Restore UI
        elements.draggableText.style.display = 'block';
        elements.downloadBtn.textContent = 'Download PNG';
        elements.downloadBtn.disabled = false;
    }, 'image/png', 1.0); // Maximum quality
}

// ===================================
// START APPLICATION
// ===================================
init();
