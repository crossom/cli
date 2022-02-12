import { MetadataUtil } from "@techmmunity/symbiosis";

import type { ColumnType } from "../../../../lib/types/query-runner";
import type { ColumnMetadata } from "@techmmunity/symbiosis/lib/entity-manager/types/column-metadata";

export const getColType = (columnMetadata: ColumnMetadata): ColumnType => {
	if (columnMetadata.databaseType) return columnMetadata.databaseType as any;

	const typeWithRightType = columnMetadata.type as any;

	if (columnMetadata.isArray) {
		if (MetadataUtil.isDefaultMetadataType(typeWithRightType)) {
			return `array-${typeWithRightType.name.toLowerCase()}` as any;
		}

		return "array-object";
	}

	if (MetadataUtil.isDefaultMetadataType(typeWithRightType)) {
		return typeWithRightType.name.toLowerCase();
	}

	return "object";
};
