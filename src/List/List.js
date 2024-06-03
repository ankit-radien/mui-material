'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled, createUseThemeProps } from '../zero-styled';
import ListContext from './ListContext';
import { getListUtilityClass } from './listClasses';

const useThemeProps = createUseThemeProps('MuiList');

const useUtilityClasses = (ownerState) => {
  const { classes, subheader } = ownerState;

  const slots = {
    root: ['root', subheader && 'subheader'],
  };

  return composeClasses(slots, getListUtilityClass, classes);
};

const ListRoot = styled('ul', {
  name: 'MuiList',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.subheader && styles.subheader,
    ];
  },
})({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  position: 'relative',
  variants: [
    {
      props: ({ ownerState }) => ownerState.subheader,
      style: {
        paddingTop: 0,
      },
    },
  ],
});

const List = React.forwardRef(function List(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiList' });
  const {
    children,
    className,
    component = 'ul',
    subheader,
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ListContext.Provider value={{}}>
      <ListRoot
        as={component}
        className={clsx(classes.root, className)}
        ref={ref}
        ownerState={ownerState}
        {...other}
      >
        {subheader}
        {children}
      </ListRoot>
    </ListContext.Provider>
  );
});

List.propTypes /* remove-proptypes */ = {
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
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default List;
