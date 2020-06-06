import React from 'react'
import Renderer from 'react-test-renderer'
import ShallowRenderer from 'react-test-renderer/shallow'

import Text from '@skylab/app/src/components/commons/Text'

describe('Text component', () => {
    describe('Validate props', () => {
        it('should render correctly without children', () => {
            const renderer = Renderer.create(<Text />)
            const output = renderer.root
    
            expect(output.props.onPress).toStrictEqual(null)
            expect(output.props.style).toStrictEqual({})
            expect(output.props.type).toStrictEqual('default')
        })
    
    
        it('Should render correctly with default props', () => {
            const renderer = Renderer.create(<Text>Hello</Text>)
            const output = renderer.root
    
            expect(output.props.onPress).toStrictEqual(null)
            expect(output.props.style).toStrictEqual({})
            expect(output.props.type).toStrictEqual('default')
        })
    
        it('Should render correctly with some props (mock function)', () => {
            const onPressMock = jest.fn()
            const renderer = Renderer.create(
                <Text
                    onPress={onPressMock}
                    style={{ color: 'pink' }}
                    type='subtitle'
                >Hello</Text>
            )
            const output = renderer.root
    
            expect(output.props.onPress).toStrictEqual(onPressMock)
            expect(output.props.style).toStrictEqual({ color: 'pink' })
            expect(output.props.type).toStrictEqual('subtitle')
        })
    
        it('Should render correctly with some props (expect any function)', () => {
            const renderer = Renderer.create(
                <Text
                    onPress={() => true}
                    style={{ color: 'pink' }}
                    type='subtitle'
                >Hello</Text>
            )
            const output = renderer.root
    
            expect(output.props.onPress).toStrictEqual(expect.any(Function))
            expect(output.props.style).toStrictEqual({ color: 'pink' })
            expect(output.props.type).toStrictEqual('subtitle')
        })
    })

    describe('Snapshots', () => {
        it('should render correctly without props', () => {
            const renderer = new ShallowRenderer();
            const output = renderer.render(<Text>Hello</Text>);

            expect(output).toMatchSnapshot();
        })

        it('should render correctly with props', () => {
            const renderer = new ShallowRenderer();
            const output = renderer.render(
                <Text
                    onPress={() => true}
                    style={{ color: 'pink' }}
                    type='subtitle'
                >Hello</Text>
            );
            
            expect(output).toMatchSnapshot()
        })
    })
})