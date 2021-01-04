import { memo } from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'
import { Property } from '../state'
import { PortWidget } from './PortWidget'

export const PropertyWidget = memo(({ property }: { property: Property }) => {
    return (
        <PropertyContainer>
            <PropertyName>{property.name}</PropertyName>
            {property.hasInput && (
                <PortWidget
                    type="target"
                    elementId={property.id}
                    x={property.x}
                    y={property.y + property.height / 2}
                />
            )}
            {property.hasOutput && (
                <PortWidget
                    type="source"
                    elementId={property.id}
                    x={property.x + property.width}
                    y={property.y + property.height / 2}
                />
            )}
        </PropertyContainer>
    )
})

const PropertyContainer = styled.div`
    position: relative;
    height: 20px;
    user-select: none;
    display: flex;
    align-items: center;
    padding: 0 12px;
    background-color: ${props => transparentize(0.6, props.theme.colors.topDepthBackground)};
    color: ${props => props.theme.colors.accentColor};
    font-size: 11px;
`

const PropertyName = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
`
