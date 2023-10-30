import iconMap from "./iconMap";

export type SVGIconName = keyof typeof iconMap;

function SVGIcon({
	name,
	active = false,
}: {
	name: SVGIconName;
	active?: boolean;
}) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			height='24'
			viewBox='0 -960 960 960'
			width='24'
		>
			{active ? iconMap[name].fill : iconMap[name].default}
		</svg>
	);
}

export default SVGIcon;
