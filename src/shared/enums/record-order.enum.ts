export enum RecordOrder {
  Ascending  = 'ASC',
  Descending = 'DESC',
}

export const RecordOrderNames: Record<RecordOrder, string> = {
  [RecordOrder.Ascending] : 'Mas antiguo al mas nuevo',
  [RecordOrder.Descending] : 'Mas nuevo al mas antiguo',
}

