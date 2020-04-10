import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()})
let wrapper;
describe('Navigation Items', ()=> {
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  })
  it('Should render 2 <NavigationItem /> elements if you are not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  })

  it('Should render 3 <NavigationItem /> elements if you are authenticated', () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  })

  it('Should render 3 <NavigationItem /> elements if you are authenticated', () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
  })
})