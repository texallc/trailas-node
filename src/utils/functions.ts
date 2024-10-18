import { handleErrorFunction } from "./handleError";
import sharp from "sharp";
import { Op, WhereOptions } from "@sequelize/core";

export const getClearWhere = <T extends {}>(where: WhereOptions<T>) => {
	if (!where) return where;

	const allKeys = getAllTypeKeysObject(where);

	for (const key of allKeys) {
		if (!where) break;

		const k = key as keyof WhereOptions<T>;
		const value = where[k];

		if (!value) {
			delete where[k];
		}

		if (typeof value === "object" && !Array.isArray(value)) {
			const _allKeys = getAllTypeKeysObject(value);

			for (const _key of _allKeys) {
				if (!value[_key]) delete value[_key];
			}

			const _allFilteredKeys = getAllTypeKeysObject(value);

			if (!_allFilteredKeys.length) {
				delete where[k];
			}
		}

		if (Array.isArray(value)) {
			const array = value as number[] | string[] | WhereOptions<T>[];

			if (!array.length) {
				delete where[k];
			}

			const firstItemValue = array[0];

			if (typeof firstItemValue !== "number" && typeof firstItemValue !== "string" && typeof key === "symbol") {
				const _array = array as WhereOptions<T>[];

				if (key === Op.or) {
					const or: WhereOptions<T>[] = [];

					for (let i = 0; i < _array.length; i++) {
						let whereOr = _array[i];

						whereOr = getClearWhere(whereOr);

						const allKeysOr = getAllTypeKeysObject(whereOr!);

						if (allKeysOr.length) {
							or.push(whereOr);
						}
					}
					if (or.length) {
						where = { ...where, [key]: or } as WhereOptions<T>;
					} else {
						delete where[k];
					}
				}
			}
		}
	}

	return where;
};

const getAllTypeKeysObject = <T extends {}>(obj: T) => {
	const keys = Object.keys(obj);
	const symbolKeys = Object.getOwnPropertySymbols(obj);
	const allKeys = [...keys, ...symbolKeys];

	return allKeys;
};

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