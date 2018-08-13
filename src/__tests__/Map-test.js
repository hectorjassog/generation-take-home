import React from 'react';
import { shallow, mount, render } from 'enzyme';
import MapsContainer from '../YourComponent';

var enzyme = require('enzyme');
describe('MapsContainer Component', () => {

 it('should render the map', () => {
   expect(shallow(<MapsContainer />).find('Map.map').length)
 })

 it('should render markers', () => {
   expect(shallow(<MapsContainer />).find('Marker.marker').length)
  })
})