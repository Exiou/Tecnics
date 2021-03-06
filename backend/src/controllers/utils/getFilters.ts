import { Model } from 'mongoose'

export default async function getFilters (modelName: Model<any>, fields: string[]) {
  const fieldObject: any = {}

  for await (const field of fields) fieldObject[field] = (await modelName.find().distinct(field))

  return fieldObject
}
