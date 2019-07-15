import React from 'react';
import { shallow } from 'enzyme'
import Error from './';

describe('Error', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Error/>)
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})