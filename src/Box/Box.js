'use client';
import { createBox } from '@mui/system';
import PropTypes from 'prop-types';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '../className';
import { createTheme } from '../styles';
import THEME_ID from '../styles/identifier';
import boxClasses from './boxClasses';

const defaultTheme = createTheme();

const Box = createBox({
  themeId: THEME_ID,
  defaultTheme,
  defaultClassName: boxClasses.root,
  generateClassName: ClassNameGenerator.generate,
});

Box.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
};

export default Box;
