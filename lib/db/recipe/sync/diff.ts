type DiffResult<T extends { id?: number }> = {
  create: T[];
  update: T[];
  delete: number[];
};

export function diffById<T extends { id?: number }>(
  existing: { id: number }[],
  incoming: T[],
): DiffResult<T> {
  const existingIds = new Set(existing.map((e) => e.id));

  const create: T[] = [];
  const update: T[] = [];

  for (const item of incoming) {
    if (item.id && existingIds.has(item.id)) {
      update.push(item);
    } else {
      create.push(item);
    }
  }

  const incomingIds = new Set(incoming.map((i) => i.id).filter(Boolean));

  const del = existing.filter((e) => !incomingIds.has(e.id)).map((e) => e.id);

  return { create, update, delete: del };
}
