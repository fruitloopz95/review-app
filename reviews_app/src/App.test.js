import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer' ;
import App from './App';

test( 'renders correctly' , () => {
const tree = renderer
.create( <h2>The review space </h2> )
.toJSON();
expect(tree).toMatchSnapshot();
});
