import styled from 'styled-components'
import { useStore } from '../state'

export const AppFooter = () => {
    const { linking } = useStore()

    return (
        <Container>
            {linking.isLinking && (
                <div>
                    from: {linking.anchor[0]},{linking.anchor[1]}
                    to: {linking.position[0]},{linking.position[1]}
                    potential ID: {linking.potentialId}
                </div>
            )}
        </Container>
    )
}

const Container = styled.footer`
    position: fixed;
    left: 64px;
    bottom: 0;
    width: calc(100% - 364px);
    height: 36px;
    background-color: ${props => props.theme.colors.mediumDepthBackground};
`
