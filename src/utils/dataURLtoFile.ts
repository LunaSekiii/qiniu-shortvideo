function dataURLtoFile(dataUrl: string, filename: string) {
	const arr = dataUrl.split(",");

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new File([u8arr], filename, { type: mime });
}
export default dataURLtoFile;
