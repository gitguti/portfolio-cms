import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Dimension: any;
  HexColor: any;
  JSON: any;
  Quality: any;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']>;
  transform?: InputMaybe<ImageTransformOptions>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']>;
  contentType_contains?: InputMaybe<Scalars['String']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentType_not?: InputMaybe<Scalars['String']>;
  contentType_not_contains?: InputMaybe<Scalars['String']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileName?: InputMaybe<Scalars['String']>;
  fileName_contains?: InputMaybe<Scalars['String']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileName_not?: InputMaybe<Scalars['String']>;
  fileName_not_contains?: InputMaybe<Scalars['String']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  height?: InputMaybe<Scalars['Int']>;
  height_exists?: InputMaybe<Scalars['Boolean']>;
  height_gt?: InputMaybe<Scalars['Int']>;
  height_gte?: InputMaybe<Scalars['Int']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  height_lt?: InputMaybe<Scalars['Int']>;
  height_lte?: InputMaybe<Scalars['Int']>;
  height_not?: InputMaybe<Scalars['Int']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size?: InputMaybe<Scalars['Int']>;
  size_exists?: InputMaybe<Scalars['Boolean']>;
  size_gt?: InputMaybe<Scalars['Int']>;
  size_gte?: InputMaybe<Scalars['Int']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size_lt?: InputMaybe<Scalars['Int']>;
  size_lte?: InputMaybe<Scalars['Int']>;
  size_not?: InputMaybe<Scalars['Int']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url?: InputMaybe<Scalars['String']>;
  url_contains?: InputMaybe<Scalars['String']>;
  url_exists?: InputMaybe<Scalars['Boolean']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url_not?: InputMaybe<Scalars['String']>;
  url_not_contains?: InputMaybe<Scalars['String']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  width?: InputMaybe<Scalars['Int']>;
  width_exists?: InputMaybe<Scalars['Boolean']>;
  width_gt?: InputMaybe<Scalars['Int']>;
  width_gte?: InputMaybe<Scalars['Int']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  width_lt?: InputMaybe<Scalars['Int']>;
  width_lte?: InputMaybe<Scalars['Int']>;
  width_not?: InputMaybe<Scalars['Int']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  componentAuthorCollection?: Maybe<ComponentAuthorCollection>;
  componentCaptionedImageCollection?: Maybe<ComponentCaptionedImageCollection>;
  componentFullWidthImageCollection?: Maybe<ComponentFullWidthImageCollection>;
  componentImageGalleryCollection?: Maybe<ComponentImageGalleryCollection>;
  componentRichImageCollection?: Maybe<ComponentRichImageCollection>;
  componentSeoCollection?: Maybe<ComponentSeoCollection>;
  componentTextImageSideBySideCollection?: Maybe<ComponentTextImageSideBySideCollection>;
  entryCollection?: Maybe<EntryCollection>;
  pageBlogPostCollection?: Maybe<PageBlogPostCollection>;
  urlLinkCollection?: Maybe<UrlLinkCollection>;
};


export type AssetLinkingCollectionsComponentAuthorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsComponentCaptionedImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsComponentFullWidthImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsComponentImageGalleryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsComponentRichImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsComponentSeoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsComponentTextImageSideBySideCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsPageBlogPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsUrlLinkCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** To have author-related properties [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentAuthor) */
export type ComponentAuthor = Entry & _Node & {
  __typename?: 'ComponentAuthor';
  _id: Scalars['ID'];
  avatar?: Maybe<Asset>;
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<ComponentAuthorLinkingCollections>;
  name?: Maybe<Scalars['String']>;
  sys: Sys;
};


