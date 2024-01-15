import React from 'react';

const LogoPowerbi = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" role="img" width="40" height="40" viewBox="0 0 40 40">
    <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
            <stop stop-color="#EBBB14" offset="0%"></stop>
            <stop stop-color="#B25400" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-2">
            <stop stop-color="#F9E583" offset="0%"></stop>
            <stop stop-color="#DE9800" offset="100%"></stop>
        </linearGradient>
        <path d="M346,604 L346,630 L320,630 L153,630 C138.640597,630 127,618.359403 127,604 L127,183 C127,168.640597 138.640597,157 153,157 L320,157 C334.359403,157 346,168.640597 346,183 L346,604 Z" id="path-3"></path>
        <filter x="-9.1%" y="-6.3%" width="136.5%" height="116.9%" filterUnits="objectBoundingBox" id="filter-4">
            <feOffset dx="20" dy="10" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="10" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.0530211976 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-5">
            <stop stop-color="#F9E68B" offset="0%"></stop>
            <stop stop-color="#F3CD32" offset="100%"></stop>
        </linearGradient>
    </defs>
    <g id="PBI-Logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group" transform="translate(77.500000, 0.000000)">
            <rect id="Rectangle" fill="url(#linearGradient-1)" x="256" y="0" width="219" height="630" rx="26"></rect>
            <g id="Combined-Shape">
                <use fill="black" fill-opacity="1" filter="url(#filter-4)" xlink:href="#path-3"></use>
                <use fill="url(#linearGradient-2)" fill-rule="evenodd" xlink:href="#path-3"></use>
            </g>
            <path d="M219,604 L219,630 L193,630 L26,630 C11.6405965,630 1.75851975e-15,618.359403 0,604 L0,341 C-1.75851975e-15,326.640597 11.6405965,315 26,315 L193,315 C207.359403,315 219,326.640597 219,341 L219,604 Z" id="Combined-Shape" fill="url(#linearGradient-5)"></path>
        </g>
    </g>
  </svg>
);

export default LogoPowerbi;
