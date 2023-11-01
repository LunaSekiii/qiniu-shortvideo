/**
 * 将视窗单位转换为px
 */
export default function vn2px(vn: number, type: "width" | "height" = "width") {
	switch (type) {
		case "width":
			return vw2px(vn);
		case "height":
			return vh2px(vn);
	}
	return -1;
}

function vh2px(vh: number): number {
	return (vh * window.innerHeight) / 100;
}

function vw2px(vw: number): number {
	return (vw * window.innerWidth) / 100;
}
