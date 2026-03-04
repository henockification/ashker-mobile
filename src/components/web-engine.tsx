import { Image } from 'expo-image';
import * as React from 'react';
import {
  CustomBlockRenderer,
  CustomTagRendererRecord,
  MixedStyleDeclaration,
  MixedStyleRecord,
  RenderHTMLConfigProvider,
  TRenderEngineProvider,
} from 'react-native-render-html';

const systemFonts = [
  'NunitoSans-Regular',
  'NunitoSans-Medium',
  'NunitoSans-SemiBold',
  'NunitoSans-Bold',
];

const ParagraphRenderer: CustomBlockRenderer = function ParagraphRenderer({
  TDefaultRenderer,
  tnode,
  ...props
}) {
  const marginsFix =
    tnode.markers.olNestLevel > -1 || tnode.markers.ulNestLevel > -1
      ? { marginTop: 0, marginBottom: 0 }
      : null;

  return <TDefaultRenderer {...props} tnode={tnode} style={[props.style, marginsFix]} />;
};

export const ImageRenderer: CustomBlockRenderer = ({ tnode }) => {
  const uri = tnode.attributes.src;

  if (!uri) return null;

  // Try to get width/height from HTML attributes
  const widthAttr = tnode.attributes.width ? Number(tnode.attributes.width) : undefined;
  const heightAttr = tnode.attributes.height ? Number(tnode.attributes.height) : undefined;
  const aspectRatio = widthAttr && heightAttr ? widthAttr / heightAttr : 16 / 9;

  return (
    <Image
      source={{ uri }}
      style={{
        width: '100%',
        aspectRatio,
        marginVertical: 24,
      }}
      contentFit="contain"
    />
  );
};

const renderers: CustomTagRendererRecord = {
  p: ParagraphRenderer,
  img: ImageRenderer,
};

const classesStyles: MixedStyleRecord = {
  'text-white': {
    color: '#ffffff',
  },
  'text-primary': {
    color: '#23537c',
  },
  link: {
    fontFamily: 'NunitoSans-SemiBold',
  },
  'ql-size-huge': {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: 'NunitoSans-SemiBold',
    marginBottom: 10,
  },
  'ql-size-small': {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'NunitoSans-SemiBold',
    marginBottom: 10,
  },
  'ql-size-large': {
    fontSize: 28,
    lineHeight: 46,
    fontFamily: 'NunitoSans-SemiBold',
    marginBottom: 10,
  },
};
const tagsStyles: MixedStyleRecord = {
  div: {
    width: '100%',
  },
  a: {
    color: '#23537c',
    fontSize: 18,
    lineHeight: 28,
  },
  ul: {
    paddingLeft: 16,
    marginLeft: 8,
  },
  li: {
    paddingLeft: 8,
  },
  img: {
    alignSelf: 'center',
  },
  h3: {
    marginBottom: 0,
    marginTop: 0,
    fontSize: 24,
    lineHeight: 24 * 1.5,
    fontFamily: 'NunitoSans-SemiBold',
  },
  h4: {
    marginBottom: 0,
    marginTop: 0,
    fontSize: 20,
    lineHeight: 20 * 1.5,
    fontFamily: 'NunitoSans-SemiBold',
  },
};

const baseStyle: MixedStyleDeclaration = {
  color: '#27272a',
  fontSize: 18,
  lineHeight: 18 * 1.5,
  fontFamily: 'NunitoSans-Regular',
};

export default function WebEngine({ children }: React.PropsWithChildren) {
  return (
    <TRenderEngineProvider
      systemFonts={systemFonts}
      classesStyles={classesStyles}
      tagsStyles={tagsStyles}
      baseStyle={baseStyle}
    >
      <RenderHTMLConfigProvider renderers={renderers} enableExperimentalMarginCollapsing>
        {children}
      </RenderHTMLConfigProvider>
    </TRenderEngineProvider>
  );
}
