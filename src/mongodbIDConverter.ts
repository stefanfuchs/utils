
/** Replaces id with _id in the object. Returns a new object with the field replaced */
export function convertIdToMongoDb(obj: { id?: any, [key: string]: any }): any {
  const obj2 = { ...obj, _id: obj.id }
  delete obj2.id
  return obj2
}

/** Replaces _id with id in the object. Returns a new object with the field replaced */
export function convertIdFromMongoDb(obj: { _id?: any, [key: string]: any }): any {
  const obj2 = { ...obj, id: obj._id }
  delete obj2._id
  return obj2
}