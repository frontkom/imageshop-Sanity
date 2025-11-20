'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var sanity = require('sanity');
var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var ui = require('@sanity/ui');
var styled = require('styled-components');
var studioSecrets = require('@sanity/studio-secrets');
var icons = require('@sanity/icons');
function _interopDefaultCompat(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {
    default: e
  };
}
var styled__default = /*#__PURE__*/_interopDefaultCompat(styled);
function ImageShopIcon() {
  return /* @__PURE__ */jsxRuntime.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    "data-name": "Layer 1",
    viewBox: "0 0 500 500",
    children: [/* @__PURE__ */jsxRuntime.jsx("defs", {
      children: /* @__PURE__ */jsxRuntime.jsxs("linearGradient", {
        id: "linear-gradient",
        x1: "100.27",
        x2: "98.47",
        y1: "400.92",
        y2: "403.27",
        gradientTransform: "matrix(129.33 0 0 -170.56 -12554.09 68823.33)",
        gradientUnits: "userSpaceOnUse",
        children: [/* @__PURE__ */jsxRuntime.jsx("stop", {
          offset: "0",
          stopColor: "#fff"
        }), /* @__PURE__ */jsxRuntime.jsx("stop", {
          offset: "1"
        })]
      })
    }), /* @__PURE__ */jsxRuntime.jsx("path", {
      fill: "#31a2e8",
      d: "M267.62 2.15c-43.47-2.31-41 27.6-9 33.76l2 .31c75.91 12.8 140 70.15 140 149.24a151 151 0 01-244.8 117L141.73 376l49.67 92.66 154.77 5.86 11-.46A248.07 248.07 0 00500 249.75c-.16-131.2-102.61-238.65-232.38-247.6z",
      "data-name": "Path 264"
    }), /* @__PURE__ */jsxRuntime.jsx("path", {
      fill: "url(#linear-gradient)",
      d: "M267.62 2.15c-43.47-2.31-41 27.6-9 33.76l2 .31c75.91 12.8 140 70.15 140 149.24a151 151 0 01-244.8 117L141.73 376l49.67 92.66 154.77 5.86 11-.46A248.07 248.07 0 00500 249.75c-.16-131.2-102.61-238.65-232.38-247.6z",
      "data-name": "Path 265",
      opacity: "0.5",
      style: {
        isolation: "isolate"
      }
    }), /* @__PURE__ */jsxRuntime.jsx("path", {
      fill: "#31a2e8",
      d: "M387.46 457c-120.77 59.78-284.7-61.1-137.54-207.4C397.08 103.44 165.63-66.14 41.29 113A245.88 245.88 0 000 249.75C0 386.81 111.92 498 249.92 498a249.88 249.88 0 00137.53-41z",
      "data-name": "Path 266"
    })]
  });
}
const IFrame = styled__default.default.iframe`
  height: calc(100vh - 9rem);
  width: 100%;
`;
const imageShopAssetToSanityAsset = (imageShopData, resolvedLanguage, fieldMapper, documentTitle) => {
  if (!imageShopData || !imageShopData.documentId) {
    return null;
  }
  const textObject = imageShopData?.text[resolvedLanguage] || {};
  const assetDocumentProps = {
    _type: "sanity.imageAsset",
    source: {
      id: imageShopData.documentId,
      name: `imageshop`
    },
    texts: imageShopData.text
  };
  if (documentTitle) {
    assetDocumentProps.title = documentTitle;
  }
  if (textObject?.title) {
    assetDocumentProps.title = textObject.title;
  }
  if (textObject?.description) {
    assetDocumentProps.description = textObject.description;
  }
  if (textObject?.credits) {
    assetDocumentProps.creditLine = textObject.credits;
  }
  const asset = {
    kind: "url",
    value: imageShopData.image.file,
    assetDocumentProps: fieldMapper ? fieldMapper(assetDocumentProps, imageShopData) : assetDocumentProps
  };
  return asset;
};
const IMAGESHOP_CLIENT = "https://client.imageshop.no";
const IMAGESHOP_INSERT_IMAGE_API = `${IMAGESHOP_CLIENT}/InsertImage2.aspx`;
const ConfigWarning = _ref => {
  let {
    onOpenSettings
  } = _ref;
  return /* @__PURE__ */jsxRuntime.jsx(ui.Card, {
    tone: "caution",
    padding: 4,
    radius: 2,
    children: /* @__PURE__ */jsxRuntime.jsxs(ui.Stack, {
      space: 4,
      children: [/* @__PURE__ */jsxRuntime.jsx(ui.Text, {
        as: "h1",
        weight: "semibold",
        children: "Missing configuration"
      }), /* @__PURE__ */jsxRuntime.jsx(ui.Text, {
        children: "You must first configure the plugin with your Imageshop credentials"
      }), /* @__PURE__ */jsxRuntime.jsx(ui.Button, {
        onClick: () => onOpenSettings(),
        children: "Configure API-key"
      }), /* @__PURE__ */jsxRuntime.jsxs(ui.Text, {
        children: ["You can get your credentials by visiting", " ", /* @__PURE__ */jsxRuntime.jsx("a", {
          href: "https://www.imageshop.no/",
          rel: "noopener noreferrer",
          target: "_blank",
          children: "Imageshop"
        }), " ", "and get your token."]
      })]
    })
  });
};
const getIframeParams = _ref2 => {
  let {
    pluginConfig,
    isMulti,
    apiKey
  } = _ref2;
  if (!apiKey) {
    return null;
  }
  const iframeParams = {
    IFRAMEINSERT: "true",
    HIDEIMAGEINFO: "true",
    INSERTIMIDIATELY: "true",
    SHOWSIZEDIALOGUE: "true",
    SHOWCROPDIALOGUE: "true",
    FREECROP: "true",
    IMAGESHOPINTERFACENAME: pluginConfig.IMAGESHOPINTERFACENAME || "",
    IMAGESHOPDOCUMENTPREFIX: pluginConfig.IMAGESHOPDOCUMENTPREFIX || "",
    CULTURE: pluginConfig.CULTURE || "nb-NO",
    PROFILEID: pluginConfig.PROFILEID || "",
    REQUIREDUPLOADFIELDS: pluginConfig.REQUIREDUPLOADFIELDS || "",
    UPLOADFIELDLANGUAGES: pluginConfig.UPLOADFIELDLANGUAGES || "no,en",
    IMAGESHOPSIZES: `${pluginConfig.IMAGE_ALIAS || "Large"};${pluginConfig.IMAGE_MAX_SIZE || "2048x2048"}`,
    FORMAT: "json",
    IMAGESHOPTOKEN: apiKey
  };
  if (isMulti) {
    iframeParams.ENABLEMULTISELECT = "true";
  }
  return iframeParams;
};
const mapExternalConfigToInternal = external => ({
  SANITY_ASSET_TEXT_LANGUAGE: external.sanityAssetTextLanguage,
  IMAGESHOPINTERFACENAME: external.imageShopInterfaceName,
  IMAGESHOPDOCUMENTPREFIX: external.imageShopDocumentPrefix,
  CULTURE: external.culture,
  PROFILEID: external.profileId,
  REQUIREDUPLOADFIELDS: external.requiredUploadFields,
  IMAGE_ALIAS: external.imageAlias,
  IMAGE_MAX_SIZE: external.imageMaxSize,
  languageResolver: external.languageResolver,
  fieldMapper: external.fieldMapper
});
const pluginConfigKeys = [{
  key: "apiKey",
  title: "API key",
  description: ""
}];
const namespace = "imageShop";
const SecretsConfigView = props => {
  return /* @__PURE__ */jsxRuntime.jsx(studioSecrets.SettingsView, {
    title: "Imageshop config",
    namespace,
    keys: pluginConfigKeys,
    onClose: props.onClose
  });
};
const ImageShopAssetSource = props => {
  const {
    isLoadingMultiUpload,
    isMultiUploadType,
    imageShopConfig: pluginConfig
  } = props;
  const {
    secrets
  } = studioSecrets.useSecrets(namespace);
  const hasConfig = !!secrets?.apiKey;
  const [showSettings, setShowSettings] = react.useState(false);
  const [loadingMessage, setLoadingMessage] = react.useState("Loading Imageshop Media Libary");
  const contentRef = react.useRef(null);
  const domId = react.useRef(Date.now());
  const isMulti = isMultiUploadType;
  const languageResolver = pluginConfig.languageResolver;
  const fieldMapper = pluginConfig.fieldMapper;
  const handleClose = () => {
    props.onClose();
  };
  const handleEvent = event => {
    if (!event || !event.data) {
      return;
    }
    if (typeof event.data !== "string") {
      return;
    }
    if (event.origin !== IMAGESHOP_CLIENT) {
      return;
    }
    let selectedFiles = [];
    const [imageShopDataString, title] = event.data.split(";");
    if (!imageShopDataString) {
      return;
    }
    const parsedEventData = JSON.parse(imageShopDataString);
    const resolvedLanguage = languageResolver ? languageResolver() : pluginConfig.SANITY_ASSET_TEXT_LANGUAGE || "no";
    if (Array.isArray(parsedEventData)) {
      if (!event.data) {
        return;
      }
      const imageShopDatas = parsedEventData;
      if (!imageShopDatas || !Array.isArray(imageShopDatas) || imageShopDatas.length === 0) {
        return;
      }
      const assetsToBeUploaded = imageShopDatas.map(imageShopData => imageShopAssetToSanityAsset(imageShopData, resolvedLanguage, fieldMapper)).filter(asset => asset !== null);
      if (assetsToBeUploaded) {
        selectedFiles = assetsToBeUploaded;
      }
    } else {
      const imageShopData = parsedEventData;
      const uploadAsset = imageShopAssetToSanityAsset(imageShopData, resolvedLanguage, fieldMapper, title);
      if (uploadAsset) {
        selectedFiles = [uploadAsset];
      }
    }
    props.onSelect(selectedFiles);
  };
  react.useEffect(() => {
    window.addEventListener("message", handleEvent);
    return () => {
      window.removeEventListener("message", handleEvent);
    };
  }, []);
  const iframeParams = getIframeParams({
    pluginConfig,
    isMulti,
    apiKey: secrets?.apiKey
  });
  const url = iframeParams ? `${IMAGESHOP_INSERT_IMAGE_API}?${new URLSearchParams(iframeParams)}` : null;
  return /* @__PURE__ */jsxRuntime.jsxs(ui.Dialog, {
    id: "imageshop-asset-source",
    title: "Select image from Imageshop",
    header: /* @__PURE__ */jsxRuntime.jsx(ui.Button, {
      fontSize: [1],
      icon: icons.CogIcon,
      onClick: () => setShowSettings(true),
      mode: "bleed",
      "aria-label": "Imageshop settings"
    }),
    onClose: handleClose,
    open: true,
    width: hasConfig ? 4 : 1,
    zOffset: 9999,
    children: [" ", /* @__PURE__ */jsxRuntime.jsxs(ui.Box, {
      padding: 4,
      children: [isLoadingMultiUpload && /* @__PURE__ */jsxRuntime.jsxs(ui.Stack, {
        space: 3,
        children: [/* @__PURE__ */jsxRuntime.jsx(ui.Flex, {
          align: "center",
          justify: "center",
          children: /* @__PURE__ */jsxRuntime.jsx(ui.Spinner, {
            muted: true
          })
        }), /* @__PURE__ */jsxRuntime.jsx(ui.Text, {
          size: 1,
          muted: true,
          align: "center",
          children: "Uploading images, please wait."
        })]
      }), hasConfig && loadingMessage && /* @__PURE__ */jsxRuntime.jsxs(ui.Stack, {
        space: 3,
        children: [/* @__PURE__ */jsxRuntime.jsx(ui.Flex, {
          align: "center",
          justify: "center",
          children: /* @__PURE__ */jsxRuntime.jsx(ui.Spinner, {
            muted: true
          })
        }), /* @__PURE__ */jsxRuntime.jsx(ui.Text, {
          size: 1,
          muted: true,
          align: "center",
          children: loadingMessage
        })]
      }), hasConfig && !!url && /* @__PURE__ */jsxRuntime.jsx("div", {
        ref: contentRef,
        id: `imageshopWidget-${domId}`,
        children: /* @__PURE__ */jsxRuntime.jsx(IFrame, {
          onLoad: () => {
            setLoadingMessage(null);
          },
          frameBorder: 0,
          width: "100%",
          src: url
        })
      }), !hasConfig && /* @__PURE__ */jsxRuntime.jsx(ConfigWarning, {
        onOpenSettings: () => setShowSettings(true)
      })]
    }), showSettings && /* @__PURE__ */jsxRuntime.jsx(SecretsConfigView, {
      onClose: () => setShowSettings(false)
    })]
  });
};

