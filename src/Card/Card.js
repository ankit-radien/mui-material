'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import { styled, createUseThemeProps } from '../zero-styled';
import Paper from '../Paper';
import { getCardUtilityClass } from './cardClasses';

const useThemeProps = createUseThemeProps('MuiCard');

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getCardUtilityClass, classes);
};

const CardRoot = styled(Paper, {
  name: 'MuiCard',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  overflow: 'hidden',
});

const Card = React.forwardRef(function Card(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiCard',
  });

  const { className, ...other } = props;

  const ownerState = { ...props };

  const classes = useUtilityClasses(ownerState);

  return (
    <CardRoot
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    />
  );
});

Card.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default Card;
