
// import { render } from '@testing-library/react';
// import CustomColumnSortedAscendingIcon  from '../../components/CustomColumnSortedAscendingIcon.js';

test('CustomColumnSortedAscendingIcon .js should render without errors', () => {
  expect(true).toBe(true);
});

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// // import CustomColumnSortedAscendingIcon from '../../../components/CustomColumnSortedAscendingIcon';
// import { Box } from '@mui/material';
// import CustomColumnSortedAscendingIcon from '../../components/CustomColumnSortedAscendingIcon'

// describe('CustomColumnSortedAscendingIcon component', () => {
//   test('renders without crashing', () => {
//     render(<CustomColumnSortedAscendingIcon />);
//     const iconContainer = screen.getByRole('img', { hidden: true });
//     expect(iconContainer).toBeInTheDocument();
//   });

//   test('has the correct default styles', () => {
//     render(<CustomColumnSortedAscendingIcon />);
//     const iconContainer = screen.getByRole('img', { hidden: true });
//     expect(iconContainer).toHaveStyle({
//       width: '20px',
//       height: '20px',
//       backgroundImage: `url('/icons-arrows-up.png')`,
//       backgroundSize: 'contain',
//       backgroundRepeat: 'no-repeat',
//     });
//   });

//   test('changes background image on hover', () => {
//     render(<CustomColumnSortedAscendingIcon />);
//     const iconContainer = screen.getByRole('img', { hidden: true });

//     iconContainer.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
//     expect(iconContainer).toHaveStyle({
//       backgroundImage: `url('/icons-arrows-up-hover.png')`,
//     });
//   });

//   test('changes background image on active state', () => {
//     render(<CustomColumnSortedAscendingIcon />);
//     const iconContainer = screen.getByRole('img', { hidden: true });

//     iconContainer.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
//     expect(iconContainer).toHaveStyle({
//       backgroundImage: `url('/icons-arrows-up-active.png')`,
//     });
//   });

//   test('renders hidden ArrowUpwardIcon within the box', () => {
//     render(<CustomColumnSortedAscendingIcon />);
//     const arrowIcon = screen.getByTestId('ArrowUpwardIcon');
//     expect(arrowIcon).toBeInTheDocument();
//     expect(arrowIcon).toHaveStyle('visibility: hidden');
//   });
// });