
// 1) All valid toast positions
export const TOAST_POSITIONS = {
  TOP_LEFT: "top-left",
  TOP_CENTER: "top-center",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_CENTER: "bottom-center",
  BOTTOM_RIGHT: "bottom-right",
};

// 2) All toast variants (types)
export const TOAST_VARIANTS = {
  DEFAULT: "default",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// 3) Default auto-hide duration (ms)
export const TOAST_DURATION = 3500;

// 4) Mapping positions → PascalCase version for animation classes
// For example: "top-right" → "TopRight"
export const POSITION_TO_PASCAL = {
  "top-left": "TopLeft",
  "top-center": "TopCenter",
  "top-right": "TopRight",
  "bottom-left": "BottomLeft",
  "bottom-center": "BottomCenter",
  "bottom-right": "BottomRight",
};

// 5) Animation class name resolver
// Example output:
//  enter: "toastEnterTopRight"
//  exit:  "toastExitTopRight"
export function getAnimationClasses(position) {
  const pascal = POSITION_TO_PASCAL[position];

  return {
    enter: `toastEnter${pascal}`,
    exit: `toastExit${pascal}`,
  };
}
