import { ArraySchemaType } from 'sanity'
import { AddIcon } from '@sanity/icons'
import { useState } from 'react'
import { Button, Stack } from '@sanity/ui'
import { randomKey } from '@sanity/util/content'
import ImageShopAssetSource from './ImageShopAssetSource'
import { ArrayInputFunctionsProps, ArrayOfObjectsFunctions, AssetFromSource, useClient } from 'sanity'
import { ImageAsset } from 'sanity'
import { ImageShopPluginConfig } from '../types'

// These are the props any implementation of the ArrayFunctions part will receive

/**
 * This function overrides the array-functions to also add a upload multiple images for the imageshop plugin.
 * @param props
 * @constructor
 */

type Props = ArrayInputFunctionsProps<{ _key: string }, ArraySchemaType> & {
  imageShopConfig: ImageShopPluginConfig
}

const ArrayFunctions = (props: Props) => {
  const { onItemAppend, imageShopConfig, schemaType } = props
  const [isAssetSourceOpen, setIsAssetSourceOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const client = useClient({ apiVersion: '2023-08-08' })

  const handleAddMultipleBtnClick = () => {
    setIsAssetSourceOpen(true)
  }

  const onClose = () => {
    setIsAssetSourceOpen(false)
  }

  const onSelect = async (files: AssetFromSource[]) => {
    setIsLoading(true)

    // Append using the array's declared member type so items satisfy the field
    // schema (e.g. a custom image object with a required `alt`), rather than a
    // generic `image` that would mismatch the list and fail validation.
    const memberType = (schemaType?.of?.[0] as { name?: string })?.name ?? 'image'

    // We support only kind url.

    const promises = files.map(async (file) => {
      if (typeof file.value === 'string' && file.kind === 'url') {
        // Convert url to to blob
        const resp = await fetch(file.value)
        const blob = await resp.blob()

        const dataLookup: ImageAsset | any = file.assetDocumentProps || {}

        // Upload image via sanity client.
        const imageAssetDocument = await client.assets.upload('image', blob, {
          filename: file.assetDocumentProps?.originalFileName,
          ...dataLookup,
        })

        // Create a random key for the array item.
        const _key = randomKey(12)

        // Prefill `alt` from the Imageshop asset description when present; when
        // absent, the field's own validation flags the empty required alt.
        const alt =
          typeof dataLookup?.description === 'string' ? dataLookup.description.trim() : ''

        // Create object based on the array's member type.
        const theImage = {
          _type: memberType,
          _key,
          asset: {
            _type: 'reference',
            _ref: imageAssetDocument._id,
          },
          ...(alt ? { alt } : {}),
        }

        onItemAppend(theImage)
      }
    })

    await Promise.all(promises)

    setIsLoading(false)

    setIsAssetSourceOpen(false)
  }

  return (
    <Stack space={2}>
      {/* Keep the default add controls (single add, incl. asset-source choice)
          alongside the batch selector, rather than replacing them. */}
      <ArrayOfObjectsFunctions {...props} />
      <Button
        icon={AddIcon}
        mode="ghost"
        onClick={handleAddMultipleBtnClick}
        text="Add multiple images"
      />
      {isAssetSourceOpen && (
        <ImageShopAssetSource
          assetSource={{
            name: 'imageshop',
            title: 'ImageShop',
            component: () => null
          }}
          imageShopConfig={imageShopConfig}
          isLoadingMultiUpload={isLoading}
          selectedAssets={[]}
          onClose={onClose}
          onSelect={onSelect}
          isMultiUploadType
          selectionType="single"
          accept="image/*"
        />
      )}
    </Stack>
  )
}

export default ArrayFunctions
