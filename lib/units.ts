import { unitsOfMeasure, identifyUnit } from "parse-ingredient";
import type { VolumeUnits } from "convert-units/definitions/volume";

export type CanonicalUnitId = keyof typeof unitsOfMeasure;

export const canonicalUnitIds = Object.freeze(
  Object.keys(unitsOfMeasure) as CanonicalUnitId[],
);

export const knownUnitTokens = Object.freeze(
  Array.from(
    new Set(
      canonicalUnitIds.flatMap((id) => {
        const def = unitsOfMeasure[id];
        return [id, def.short, def.plural, ...def.alternates]
          .filter((value): value is string => Boolean(value))
          .map((value) => value.toLowerCase());
      }),
    ),
  ),
);

const canonicalUnitIdSet: ReadonlySet<CanonicalUnitId> = new Set(
  canonicalUnitIds,
);

export const isCanonicalUnitId = (value: string): value is CanonicalUnitId =>
  canonicalUnitIdSet.has(value as CanonicalUnitId);

export const Units = Object.freeze(
  Object.fromEntries(
    canonicalUnitIds.map((id) => [id, identifyUnit(id)]),
  ) as Readonly<Record<CanonicalUnitId, string>>,
);

export type UnitAbbreviation = (typeof Units)[CanonicalUnitId];

export const convertToAbbreviation = (
  unit: CanonicalUnitId,
): UnitAbbreviation => {
  return Units[unit];
};

const canonicalToConvertVolumeUnit: Partial<
  Record<CanonicalUnitId, VolumeUnits>
> = {
  cup: "cup",
  deciliter: "dl",
  "fluid ounce": "fl-oz",
  gallon: "gal",
  liter: "l",
  milliliter: "ml",
  pint: "pnt",
  quart: "qt",
  tablespoon: "Tbs",
  teaspoon: "tsp",
};

export const getUnitAbbreviation = (
  unit: string | CanonicalUnitId | null | undefined,
): VolumeUnits | null => {
  if (!unit || !isCanonicalUnitId(unit)) {
    return null;
  }

  return canonicalToConvertVolumeUnit[unit] ?? null;
};
