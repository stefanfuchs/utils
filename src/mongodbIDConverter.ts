
/** Replaces id with _id in the object. Returns a new object with the field replaced */
export function convertIdToMongoDb<T extends { id: any, _id?: undefined, [key: string]: any }>(obj: T): T & { _id: T['_id'], id: undefined } {
  return { ...obj, _id: obj.id, id: undefined }
}

/** Replaces _id with id in the object. Returns a new object with the field replaced */
export function convertIdFromMongoDb<T extends { _id: any, id?: undefined, [key: string]: any }>(obj: T): T & { id: T['_id'], _id: undefined } {
  return { ...obj, id: obj._id, _id: undefined }
}