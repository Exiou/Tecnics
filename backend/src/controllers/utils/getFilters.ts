import { Model } from "mongoose";


export default async function getFilters(modelName: Model<any>, fields: string[]) {
    let fieldObject: any = {}

    for await (const field of fields) fieldObject[field] = (await modelName.find().distinct(field)).toString()
    
    return fieldObject
}