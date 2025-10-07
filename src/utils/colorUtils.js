/**
 * Transform a hex color into a pastel (lighter) or dark variant
 * @param {string} hex - original color, e.g., "#10b981"
 * @param {number} intensity - proportion of original color (0 = all white/black, 1 = original color)
 * @param {boolean} isDark - whether to create a dark variant instead of pastel
 */
export function dynamicColor(hex, intensity = 1, isDark = false) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  
  if (isDark) {
    // Mix with dark gray/black for dark mode
    const newR = Math.round(r * intensity * 0.3);
    const newG = Math.round(g * intensity * 0.3);
    const newB = Math.round(b * intensity * 0.3);
    return `rgb(${newR},${newG},${newB})`;
  } else {
    // Mix with white for super pastel (light mode) - only 15% color, 85% white
    const colorIntensity = intensity * 0.15;
    const newR = Math.round(r * colorIntensity + 255 * (1 - colorIntensity));
    const newG = Math.round(g * colorIntensity + 255 * (1 - colorIntensity));
    const newB = Math.round(b * colorIntensity + 255 * (1 - colorIntensity));
    return `rgb(${newR},${newG},${newB})`;
  }
}

/**
 * Get background style based on current mood and theme
 * @param {Object} currentMood - Current mood object
 * @param {boolean} isDark - Whether dark mode is active
 * @returns {Object} CSS style object
 */
export function getBackgroundStyle(currentMood, isDark) {
  if (!currentMood) {
    return isDark 
      ? { backgroundColor: 'rgb(17, 24, 39)' }
      : { backgroundColor: '#fdf2f8' };
  }
  
  if (isDark) {
    // Dark mode: gradient from default dark bg to mood color (slightly dimmed)
    const bigint = parseInt(currentMood.color.replace('#', ''), 16);
    const r = Math.round(((bigint >> 16) & 255) * 0.5);
    const g = Math.round(((bigint >> 8) & 255) * 0.5);
    const b = Math.round((bigint & 255) * 0.5);
    const moodColor = `rgb(${r}, ${g}, ${b})`;
    return {
      background: `linear-gradient(135deg, rgb(17, 24, 39) 0%, ${moodColor} 100%)`
    };
  } else {
    // Light mode: solid pastel color
    return {
      backgroundColor: dynamicColor(currentMood.color, 0.5, false)
    };
  }
}