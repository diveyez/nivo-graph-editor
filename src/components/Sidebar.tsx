import styled from 'styled-components'
import { ResolvedLink, ResolvedNode } from '../state'
import { AddNodeButton } from './AddNodeButton'
import { NewGraph } from './NewGraph'
import { SaveGraph } from './SaveGraph'
import { OpenGraph } from './OpenGraph'

const Container = styled.div`
    position: fixed;
    top: 46px;
    left: 0;
    width: 64px;
    height: 100%;
    background: #000000;
`

export const Sidebar = ({ nodes, links }: { nodes: ResolvedNode[]; links: ResolvedLink[] }) => {
    return (
        <Container>
            <AddNodeButton />
            <SaveGraph nodes={nodes} links={links} />
            <OpenGraph />
            <NewGraph />
        </Container>
    )
}