/** To have author-related properties [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentAuthor) */
export type ComponentAuthorAvatarArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** To have author-related properties [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentAuthor) */
export type ComponentAuthorInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To have author-related properties [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentAuthor) */
export type ComponentAuthorLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** To have author-related properties [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentAuthor) */
export type ComponentAuthorNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type ComponentAuthorCollection = {
  __typename?: 'ComponentAuthorCollection';
  items: Array<Maybe<ComponentAuthor>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ComponentAuthorFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentAuthorFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentAuthorFilter>>>;
  avatar_exists?: InputMaybe<Scalars['Boolean']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']>;
  internalName_contains?: InputMaybe<Scalars['String']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internalName_not?: InputMaybe<Scalars['String']>;
  internalName_not_contains?: InputMaybe<Scalars['String']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type ComponentAuthorLinkingCollections = {
  __typename?: 'ComponentAuthorLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentAuthorLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ComponentAuthorOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Component - Captioned Image   API Identifier: componentCaptionedImage    Fields:   1. Internal Name (Short text, required)   2. title (Short text, optional)      - Help text: "Optional heading for the image"   3. caption (Long text, required)      - Help text: "Description shown below the image"   4. image (Media, required)      - Validation: Accept only images [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentCaptionedImage) */
export type ComponentCaptionedImage = Entry & _Node & {
  __typename?: 'ComponentCaptionedImage';
  _id: Scalars['ID'];
  caption?: Maybe<ComponentCaptionedImageCaption>;
  contentfulMetadata: ContentfulMetadata;
  image?: Maybe<Asset>;
  internalName?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<ComponentCaptionedImageLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** Component - Captioned Image   API Identifier: componentCaptionedImage    Fields:   1. Internal Name (Short text, required)   2. title (Short text, optional)      - Help text: "Optional heading for the image"   3. caption (Long text, required)      - Help text: "Description shown below the image"   4. image (Media, required)      - Validation: Accept only images [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentCaptionedImage) */
export type ComponentCaptionedImageCaptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Component - Captioned Image   API Identifier: componentCaptionedImage    Fields:   1. Internal Name (Short text, required)   2. title (Short text, optional)      - Help text: "Optional heading for the image"   3. caption (Long text, required)      - Help text: "Description shown below the image"   4. image (Media, required)      - Validation: Accept only images [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentCaptionedImage) */
export type ComponentCaptionedImageImageArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** Component - Captioned Image   API Identifier: componentCaptionedImage    Fields:   1. Internal Name (Short text, required)   2. title (Short text, optional)      - Help text: "Optional heading for the image"   3. caption (Long text, required)      - Help text: "Description shown below the image"   4. image (Media, required)      - Validation: Accept only images [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentCaptionedImage) */
export type ComponentCaptionedImageInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Component - Captioned Image   API Identifier: componentCaptionedImage    Fields:   1. Internal Name (Short text, required)   2. title (Short text, optional)      - Help text: "Optional heading for the image"   3. caption (Long text, required)      - Help text: "Description shown below the image"   4. image (Media, required)      - Validation: Accept only images [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentCaptionedImage) */
export type ComponentCaptionedImageLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Component - Captioned Image   API Identifier: componentCaptionedImage    Fields:   1. Internal Name (Short text, required)   2. title (Short text, optional)      - Help text: "Optional heading for the image"   3. caption (Long text, required)      - Help text: "Description shown below the image"   4. image (Media, required)      - Validation: Accept only images [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentCaptionedImage) */
export type ComponentCaptionedImageTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type ComponentCaptionedImageCaption = {
  __typename?: 'ComponentCaptionedImageCaption';
  json: Scalars['JSON'];
  links: ComponentCaptionedImageCaptionLinks;
};

export type ComponentCaptionedImageCaptionAssets = {
  __typename?: 'ComponentCaptionedImageCaptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type ComponentCaptionedImageCaptionEntries = {
  __typename?: 'ComponentCaptionedImageCaptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type ComponentCaptionedImageCaptionLinks = {
  __typename?: 'ComponentCaptionedImageCaptionLinks';
  assets: ComponentCaptionedImageCaptionAssets;
  entries: ComponentCaptionedImageCaptionEntries;
  resources: ComponentCaptionedImageCaptionResources;
};

export type ComponentCaptionedImageCaptionResources = {
  __typename?: 'ComponentCaptionedImageCaptionResources';
  block: Array<ComponentCaptionedImageCaptionResourcesBlock>;
  hyperlink: Array<ComponentCaptionedImageCaptionResourcesHyperlink>;
  inline: Array<ComponentCaptionedImageCaptionResourcesInline>;
};

export type ComponentCaptionedImageCaptionResourcesBlock = ResourceLink & {
  __typename?: 'ComponentCaptionedImageCaptionResourcesBlock';
  sys: ResourceSys;
};

export type ComponentCaptionedImageCaptionResourcesHyperlink = ResourceLink & {
  __typename?: 'ComponentCaptionedImageCaptionResourcesHyperlink';
  sys: ResourceSys;
};

export type ComponentCaptionedImageCaptionResourcesInline = ResourceLink & {
  __typename?: 'ComponentCaptionedImageCaptionResourcesInline';
  sys: ResourceSys;
};

export type ComponentCaptionedImageCollection = {
  __typename?: 'ComponentCaptionedImageCollection';
  items: Array<Maybe<ComponentCaptionedImage>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ComponentCaptionedImageFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentCaptionedImageFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentCaptionedImageFilter>>>;
  caption_contains?: InputMaybe<Scalars['String']>;
  caption_exists?: InputMaybe<Scalars['Boolean']>;
  caption_not_contains?: InputMaybe<Scalars['String']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  image_exists?: InputMaybe<Scalars['Boolean']>;
  internalName?: InputMaybe<Scalars['String']>;
  internalName_contains?: InputMaybe<Scalars['String']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internalName_not?: InputMaybe<Scalars['String']>;
  internalName_not_contains?: InputMaybe<Scalars['String']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentCaptionedImageLinkingCollections = {
  __typename?: 'ComponentCaptionedImageLinkingCollections';
  componentImageGalleryWithCaptionsCollection?: Maybe<ComponentImageGalleryWithCaptionsCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentCaptionedImageLinkingCollectionsComponentImageGalleryWithCaptionsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ComponentCaptionedImageLinkingCollectionsComponentImageGalleryWithCaptionsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type ComponentCaptionedImageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ComponentCaptionedImageLinkingCollectionsComponentImageGalleryWithCaptionsCollectionOrder {
  ColumnsAsc = 'columns_ASC',
  ColumnsDesc = 'columns_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ComponentCaptionedImageOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** ComponentFullWidthImage     - image: Media     - caption: Long text     - maxWidth: Short text (default/narrow/wide) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentFullWidthImage) */
export type ComponentFullWidthImage = Entry & _Node & {
  __typename?: 'ComponentFullWidthImage';
  _id: Scalars['ID'];
  caption?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  image?: Maybe<Asset>;
  linkedFrom?: Maybe<ComponentFullWidthImageLinkingCollections>;
  maxWidth?: Maybe<Scalars['String']>;
  sys: Sys;
};


/** ComponentFullWidthImage     - image: Media     - caption: Long text     - maxWidth: Short text (default/narrow/wide) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentFullWidthImage) */
export type ComponentFullWidthImageCaptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** ComponentFullWidthImage     - image: Media     - caption: Long text     - maxWidth: Short text (default/narrow/wide) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentFullWidthImage) */
export type ComponentFullWidthImageImageArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** ComponentFullWidthImage     - image: Media     - caption: Long text     - maxWidth: Short text (default/narrow/wide) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentFullWidthImage) */
export type ComponentFullWidthImageLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** ComponentFullWidthImage     - image: Media     - caption: Long text     - maxWidth: Short text (default/narrow/wide) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentFullWidthImage) */
export type ComponentFullWidthImageMaxWidthArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type ComponentFullWidthImageCollection = {
  __typename?: 'ComponentFullWidthImageCollection';
  items: Array<Maybe<ComponentFullWidthImage>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ComponentFullWidthImageFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentFullWidthImageFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentFullWidthImageFilter>>>;
  caption?: InputMaybe<Scalars['String']>;
  caption_contains?: InputMaybe<Scalars['String']>;
  caption_exists?: InputMaybe<Scalars['Boolean']>;
  caption_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  caption_not?: InputMaybe<Scalars['String']>;
  caption_not_contains?: InputMaybe<Scalars['String']>;
  caption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  image_exists?: InputMaybe<Scalars['Boolean']>;
  maxWidth?: InputMaybe<Scalars['String']>;
  maxWidth_contains?: InputMaybe<Scalars['String']>;
  maxWidth_exists?: InputMaybe<Scalars['Boolean']>;
  maxWidth_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  maxWidth_not?: InputMaybe<Scalars['String']>;
  maxWidth_not_contains?: InputMaybe<Scalars['String']>;
  maxWidth_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type ComponentFullWidthImageLinkingCollections = {
  __typename?: 'ComponentFullWidthImageLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentFullWidthImageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ComponentFullWidthImageOrder {
  MaxWidthAsc = 'maxWidth_ASC',
  MaxWidthDesc = 'maxWidth_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** ComponentImageGallery     - images: Media (multiple)     - columns: Integer (2 o 3)     - caption: Long text [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGallery) */
export type ComponentImageGallery = Entry & _Node & {
  __typename?: 'ComponentImageGallery';
  _id: Scalars['ID'];
  caption?: Maybe<Scalars['String']>;
  columns?: Maybe<Scalars['Int']>;
  contentfulMetadata: ContentfulMetadata;
  imagesCollection?: Maybe<AssetCollection>;
  linkedFrom?: Maybe<ComponentImageGalleryLinkingCollections>;
  sys: Sys;
};


/** ComponentImageGallery     - images: Media (multiple)     - columns: Integer (2 o 3)     - caption: Long text [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGallery) */
export type ComponentImageGalleryCaptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** ComponentImageGallery     - images: Media (multiple)     - columns: Integer (2 o 3)     - caption: Long text [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGallery) */
export type ComponentImageGalleryColumnsArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** ComponentImageGallery     - images: Media (multiple)     - columns: Integer (2 o 3)     - caption: Long text [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGallery) */
export type ComponentImageGalleryImagesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** ComponentImageGallery     - images: Media (multiple)     - columns: Integer (2 o 3)     - caption: Long text [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGallery) */
export type ComponentImageGalleryLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentImageGalleryCollection = {
  __typename?: 'ComponentImageGalleryCollection';
  items: Array<Maybe<ComponentImageGallery>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ComponentImageGalleryFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentImageGalleryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentImageGalleryFilter>>>;
  caption?: InputMaybe<Scalars['String']>;
  caption_contains?: InputMaybe<Scalars['String']>;
  caption_exists?: InputMaybe<Scalars['Boolean']>;
  caption_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  caption_not?: InputMaybe<Scalars['String']>;
  caption_not_contains?: InputMaybe<Scalars['String']>;
  caption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  columns?: InputMaybe<Scalars['Int']>;
  columns_exists?: InputMaybe<Scalars['Boolean']>;
  columns_gt?: InputMaybe<Scalars['Int']>;
  columns_gte?: InputMaybe<Scalars['Int']>;
  columns_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  columns_lt?: InputMaybe<Scalars['Int']>;
  columns_lte?: InputMaybe<Scalars['Int']>;
  columns_not?: InputMaybe<Scalars['Int']>;
  columns_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  imagesCollection_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
};

export type ComponentImageGalleryLinkingCollections = {
  __typename?: 'ComponentImageGalleryLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentImageGalleryLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ComponentImageGalleryOrder {
  CaptionAsc = 'caption_ASC',
  CaptionDesc = 'caption_DESC',
  ColumnsAsc = 'columns_ASC',
  ColumnsDesc = 'columns_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Component - Image Gallery With Captions   API Identifier: componentImageGalleryWithCaptions    Fields:   1. Internal Name (Short text, required)   2. columns (Integer, required)      - Default: 3      - Validation: Accept only 2 or 3   3. items (References, multiple, required)      - Validation: Accept only "Component - Captioned Image"      - Settings: Allow multiple values [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGalleryWithCaptions) */
export type ComponentImageGalleryWithCaptions = Entry & _Node & {
  __typename?: 'ComponentImageGalleryWithCaptions';
  _id: Scalars['ID'];
  columns?: Maybe<Scalars['Int']>;
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']>;
  itemsCollection?: Maybe<ComponentImageGalleryWithCaptionsItemsCollection>;
  linkedFrom?: Maybe<ComponentImageGalleryWithCaptionsLinkingCollections>;
  sys: Sys;
};


/** Component - Image Gallery With Captions   API Identifier: componentImageGalleryWithCaptions    Fields:   1. Internal Name (Short text, required)   2. columns (Integer, required)      - Default: 3      - Validation: Accept only 2 or 3   3. items (References, multiple, required)      - Validation: Accept only "Component - Captioned Image"      - Settings: Allow multiple values [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGalleryWithCaptions) */
export type ComponentImageGalleryWithCaptionsColumnsArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Component - Image Gallery With Captions   API Identifier: componentImageGalleryWithCaptions    Fields:   1. Internal Name (Short text, required)   2. columns (Integer, required)      - Default: 3      - Validation: Accept only 2 or 3   3. items (References, multiple, required)      - Validation: Accept only "Component - Captioned Image"      - Settings: Allow multiple values [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGalleryWithCaptions) */
export type ComponentImageGalleryWithCaptionsInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Component - Image Gallery With Captions   API Identifier: componentImageGalleryWithCaptions    Fields:   1. Internal Name (Short text, required)   2. columns (Integer, required)      - Default: 3      - Validation: Accept only 2 or 3   3. items (References, multiple, required)      - Validation: Accept only "Component - Captioned Image"      - Settings: Allow multiple values [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGalleryWithCaptions) */
export type ComponentImageGalleryWithCaptionsItemsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ComponentImageGalleryWithCaptionsItemsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ComponentCaptionedImageFilter>;
};


/** Component - Image Gallery With Captions   API Identifier: componentImageGalleryWithCaptions    Fields:   1. Internal Name (Short text, required)   2. columns (Integer, required)      - Default: 3      - Validation: Accept only 2 or 3   3. items (References, multiple, required)      - Validation: Accept only "Component - Captioned Image"      - Settings: Allow multiple values [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGalleryWithCaptions) */
export type ComponentImageGalleryWithCaptionsLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentImageGalleryWithCaptionsCollection = {
  __typename?: 'ComponentImageGalleryWithCaptionsCollection';
  items: Array<Maybe<ComponentImageGalleryWithCaptions>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ComponentImageGalleryWithCaptionsFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentImageGalleryWithCaptionsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentImageGalleryWithCaptionsFilter>>>;
  columns?: InputMaybe<Scalars['Int']>;
  columns_exists?: InputMaybe<Scalars['Boolean']>;
  columns_gt?: InputMaybe<Scalars['Int']>;
  columns_gte?: InputMaybe<Scalars['Int']>;
  columns_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  columns_lt?: InputMaybe<Scalars['Int']>;
  columns_lte?: InputMaybe<Scalars['Int']>;
  columns_not?: InputMaybe<Scalars['Int']>;
  columns_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']>;
  internalName_contains?: InputMaybe<Scalars['String']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internalName_not?: InputMaybe<Scalars['String']>;
  internalName_not_contains?: InputMaybe<Scalars['String']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  items?: InputMaybe<CfComponentCaptionedImageNestedFilter>;
  itemsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
};

export type ComponentImageGalleryWithCaptionsItemsCollection = {
  __typename?: 'ComponentImageGalleryWithCaptionsItemsCollection';
  items: Array<Maybe<ComponentCaptionedImage>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export enum ComponentImageGalleryWithCaptionsItemsCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type ComponentImageGalleryWithCaptionsLinkingCollections = {
  __typename?: 'ComponentImageGalleryWithCaptionsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentImageGalleryWithCaptionsLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ComponentImageGalleryWithCaptionsOrder {
  ColumnsAsc = 'columns_ASC',
  ColumnsDesc = 'columns_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** ComponentImpactMetrics    (contenedor de métricas)    Name: Component - Impact Metrics   API Identifier: componentImpactMetrics    Fields:   1. Internal Name (Short text, required)   2. metrics (References, multiple, required)      - Validation: Accept only "Component -   Metric"      - Settings: Allow multiple values (min:   2, max: 8) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImpactMetrics) */
export type ComponentImpactMetrics = Entry & _Node & {
  __typename?: 'ComponentImpactMetrics';
  _id: Scalars['ID'];
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<ComponentImpactMetricsLinkingCollections>;
  metricsCollection?: Maybe<ComponentImpactMetricsMetricsCollection>;
  sys: Sys;
};


/** ComponentImpactMetrics    (contenedor de métricas)    Name: Component - Impact Metrics   API Identifier: componentImpactMetrics    Fields:   1. Internal Name (Short text, required)   2. metrics (References, multiple, required)      - Validation: Accept only "Component -   Metric"      - Settings: Allow multiple values (min:   2, max: 8) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImpactMetrics) */
export type ComponentImpactMetricsInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** ComponentImpactMetrics    (contenedor de métricas)    Name: Component - Impact Metrics   API Identifier: componentImpactMetrics    Fields:   1. Internal Name (Short text, required)   2. metrics (References, multiple, required)      - Validation: Accept only "Component -   Metric"      - Settings: Allow multiple values (min:   2, max: 8) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImpactMetrics) */
export type ComponentImpactMetricsLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** ComponentImpactMetrics    (contenedor de métricas)    Name: Component - Impact Metrics   API Identifier: componentImpactMetrics    Fields:   1. Internal Name (Short text, required)   2. metrics (References, multiple, required)      - Validation: Accept only "Component -   Metric"      - Settings: Allow multiple values (min:   2, max: 8) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImpactMetrics) */
export type ComponentImpactMetricsMetricsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ComponentImpactMetricsMetricsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ComponentMetricFilter>;
};

export type ComponentImpactMetricsCollection = {
  __typename?: 'ComponentImpactMetricsCollection';
  items: Array<Maybe<ComponentImpactMetrics>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ComponentImpactMetricsFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentImpactMetricsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentImpactMetricsFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']>;
  internalName_contains?: InputMaybe<Scalars['String']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internalName_not?: InputMaybe<Scalars['String']>;
  internalName_not_contains?: InputMaybe<Scalars['String']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  metrics?: InputMaybe<CfComponentMetricNestedFilter>;
  metricsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
};

export type ComponentImpactMetricsLinkingCollections = {
  __typename?: 'ComponentImpactMetricsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentImpactMetricsLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export type ComponentImpactMetricsMetricsCollection = {
  __typename?: 'ComponentImpactMetricsMetricsCollection';
  items: Array<Maybe<ComponentMetric>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export enum ComponentImpactMetricsMetricsCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ComponentImpactMetricsOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** ComponentMetric (métrica    individual)    Name: Component - Metric   API Identifier: componentMetric    Fields:   1. Internal Name (Short text, required)   2. value (Short text, required)      - Help text: "The metric value (e.g.,   '200+', '2w → h', '0')"      - Validation: Max 20 characters   3. label (Short text, required)      - Help text: "Description of the metric   (e.g., 'Active users month 1')"      - Validation: Max 100 characters [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentMetric) */
export type ComponentMetric = Entry & _Node & {
  __typename?: 'ComponentMetric';
  _id: Scalars['ID'];
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<ComponentMetricLinkingCollections>;
  sys: Sys;
  value?: Maybe<Scalars['String']>;
};


/** ComponentMetric (métrica    individual)    Name: Component - Metric   API Identifier: componentMetric    Fields:   1. Internal Name (Short text, required)   2. value (Short text, required)      - Help text: "The metric value (e.g.,   '200+', '2w → h', '0')"      - Validation: Max 20 characters   3. label (Short text, required)      - Help text: "Description of the metric   (e.g., 'Active users month 1')"      - Validation: Max 100 characters [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentMetric) */
export type ComponentMetricInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** ComponentMetric (métrica    individual)    Name: Component - Metric   API Identifier: componentMetric    Fields:   1. Internal Name (Short text, required)   2. value (Short text, required)      - Help text: "The metric value (e.g.,   '200+', '2w → h', '0')"      - Validation: Max 20 characters   3. label (Short text, required)      - Help text: "Description of the metric   (e.g., 'Active users month 1')"      - Validation: Max 100 characters [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentMetric) */
export type ComponentMetricLabelArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** ComponentMetric (métrica    individual)    Name: Component - Metric   API Identifier: componentMetric    Fields:   1. Internal Name (Short text, required)   2. value (Short text, required)      - Help text: "The metric value (e.g.,   '200+', '2w → h', '0')"      - Validation: Max 20 characters   3. label (Short text, required)      - Help text: "Description of the metric   (e.g., 'Active users month 1')"      - Validation: Max 100 characters [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentMetric) */
export type ComponentMetricLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** ComponentMetric (métrica    individual)    Name: Component - Metric   API Identifier: componentMetric    Fields:   1. Internal Name (Short text, required)   2. value (Short text, required)      - Help text: "The metric value (e.g.,   '200+', '2w → h', '0')"      - Validation: Max 20 characters   3. label (Short text, required)      - Help text: "Description of the metric   (e.g., 'Active users month 1')"      - Validation: Max 100 characters [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentMetric) */
export type ComponentMetricValueArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type ComponentMetricCollection = {
  __typename?: 'ComponentMetricCollection';
  items: Array<Maybe<ComponentMetric>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ComponentMetricFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentMetricFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentMetricFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']>;
  internalName_contains?: InputMaybe<Scalars['String']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internalName_not?: InputMaybe<Scalars['String']>;
  internalName_not_contains?: InputMaybe<Scalars['String']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  label?: InputMaybe<Scalars['String']>;
  label_contains?: InputMaybe<Scalars['String']>;
  label_exists?: InputMaybe<Scalars['Boolean']>;
  label_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  label_not?: InputMaybe<Scalars['String']>;
  label_not_contains?: InputMaybe<Scalars['String']>;
  label_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  value?: InputMaybe<Scalars['String']>;
  value_contains?: InputMaybe<Scalars['String']>;
  value_exists?: InputMaybe<Scalars['Boolean']>;
  value_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  value_not?: InputMaybe<Scalars['String']>;
  value_not_contains?: InputMaybe<Scalars['String']>;
  value_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentMetricLinkingCollections = {
  __typename?: 'ComponentMetricLinkingCollections';
  componentImpactMetricsCollection?: Maybe<ComponentImpactMetricsCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentMetricLinkingCollectionsComponentImpactMetricsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ComponentMetricLinkingCollectionsComponentImpactMetricsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type ComponentMetricLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ComponentMetricLinkingCollectionsComponentImpactMetricsCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ComponentMetricOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** To describe an image used in rich text fields [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentRichImage) */
export type ComponentRichImage = Entry & _Node & {
  __typename?: 'ComponentRichImage';
  _id: Scalars['ID'];
  caption?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  fullWidth?: Maybe<Scalars['Boolean']>;
  image?: Maybe<Asset>;
  internalName?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<ComponentRichImageLinkingCollections>;
  sys: Sys;
};


/** To describe an image used in rich text fields [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentRichImage) */
export type ComponentRichImageCaptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To describe an image used in rich text fields [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentRichImage) */
export type ComponentRichImageFullWidthArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To describe an image used in rich text fields [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentRichImage) */
export type ComponentRichImageImageArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** To describe an image used in rich text fields [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentRichImage) */
export type ComponentRichImageInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To describe an image used in rich text fields [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentRichImage) */
export type ComponentRichImageLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentRichImageCollection = {
  __typename?: 'ComponentRichImageCollection';
  items: Array<Maybe<ComponentRichImage>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ComponentRichImageFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentRichImageFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentRichImageFilter>>>;
  caption?: InputMaybe<Scalars['String']>;
  caption_contains?: InputMaybe<Scalars['String']>;
  caption_exists?: InputMaybe<Scalars['Boolean']>;
  caption_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  caption_not?: InputMaybe<Scalars['String']>;
  caption_not_contains?: InputMaybe<Scalars['String']>;
  caption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  fullWidth?: InputMaybe<Scalars['Boolean']>;
  fullWidth_exists?: InputMaybe<Scalars['Boolean']>;
  fullWidth_not?: InputMaybe<Scalars['Boolean']>;
  image_exists?: InputMaybe<Scalars['Boolean']>;
  internalName?: InputMaybe<Scalars['String']>;
  internalName_contains?: InputMaybe<Scalars['String']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internalName_not?: InputMaybe<Scalars['String']>;
  internalName_not_contains?: InputMaybe<Scalars['String']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type ComponentRichImageLinkingCollections = {
  __typename?: 'ComponentRichImageLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentRichImageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ComponentRichImageOrder {
  CaptionAsc = 'caption_ASC',
  CaptionDesc = 'caption_DESC',
  FullWidthAsc = 'fullWidth_ASC',
  FullWidthDesc = 'fullWidth_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeo = Entry & _Node & {
  __typename?: 'ComponentSeo';
  _id: Scalars['ID'];
  canonicalUrl?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<ComponentSeoLinkingCollections>;
  nofollow?: Maybe<Scalars['Boolean']>;
  noindex?: Maybe<Scalars['Boolean']>;
  pageDescription?: Maybe<Scalars['String']>;
  pageTitle?: Maybe<Scalars['String']>;
  shareImagesCollection?: Maybe<AssetCollection>;
  sys: Sys;
};


/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeoCanonicalUrlArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeoInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeoLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeoNofollowArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeoNoindexArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeoPageDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeoPageTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeoShareImagesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export type ComponentSeoCollection = {
  __typename?: 'ComponentSeoCollection';
  items: Array<Maybe<ComponentSeo>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ComponentSeoFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentSeoFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentSeoFilter>>>;
  canonicalUrl?: InputMaybe<Scalars['String']>;
  canonicalUrl_contains?: InputMaybe<Scalars['String']>;
  canonicalUrl_exists?: InputMaybe<Scalars['Boolean']>;
  canonicalUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  canonicalUrl_not?: InputMaybe<Scalars['String']>;
  canonicalUrl_not_contains?: InputMaybe<Scalars['String']>;
  canonicalUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']>;
  internalName_contains?: InputMaybe<Scalars['String']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internalName_not?: InputMaybe<Scalars['String']>;
  internalName_not_contains?: InputMaybe<Scalars['String']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nofollow?: InputMaybe<Scalars['Boolean']>;
  nofollow_exists?: InputMaybe<Scalars['Boolean']>;
  nofollow_not?: InputMaybe<Scalars['Boolean']>;
  noindex?: InputMaybe<Scalars['Boolean']>;
  noindex_exists?: InputMaybe<Scalars['Boolean']>;
  noindex_not?: InputMaybe<Scalars['Boolean']>;
  pageDescription?: InputMaybe<Scalars['String']>;
  pageDescription_contains?: InputMaybe<Scalars['String']>;
  pageDescription_exists?: InputMaybe<Scalars['Boolean']>;
  pageDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageDescription_not?: InputMaybe<Scalars['String']>;
  pageDescription_not_contains?: InputMaybe<Scalars['String']>;
  pageDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageTitle?: InputMaybe<Scalars['String']>;
  pageTitle_contains?: InputMaybe<Scalars['String']>;
  pageTitle_exists?: InputMaybe<Scalars['Boolean']>;
  pageTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageTitle_not?: InputMaybe<Scalars['String']>;
  pageTitle_not_contains?: InputMaybe<Scalars['String']>;
  pageTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  shareImagesCollection_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
};

export type ComponentSeoLinkingCollections = {
  __typename?: 'ComponentSeoLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageBlogPostCollection?: Maybe<PageBlogPostCollection>;
  pageLandingCollection?: Maybe<PageLandingCollection>;
};


export type ComponentSeoLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type ComponentSeoLinkingCollectionsPageBlogPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ComponentSeoLinkingCollectionsPageBlogPostCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type ComponentSeoLinkingCollectionsPageLandingCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ComponentSeoLinkingCollectionsPageLandingCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ComponentSeoLinkingCollectionsPageBlogPostCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishedDateAsc = 'publishedDate_ASC',
  PublishedDateDesc = 'publishedDate_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum ComponentSeoLinkingCollectionsPageLandingCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ComponentSeoOrder {
  CanonicalUrlAsc = 'canonicalUrl_ASC',
  CanonicalUrlDesc = 'canonicalUrl_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  NofollowAsc = 'nofollow_ASC',
  NofollowDesc = 'nofollow_DESC',
  NoindexAsc = 'noindex_ASC',
  NoindexDesc = 'noindex_DESC',
  PageTitleAsc = 'pageTitle_ASC',
  PageTitleDesc = 'pageTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** ComponentTextImageSideBySide     - text: Rich Text     - image: Media     - imagePosition: Short text (left/right)     - imageSize: Short text (small/medium/large) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentTextImageSideBySide) */
export type ComponentTextImageSideBySide = Entry & _Node & {
  __typename?: 'ComponentTextImageSideBySide';
  _id: Scalars['ID'];
  contentfulMetadata: ContentfulMetadata;
  image?: Maybe<Asset>;
  imagePosition?: Maybe<Scalars['String']>;
  imageSize?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<ComponentTextImageSideBySideLinkingCollections>;
  sys: Sys;
  text?: Maybe<ComponentTextImageSideBySideText>;
};


/** ComponentTextImageSideBySide     - text: Rich Text     - image: Media     - imagePosition: Short text (left/right)     - imageSize: Short text (small/medium/large) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentTextImageSideBySide) */
export type ComponentTextImageSideBySideImageArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** ComponentTextImageSideBySide     - text: Rich Text     - image: Media     - imagePosition: Short text (left/right)     - imageSize: Short text (small/medium/large) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentTextImageSideBySide) */
export type ComponentTextImageSideBySideImagePositionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** ComponentTextImageSideBySide     - text: Rich Text     - image: Media     - imagePosition: Short text (left/right)     - imageSize: Short text (small/medium/large) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentTextImageSideBySide) */
export type ComponentTextImageSideBySideImageSizeArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** ComponentTextImageSideBySide     - text: Rich Text     - image: Media     - imagePosition: Short text (left/right)     - imageSize: Short text (small/medium/large) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentTextImageSideBySide) */
export type ComponentTextImageSideBySideLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** ComponentTextImageSideBySide     - text: Rich Text     - image: Media     - imagePosition: Short text (left/right)     - imageSize: Short text (small/medium/large) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentTextImageSideBySide) */
export type ComponentTextImageSideBySideTextArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type ComponentTextImageSideBySideCollection = {
  __typename?: 'ComponentTextImageSideBySideCollection';
  items: Array<Maybe<ComponentTextImageSideBySide>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ComponentTextImageSideBySideFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentTextImageSideBySideFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentTextImageSideBySideFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  imagePosition?: InputMaybe<Scalars['String']>;
  imagePosition_contains?: InputMaybe<Scalars['String']>;
  imagePosition_exists?: InputMaybe<Scalars['Boolean']>;
  imagePosition_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  imagePosition_not?: InputMaybe<Scalars['String']>;
  imagePosition_not_contains?: InputMaybe<Scalars['String']>;
  imagePosition_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  imageSize?: InputMaybe<Scalars['String']>;
  imageSize_contains?: InputMaybe<Scalars['String']>;
  imageSize_exists?: InputMaybe<Scalars['Boolean']>;
  imageSize_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  imageSize_not?: InputMaybe<Scalars['String']>;
  imageSize_not_contains?: InputMaybe<Scalars['String']>;
  imageSize_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  image_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  text_contains?: InputMaybe<Scalars['String']>;
  text_exists?: InputMaybe<Scalars['Boolean']>;
  text_not_contains?: InputMaybe<Scalars['String']>;
};

export type ComponentTextImageSideBySideLinkingCollections = {
  __typename?: 'ComponentTextImageSideBySideLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentTextImageSideBySideLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ComponentTextImageSideBySideOrder {
  ImagePositionAsc = 'imagePosition_ASC',
  ImagePositionDesc = 'imagePosition_DESC',
  ImageSizeAsc = 'imageSize_ASC',
  ImageSizeDesc = 'imageSize_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ComponentTextImageSideBySideText = {
  __typename?: 'ComponentTextImageSideBySideText';
  json: Scalars['JSON'];
  links: ComponentTextImageSideBySideTextLinks;
};

export type ComponentTextImageSideBySideTextAssets = {
  __typename?: 'ComponentTextImageSideBySideTextAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type ComponentTextImageSideBySideTextEntries = {
  __typename?: 'ComponentTextImageSideBySideTextEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type ComponentTextImageSideBySideTextLinks = {
  __typename?: 'ComponentTextImageSideBySideTextLinks';
  assets: ComponentTextImageSideBySideTextAssets;
  entries: ComponentTextImageSideBySideTextEntries;
  resources: ComponentTextImageSideBySideTextResources;
};

export type ComponentTextImageSideBySideTextResources = {
  __typename?: 'ComponentTextImageSideBySideTextResources';
  block: Array<ComponentTextImageSideBySideTextResourcesBlock>;
  hyperlink: Array<ComponentTextImageSideBySideTextResourcesHyperlink>;
  inline: Array<ComponentTextImageSideBySideTextResourcesInline>;
};

export type ComponentTextImageSideBySideTextResourcesBlock = ResourceLink & {
  __typename?: 'ComponentTextImageSideBySideTextResourcesBlock';
  sys: ResourceSys;
};

export type ComponentTextImageSideBySideTextResourcesHyperlink = ResourceLink & {
  __typename?: 'ComponentTextImageSideBySideTextResourcesHyperlink';
  sys: ResourceSys;
};

export type ComponentTextImageSideBySideTextResourcesInline = ResourceLink & {
  __typename?: 'ComponentTextImageSideBySideTextResourcesInline';
  sys: ResourceSys;
};

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  concepts: Array<Maybe<TaxonomyConcept>>;
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataConceptsDescendantsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ContentfulMetadataConceptsFilter = {
  descendants?: InputMaybe<ContentfulMetadataConceptsDescendantsFilter>;
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ContentfulMetadataFilter = {
  concepts?: InputMaybe<ContentfulMetadataConceptsFilter>;
  concepts_exists?: InputMaybe<Scalars['Boolean']>;
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *       Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageFormat {
  /** AVIF image format. */
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']>;
};

/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPost = Entry & _Node & {
  __typename?: 'PageBlogPost';
  _id: Scalars['ID'];
  author?: Maybe<Entry>;
  content?: Maybe<PageBlogPostContent>;
  contentfulMetadata: ContentfulMetadata;
  featuredImage?: Maybe<Asset>;
  internalName?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<PageBlogPostLinkingCollections>;
  publishedDate?: Maybe<Scalars['DateTime']>;
  relatedBlogPostsCollection?: Maybe<PageBlogPostRelatedBlogPostsCollection>;
  seoFields?: Maybe<ComponentSeo>;
  shortDescription?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostAuthorArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostContentArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostFeaturedImageArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostPublishedDateArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostRelatedBlogPostsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageBlogPostRelatedBlogPostsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageBlogPostFilter>;
};


/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostSeoFieldsArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ComponentSeoFilter>;
};


/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostShortDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostSlugArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type PageBlogPostCollection = {
  __typename?: 'PageBlogPostCollection';
  items: Array<Maybe<PageBlogPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type PageBlogPostContent = {
  __typename?: 'PageBlogPostContent';
  json: Scalars['JSON'];
  links: PageBlogPostContentLinks;
};

export type PageBlogPostContentAssets = {
  __typename?: 'PageBlogPostContentAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type PageBlogPostContentEntries = {
  __typename?: 'PageBlogPostContentEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type PageBlogPostContentLinks = {
  __typename?: 'PageBlogPostContentLinks';
  assets: PageBlogPostContentAssets;
  entries: PageBlogPostContentEntries;
  resources: PageBlogPostContentResources;
};

export type PageBlogPostContentResources = {
  __typename?: 'PageBlogPostContentResources';
  block: Array<PageBlogPostContentResourcesBlock>;
  hyperlink: Array<PageBlogPostContentResourcesHyperlink>;
  inline: Array<PageBlogPostContentResourcesInline>;
};

export type PageBlogPostContentResourcesBlock = ResourceLink & {
  __typename?: 'PageBlogPostContentResourcesBlock';
  sys: ResourceSys;
};

export type PageBlogPostContentResourcesHyperlink = ResourceLink & {
  __typename?: 'PageBlogPostContentResourcesHyperlink';
  sys: ResourceSys;
};

export type PageBlogPostContentResourcesInline = ResourceLink & {
  __typename?: 'PageBlogPostContentResourcesInline';
  sys: ResourceSys;
};

export type PageBlogPostFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageBlogPostFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageBlogPostFilter>>>;
  author_exists?: InputMaybe<Scalars['Boolean']>;
  content_contains?: InputMaybe<Scalars['String']>;
  content_exists?: InputMaybe<Scalars['Boolean']>;
  content_not_contains?: InputMaybe<Scalars['String']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  featuredImage_exists?: InputMaybe<Scalars['Boolean']>;
  internalName?: InputMaybe<Scalars['String']>;
  internalName_contains?: InputMaybe<Scalars['String']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internalName_not?: InputMaybe<Scalars['String']>;
  internalName_not_contains?: InputMaybe<Scalars['String']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  publishedDate?: InputMaybe<Scalars['DateTime']>;
  publishedDate_exists?: InputMaybe<Scalars['Boolean']>;
  publishedDate_gt?: InputMaybe<Scalars['DateTime']>;
  publishedDate_gte?: InputMaybe<Scalars['DateTime']>;
  publishedDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedDate_lt?: InputMaybe<Scalars['DateTime']>;
  publishedDate_lte?: InputMaybe<Scalars['DateTime']>;
  publishedDate_not?: InputMaybe<Scalars['DateTime']>;
  publishedDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  relatedBlogPosts?: InputMaybe<CfPageBlogPostNestedFilter>;
  relatedBlogPostsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  seoFields?: InputMaybe<CfComponentSeoNestedFilter>;
  seoFields_exists?: InputMaybe<Scalars['Boolean']>;
  shortDescription?: InputMaybe<Scalars['String']>;
  shortDescription_contains?: InputMaybe<Scalars['String']>;
  shortDescription_exists?: InputMaybe<Scalars['Boolean']>;
  shortDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  shortDescription_not?: InputMaybe<Scalars['String']>;
  shortDescription_not_contains?: InputMaybe<Scalars['String']>;
  shortDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PageBlogPostLinkingCollections = {
  __typename?: 'PageBlogPostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageBlogPostCollection?: Maybe<PageBlogPostCollection>;
};


export type PageBlogPostLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type PageBlogPostLinkingCollectionsPageBlogPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageBlogPostLinkingCollectionsPageBlogPostCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum PageBlogPostLinkingCollectionsPageBlogPostCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishedDateAsc = 'publishedDate_ASC',
  PublishedDateDesc = 'publishedDate_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum PageBlogPostOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishedDateAsc = 'publishedDate_ASC',
  PublishedDateDesc = 'publishedDate_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type PageBlogPostRelatedBlogPostsCollection = {
  __typename?: 'PageBlogPostRelatedBlogPostsCollection';
  items: Array<Maybe<PageBlogPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export enum PageBlogPostRelatedBlogPostsCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishedDateAsc = 'publishedDate_ASC',
  PublishedDateDesc = 'publishedDate_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** To have an entry point for the app (e.g. Homepage) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageLanding) */
export type PageLanding = Entry & _Node & {
  __typename?: 'PageLanding';
  _id: Scalars['ID'];
  contentfulMetadata: ContentfulMetadata;
  featuredBlogPost?: Maybe<Entry>;
  internalName?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<PageLandingLinkingCollections>;
  seoFields?: Maybe<ComponentSeo>;
  sys: Sys;
};


/** To have an entry point for the app (e.g. Homepage) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageLanding) */
export type PageLandingFeaturedBlogPostArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** To have an entry point for the app (e.g. Homepage) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageLanding) */
export type PageLandingInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To have an entry point for the app (e.g. Homepage) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageLanding) */
export type PageLandingLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** To have an entry point for the app (e.g. Homepage) [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageLanding) */
export type PageLandingSeoFieldsArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ComponentSeoFilter>;
};

export type PageLandingCollection = {
  __typename?: 'PageLandingCollection';
  items: Array<Maybe<PageLanding>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type PageLandingFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageLandingFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageLandingFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  featuredBlogPost_exists?: InputMaybe<Scalars['Boolean']>;
  internalName?: InputMaybe<Scalars['String']>;
  internalName_contains?: InputMaybe<Scalars['String']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internalName_not?: InputMaybe<Scalars['String']>;
  internalName_not_contains?: InputMaybe<Scalars['String']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  seoFields?: InputMaybe<CfComponentSeoNestedFilter>;
  seoFields_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
};

export type PageLandingLinkingCollections = {
  __typename?: 'PageLandingLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type PageLandingLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum PageLandingOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/projectDetails) */
export type ProjectDetails = Entry & _Node & {
  __typename?: 'ProjectDetails';
  _id: Scalars['ID'];
  company?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<ProjectDetailsLinkingCollections>;
  role?: Maybe<Scalars['String']>;
  sys: Sys;
  tools?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/projectDetails) */
export type ProjectDetailsCompanyArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/projectDetails) */
export type ProjectDetailsLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/projectDetails) */
export type ProjectDetailsRoleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/projectDetails) */
export type ProjectDetailsToolsArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type ProjectDetailsCollection = {
  __typename?: 'ProjectDetailsCollection';
  items: Array<Maybe<ProjectDetails>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ProjectDetailsFilter = {
  AND?: InputMaybe<Array<InputMaybe<ProjectDetailsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ProjectDetailsFilter>>>;
  company?: InputMaybe<Scalars['String']>;
  company_contains?: InputMaybe<Scalars['String']>;
  company_exists?: InputMaybe<Scalars['Boolean']>;
  company_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  company_not?: InputMaybe<Scalars['String']>;
  company_not_contains?: InputMaybe<Scalars['String']>;
  company_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  role?: InputMaybe<Scalars['String']>;
  role_contains?: InputMaybe<Scalars['String']>;
  role_exists?: InputMaybe<Scalars['Boolean']>;
  role_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  role_not?: InputMaybe<Scalars['String']>;
  role_not_contains?: InputMaybe<Scalars['String']>;
  role_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  tools?: InputMaybe<Scalars['String']>;
  tools_contains?: InputMaybe<Scalars['String']>;
  tools_exists?: InputMaybe<Scalars['Boolean']>;
  tools_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tools_not?: InputMaybe<Scalars['String']>;
  tools_not_contains?: InputMaybe<Scalars['String']>;
  tools_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ProjectDetailsLinkingCollections = {
  __typename?: 'ProjectDetailsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ProjectDetailsLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ProjectDetailsOrder {
  CompanyAsc = 'company_ASC',
  CompanyDesc = 'company_DESC',
  RoleAsc = 'role_ASC',
  RoleDesc = 'role_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  ToolsAsc = 'tools_ASC',
  ToolsDesc = 'tools_DESC'
}

export type Query = {
  __typename?: 'Query';
  _node?: Maybe<_Node>;
  _nodes: Array<Maybe<_Node>>;
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  componentAuthor?: Maybe<ComponentAuthor>;
  componentAuthorCollection?: Maybe<ComponentAuthorCollection>;
  componentCaptionedImage?: Maybe<ComponentCaptionedImage>;
  componentCaptionedImageCollection?: Maybe<ComponentCaptionedImageCollection>;
  componentFullWidthImage?: Maybe<ComponentFullWidthImage>;
  componentFullWidthImageCollection?: Maybe<ComponentFullWidthImageCollection>;
  componentImageGallery?: Maybe<ComponentImageGallery>;
  componentImageGalleryCollection?: Maybe<ComponentImageGalleryCollection>;
  componentImageGalleryWithCaptions?: Maybe<ComponentImageGalleryWithCaptions>;
  componentImageGalleryWithCaptionsCollection?: Maybe<ComponentImageGalleryWithCaptionsCollection>;
  componentImpactMetrics?: Maybe<ComponentImpactMetrics>;
  componentImpactMetricsCollection?: Maybe<ComponentImpactMetricsCollection>;
  componentMetric?: Maybe<ComponentMetric>;
  componentMetricCollection?: Maybe<ComponentMetricCollection>;
  componentRichImage?: Maybe<ComponentRichImage>;
  componentRichImageCollection?: Maybe<ComponentRichImageCollection>;
  componentSeo?: Maybe<ComponentSeo>;
  componentSeoCollection?: Maybe<ComponentSeoCollection>;
  componentTextImageSideBySide?: Maybe<ComponentTextImageSideBySide>;
  componentTextImageSideBySideCollection?: Maybe<ComponentTextImageSideBySideCollection>;
  entryCollection?: Maybe<EntryCollection>;
  pageBlogPost?: Maybe<PageBlogPost>;
  pageBlogPostCollection?: Maybe<PageBlogPostCollection>;
  pageLanding?: Maybe<PageLanding>;
  pageLandingCollection?: Maybe<PageLandingCollection>;
  projectDetails?: Maybe<ProjectDetails>;
  projectDetailsCollection?: Maybe<ProjectDetailsCollection>;
  tldrSummary?: Maybe<TldrSummary>;
  tldrSummaryCollection?: Maybe<TldrSummaryCollection>;
  urlLink?: Maybe<UrlLink>;
  urlLinkCollection?: Maybe<UrlLinkCollection>;
};


export type Query_NodeArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type Query_NodesArgs = {
  ids: Array<Scalars['ID']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryAssetArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryComponentAuthorArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryComponentAuthorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ComponentAuthorOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ComponentAuthorFilter>;
};


export type QueryComponentCaptionedImageArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryComponentCaptionedImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ComponentCaptionedImageOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ComponentCaptionedImageFilter>;
};


export type QueryComponentFullWidthImageArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryComponentFullWidthImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ComponentFullWidthImageOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ComponentFullWidthImageFilter>;
};


export type QueryComponentImageGalleryArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryComponentImageGalleryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ComponentImageGalleryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ComponentImageGalleryFilter>;
};


