export enum RecordOrder {
  Ascending  = 'ASC',
  Descending = 'DESC',
}

export const RecordOrderNames: Record<RecordOrder, string> = {
  [RecordOrder.Ascending] : 'Más antiguo al más nuevo',
  [RecordOrder.Descending] : 'Más nuevo al más antiguo',
}

