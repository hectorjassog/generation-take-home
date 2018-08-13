var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-14');

enzyme.configure({ adapter: new Adapter() });