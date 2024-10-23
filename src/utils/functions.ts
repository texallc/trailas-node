import { ParsedQs } from "qs";
import { handleErrorFunction } from "./handleError";
import sharp from "sharp";

export const getExtensionByContentType = (contentType: string) => {
	const extension = contentType.split("/")[1];

	if (extension === "jpeg") return "jpg";

	return extension;
};

export const compreesImage = async (buffer: Buffer) => {
	try {
		let { width, height } = await sharp(buffer).metadata();
		width = width || 0;
		height = height || 0;

		const cropWidth = 320;
		const cropHeight = 240;

		if (width > cropWidth || height > cropHeight) {
			return await sharp(buffer).resize(320, 240).jpeg().toBuffer();
		}

		return await sharp(buffer).jpeg().toBuffer();
	} catch (error) {
		throw handleErrorFunction(error);
	}
};

export const fileToBuffer = async (blob: Blob) => {
	try {
		const arrayBuffer = await blob.arrayBuffer();

		return Buffer.from(arrayBuffer);
	} catch (error) {
		throw handleErrorFunction(error);
	}
};

export const getClearQueryString = (query: ParsedQs) => {
	const queryString: Record<string, string> = {};
	const entries = Object.entries(query);

	for (const [key, value] of entries) {
		if (typeof value !== "string") {
			throw new Error("Formato query string incorrecto");
		}

		queryString[key] = value;
	}

	return queryString;
};