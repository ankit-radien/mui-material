'use client';
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled, createUseThemeProps } from '../zero-styled';
import { getBottomNavigationUtilityClass } from './bottomNavigationClasses';

const useThemeProps = createUseThemeProps('MuiBottomNavigation');

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getBottomNavigationUtilityClass, classes);
};

const BottomNavigationRoot = styled('div', {
  name: 'MuiBottomNavigation',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  height: 56,
  backgroundColor: (theme.vars || theme).palette.background.paper,
}));

const BottomNavigation = React.forwardRef(function BottomNavigation(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiBottomNavigation' });
  const {
    children,
    className,
    component = 'div',
    onChange,
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <BottomNavigationRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      {React.Children.map(children, (child, childIndex) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child)) {
            console.error(
              [
                "MUI: The BottomNavigation component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            );
          }
        }

        const childValue = child.props.value === undefined ? childIndex : child.props.value;

        return React.cloneElement(child, {
          selected: false,
          showLabel: child.props.showLabel !== undefined ? child.props.showLabel : false,
          value: childValue,
          onChange,
        });
      })}
    </BottomNavigationRoot>
  );
});

BottomNavigation.propTypes /* remove-proptypes */ = {
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
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {any} value We default to the index of the child.
   */
  onChange: PropTypes.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default BottomNavigation;
