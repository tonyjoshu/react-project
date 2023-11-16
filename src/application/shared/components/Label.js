const Label = ({
  text,
  bold,
  xBold,
  small,
  large,
  xLarge,
  width,
  minWidth,
  maxWidth,
  noWrap,
  a_s_left,
  a_s_right,
  a_s_center,
  capitalize,
  color,
  underline,
  pointer,
  marginLeft,
  onClick,
  underlineOffset = 3
}) => (
  <p
    onClick={ onClick }
    style={ {
      cursor: pointer ? "pointer" : "",
      textDecoration: underline ? "underline" : "",
      textUnderlineOffset: underlineOffset,
      color: color ?? "",
      width: width ?? "fit-content",
      minWidth: minWidth ?? "fit-content",
      maxWidth: maxWidth ?? "fit-content",
      whiteSpace: noWrap ? "nowrap" : "",
      alignSelf: a_s_left ? "flex-start" : a_s_right ? "flex-end" : a_s_center ? "center" : "",
      textTransform: capitalize ? "capitalize" : "",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      fontWeight: fontWeightChooser(bold, xBold),
      fontSize: fontSizeChooser(small, large, xLarge),
      marginLeft: marginLeft ?? "",
    } }
  >
    { text }
  </p>
);

export default Label;

function fontSizeChooser(small, large, xLarge)
{
  if (small) return "small";
  if (large) return "large";
  if (xLarge) return "xx-large";
  return "";
}

function fontWeightChooser(bold, xBold)
{
  if (bold) return "bold";
  if (xBold) return 800;
  return "";
}
