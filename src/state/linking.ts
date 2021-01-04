import { ElementId, State } from './types'

export const findLinkingPotentialPort = (
    linking: State['linking'],
    elements: State['elements'],
    elementId: ElementId,
    type: 'source' | 'target'
) => {
    if (
        // no current linking
        !linking.isLinking ||
        // source & target are identical
        elementId === linking.elementId ||
        // both are sources or targets
        linking.type === type ||
        // no element type so we cannot define
        // eligible elements
        !linking.elementType
    )
        return

    const currentElement = elements.find(element => element.id === linking.elementId)
    const potentialElement = elements.find(element => element.id === elementId)
    if (!currentElement || !potentialElement) return

    const source = type === 'target' ? currentElement : potentialElement
    const target = type === 'target' ? potentialElement : currentElement

    const link = elements.find(
        element =>
            element.elementType === 'link' &&
            element.sourceId === source.id &&
            element.targetId === target.id
    )
    if (link) return

    if (!('type' in source) || !('accepts' in target)) return
    if (target.accepts.includes(source.type)) {
        return elementId
    }
}
