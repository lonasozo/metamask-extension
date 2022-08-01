import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
  COLORS,
  FONT_WEIGHT,
  FONT_STYLE,
  TEXT_ALIGN,
  TYPOGRAPHY_V2,
  OVERFLOW_WRAP,
} from '../../../helpers/constants/design-system';
import Box, { MultipleSizesAndAuto } from '../../ui/box';

export const ValidColors = [
  COLORS.TEXT_DEFAULT,
  COLORS.TEXT_ALTERNATIVE,
  COLORS.TEXT_MUTED,
  COLORS.OVERLAY_INVERSE,
  COLORS.PRIMARY_DEFAULT,
  COLORS.PRIMARY_INVERSE,
  COLORS.SECONDARY_DEFAULT,
  COLORS.SECONDARY_INVERSE,
  COLORS.ERROR_DEFAULT,
  COLORS.ERROR_INVERSE,
  COLORS.SUCCESS_DEFAULT,
  COLORS.SUCCESS_INVERSE,
  COLORS.WARNING_INVERSE,
  COLORS.INFO_DEFAULT,
  COLORS.INFO_INVERSE,
];

export const ValidTags = [
  'dd',
  'div',
  'dt',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'li',
  'p',
  'span',
  'strong',
  'ul',
];

export const Typography = ({
  variant = TYPOGRAPHY_V2.BODY_MD,
  color = COLORS.TEXT_DEFAULT,
  fontWeight,
  fontStyle,
  align,
  overflowWrap,
  ellipsis,
  title,
  tag,
  margin,
  marginTop = 1,
  marginRight,
  marginBottom = 1,
  marginLeft,
  boxProps = {},
  className,
  children,
}) => {
  let Tag = tag ?? variant;
  let strongTagFontWeight;

  if (Tag === 'strong') {
    strongTagFontWeight = FONT_WEIGHT.BOLD;
  }

  const computedClassName = classnames(
    'text',
    className,
    `text--${variant}`,
    `text--weight-${strongTagFontWeight || fontWeight}`,
    `text--style-${fontStyle}`,
    { [`text--ellipsis`]: Boolean(ellipsis) },
    {
      [`text--align-${align}`]: Boolean(align),
      [`text--color-${color}`]: Boolean(color),
      [`text--overflowwrap-${overflowWrap}`]: Boolean(overflowWrap),
    },
  );

  // Set a default tag based on variant
  switch (Tag.split('-')[0]) {
    case 'body':
      Tag = 'p';
      break;
    case 'heading':
      Tag = 'h2';
      break;
    case 'display':
      Tag = 'h1';
      break;
    default:
      Tag = 'div';
  }

  return (
    <Box
      {...{
        margin,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        ...boxProps,
      }}
    >
      {(boxClassName) => (
        <Tag
          className={classnames(boxClassName, computedClassName)}
          title={title}
        >
          {children}
        </Tag>
      )}
    </Box>
  );
};

Typography.propTypes = {
  /**
   * The variation of font types of the Typography component (display, heading, body)
   */
  variant: PropTypes.oneOf(Object.values(TYPOGRAPHY_V2)),
  /**
   * The color of the Typography component Should use the COLOR object from
   * ./ui/helpers/constants/design-system.js
   */
  color: PropTypes.oneOf(ValidColors),
  /**
   * The font-weight of the Typography component. Should use the FONT_WEIGHT object from
   * ./ui/helpers/constants/design-system.js
   */
  fontWeight: PropTypes.oneOf(Object.values(FONT_WEIGHT)),
  /**
   * The font-style of the Typography component. Should use the FONT_STYLE object from
   * ./ui/helpers/constants/design-system.js
   */
  fontStyle: PropTypes.oneOf(Object.values(FONT_STYLE)),
  /**
   * The text-align of the Typography component. Should use the TEXT_ALIGN object from
   * ./ui/helpers/constants/design-system.js
   */
  align: PropTypes.oneOf(Object.values(TEXT_ALIGN)),
  /**
   * The overflow-wrap of the Typography component. Should use the OVERFLOW_WRAP object from
   * ./ui/helpers/constants/design-system.js
   */
  overflowWrap: PropTypes.oneOf(Object.values(OVERFLOW_WRAP)),
  /**
   * Used for long strings that can be cut off (...)
   */
  ellipsis: PropTypes.bool,
  /**
   * Changes the root html element tag of the Typography component.
   */
  tag: PropTypes.oneOf(ValidTags),
  /**
   * Adds margin to the Typography component should use valid size
   */
  margin: MultipleSizesAndAuto,
  marginTop: MultipleSizesAndAuto,
  marginBottom: MultipleSizesAndAuto,
  marginRight: MultipleSizesAndAuto,
  marginLeft: MultipleSizesAndAuto,
  /**
   * Used to pass any valid Box component props such as margin or padding
   * to the Typography component
   */
  boxProps: PropTypes.shape({
    ...Box.propTypes,
  }),
  /**
   * Additional className to assign the Typography component
   */
  className: PropTypes.string,
  /**
   * Title attribute to include on the element. Will show as tooltip on hover.
   */
  title: PropTypes.string,
  /**
   * The text content of the Typography component
   */
  children: PropTypes.node.isRequired,
};

export default Typography;
