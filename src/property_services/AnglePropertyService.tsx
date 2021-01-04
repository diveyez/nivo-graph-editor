import { ChangeEvent } from 'react'
import { PropertyService } from '../services_registry'
import { Input } from '../components/ui'

export type AnglePropertyOptions = {
    name: string
    defaultValue?: number
    hasInput?: boolean
    hasOutput?: boolean
}

export type AngleProperty = {
    value: number
}

export const AnglePropertyService: PropertyService<
    'property:angle',
    AnglePropertyOptions,
    AngleProperty,
    number
> = {
    type: 'property:angle',
    factory: ({ name, defaultValue, hasOutput = false }: AnglePropertyOptions) => {
        return {
            name,
            type: 'property:angle',
            value: defaultValue,
            hasOutput,
        }
    },
    serialize: property => {
        // @ts-ignore
        return property.value
    },
    getValue: data => {
        return data.value
    },
    hydrate: (property, data) => {
        return {
            ...property,
            value: data,
        }
    },
    control: ({ property }) => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            console.log(event.target.value)
        }

        return <Input type="number" value={property.value} onChange={handleChange} />
    },
}