// Strict ESM env, designed to run outside Node.js in envs that provide WebCrypto (deno, browsers, etc)

function getRandomValues(typedArray) {
  const crypto = typeof window !== 'undefined' && 'crypto' in window ? window.crypto : globalThis.crypto;
  if (!crypto || !crypto.getRandomValues) {
    throw new Error('WebCrypto not available in this environment');
  }
  return crypto.getRandomValues(typedArray);
}
Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);
const getByteHexTable = /* @__PURE__ */(() => {
  let table;
  return () => {
    if (table) return table;
    table = [];
    for (let i = 0; i < 256; ++i) table[i] = (i + 256).toString(16).slice(1);
    return table;
  };
})();
function whatwgRNG() {
  let length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
  const rnds8 = new Uint8Array(length);
  return getRandomValues(rnds8), rnds8;
}
function randomKey(length) {
  const table = getByteHexTable();
  return whatwgRNG(length).reduce((str, n) => str + table[n], "").slice(0, length);
}
const ArrayFunctions = props => {
  const {
    onItemAppend,
    imageShopConfig
  } = props;
  const [isAssetSourceOpen, setIsAssetSourceOpen] = react.useState(false);
  const [isLoading, setIsLoading] = react.useState(false);
  const client = sanity.useClient({
    apiVersion: "2023-08-08"
  });
  const handleAddMultipleBtnClick = () => {
    setIsAssetSourceOpen(true);
  };
  const onClose = () => {
    setIsAssetSourceOpen(false);
  };
  const onSelect = async files => {
    setIsLoading(true);
    const promises = files.map(async file => {
      if (typeof file.value === "string" && file.kind === "url") {
        const resp = await fetch(file.value);
        const blob = await resp.blob();
        const dataLookup = file.assetDocumentProps || {};
        const imageAssetDocument = await client.assets.upload("image", blob, {
          filename: file.assetDocumentProps?.originalFileName,
          ...dataLookup
        });
        const _key = randomKey(12);
        const theImage = {
          _type: "image",
          _key,
          asset: {
            _type: "reference",
            _ref: imageAssetDocument._id
          }
        };
        onItemAppend(theImage);
      }
    });
    await Promise.all(promises);
    setIsLoading(false);
    setIsAssetSourceOpen(false);
  };
  return /* @__PURE__ */jsxRuntime.jsxs("div", {
    children: [/* @__PURE__ */jsxRuntime.jsx(ui.Button, {
      icon: icons.AddIcon,
      mode: "ghost",
      onClick: handleAddMultipleBtnClick,
      text: "Add multiple images"
    }), isAssetSourceOpen && /* @__PURE__ */jsxRuntime.jsx(ImageShopAssetSource, {
      assetSource: {
        name: "imageshop",
        title: "ImageShop",
        component: () => null
      },
      imageShopConfig,
      isLoadingMultiUpload: isLoading,
      selectedAssets: [],
      onClose,
      onSelect,
      isMultiUploadType: true,
      selectionType: "single",
      accept: "image/*"
    })]
  });
};
const provideConfigAssetSource = _ref3 => {
  let {
    props,
    config
  } = _ref3;
  return /* @__PURE__ */jsxRuntime.jsx(ImageShopAssetSource, {
    ...props,
    imageShopConfig: config
  });
};
const proveConfigForArrayFunctions = _ref4 => {
  let {
    props,
    config
  } = _ref4;
  return /* @__PURE__ */jsxRuntime.jsx(ArrayFunctions, {
    ...props,
    imageShopConfig: config
  });
};
const imageShopAssetSource = {
  name: "imageshop",
  title: "Imageshop",
  icon: ImageShopIcon
};
const imageShopAsset = sanity.definePlugin(function () {
  let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const mappedConfig = mapExternalConfigToInternal(config);
  return {
    name: "sanity-plugin-asset-source-imageshop",
    form: {
      components: {
        input: props => {
          const {
            schemaType
          } = props;
          if (sanity.isArrayOfObjectsSchemaType(schemaType)) {
            const arrayProps = props;
            const shouldDisplayMultiUpload = arrayProps.schemaType?.options?.batchUpload;
            if (shouldDisplayMultiUpload) {
              return arrayProps.renderDefault({
                ...arrayProps,
                arrayFunctions: arrayFunctionProps => proveConfigForArrayFunctions({
                  props: arrayFunctionProps,
                  config: mappedConfig
                })
              });
            }
          }
          return props.renderDefault(props);
        }
      },
      image: {
        assetSources: prev => {
          return [...prev, {
            ...imageShopAssetSource,
            component: (props, context) => {
              return provideConfigAssetSource({
                props,
                config: mappedConfig
              });
            }
          }];
        }
      }
    }
  };
});
exports.imageShopAsset = imageShopAsset;
exports.imageShopAssetSource = imageShopAssetSource;
//# sourceMappingURL=index.js.map
