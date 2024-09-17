import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Tooltip from '.';

describe('Tooltip component', () => {
    test('renders with default props', () => {
        render(<Tooltip />);
    });
});
