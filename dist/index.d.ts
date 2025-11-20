import {AssetSource} from 'sanity'
import {Plugin as Plugin_2} from 'sanity'

export declare interface ExternalImageShopPluginConfig {
  sanityAssetTextLanguage?: string
  imageShopInterfaceName?: string
  imageShopDocumentPrefix?: string
  culture?: string
  profileId?: string
  requiredUploadFields?: string
  uploadFieldLanguages?: string
  imageAlias?: string
  imageMaxSize?: string
  languageResolver?: LanguageResolver
  fieldMapper?: FieldMapper
}

declare type FieldMapper = (sanityAssetDocumentProps: any, imageShopData: ImageShopAsset) => any

declare type ImageShopAsset = {
  documentId: string
  code: string
  extraInfo: null | string
  AuthorName: null | string
  image: {
    file: string
    width: number
    height: number
    thumbnail: string
  }
  text: {
    [k: string]: {
      title: string
      description: string
      rights: string
      credits: string
      tags: string
      categories: string[]
    }
  }
  InterfaceList: Array<{
    InterfaceID: number
    InterfaceName: string
  }>
  profile: any
}

/**
 * @public
 */
export declare const imageShopAsset: Plugin_2<ExternalImageShopPluginConfig>

export declare const imageShopAssetSource: Partial<AssetSource>

declare type LanguageResolver = () => string

export {}