export type QueryComponentImageGalleryWithCaptionsArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryComponentImageGalleryWithCaptionsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ComponentImageGalleryWithCaptionsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ComponentImageGalleryWithCaptionsFilter>;
};


export type QueryComponentImpactMetricsArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryComponentImpactMetricsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ComponentImpactMetricsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ComponentImpactMetricsFilter>;
};


export type QueryComponentMetricArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryComponentMetricCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ComponentMetricOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ComponentMetricFilter>;
};


export type QueryComponentRichImageArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryComponentRichImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ComponentRichImageOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ComponentRichImageFilter>;
};


export type QueryComponentSeoArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryComponentSeoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ComponentSeoOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ComponentSeoFilter>;
};


export type QueryComponentTextImageSideBySideArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryComponentTextImageSideBySideCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ComponentTextImageSideBySideOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ComponentTextImageSideBySideFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryPageBlogPostArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryPageBlogPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageBlogPostOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageBlogPostFilter>;
};


export type QueryPageLandingArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryPageLandingCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageLandingOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageLandingFilter>;
};


export type QueryProjectDetailsArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryProjectDetailsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ProjectDetailsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectDetailsFilter>;
};


export type QueryTldrSummaryArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryTldrSummaryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<TldrSummaryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TldrSummaryFilter>;
};


