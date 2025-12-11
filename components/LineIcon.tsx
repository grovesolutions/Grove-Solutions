import React from 'react';

interface LineIconProps {
  name: string;
  className?: string;
}

/**
 * LineIcon Component - Wrapper for Lineicons icon font
 * Usage: <LineIcon name="arrow-right" className="w-5 h-5" />
 * 
 * Available icons (common ones):
 * - arrow-left, arrow-right, arrow-downward, arrow-upward
 * - arrow-angular-top-right, arrow-angular-top-left
 * - leaf-1, leaf-6
 * - instagram, facebook, linkedin, twitter-old, x
 * - menu-hamburger-1, xmark
 * - globe-1, home-2, buildings-1
 * - envelope-1, telephone-1, map-pin-5, map-marker-1
 * - search-1, search-2
 * - bolt-2, bolt-3
 * - code-1, database-2
 * - check-circle-1, xmark-circle
 * - user-4, user-multiple-4
 * - gear-1, gears-3
 * - bar-chart-4, trend-up-1, trend-down-1
 * - comment-1, message-2, message-3-text
 * - calendar-days
 * - alarm-1, stopwatch
 * - star-fat, heart
 * - dollar, euro, pound
 * - shield-2, shield-2-check
 * - layers-1
 * - layout-9, layout-26
 * - phone, laptop-2
 * - spinner-3, spinner-2-sacle
 * - megaphone-1
 * - target-user
 * - select-cursor-1
 * - hammer-1, hammer-2
 * - knife-fork-1
 * - clipboard
 * - open-ai, gemini, claude
 * - location-arrow-right
 * - question-mark-circle, info
 */
const LineIcon: React.FC<LineIconProps> = ({ name, className = '' }) => {
  return (
    <i 
      className={`lni lni-${name} ${className}`}
      aria-hidden="true"
    />
  );
};

export default LineIcon;

