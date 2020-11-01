import React from 'react';

export const HomeIcon = ({ size = 20, color = 'currentColor' }) => (
	<svg width={size} fill={color} viewBox="0 0 20 20">
		<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
	</svg>
);

export const MinusIcon = ({ size = 20, color = 'currentColor' }) => (
	<svg width={size} fill={color} viewBox="0 0 20 20">
		<path
			d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
			clipRule="evenodd"
			fillRule="evenodd"></path>
	</svg>
);

export const PlusIcon = ({ size = 20, color = 'currentColor' }) => (
	<svg width={size} fill={color} viewBox="0 0 20 20">
		<path
			d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
			clipRule="evenodd"
			fillRule="evenodd"></path>
	</svg>
);

export const CartIcon = ({ size = 20, color = 'currentColor' }) => (
	<svg width={size} fill={color} viewBox="0 0 20 20">
		<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
	</svg>
);

export const TrashIcon = ({ size = 20, color = 'currentColor' }) => (
	<svg width={size} fill={color} viewBox="0 0 20 20">
		<path
			d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
			clipRule="evenodd"
			fillRule="evenodd"></path>
	</svg>
);

export const GitHubIcon = ({ size = 20, color = 'currentColor' }) => (
	<svg width={size} viewBox="0 0 16 16" fill={color}>
		<path
			fillRule="evenodd"
			d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
	</svg>
);

const closeStyles = color => ({
	fill: color,
	stroke: color,
	strokeLinecap: 'round',
	strokeLinejoin: 'round',
	strokeWidth: 32,
});

export const CloseIcon = ({ size = 20, color = 'currentColor' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 512 512">
		<title>ionicons-v5-l</title>
		<line x1="368" y1="368" x2="144" y2="144" style={closeStyles(color)} />
		<line x1="368" y1="144" x2="144" y2="368" style={closeStyles(color)} />
	</svg>
);

export const RupeeIcon = ({ size = 20 }) => (
	<img src="./img/green_rupee.png" className="rupee-icon" alt="rupee-icon" width={size} />
);

export const FilterIcon = ({ size = 20, color = 'currentColor' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512" width={size} height={size}>
		<title>Options</title>
		<path
			fill="none"
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="32"
			d="M368 128h80M64 128h240M368 384h80M64 384h240M208 256h240M64 256h80"
		/>
		<circle
			cx="336"
			cy="128"
			r="32"
			fill="none"
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="32"
		/>
		<circle
			cx="176"
			cy="256"
			r="32"
			fill="none"
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="32"
		/>
		<circle
			cx="336"
			cy="384"
			r="32"
			fill="none"
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="32"
		/>
	</svg>
);
