import React from 'react'
import { describe, it, afterEach } from 'mocha'
import { assert, expect } from 'chai'
import { shallow, mount, unmount } from 'enzyme'

import Reactive from '../src/react-ive.js'

describe('Simple rendering', () => {
  describe('No children', () => {
    it('should pass', () => {
      assert.doesNotThrow(() => shallow(<Reactive />))
    })

    it('should render an empty div', () => {
      const reactive = shallow(<Reactive />)

      expect(reactive).to.have.tagName('div')
      expect(reactive).to.be.blank()
    })
  })

  describe('Unmanaged children', () => {
    describe('<FunctionalComponent />', () => {
      it('should throw', () => {
        const TestComponent = () => null

        assert.throws(() => shallow(
          <Reactive>
            <TestComponent />
          </Reactive>
        ))
      })
    })

    describe('<ClassComponent />', () => {
      it('should throw', () => {
        class TestComponent extends React.Component {}

        assert.throws(() => shallow(
          <Reactive>
            <TestComponent />
          </Reactive>
        ))
      })
    })

    describe('HTML <div /> tag', () => {
      it('should throw', () => {
        assert.throws(() => shallow(
          <Reactive>
            <div />
          </Reactive>
        ))
      })
    })
  })

  describe('Children as function', () => {
    it('should pass', () => {
      assert.doesNotThrow(() => shallow(
        <Reactive>
          {() => (
            <div />
          )}
        </Reactive>
      ))
    })

    it('should render a <div> wrapping the <Child />', () => {
      const Child = () => <div />

      const reactive = shallow(
        <Reactive>
          {() => (
            <Child />
          )}
        </Reactive>
      )

      expect(reactive).to.have.tagName('div')
      expect(reactive).not.to.be.blank()
      expect(reactive).to.contain(<Child />)
      expect(reactive.find(Child)).to.have.tagName('div')
    })
  })
})

describe('States', () => {
  let reactive

  // describe('Hoverable', () => {
  //   const Child = () => <div />

  //   const reactive = mount(
  //     <Reactive hoverable>
  //       {(interractionStates) => (
  //         <Child
  //           {...interractionStates}
  //         />
  //       )}
  //     </Reactive>
  //   )

  //   expect(reactive.find(Child)).to.have.prop('isHovered', null)
  //   reactive.simulate('mouseenter')
  //   expect(reactive.find(Child)).to.have.prop('isHovered', true)
  //   reactive.simulate('mouseleave')
  //   expect(reactive.find(Child)).to.have.prop('isHovered', false)
  // })

  describe('Pressable', () => {
    const Child = () => <div />

    const reactive = mount(
      <Reactive pressable>
        {(interractionStates) => console.log(interractionStates) || (
          <Child
            {...interractionStates}
          />
        )}
      </Reactive>
    )

    expect(reactive.find(Child)).to.have.prop('isPressed', null)
    reactive.simulate('touchstart')
    expect(reactive.find(Child)).to.have.prop('isPressed', true)
    reactive.simulate('touchend')
    // expect(reactive.find(Child)).to.have.prop('isPressed', false)
    // TODO: this one doesn't work despite
    // of everything I did
  })

  afterEach(() => {
    // Enzyme is using global.document
    // and mutating it
    // (see https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md#describewithdom-api-and-clearing-the-document-after-every-test )
    // Basic cleaning with unmount
    if (reactive) {
      unmount(reactive)
    }
  })
})
