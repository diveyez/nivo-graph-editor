import { useCallback, MouseEvent, memo } from 'react'
import styled from 'styled-components'
import { ElementId, useLinkingActions } from '../state'

const CONTAINER_SIZE = 20
const PORT_SIZE = 10

export const PortWidget = memo(
    ({
        type,
        elementId,
        x,
        y,
    }: {
        type: 'source' | 'target'
        elementId: ElementId
        x: number
        y: number
    }) => {
        const {
            startLinking,
            setLinkingPotentialPort,
            resetLinkingPotentialPort,
        } = useLinkingActions()

        const handleLinking = useCallback(
            (event: MouseEvent) => {
                event.stopPropagation()

                startLinking({
                    elementId,
                    type,
                    anchor: [x, y],
                    initial: [event.clientX, event.clientY],
                })
            },
            [startLinking, elementId, type, x, y]
        )

        const handleMouseEnter = useCallback(() => {
            setLinkingPotentialPort(elementId, type)
        }, [setLinkingPotentialPort, elementId, type])

        const handleMouseLeave = useCallback(() => {
            resetLinkingPotentialPort()
        }, [resetLinkingPotentialPort])

        return (
            <Container
                onMouseDown={handleLinking}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    left: type === 'target' ? 0 : '100%',
                }}
            >
                <Port />
            </Container>
        )
    }
)

const Port = styled.div`
    pointer-events: all;
    width: ${PORT_SIZE}px;
    height: ${PORT_SIZE}px;
    border-radius: ${PORT_SIZE / 2}px;
    background: ${props => props.theme.colors.background};
    border: 2px solid ${props => props.theme.colors.accentColor};
    transition: transform 200ms;
`

const Container = styled.div`
    pointer-events: all;
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${CONTAINER_SIZE}px;
    height: ${CONTAINER_SIZE}px;
    margin-top: -${CONTAINER_SIZE / 2}px;
    margin-left: -${CONTAINER_SIZE / 2}px;
    cursor: pointer;

    &:hover {
        ${Port} {
            transform: scale(1.6);
        }
    }
`
