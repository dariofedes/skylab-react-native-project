import React from 'react'
import Renderer from 'react-test-renderer'
import ShallowRenderer from 'react-test-renderer/shallow'
import { TextInput } from 'react-native'

import Input from '@skylab/app/src/components/commons/Input'

describe('Input Component', () => {
    describe('Validate props', () => {
        // it('throw error if it has not the required props', () => {
        //     expect(Renderer.create(<Input/>)).toThrow()
        // })

        it('render with default props', () => {
            const mockFunc = jest.fn()

            const renderer = Renderer.create(<Input onChangeText={mockFunc} value='value'/>)
            const output = renderer.root

            expect(output.props.placeholder).toStrictEqual('Type here...')
            expect(output.props.onChangeText).toStrictEqual(mockFunc)
            expect(output.props.value).toStrictEqual('value')
            expect(output.props.type).toStrictEqual('default')

            const rnInput = output.findByType(TextInput)
            
            expect(rnInput.props.secureTextEntry).toBeFalsy()
            expect(rnInput.props.keyboardType).toStrictEqual('default')
        })

        it('render with password and secure text entry', () => {
            const mockFunc = jest.fn()

            const renderer = Renderer.create(
                <Input
                    onChangeText={mockFunc}
                    value='value'
                    placeholder='placeholder'
                    type='password'
                />
            )
            const output = renderer.root

            expect(output.props.placeholder).toStrictEqual('placeholder')
            expect(output.props.onChangeText).toStrictEqual(mockFunc)
            expect(output.props.value).toStrictEqual('value')
            expect(output.props.type).toStrictEqual('password')

            const rnInput = output.findByType(TextInput)
            
            expect(rnInput.props.secureTextEntry).toBeTruthy()
            expect(rnInput.props.keyboardType).toStrictEqual('default')
        })

        it('render with phone type input', () => {
            const mockFunc = jest.fn()

            const renderer = Renderer.create(
                <Input
                    onChangeText={mockFunc}
                    value='value'
                    placeholder='placeholder'
                    type='phone'
                />
            )
            const output = renderer.root

            expect(output.props.placeholder).toStrictEqual('placeholder')
            expect(output.props.onChangeText).toStrictEqual(mockFunc)
            expect(output.props.value).toStrictEqual('value')
            expect(output.props.type).toStrictEqual('phone')

            const rnInput = output.findByType(TextInput)
            
            expect(rnInput.props.secureTextEntry).toBeFalsy()
            expect(rnInput.props.keyboardType).toStrictEqual('numeric')
        })

        it('render with email type input', () => {
            const mockFunc = jest.fn()

            const renderer = Renderer.create(
                <Input
                    onChangeText={mockFunc}
                    value='value'
                    placeholder='placeholder'
                    type='email'
                />
            )
            const output = renderer.root

            expect(output.props.placeholder).toStrictEqual('placeholder')
            expect(output.props.onChangeText).toStrictEqual(mockFunc)
            expect(output.props.value).toStrictEqual('value')
            expect(output.props.type).toStrictEqual('email')

            const rnInput = output.findByType(TextInput)
            
            expect(rnInput.props.secureTextEntry).toBeFalsy()
            expect(rnInput.props.keyboardType).toStrictEqual('email-address')
        })
    })

    // describe('Methods', () => {

    //      This should be a test for situations such as change input value in the same compo
    //      InputWithState Component

    //     it('should call onChangeText method correctly', () => {
    //         const renderer = Renderer.create(<Input/>)
    //         const output = renderer.root

    //         const rnInput = output.findByType(TextInput)

    //         expect(rnInput.props.value).toStrictEqual('')

    //         Renderer.act(() => {
    //             rnInput.props.onChangeText('Hello!')
    //         })

    //         expect(rnInput.props.value).toStrictEqual('Hello!')
    //     })
    // })

    describe('Snapshots', () => {
        it('render run with default props', () => {
            const mockFunc = jest.fn()

            const renderer = new ShallowRenderer();
            const output = renderer.render(<Input onChangeText={mockFunc} value='value'/>);

            expect(output).toMatchSnapshot();
        })

        it('render run with some props', () => {
            const mockFunc = jest.fn()

            const renderer = new ShallowRenderer();
            const output = renderer.render(
                <Input
                    onChangeText={mockFunc}
                    value='value'
                    placeholder='placeholder'
                    type='password'
                />
            );

            expect(output).toMatchSnapshot();
        })
    })
})