export type QueryUrlLinkArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryUrlLinkCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<UrlLinkOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UrlLinkFilter>;
};

export type ResourceLink = {
  sys: ResourceSys;
};

export type ResourceSys = {
  __typename?: 'ResourceSys';
  linkType: Scalars['String'];
  urn: Scalars['String'];
};

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  /** The locale that was requested. */
  locale?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedVersion?: Maybe<Scalars['Int']>;
  spaceId: Scalars['String'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  id?: InputMaybe<Scalars['String']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_exists?: InputMaybe<Scalars['Boolean']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_not?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

/**
 * Represents a taxonomy concept entity for finding and organizing content easily.
 *         Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-concepts
 */
export type TaxonomyConcept = {
  __typename?: 'TaxonomyConcept';
  id?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/tldrSummary) */
export type TldrSummary = Entry & _Node & {
  __typename?: 'TldrSummary';
  _id: Scalars['ID'];
  contentfulMetadata: ContentfulMetadata;
  context?: Maybe<Scalars['String']>;
  goal?: Maybe<Scalars['String']>;
  impact?: Maybe<Array<Maybe<Scalars['String']>>>;
  linkedFrom?: Maybe<TldrSummaryLinkingCollections>;
  role?: Maybe<Scalars['String']>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/tldrSummary) */
export type TldrSummaryContextArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/tldrSummary) */
export type TldrSummaryGoalArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/tldrSummary) */
export type TldrSummaryImpactArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/tldrSummary) */
export type TldrSummaryLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/tldrSummary) */
export type TldrSummaryRoleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type TldrSummaryCollection = {
  __typename?: 'TldrSummaryCollection';
  items: Array<Maybe<TldrSummary>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type TldrSummaryFilter = {
  AND?: InputMaybe<Array<InputMaybe<TldrSummaryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TldrSummaryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  context?: InputMaybe<Scalars['String']>;
  context_contains?: InputMaybe<Scalars['String']>;
  context_exists?: InputMaybe<Scalars['Boolean']>;
  context_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  context_not?: InputMaybe<Scalars['String']>;
  context_not_contains?: InputMaybe<Scalars['String']>;
  context_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  goal?: InputMaybe<Scalars['String']>;
  goal_contains?: InputMaybe<Scalars['String']>;
  goal_exists?: InputMaybe<Scalars['Boolean']>;
  goal_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  goal_not?: InputMaybe<Scalars['String']>;
  goal_not_contains?: InputMaybe<Scalars['String']>;
  goal_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  impact_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  impact_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  impact_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  impact_exists?: InputMaybe<Scalars['Boolean']>;
  role?: InputMaybe<Scalars['String']>;
  role_contains?: InputMaybe<Scalars['String']>;
  role_exists?: InputMaybe<Scalars['Boolean']>;
  role_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  role_not?: InputMaybe<Scalars['String']>;
  role_not_contains?: InputMaybe<Scalars['String']>;
  role_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type TldrSummaryLinkingCollections = {
  __typename?: 'TldrSummaryLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type TldrSummaryLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum TldrSummaryOrder {
  GoalAsc = 'goal_ASC',
  GoalDesc = 'goal_DESC',
  RoleAsc = 'role_ASC',
  RoleDesc = 'role_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** To link to another website demo [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/url-link) */
export type UrlLink = Entry & _Node & {
  __typename?: 'UrlLink';
  _id: Scalars['ID'];
  contentfulMetadata: ContentfulMetadata;
  featuredImage?: Maybe<Asset>;
  linkedFrom?: Maybe<UrlLinkLinkingCollections>;
  publishDate?: Maybe<Scalars['DateTime']>;
  slug?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** To link to another website demo [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/url-link) */
export type UrlLinkFeaturedImageArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** To link to another website demo [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/url-link) */
export type UrlLinkLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** To link to another website demo [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/url-link) */
export type UrlLinkPublishDateArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To link to another website demo [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/url-link) */
export type UrlLinkSlugArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To link to another website demo [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/url-link) */
export type UrlLinkSubtitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** To link to another website demo [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/url-link) */
export type UrlLinkTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type UrlLinkCollection = {
  __typename?: 'UrlLinkCollection';
  items: Array<Maybe<UrlLink>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type UrlLinkFilter = {
  AND?: InputMaybe<Array<InputMaybe<UrlLinkFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<UrlLinkFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  featuredImage_exists?: InputMaybe<Scalars['Boolean']>;
  publishDate?: InputMaybe<Scalars['DateTime']>;
  publishDate_exists?: InputMaybe<Scalars['Boolean']>;
  publishDate_gt?: InputMaybe<Scalars['DateTime']>;
  publishDate_gte?: InputMaybe<Scalars['DateTime']>;
  publishDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishDate_lt?: InputMaybe<Scalars['DateTime']>;
  publishDate_lte?: InputMaybe<Scalars['DateTime']>;
  publishDate_not?: InputMaybe<Scalars['DateTime']>;
  publishDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  subtitle?: InputMaybe<Scalars['String']>;
  subtitle_contains?: InputMaybe<Scalars['String']>;
  subtitle_exists?: InputMaybe<Scalars['Boolean']>;
  subtitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  subtitle_not?: InputMaybe<Scalars['String']>;
  subtitle_not_contains?: InputMaybe<Scalars['String']>;
  subtitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UrlLinkLinkingCollections = {
  __typename?: 'UrlLinkLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type UrlLinkLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum UrlLinkOrder {
  PublishDateAsc = 'publishDate_ASC',
  PublishDateDesc = 'publishDate_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type _Node = {
  _id: Scalars['ID'];
};

export type CfComponentCaptionedImageNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfComponentCaptionedImageNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfComponentCaptionedImageNestedFilter>>>;
  caption_contains?: InputMaybe<Scalars['String']>;
  caption_exists?: InputMaybe<Scalars['Boolean']>;
  caption_not_contains?: InputMaybe<Scalars['String']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  image_exists?: InputMaybe<Scalars['Boolean']>;
  internalName?: InputMaybe<Scalars['String']>;
  internalName_contains?: InputMaybe<Scalars['String']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internalName_not?: InputMaybe<Scalars['String']>;
  internalName_not_contains?: InputMaybe<Scalars['String']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CfComponentMetricNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfComponentMetricNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfComponentMetricNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']>;
  internalName_contains?: InputMaybe<Scalars['String']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internalName_not?: InputMaybe<Scalars['String']>;
  internalName_not_contains?: InputMaybe<Scalars['String']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  label?: InputMaybe<Scalars['String']>;
  label_contains?: InputMaybe<Scalars['String']>;
  label_exists?: InputMaybe<Scalars['Boolean']>;
  label_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  label_not?: InputMaybe<Scalars['String']>;
  label_not_contains?: InputMaybe<Scalars['String']>;
  label_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  value?: InputMaybe<Scalars['String']>;
  value_contains?: InputMaybe<Scalars['String']>;
  value_exists?: InputMaybe<Scalars['Boolean']>;
  value_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  value_not?: InputMaybe<Scalars['String']>;
  value_not_contains?: InputMaybe<Scalars['String']>;
  value_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CfComponentSeoNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfComponentSeoNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfComponentSeoNestedFilter>>>;
  canonicalUrl?: InputMaybe<Scalars['String']>;
  canonicalUrl_contains?: InputMaybe<Scalars['String']>;
  canonicalUrl_exists?: InputMaybe<Scalars['Boolean']>;
  canonicalUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  canonicalUrl_not?: InputMaybe<Scalars['String']>;
  canonicalUrl_not_contains?: InputMaybe<Scalars['String']>;
  canonicalUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']>;
  internalName_contains?: InputMaybe<Scalars['String']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internalName_not?: InputMaybe<Scalars['String']>;
  internalName_not_contains?: InputMaybe<Scalars['String']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nofollow?: InputMaybe<Scalars['Boolean']>;
  nofollow_exists?: InputMaybe<Scalars['Boolean']>;
  nofollow_not?: InputMaybe<Scalars['Boolean']>;
  noindex?: InputMaybe<Scalars['Boolean']>;
  noindex_exists?: InputMaybe<Scalars['Boolean']>;
  noindex_not?: InputMaybe<Scalars['Boolean']>;
  pageDescription?: InputMaybe<Scalars['String']>;
  pageDescription_contains?: InputMaybe<Scalars['String']>;
  pageDescription_exists?: InputMaybe<Scalars['Boolean']>;
  pageDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageDescription_not?: InputMaybe<Scalars['String']>;
  pageDescription_not_contains?: InputMaybe<Scalars['String']>;
  pageDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageTitle?: InputMaybe<Scalars['String']>;
  pageTitle_contains?: InputMaybe<Scalars['String']>;
  pageTitle_exists?: InputMaybe<Scalars['Boolean']>;
  pageTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageTitle_not?: InputMaybe<Scalars['String']>;
  pageTitle_not_contains?: InputMaybe<Scalars['String']>;
  pageTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  shareImagesCollection_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
};

export type CfPageBlogPostNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfPageBlogPostNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfPageBlogPostNestedFilter>>>;
  author_exists?: InputMaybe<Scalars['Boolean']>;
  content_contains?: InputMaybe<Scalars['String']>;
  content_exists?: InputMaybe<Scalars['Boolean']>;
  content_not_contains?: InputMaybe<Scalars['String']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  featuredImage_exists?: InputMaybe<Scalars['Boolean']>;
  internalName?: InputMaybe<Scalars['String']>;
  internalName_contains?: InputMaybe<Scalars['String']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internalName_not?: InputMaybe<Scalars['String']>;
  internalName_not_contains?: InputMaybe<Scalars['String']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  publishedDate?: InputMaybe<Scalars['DateTime']>;
  publishedDate_exists?: InputMaybe<Scalars['Boolean']>;
  publishedDate_gt?: InputMaybe<Scalars['DateTime']>;
  publishedDate_gte?: InputMaybe<Scalars['DateTime']>;
  publishedDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedDate_lt?: InputMaybe<Scalars['DateTime']>;
  publishedDate_lte?: InputMaybe<Scalars['DateTime']>;
  publishedDate_not?: InputMaybe<Scalars['DateTime']>;
  publishedDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  relatedBlogPostsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  seoFields_exists?: InputMaybe<Scalars['Boolean']>;
  shortDescription?: InputMaybe<Scalars['String']>;
  shortDescription_contains?: InputMaybe<Scalars['String']>;
  shortDescription_exists?: InputMaybe<Scalars['Boolean']>;
  shortDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  shortDescription_not?: InputMaybe<Scalars['String']>;
  shortDescription_not_contains?: InputMaybe<Scalars['String']>;
  shortDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type AuthorFieldsFragment = { __typename: 'ComponentAuthor', name?: string | null, sys: { __typename?: 'Sys', id: string }, avatar?: (
    { __typename?: 'Asset' }
    & ImageFieldsFragment
  ) | null };

export type ImageFieldsFragment = { __typename: 'Asset', title?: string | null, description?: string | null, width?: number | null, height?: number | null, url?: string | null, contentType?: string | null, sys: { __typename?: 'Sys', id: string } };

export type ReferencePageBlogPostFieldsFragment = { __typename: 'PageBlogPost', slug?: string | null, publishedDate?: any | null, title?: string | null, shortDescription?: string | null, sys: { __typename?: 'Sys', id: string, spaceId: string }, author?: (
    { __typename?: 'ComponentAuthor' }
    & AuthorFieldsFragment
  ) | { __typename?: 'ComponentCaptionedImage' } | { __typename?: 'ComponentFullWidthImage' } | { __typename?: 'ComponentImageGallery' } | { __typename?: 'ComponentImageGalleryWithCaptions' } | { __typename?: 'ComponentImpactMetrics' } | { __typename?: 'ComponentMetric' } | { __typename?: 'ComponentRichImage' } | { __typename?: 'ComponentSeo' } | { __typename?: 'ComponentTextImageSideBySide' } | { __typename?: 'PageBlogPost' } | { __typename?: 'PageLanding' } | { __typename?: 'ProjectDetails' } | { __typename?: 'TldrSummary' } | { __typename?: 'UrlLink' } | null, featuredImage?: (
    { __typename?: 'Asset' }
    & ImageFieldsFragment
  ) | null };

export type ComponentTextImageSideBySideFragment = { __typename: 'ComponentTextImageSideBySide', imagePosition?: string | null, sys: { __typename?: 'Sys', id: string }, text?: { __typename?: 'ComponentTextImageSideBySideText', json: any } | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null };

export type ComponentImageGalleryFragment = { __typename: 'ComponentImageGallery', columns?: number | null, caption?: string | null, sys: { __typename?: 'Sys', id: string }, imagesCollection?: { __typename?: 'AssetCollection', items: Array<{ __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null> } | null };

export type ComponentFullWidthImageFragment = { __typename: 'ComponentFullWidthImage', caption?: string | null, maxWidth?: string | null, sys: { __typename?: 'Sys', id: string }, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null };

export type ComponentCaptionedImageFragment = { __typename: 'ComponentCaptionedImage', title?: string | null, sys: { __typename?: 'Sys', id: string }, caption?: { __typename?: 'ComponentCaptionedImageCaption', json: any } | null, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null } | null };

export type ComponentImageGalleryWithCaptionsFragment = { __typename: 'ComponentImageGalleryWithCaptions', columns?: number | null, sys: { __typename?: 'Sys', id: string }, itemsCollection?: { __typename?: 'ComponentImageGalleryWithCaptionsItemsCollection', items: Array<(
      { __typename?: 'ComponentCaptionedImage' }
      & ComponentCaptionedImageFragment
    ) | null> } | null };

export type ComponentMetricFragment = { __typename: 'ComponentMetric', value?: string | null, label?: string | null, sys: { __typename?: 'Sys', id: string } };

export type ComponentImpactMetricsFragment = { __typename: 'ComponentImpactMetrics', sys: { __typename?: 'Sys', id: string }, metricsCollection?: { __typename?: 'ComponentImpactMetricsMetricsCollection', items: Array<(
      { __typename?: 'ComponentMetric' }
      & ComponentMetricFragment
    ) | null> } | null };

export type PageBlogPostFieldsFragment = { __typename: 'PageBlogPost', internalName?: string | null, slug?: string | null, publishedDate?: any | null, title?: string | null, shortDescription?: string | null, sys: { __typename?: 'Sys', id: string, spaceId: string }, seoFields?: (
    { __typename?: 'ComponentSeo' }
    & SeoFieldsFragment
  ) | null, author?: (
    { __typename?: 'ComponentAuthor' }
    & AuthorFieldsFragment
  ) | { __typename?: 'ComponentCaptionedImage' } | { __typename?: 'ComponentFullWidthImage' } | { __typename?: 'ComponentImageGallery' } | { __typename?: 'ComponentImageGalleryWithCaptions' } | { __typename?: 'ComponentImpactMetrics' } | { __typename?: 'ComponentMetric' } | { __typename?: 'ComponentRichImage' } | { __typename?: 'ComponentSeo' } | { __typename?: 'ComponentTextImageSideBySide' } | { __typename?: 'PageBlogPost' } | { __typename?: 'PageLanding' } | { __typename?: 'ProjectDetails' } | { __typename?: 'TldrSummary' } | { __typename?: 'UrlLink' } | null, featuredImage?: (
    { __typename?: 'Asset' }
    & ImageFieldsFragment
  ) | null, content?: { __typename?: 'PageBlogPostContent', json: any, links: { __typename?: 'PageBlogPostContentLinks', entries: { __typename?: 'PageBlogPostContentEntries', block: Array<{ __typename?: 'ComponentAuthor' } | { __typename?: 'ComponentCaptionedImage' } | (
          { __typename?: 'ComponentFullWidthImage' }
          & ComponentFullWidthImageFragment
        ) | (
          { __typename?: 'ComponentImageGallery' }
          & ComponentImageGalleryFragment
        ) | (
          { __typename?: 'ComponentImageGalleryWithCaptions' }
          & ComponentImageGalleryWithCaptionsFragment
        ) | (
          { __typename?: 'ComponentImpactMetrics' }
          & ComponentImpactMetricsFragment
        ) | { __typename?: 'ComponentMetric' } | (
          { __typename?: 'ComponentRichImage' }
          & RichImageFieldsFragment
        ) | { __typename?: 'ComponentSeo' } | (
          { __typename?: 'ComponentTextImageSideBySide' }
          & ComponentTextImageSideBySideFragment
        ) | { __typename?: 'PageBlogPost' } | { __typename?: 'PageLanding' } | { __typename?: 'ProjectDetails' } | { __typename?: 'TldrSummary' } | { __typename?: 'UrlLink' } | null> } } } | null, relatedBlogPostsCollection?: { __typename?: 'PageBlogPostRelatedBlogPostsCollection', items: Array<(
      { __typename?: 'PageBlogPost' }
      & ReferencePageBlogPostFieldsFragment
    ) | null> } | null, contentfulMetadata: { __typename?: 'ContentfulMetadata', tags: Array<{ __typename?: 'ContentfulTag', id?: string | null, name?: string | null } | null> } };

export type PageBlogPostQueryVariables = Exact<{
  slug: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}>;


export type PageBlogPostQuery = { __typename?: 'Query', pageBlogPostCollection?: { __typename?: 'PageBlogPostCollection', items: Array<(
      { __typename?: 'PageBlogPost' }
      & PageBlogPostFieldsFragment
    ) | null> } | null };

export type PageBlogPostCollectionQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<InputMaybe<PageBlogPostOrder>> | InputMaybe<PageBlogPostOrder>>;
  where?: InputMaybe<PageBlogPostFilter>;
}>;


export type PageBlogPostCollectionQuery = { __typename?: 'Query', pageBlogPostCollection?: { __typename?: 'PageBlogPostCollection', items: Array<(
      { __typename?: 'PageBlogPost' }
      & PageBlogPostFieldsFragment
    ) | null> } | null };

export type PageLandingFieldsFragment = { __typename: 'PageLanding', internalName?: string | null, sys: { __typename?: 'Sys', id: string, spaceId: string }, seoFields?: (
    { __typename?: 'ComponentSeo' }
    & SeoFieldsFragment
  ) | null, featuredBlogPost?: { __typename?: 'ComponentAuthor' } | { __typename?: 'ComponentCaptionedImage' } | { __typename?: 'ComponentFullWidthImage' } | { __typename?: 'ComponentImageGallery' } | { __typename?: 'ComponentImageGalleryWithCaptions' } | { __typename?: 'ComponentImpactMetrics' } | { __typename?: 'ComponentMetric' } | { __typename?: 'ComponentRichImage' } | { __typename?: 'ComponentSeo' } | { __typename?: 'ComponentTextImageSideBySide' } | (
    { __typename?: 'PageBlogPost' }
    & ReferencePageBlogPostFieldsFragment
  ) | { __typename?: 'PageLanding' } | { __typename?: 'ProjectDetails' } | { __typename?: 'TldrSummary' } | { __typename?: 'UrlLink' } | null };

export type PageLandingQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}>;


export type PageLandingQuery = { __typename?: 'Query', pageLandingCollection?: { __typename?: 'PageLandingCollection', items: Array<(
      { __typename?: 'PageLanding' }
      & PageLandingFieldsFragment
    ) | null> } | null };

export type PageLandingCollectionQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}>;


export type PageLandingCollectionQuery = { __typename?: 'Query', pageLandingCollection?: { __typename?: 'PageLandingCollection', items: Array<(
      { __typename?: 'PageLanding' }
      & PageLandingFieldsFragment
    ) | null> } | null };

export type RichImageFieldsFragment = { __typename: 'ComponentRichImage', internalName?: string | null, caption?: string | null, fullWidth?: boolean | null, sys: { __typename?: 'Sys', id: string }, image?: (
    { __typename?: 'Asset' }
    & ImageFieldsFragment
  ) | null };

export type SeoFieldsFragment = { __typename: 'ComponentSeo', pageTitle?: string | null, pageDescription?: string | null, canonicalUrl?: string | null, nofollow?: boolean | null, noindex?: boolean | null, shareImagesCollection?: { __typename?: 'AssetCollection', items: Array<(
      { __typename?: 'Asset' }
      & ImageFieldsFragment
    ) | null> } | null };

export type SitemapPagesFieldsFragment = { __typename?: 'Query', pageBlogPostCollection?: { __typename?: 'PageBlogPostCollection', items: Array<{ __typename?: 'PageBlogPost', slug?: string | null, sys: { __typename?: 'Sys', publishedAt?: any | null } } | null> } | null, pageLandingCollection?: { __typename?: 'PageLandingCollection', items: Array<{ __typename?: 'PageLanding', sys: { __typename?: 'Sys', publishedAt?: any | null } } | null> } | null };

export type SitemapPagesQueryVariables = Exact<{
  locale: Scalars['String'];
}>;


export type SitemapPagesQuery = (
  { __typename?: 'Query' }
  & SitemapPagesFieldsFragment
);

export const ImageFieldsFragmentDoc = gql`
    fragment ImageFields on Asset {
  __typename
  sys {
    id
  }
  title
  description
  width
  height
  url
  contentType
}
    `;
export const SeoFieldsFragmentDoc = gql`
    fragment SeoFields on ComponentSeo {
  __typename
  pageTitle
  pageDescription
  canonicalUrl
  nofollow
  noindex
  shareImagesCollection(limit: 3, locale: $locale) {
    items {
      ...ImageFields
    }
  }
}
    `;
export const AuthorFieldsFragmentDoc = gql`
    fragment AuthorFields on ComponentAuthor {
  __typename
  sys {
    id
  }
  name
  avatar {
    ...ImageFields
  }
}
    `;
export const RichImageFieldsFragmentDoc = gql`
    fragment RichImageFields on ComponentRichImage {
  __typename
  internalName
  sys {
    id
  }
  image {
    ...ImageFields
  }
  caption
  fullWidth
}
    `;
export const ComponentTextImageSideBySideFragmentDoc = gql`
    fragment ComponentTextImageSideBySide on ComponentTextImageSideBySide {
  sys {
    id
  }
  __typename
  imagePosition
  text {
    json
  }
  image {
    url
    title
    width
    height
  }
}
    `;
export const ComponentImageGalleryFragmentDoc = gql`
    fragment ComponentImageGallery on ComponentImageGallery {
  sys {
    id
  }
  __typename
  columns
  caption
  imagesCollection(limit: 6) {
    items {
      url
      title
      width
      height
    }
  }
}
    `;
export const ComponentCaptionedImageFragmentDoc = gql`
    fragment ComponentCaptionedImage on ComponentCaptionedImage {
  sys {
    id
  }
  __typename
  title
  caption {
    json
  }
  image {
    url
    title
    width
    height
  }
}
    `;
export const ComponentImageGalleryWithCaptionsFragmentDoc = gql`
    fragment ComponentImageGalleryWithCaptions on ComponentImageGalleryWithCaptions {
  sys {
    id
  }
  __typename
  columns
  itemsCollection(limit: 6) {
    items {
      ...ComponentCaptionedImage
    }
  }
}
    `;
export const ComponentFullWidthImageFragmentDoc = gql`
    fragment ComponentFullWidthImage on ComponentFullWidthImage {
  sys {
    id
  }
  __typename
  caption
  maxWidth
  image {
    url
    title
    width
    height
  }
}
    `;
export const ComponentMetricFragmentDoc = gql`
    fragment ComponentMetric on ComponentMetric {
  sys {
    id
  }
  __typename
  value
  label
}
    `;
export const ComponentImpactMetricsFragmentDoc = gql`
    fragment ComponentImpactMetrics on ComponentImpactMetrics {
  sys {
    id
  }
  __typename
  metricsCollection(limit: 8) {
    items {
      ...ComponentMetric
    }
  }
}
    `;
export const ReferencePageBlogPostFieldsFragmentDoc = gql`
    fragment ReferencePageBlogPostFields on PageBlogPost {
  __typename
  sys {
    id
    spaceId
  }
  slug
  author {
    ...AuthorFields
  }
  publishedDate
  title
  shortDescription
  featuredImage {
    ...ImageFields
  }
}
    `;
export const PageBlogPostFieldsFragmentDoc = gql`
    fragment PageBlogPostFields on PageBlogPost {
  __typename
  sys {
    id
    spaceId
  }
  internalName
  seoFields {
    ...SeoFields
  }
  slug
  author {
    ...AuthorFields
  }
  publishedDate
  title
  shortDescription
  featuredImage {
    ...ImageFields
  }
  content {
    json
    links {
      entries {
        block {
          ...RichImageFields
          ...ComponentTextImageSideBySide
          ...ComponentImageGallery
          ...ComponentImageGalleryWithCaptions
          ...ComponentFullWidthImage
          ...ComponentImpactMetrics
        }
      }
    }
  }
  relatedBlogPostsCollection(limit: 2) {
    items {
      ...ReferencePageBlogPostFields
    }
  }
  contentfulMetadata {
    tags {
      id
      name
    }
  }
}
    `;
export const PageLandingFieldsFragmentDoc = gql`
    fragment PageLandingFields on PageLanding {
  __typename
  sys {
    id
    spaceId
  }
  internalName
  seoFields {
    ...SeoFields
  }
  featuredBlogPost {
    ...ReferencePageBlogPostFields
  }
}
    `;
export const SitemapPagesFieldsFragmentDoc = gql`
    fragment sitemapPagesFields on Query {
  pageBlogPostCollection(limit: 100, locale: $locale) {
    items {
      slug
      sys {
        publishedAt
      }
    }
  }
  pageLandingCollection(limit: 1, locale: $locale) {
    items {
      sys {
        publishedAt
      }
    }
  }
}
    `;
export const PageBlogPostDocument = gql`
    query pageBlogPost($slug: String!, $locale: String, $preview: Boolean) {
  pageBlogPostCollection(
    limit: 1
    where: {slug: $slug}
    locale: $locale
    preview: $preview
  ) {
    items {
      ...PageBlogPostFields
    }
  }
}
    ${PageBlogPostFieldsFragmentDoc}
${SeoFieldsFragmentDoc}
${ImageFieldsFragmentDoc}
${AuthorFieldsFragmentDoc}
${RichImageFieldsFragmentDoc}
${ComponentTextImageSideBySideFragmentDoc}
${ComponentImageGalleryFragmentDoc}
${ComponentImageGalleryWithCaptionsFragmentDoc}
${ComponentCaptionedImageFragmentDoc}
${ComponentFullWidthImageFragmentDoc}
${ComponentImpactMetricsFragmentDoc}
${ComponentMetricFragmentDoc}
${ReferencePageBlogPostFieldsFragmentDoc}`;
export const PageBlogPostCollectionDocument = gql`
    query pageBlogPostCollection($locale: String, $preview: Boolean, $limit: Int, $order: [PageBlogPostOrder], $where: PageBlogPostFilter) {
  pageBlogPostCollection(
    limit: $limit
    locale: $locale
    preview: $preview
    order: $order
    where: $where
  ) {
    items {
      ...PageBlogPostFields
    }
  }
}
    ${PageBlogPostFieldsFragmentDoc}
${SeoFieldsFragmentDoc}
${ImageFieldsFragmentDoc}
${AuthorFieldsFragmentDoc}
${RichImageFieldsFragmentDoc}
${ComponentTextImageSideBySideFragmentDoc}
${ComponentImageGalleryFragmentDoc}
${ComponentImageGalleryWithCaptionsFragmentDoc}
${ComponentCaptionedImageFragmentDoc}
${ComponentFullWidthImageFragmentDoc}
${ComponentImpactMetricsFragmentDoc}
${ComponentMetricFragmentDoc}
${ReferencePageBlogPostFieldsFragmentDoc}`;
export const PageLandingDocument = gql`
    query pageLanding($locale: String, $preview: Boolean) {
  pageLandingCollection(limit: 1, locale: $locale, preview: $preview) {
    items {
      ...PageLandingFields
    }
  }
}
    ${PageLandingFieldsFragmentDoc}
${SeoFieldsFragmentDoc}
${ImageFieldsFragmentDoc}
${ReferencePageBlogPostFieldsFragmentDoc}
${AuthorFieldsFragmentDoc}`;
export const PageLandingCollectionDocument = gql`
    query pageLandingCollection($locale: String, $preview: Boolean) {
  pageLandingCollection(limit: 100, locale: $locale, preview: $preview) {
    items {
      ...PageLandingFields
    }
  }
}
    ${PageLandingFieldsFragmentDoc}
${SeoFieldsFragmentDoc}
${ImageFieldsFragmentDoc}
${ReferencePageBlogPostFieldsFragmentDoc}
${AuthorFieldsFragmentDoc}`;
export const SitemapPagesDocument = gql`
    query sitemapPages($locale: String!) {
  ...sitemapPagesFields
}
    ${SitemapPagesFieldsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    pageBlogPost(variables: PageBlogPostQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PageBlogPostQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PageBlogPostQuery>(PageBlogPostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'pageBlogPost', 'query');
    },
    pageBlogPostCollection(variables?: PageBlogPostCollectionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PageBlogPostCollectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PageBlogPostCollectionQuery>(PageBlogPostCollectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'pageBlogPostCollection', 'query');
    },
    pageLanding(variables?: PageLandingQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PageLandingQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PageLandingQuery>(PageLandingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'pageLanding', 'query');
    },
    pageLandingCollection(variables?: PageLandingCollectionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PageLandingCollectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PageLandingCollectionQuery>(PageLandingCollectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'pageLandingCollection', 'query');
    },
    sitemapPages(variables: SitemapPagesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SitemapPagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SitemapPagesQuery>(SitemapPagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sitemapPages', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;