'use client';
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import integerPropType from '@mui/utils/integerPropType';
import { useSlotProps } from '@mui/base/utils';
import composeClasses from '@mui/utils/composeClasses';
import { styled, createUseThemeProps } from '../zero-styled';
import Typography from '../Typography';
import BreadcrumbCollapsed from './BreadcrumbCollapsed';
import breadcrumbsClasses, { getBreadcrumbsUtilityClass } from './breadcrumbsClasses';

const useThemeProps = createUseThemeProps('MuiBreadcrumbs');

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    li: ['li'],
    ol: ['ol'],
    separator: ['separator'],
  };

  return composeClasses(slots, getBreadcrumbsUtilityClass, classes);
};

const BreadcrumbsRoot = styled(Typography, {
  name: 'MuiBreadcrumbs',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [{ [`& .${breadcrumbsClasses.li}`]: styles.li }, styles.root];
  },
})({});

const BreadcrumbsOl = styled('ol', {
  name: 'MuiBreadcrumbs',
  slot: 'Ol',
  overridesResolver: (props, styles) => styles.ol,
})({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

const BreadcrumbsSeparator = styled('li', {
  name: 'MuiBreadcrumbs',
  slot: 'Separator',
  overridesResolver: (props, styles) => styles.separator,
})({
  display: 'flex',
  userSelect: 'none',
  marginLeft: 8,
  marginRight: 8,
});

function insertSeparators(items, className, separator, ownerState) {
  return items.reduce((acc, current, index) => {
    if (index < items.length - 1) {
      acc = acc.concat(
        current,
        <BreadcrumbsSeparator
          aria-hidden
          key={`separator-${index}`}
          className={className}
          ownerState={ownerState}
        >
          {separator}
        </BreadcrumbsSeparator>,
      );
    } else {
      acc.push(current);
    }

    return acc;
  }, []);
}

const Breadcrumbs = React.forwardRef(function Breadcrumbs(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiBreadcrumbs' });
  const {
    children,
    className,
    component = 'nav',
    slots = {},
    slotProps = {},
    expandText = 'Show path',
    itemsBeforeCollapse = 1,
    separator = '/',
    ...other
  } = props;

  const [expanded, setExpanded] = React.useState(false);

  const ownerState = {
    ...props,
    component,
    expanded,
    expandText,
    itemsBeforeCollapse,
    separator,
  };

  const classes = useUtilityClasses(ownerState);

  const collapsedIconSlotProps = useSlotProps({
    elementType: slots.CollapsedIcon,
    externalSlotProps: slotProps.collapsedIcon,
    ownerState,
  });

  const listRef = React.useRef(null);
  const renderItemsBeforeAndAfter = (allItems) => {
    const handleClickExpand = () => {
      setExpanded(true);

      const focusable = listRef.current.querySelector('a[href],button,[tabindex]');
      if (focusable) {
        focusable.focus();
      }
    };

    return [
      ...allItems.slice(0, itemsBeforeCollapse),
      <BreadcrumbCollapsed
        aria-label={expandText}
        key="ellipsis"
        slots={{ CollapsedIcon: slots.CollapsedIcon }}
        slotProps={{ collapsedIcon: collapsedIconSlotProps }}
        onClick={handleClickExpand}
      />,
      ...allItems.slice(allItems.length - itemsBeforeCollapse, allItems.length),
    ];
  };

  const allItems = React.Children.toArray(children)
    .filter((child) => {
      if (process.env.NODE_ENV !== 'production') {
        if (isFragment(child)) {
          console.error(
            [
              "MUI: The Breadcrumbs component doesn't accept a Fragment as a child.",
              'Consider providing an array instead.',
            ].join('\n'),
          );
        }
      }

      return React.isValidElement(child);
    })
    .map((child, index) => (
      <li className={classes.li} key={`child-${index}`}>
        {child}
      </li>
    ));

  return (
    <BreadcrumbsRoot
      ref={ref}
      component={component}
      color="text.secondary"
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    >
      <BreadcrumbsOl className={classes.ol} ref={listRef} ownerState={ownerState}>
        {insertSeparators(
          expanded || allItems.length <= 8
            ? allItems
            : renderItemsBeforeAndAfter(allItems),
          classes.separator,
          separator,
          ownerState,
        )}
      </BreadcrumbsOl>
    </BreadcrumbsRoot>
  );
});

Breadcrumbs.propTypes /* remove-proptypes */ = {
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
   * Override the default label for the expand button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Show path'
   */
  expandText: PropTypes.string,
  /**
   * If max items is exceeded, the number of items to show before the ellipsis.
   * @default 1
   */
  itemsBeforeCollapse: integerPropType,
  /**
   * Custom separator node.
   * @default '/'
   */
  separator: PropTypes.node,
  /**
   * The props used for each slot inside the Breadcumb.
   * @default {}
   */
  slotProps: PropTypes.shape({
    collapsedIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Breadcumb.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    CollapsedIcon: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Breadcrumbs;
