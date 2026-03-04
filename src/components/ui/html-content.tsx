import { useWindowDimensions } from 'react-native';
import { RenderHTMLSource } from 'react-native-render-html';

export const HtmlContent = ({ html }: { html: string }) => {
  const { width: screenWidth } = useWindowDimensions();
  const contentWidth = Math.min(screenWidth, 1180);

  return <RenderHTMLSource contentWidth={contentWidth} source={{ html }} />;
};
