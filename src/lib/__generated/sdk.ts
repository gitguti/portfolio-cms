import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Dimension: { input: any; output: any; }
  HexColor: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Quality: { input: any; output: any; }
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  transform?: InputMaybe<ImageTransformOptions>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  contentType_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentType_not?: InputMaybe<Scalars['String']['input']>;
  contentType_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileName_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName_not?: InputMaybe<Scalars['String']['input']>;
  fileName_not_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  height?: InputMaybe<Scalars['Int']['input']>;
  height_exists?: InputMaybe<Scalars['Boolean']['input']>;
  height_gt?: InputMaybe<Scalars['Int']['input']>;
  height_gte?: InputMaybe<Scalars['Int']['input']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  height_lt?: InputMaybe<Scalars['Int']['input']>;
  height_lte?: InputMaybe<Scalars['Int']['input']>;
  height_not?: InputMaybe<Scalars['Int']['input']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size?: InputMaybe<Scalars['Int']['input']>;
  size_exists?: InputMaybe<Scalars['Boolean']['input']>;
  size_gt?: InputMaybe<Scalars['Int']['input']>;
  size_gte?: InputMaybe<Scalars['Int']['input']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size_lt?: InputMaybe<Scalars['Int']['input']>;
  size_lte?: InputMaybe<Scalars['Int']['input']>;
  size_not?: InputMaybe<Scalars['Int']['input']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  width?: InputMaybe<Scalars['Int']['input']>;
  width_exists?: InputMaybe<Scalars['Boolean']['input']>;
  width_gt?: InputMaybe<Scalars['Int']['input']>;
  width_gte?: InputMaybe<Scalars['Int']['input']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  width_lt?: InputMaybe<Scalars['Int']['input']>;
  width_lte?: InputMaybe<Scalars['Int']['input']>;
  width_not?: InputMaybe<Scalars['Int']['input']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
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
  hackathonCollection?: Maybe<HackathonCollection>;
  pageBlogPostCollection?: Maybe<PageBlogPostCollection>;
  teamMemberCollection?: Maybe<TeamMemberCollection>;
  urlLinkCollection?: Maybe<UrlLinkCollection>;
};


export type AssetLinkingCollectionsComponentAuthorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsComponentCaptionedImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsComponentFullWidthImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsComponentImageGalleryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsComponentRichImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsComponentSeoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsComponentTextImageSideBySideCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsHackathonCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsPageBlogPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsTeamMemberCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsUrlLinkCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
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

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentAuthor) */
export type ComponentAuthor = Entry & _Node & {
  __typename?: 'ComponentAuthor';
  _id: Scalars['ID']['output'];
  avatar?: Maybe<Asset>;
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ComponentAuthorLinkingCollections>;
  name?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentAuthor) */
export type ComponentAuthorAvatarArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentAuthor) */
export type ComponentAuthorInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentAuthor) */
export type ComponentAuthorLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentAuthor) */
export type ComponentAuthorNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ComponentAuthorCollection = {
  __typename?: 'ComponentAuthorCollection';
  items: Array<Maybe<ComponentAuthor>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ComponentAuthorFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentAuthorFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentAuthorFilter>>>;
  avatar_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type ComponentAuthorLinkingCollections = {
  __typename?: 'ComponentAuthorLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentAuthorLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
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

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentCaptionedImage) */
export type ComponentCaptionedImage = Entry & _Node & {
  __typename?: 'ComponentCaptionedImage';
  _id: Scalars['ID']['output'];
  caption?: Maybe<ComponentCaptionedImageCaption>;
  contentfulMetadata: ContentfulMetadata;
  image?: Maybe<Asset>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ComponentCaptionedImageLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentCaptionedImage) */
export type ComponentCaptionedImageCaptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentCaptionedImage) */
export type ComponentCaptionedImageImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentCaptionedImage) */
export type ComponentCaptionedImageInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentCaptionedImage) */
export type ComponentCaptionedImageLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentCaptionedImage) */
export type ComponentCaptionedImageTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ComponentCaptionedImageCaption = {
  __typename?: 'ComponentCaptionedImageCaption';
  json: Scalars['JSON']['output'];
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
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ComponentCaptionedImageFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentCaptionedImageFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentCaptionedImageFilter>>>;
  caption_contains?: InputMaybe<Scalars['String']['input']>;
  caption_exists?: InputMaybe<Scalars['Boolean']['input']>;
  caption_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentCaptionedImageLinkingCollections = {
  __typename?: 'ComponentCaptionedImageLinkingCollections';
  componentImageGalleryWithCaptionsCollection?: Maybe<ComponentImageGalleryWithCaptionsCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentCaptionedImageLinkingCollectionsComponentImageGalleryWithCaptionsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ComponentCaptionedImageLinkingCollectionsComponentImageGalleryWithCaptionsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentCaptionedImageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
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

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentFullWidthImage) */
export type ComponentFullWidthImage = Entry & _Node & {
  __typename?: 'ComponentFullWidthImage';
  _id: Scalars['ID']['output'];
  caption?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  image?: Maybe<Asset>;
  linkedFrom?: Maybe<ComponentFullWidthImageLinkingCollections>;
  maxWidth?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentFullWidthImage) */
export type ComponentFullWidthImageCaptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentFullWidthImage) */
export type ComponentFullWidthImageImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentFullWidthImage) */
export type ComponentFullWidthImageLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentFullWidthImage) */
export type ComponentFullWidthImageMaxWidthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ComponentFullWidthImageCollection = {
  __typename?: 'ComponentFullWidthImageCollection';
  items: Array<Maybe<ComponentFullWidthImage>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ComponentFullWidthImageFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentFullWidthImageFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentFullWidthImageFilter>>>;
  caption?: InputMaybe<Scalars['String']['input']>;
  caption_contains?: InputMaybe<Scalars['String']['input']>;
  caption_exists?: InputMaybe<Scalars['Boolean']['input']>;
  caption_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  caption_not?: InputMaybe<Scalars['String']['input']>;
  caption_not_contains?: InputMaybe<Scalars['String']['input']>;
  caption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  maxWidth?: InputMaybe<Scalars['String']['input']>;
  maxWidth_contains?: InputMaybe<Scalars['String']['input']>;
  maxWidth_exists?: InputMaybe<Scalars['Boolean']['input']>;
  maxWidth_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  maxWidth_not?: InputMaybe<Scalars['String']['input']>;
  maxWidth_not_contains?: InputMaybe<Scalars['String']['input']>;
  maxWidth_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type ComponentFullWidthImageLinkingCollections = {
  __typename?: 'ComponentFullWidthImageLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentFullWidthImageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
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

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGallery) */
export type ComponentImageGallery = Entry & _Node & {
  __typename?: 'ComponentImageGallery';
  _id: Scalars['ID']['output'];
  caption?: Maybe<Scalars['String']['output']>;
  columns?: Maybe<Scalars['Int']['output']>;
  contentfulMetadata: ContentfulMetadata;
  imagesCollection?: Maybe<AssetCollection>;
  linkedFrom?: Maybe<ComponentImageGalleryLinkingCollections>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGallery) */
export type ComponentImageGalleryCaptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGallery) */
export type ComponentImageGalleryColumnsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGallery) */
export type ComponentImageGalleryImagesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGallery) */
export type ComponentImageGalleryLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentImageGalleryCollection = {
  __typename?: 'ComponentImageGalleryCollection';
  items: Array<Maybe<ComponentImageGallery>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ComponentImageGalleryFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentImageGalleryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentImageGalleryFilter>>>;
  caption?: InputMaybe<Scalars['String']['input']>;
  caption_contains?: InputMaybe<Scalars['String']['input']>;
  caption_exists?: InputMaybe<Scalars['Boolean']['input']>;
  caption_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  caption_not?: InputMaybe<Scalars['String']['input']>;
  caption_not_contains?: InputMaybe<Scalars['String']['input']>;
  caption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  columns?: InputMaybe<Scalars['Int']['input']>;
  columns_exists?: InputMaybe<Scalars['Boolean']['input']>;
  columns_gt?: InputMaybe<Scalars['Int']['input']>;
  columns_gte?: InputMaybe<Scalars['Int']['input']>;
  columns_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  columns_lt?: InputMaybe<Scalars['Int']['input']>;
  columns_lte?: InputMaybe<Scalars['Int']['input']>;
  columns_not?: InputMaybe<Scalars['Int']['input']>;
  columns_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  imagesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
};

export type ComponentImageGalleryLinkingCollections = {
  __typename?: 'ComponentImageGalleryLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentImageGalleryLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
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

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGalleryWithCaptions) */
export type ComponentImageGalleryWithCaptions = Entry & _Node & {
  __typename?: 'ComponentImageGalleryWithCaptions';
  _id: Scalars['ID']['output'];
  columns?: Maybe<Scalars['Int']['output']>;
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  itemsCollection?: Maybe<ComponentImageGalleryWithCaptionsItemsCollection>;
  linkedFrom?: Maybe<ComponentImageGalleryWithCaptionsLinkingCollections>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGalleryWithCaptions) */
export type ComponentImageGalleryWithCaptionsColumnsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGalleryWithCaptions) */
export type ComponentImageGalleryWithCaptionsInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGalleryWithCaptions) */
export type ComponentImageGalleryWithCaptionsItemsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ComponentImageGalleryWithCaptionsItemsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentCaptionedImageFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImageGalleryWithCaptions) */
export type ComponentImageGalleryWithCaptionsLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentImageGalleryWithCaptionsCollection = {
  __typename?: 'ComponentImageGalleryWithCaptionsCollection';
  items: Array<Maybe<ComponentImageGalleryWithCaptions>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ComponentImageGalleryWithCaptionsFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentImageGalleryWithCaptionsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentImageGalleryWithCaptionsFilter>>>;
  columns?: InputMaybe<Scalars['Int']['input']>;
  columns_exists?: InputMaybe<Scalars['Boolean']['input']>;
  columns_gt?: InputMaybe<Scalars['Int']['input']>;
  columns_gte?: InputMaybe<Scalars['Int']['input']>;
  columns_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  columns_lt?: InputMaybe<Scalars['Int']['input']>;
  columns_lte?: InputMaybe<Scalars['Int']['input']>;
  columns_not?: InputMaybe<Scalars['Int']['input']>;
  columns_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  items?: InputMaybe<CfComponentCaptionedImageNestedFilter>;
  itemsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
};

export type ComponentImageGalleryWithCaptionsItemsCollection = {
  __typename?: 'ComponentImageGalleryWithCaptionsItemsCollection';
  items: Array<Maybe<ComponentCaptionedImage>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
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
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
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

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImpactMetrics) */
export type ComponentImpactMetrics = Entry & _Node & {
  __typename?: 'ComponentImpactMetrics';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ComponentImpactMetricsLinkingCollections>;
  metricsCollection?: Maybe<ComponentImpactMetricsMetricsCollection>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImpactMetrics) */
export type ComponentImpactMetricsInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImpactMetrics) */
export type ComponentImpactMetricsLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentImpactMetrics) */
export type ComponentImpactMetricsMetricsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ComponentImpactMetricsMetricsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentMetricFilter>;
};

export type ComponentImpactMetricsCollection = {
  __typename?: 'ComponentImpactMetricsCollection';
  items: Array<Maybe<ComponentImpactMetrics>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ComponentImpactMetricsFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentImpactMetricsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentImpactMetricsFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  metrics?: InputMaybe<CfComponentMetricNestedFilter>;
  metricsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
};

export type ComponentImpactMetricsLinkingCollections = {
  __typename?: 'ComponentImpactMetricsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentImpactMetricsLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ComponentImpactMetricsMetricsCollection = {
  __typename?: 'ComponentImpactMetricsMetricsCollection';
  items: Array<Maybe<ComponentMetric>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
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

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentMetric) */
export type ComponentMetric = Entry & _Node & {
  __typename?: 'ComponentMetric';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ComponentMetricLinkingCollections>;
  sys: Sys;
  value?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentMetric) */
export type ComponentMetricInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentMetric) */
export type ComponentMetricLabelArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentMetric) */
export type ComponentMetricLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentMetric) */
export type ComponentMetricValueArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ComponentMetricCollection = {
  __typename?: 'ComponentMetricCollection';
  items: Array<Maybe<ComponentMetric>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ComponentMetricFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentMetricFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentMetricFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  label?: InputMaybe<Scalars['String']['input']>;
  label_contains?: InputMaybe<Scalars['String']['input']>;
  label_exists?: InputMaybe<Scalars['Boolean']['input']>;
  label_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  label_not?: InputMaybe<Scalars['String']['input']>;
  label_not_contains?: InputMaybe<Scalars['String']['input']>;
  label_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  value?: InputMaybe<Scalars['String']['input']>;
  value_contains?: InputMaybe<Scalars['String']['input']>;
  value_exists?: InputMaybe<Scalars['Boolean']['input']>;
  value_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value_not?: InputMaybe<Scalars['String']['input']>;
  value_not_contains?: InputMaybe<Scalars['String']['input']>;
  value_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentMetricLinkingCollections = {
  __typename?: 'ComponentMetricLinkingCollections';
  componentImpactMetricsCollection?: Maybe<ComponentImpactMetricsCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentMetricLinkingCollectionsComponentImpactMetricsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ComponentMetricLinkingCollectionsComponentImpactMetricsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentMetricLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
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

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentRichImage) */
export type ComponentRichImage = Entry & _Node & {
  __typename?: 'ComponentRichImage';
  _id: Scalars['ID']['output'];
  caption?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  fullWidth?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<Asset>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ComponentRichImageLinkingCollections>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentRichImage) */
export type ComponentRichImageCaptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentRichImage) */
export type ComponentRichImageFullWidthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentRichImage) */
export type ComponentRichImageImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentRichImage) */
export type ComponentRichImageInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentRichImage) */
export type ComponentRichImageLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentRichImageCollection = {
  __typename?: 'ComponentRichImageCollection';
  items: Array<Maybe<ComponentRichImage>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ComponentRichImageFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentRichImageFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentRichImageFilter>>>;
  caption?: InputMaybe<Scalars['String']['input']>;
  caption_contains?: InputMaybe<Scalars['String']['input']>;
  caption_exists?: InputMaybe<Scalars['Boolean']['input']>;
  caption_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  caption_not?: InputMaybe<Scalars['String']['input']>;
  caption_not_contains?: InputMaybe<Scalars['String']['input']>;
  caption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  fullWidth?: InputMaybe<Scalars['Boolean']['input']>;
  fullWidth_exists?: InputMaybe<Scalars['Boolean']['input']>;
  fullWidth_not?: InputMaybe<Scalars['Boolean']['input']>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type ComponentRichImageLinkingCollections = {
  __typename?: 'ComponentRichImageLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentRichImageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
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

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeo = Entry & _Node & {
  __typename?: 'ComponentSeo';
  _id: Scalars['ID']['output'];
  canonicalUrl?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ComponentSeoLinkingCollections>;
  nofollow?: Maybe<Scalars['Boolean']['output']>;
  noindex?: Maybe<Scalars['Boolean']['output']>;
  pageDescription?: Maybe<Scalars['String']['output']>;
  pageTitle?: Maybe<Scalars['String']['output']>;
  shareImagesCollection?: Maybe<AssetCollection>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeoCanonicalUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeoInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeoLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeoNofollowArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeoNoindexArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeoPageDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeoPageTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentSeo) */
export type ComponentSeoShareImagesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ComponentSeoCollection = {
  __typename?: 'ComponentSeoCollection';
  items: Array<Maybe<ComponentSeo>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ComponentSeoFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentSeoFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentSeoFilter>>>;
  canonicalUrl?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_contains?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  canonicalUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  canonicalUrl_not?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nofollow?: InputMaybe<Scalars['Boolean']['input']>;
  nofollow_exists?: InputMaybe<Scalars['Boolean']['input']>;
  nofollow_not?: InputMaybe<Scalars['Boolean']['input']>;
  noindex?: InputMaybe<Scalars['Boolean']['input']>;
  noindex_exists?: InputMaybe<Scalars['Boolean']['input']>;
  noindex_not?: InputMaybe<Scalars['Boolean']['input']>;
  pageDescription?: InputMaybe<Scalars['String']['input']>;
  pageDescription_contains?: InputMaybe<Scalars['String']['input']>;
  pageDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  pageDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pageDescription_not?: InputMaybe<Scalars['String']['input']>;
  pageDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  pageDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pageTitle?: InputMaybe<Scalars['String']['input']>;
  pageTitle_contains?: InputMaybe<Scalars['String']['input']>;
  pageTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  pageTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pageTitle_not?: InputMaybe<Scalars['String']['input']>;
  pageTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  pageTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  shareImagesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
};

export type ComponentSeoLinkingCollections = {
  __typename?: 'ComponentSeoLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageBlogPostCollection?: Maybe<PageBlogPostCollection>;
  pageLandingCollection?: Maybe<PageLandingCollection>;
};


export type ComponentSeoLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentSeoLinkingCollectionsPageBlogPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ComponentSeoLinkingCollectionsPageBlogPostCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentSeoLinkingCollectionsPageLandingCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ComponentSeoLinkingCollectionsPageLandingCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
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

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentTextImageSideBySide) */
export type ComponentTextImageSideBySide = Entry & _Node & {
  __typename?: 'ComponentTextImageSideBySide';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  image?: Maybe<Asset>;
  imagePosition?: Maybe<Scalars['String']['output']>;
  imageSize?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ComponentTextImageSideBySideLinkingCollections>;
  sys: Sys;
  text?: Maybe<ComponentTextImageSideBySideText>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentTextImageSideBySide) */
export type ComponentTextImageSideBySideImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentTextImageSideBySide) */
export type ComponentTextImageSideBySideImagePositionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentTextImageSideBySide) */
export type ComponentTextImageSideBySideImageSizeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentTextImageSideBySide) */
export type ComponentTextImageSideBySideLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/componentTextImageSideBySide) */
export type ComponentTextImageSideBySideTextArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ComponentTextImageSideBySideCollection = {
  __typename?: 'ComponentTextImageSideBySideCollection';
  items: Array<Maybe<ComponentTextImageSideBySide>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ComponentTextImageSideBySideFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentTextImageSideBySideFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ComponentTextImageSideBySideFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  imagePosition?: InputMaybe<Scalars['String']['input']>;
  imagePosition_contains?: InputMaybe<Scalars['String']['input']>;
  imagePosition_exists?: InputMaybe<Scalars['Boolean']['input']>;
  imagePosition_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  imagePosition_not?: InputMaybe<Scalars['String']['input']>;
  imagePosition_not_contains?: InputMaybe<Scalars['String']['input']>;
  imagePosition_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  imageSize?: InputMaybe<Scalars['String']['input']>;
  imageSize_contains?: InputMaybe<Scalars['String']['input']>;
  imageSize_exists?: InputMaybe<Scalars['Boolean']['input']>;
  imageSize_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  imageSize_not?: InputMaybe<Scalars['String']['input']>;
  imageSize_not_contains?: InputMaybe<Scalars['String']['input']>;
  imageSize_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  text_contains?: InputMaybe<Scalars['String']['input']>;
  text_exists?: InputMaybe<Scalars['Boolean']['input']>;
  text_not_contains?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentTextImageSideBySideLinkingCollections = {
  __typename?: 'ComponentTextImageSideBySideLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ComponentTextImageSideBySideLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
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
  json: Scalars['JSON']['output'];
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
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataConceptsFilter = {
  descendants?: InputMaybe<ContentfulMetadataConceptsDescendantsFilter>;
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataFilter = {
  concepts?: InputMaybe<ContentfulMetadataConceptsFilter>;
  concepts_exists?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *       Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
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

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type Hackathon = Entry & _Node & {
  __typename?: 'Hackathon';
  _id: Scalars['ID']['output'];
  codeUrl?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  coverImage?: Maybe<Asset>;
  demoUrl?: Maybe<Scalars['String']['output']>;
  demoVideoUrl?: Maybe<Scalars['String']['output']>;
  description?: Maybe<HackathonDescription>;
  eventDate?: Maybe<Scalars['DateTime']['output']>;
  eventName?: Maybe<Scalars['String']['output']>;
  galleryCollection?: Maybe<AssetCollection>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<HackathonLinkingCollections>;
  myRole?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  oneLiner?: Maybe<Scalars['String']['output']>;
  outcome?: Maybe<Scalars['String']['output']>;
  showcaseUrl?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  teamMembersCollection?: Maybe<HackathonTeamMembersCollection>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonCodeUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonCoverImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonDemoUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonDemoVideoUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonEventDateArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonEventNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonGalleryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonMyRoleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonOneLinerArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonOutcomeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonShowcaseUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonTagsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/hackathon) */
export type HackathonTeamMembersCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type HackathonCollection = {
  __typename?: 'HackathonCollection';
  items: Array<Maybe<Hackathon>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type HackathonDescription = {
  __typename?: 'HackathonDescription';
  json: Scalars['JSON']['output'];
  links: HackathonDescriptionLinks;
};

export type HackathonDescriptionAssets = {
  __typename?: 'HackathonDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type HackathonDescriptionEntries = {
  __typename?: 'HackathonDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type HackathonDescriptionLinks = {
  __typename?: 'HackathonDescriptionLinks';
  assets: HackathonDescriptionAssets;
  entries: HackathonDescriptionEntries;
  resources: HackathonDescriptionResources;
};

export type HackathonDescriptionResources = {
  __typename?: 'HackathonDescriptionResources';
  block: Array<HackathonDescriptionResourcesBlock>;
  hyperlink: Array<HackathonDescriptionResourcesHyperlink>;
  inline: Array<HackathonDescriptionResourcesInline>;
};

export type HackathonDescriptionResourcesBlock = ResourceLink & {
  __typename?: 'HackathonDescriptionResourcesBlock';
  sys: ResourceSys;
};

export type HackathonDescriptionResourcesHyperlink = ResourceLink & {
  __typename?: 'HackathonDescriptionResourcesHyperlink';
  sys: ResourceSys;
};

export type HackathonDescriptionResourcesInline = ResourceLink & {
  __typename?: 'HackathonDescriptionResourcesInline';
  sys: ResourceSys;
};

export type HackathonFilter = {
  AND?: InputMaybe<Array<InputMaybe<HackathonFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<HackathonFilter>>>;
  codeUrl?: InputMaybe<Scalars['String']['input']>;
  codeUrl_contains?: InputMaybe<Scalars['String']['input']>;
  codeUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  codeUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  codeUrl_not?: InputMaybe<Scalars['String']['input']>;
  codeUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  codeUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  coverImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  demoUrl?: InputMaybe<Scalars['String']['input']>;
  demoUrl_contains?: InputMaybe<Scalars['String']['input']>;
  demoUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  demoUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  demoUrl_not?: InputMaybe<Scalars['String']['input']>;
  demoUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  demoUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  demoVideoUrl?: InputMaybe<Scalars['String']['input']>;
  demoVideoUrl_contains?: InputMaybe<Scalars['String']['input']>;
  demoVideoUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  demoVideoUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  demoVideoUrl_not?: InputMaybe<Scalars['String']['input']>;
  demoVideoUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  demoVideoUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  eventDate?: InputMaybe<Scalars['DateTime']['input']>;
  eventDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  eventDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  eventDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  eventDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  eventDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  eventDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  eventDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  eventDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  eventName?: InputMaybe<Scalars['String']['input']>;
  eventName_contains?: InputMaybe<Scalars['String']['input']>;
  eventName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  eventName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventName_not?: InputMaybe<Scalars['String']['input']>;
  eventName_not_contains?: InputMaybe<Scalars['String']['input']>;
  eventName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  galleryCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  myRole?: InputMaybe<Scalars['String']['input']>;
  myRole_contains?: InputMaybe<Scalars['String']['input']>;
  myRole_exists?: InputMaybe<Scalars['Boolean']['input']>;
  myRole_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  myRole_not?: InputMaybe<Scalars['String']['input']>;
  myRole_not_contains?: InputMaybe<Scalars['String']['input']>;
  myRole_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  oneLiner?: InputMaybe<Scalars['String']['input']>;
  oneLiner_contains?: InputMaybe<Scalars['String']['input']>;
  oneLiner_exists?: InputMaybe<Scalars['Boolean']['input']>;
  oneLiner_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  oneLiner_not?: InputMaybe<Scalars['String']['input']>;
  oneLiner_not_contains?: InputMaybe<Scalars['String']['input']>;
  oneLiner_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  outcome_contains?: InputMaybe<Scalars['String']['input']>;
  outcome_exists?: InputMaybe<Scalars['Boolean']['input']>;
  outcome_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  outcome_not?: InputMaybe<Scalars['String']['input']>;
  outcome_not_contains?: InputMaybe<Scalars['String']['input']>;
  outcome_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  showcaseUrl?: InputMaybe<Scalars['String']['input']>;
  showcaseUrl_contains?: InputMaybe<Scalars['String']['input']>;
  showcaseUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  showcaseUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  showcaseUrl_not?: InputMaybe<Scalars['String']['input']>;
  showcaseUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  showcaseUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  tags_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_exists?: InputMaybe<Scalars['Boolean']['input']>;
  teamMembersCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type HackathonLinkingCollections = {
  __typename?: 'HackathonLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type HackathonLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum HackathonOrder {
  CodeUrlAsc = 'codeUrl_ASC',
  CodeUrlDesc = 'codeUrl_DESC',
  DemoUrlAsc = 'demoUrl_ASC',
  DemoUrlDesc = 'demoUrl_DESC',
  DemoVideoUrlAsc = 'demoVideoUrl_ASC',
  DemoVideoUrlDesc = 'demoVideoUrl_DESC',
  EventDateAsc = 'eventDate_ASC',
  EventDateDesc = 'eventDate_DESC',
  EventNameAsc = 'eventName_ASC',
  EventNameDesc = 'eventName_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  MyRoleAsc = 'myRole_ASC',
  MyRoleDesc = 'myRole_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  OneLinerAsc = 'oneLiner_ASC',
  OneLinerDesc = 'oneLiner_DESC',
  OutcomeAsc = 'outcome_ASC',
  OutcomeDesc = 'outcome_DESC',
  ShowcaseUrlAsc = 'showcaseUrl_ASC',
  ShowcaseUrlDesc = 'showcaseUrl_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type HackathonTeamMembersCollection = {
  __typename?: 'HackathonTeamMembersCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

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
  backgroundColor?: InputMaybe<Scalars['HexColor']['input']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']['input']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']['input']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']['input']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPost = Entry & _Node & {
  __typename?: 'PageBlogPost';
  _id: Scalars['ID']['output'];
  author?: Maybe<Entry>;
  content?: Maybe<PageBlogPostContent>;
  contentfulMetadata: ContentfulMetadata;
  featuredImage?: Maybe<Asset>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<PageBlogPostLinkingCollections>;
  publishedDate?: Maybe<Scalars['DateTime']['output']>;
  relatedBlogPostsCollection?: Maybe<PageBlogPostRelatedBlogPostsCollection>;
  seoFields?: Maybe<ComponentSeo>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostAuthorArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostContentArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostFeaturedImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostPublishedDateArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostRelatedBlogPostsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageBlogPostRelatedBlogPostsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageBlogPostFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostSeoFieldsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentSeoFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostShortDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageBlogPost) */
export type PageBlogPostTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PageBlogPostCollection = {
  __typename?: 'PageBlogPostCollection';
  items: Array<Maybe<PageBlogPost>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PageBlogPostContent = {
  __typename?: 'PageBlogPostContent';
  json: Scalars['JSON']['output'];
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
  author_exists?: InputMaybe<Scalars['Boolean']['input']>;
  content_contains?: InputMaybe<Scalars['String']['input']>;
  content_exists?: InputMaybe<Scalars['Boolean']['input']>;
  content_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  featuredImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publishedDate?: InputMaybe<Scalars['DateTime']['input']>;
  publishedDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishedDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  relatedBlogPosts?: InputMaybe<CfPageBlogPostNestedFilter>;
  relatedBlogPostsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoFields?: InputMaybe<CfComponentSeoNestedFilter>;
  seoFields_exists?: InputMaybe<Scalars['Boolean']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  shortDescription_contains?: InputMaybe<Scalars['String']['input']>;
  shortDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  shortDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  shortDescription_not?: InputMaybe<Scalars['String']['input']>;
  shortDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  shortDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PageBlogPostLinkingCollections = {
  __typename?: 'PageBlogPostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageBlogPostCollection?: Maybe<PageBlogPostCollection>;
};


export type PageBlogPostLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PageBlogPostLinkingCollectionsPageBlogPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageBlogPostLinkingCollectionsPageBlogPostCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
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
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
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

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageLanding) */
export type PageLanding = Entry & _Node & {
  __typename?: 'PageLanding';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  featuredBlogPost?: Maybe<Entry>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<PageLandingLinkingCollections>;
  seoFields?: Maybe<ComponentSeo>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageLanding) */
export type PageLandingFeaturedBlogPostArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageLanding) */
export type PageLandingInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageLanding) */
export type PageLandingLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/pageLanding) */
export type PageLandingSeoFieldsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentSeoFilter>;
};

export type PageLandingCollection = {
  __typename?: 'PageLandingCollection';
  items: Array<Maybe<PageLanding>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PageLandingFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageLandingFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageLandingFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  featuredBlogPost_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoFields?: InputMaybe<CfComponentSeoNestedFilter>;
  seoFields_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
};

export type PageLandingLinkingCollections = {
  __typename?: 'PageLandingLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type PageLandingLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
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
  _id: Scalars['ID']['output'];
  company?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<ProjectDetailsLinkingCollections>;
  role?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  tools?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/projectDetails) */
export type ProjectDetailsCompanyArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/projectDetails) */
export type ProjectDetailsLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/projectDetails) */
export type ProjectDetailsRoleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/projectDetails) */
export type ProjectDetailsToolsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectDetailsCollection = {
  __typename?: 'ProjectDetailsCollection';
  items: Array<Maybe<ProjectDetails>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ProjectDetailsFilter = {
  AND?: InputMaybe<Array<InputMaybe<ProjectDetailsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ProjectDetailsFilter>>>;
  company?: InputMaybe<Scalars['String']['input']>;
  company_contains?: InputMaybe<Scalars['String']['input']>;
  company_exists?: InputMaybe<Scalars['Boolean']['input']>;
  company_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  company_not?: InputMaybe<Scalars['String']['input']>;
  company_not_contains?: InputMaybe<Scalars['String']['input']>;
  company_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  role?: InputMaybe<Scalars['String']['input']>;
  role_contains?: InputMaybe<Scalars['String']['input']>;
  role_exists?: InputMaybe<Scalars['Boolean']['input']>;
  role_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  role_not?: InputMaybe<Scalars['String']['input']>;
  role_not_contains?: InputMaybe<Scalars['String']['input']>;
  role_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  tools?: InputMaybe<Scalars['String']['input']>;
  tools_contains?: InputMaybe<Scalars['String']['input']>;
  tools_exists?: InputMaybe<Scalars['Boolean']['input']>;
  tools_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tools_not?: InputMaybe<Scalars['String']['input']>;
  tools_not_contains?: InputMaybe<Scalars['String']['input']>;
  tools_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ProjectDetailsLinkingCollections = {
  __typename?: 'ProjectDetailsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ProjectDetailsLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
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
  hackathon?: Maybe<Hackathon>;
  hackathonCollection?: Maybe<HackathonCollection>;
  pageBlogPost?: Maybe<PageBlogPost>;
  pageBlogPostCollection?: Maybe<PageBlogPostCollection>;
  pageLanding?: Maybe<PageLanding>;
  pageLandingCollection?: Maybe<PageLandingCollection>;
  projectDetails?: Maybe<ProjectDetails>;
  projectDetailsCollection?: Maybe<ProjectDetailsCollection>;
  teamMember?: Maybe<TeamMember>;
  teamMemberCollection?: Maybe<TeamMemberCollection>;
  tldrSummary?: Maybe<TldrSummary>;
  tldrSummaryCollection?: Maybe<TldrSummaryCollection>;
  urlLink?: Maybe<UrlLink>;
  urlLinkCollection?: Maybe<UrlLinkCollection>;
};


export type Query_NodeArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type Query_NodesArgs = {
  ids: Array<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryComponentAuthorArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryComponentAuthorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ComponentAuthorOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentAuthorFilter>;
};


export type QueryComponentCaptionedImageArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryComponentCaptionedImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ComponentCaptionedImageOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentCaptionedImageFilter>;
};


export type QueryComponentFullWidthImageArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryComponentFullWidthImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ComponentFullWidthImageOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentFullWidthImageFilter>;
};


export type QueryComponentImageGalleryArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryComponentImageGalleryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ComponentImageGalleryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentImageGalleryFilter>;
};


export type QueryComponentImageGalleryWithCaptionsArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryComponentImageGalleryWithCaptionsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ComponentImageGalleryWithCaptionsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentImageGalleryWithCaptionsFilter>;
};


export type QueryComponentImpactMetricsArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryComponentImpactMetricsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ComponentImpactMetricsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentImpactMetricsFilter>;
};


export type QueryComponentMetricArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryComponentMetricCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ComponentMetricOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentMetricFilter>;
};


export type QueryComponentRichImageArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryComponentRichImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ComponentRichImageOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentRichImageFilter>;
};


export type QueryComponentSeoArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryComponentSeoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ComponentSeoOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentSeoFilter>;
};


export type QueryComponentTextImageSideBySideArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryComponentTextImageSideBySideCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ComponentTextImageSideBySideOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentTextImageSideBySideFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryHackathonArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryHackathonCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<HackathonOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<HackathonFilter>;
};


export type QueryPageBlogPostArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPageBlogPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageBlogPostOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageBlogPostFilter>;
};


export type QueryPageLandingArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPageLandingCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageLandingOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageLandingFilter>;
};


export type QueryProjectDetailsArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryProjectDetailsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ProjectDetailsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ProjectDetailsFilter>;
};


export type QueryTeamMemberArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryTeamMemberCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<TeamMemberOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<TeamMemberFilter>;
};


export type QueryTldrSummaryArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryTldrSummaryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<TldrSummaryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<TldrSummaryFilter>;
};


export type QueryUrlLinkArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryUrlLinkCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<UrlLinkOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<UrlLinkFilter>;
};

export type ResourceLink = {
  sys: ResourceSys;
};

export type ResourceSys = {
  __typename?: 'ResourceSys';
  linkType: Scalars['String']['output'];
  urn: Scalars['String']['output'];
};

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  /** The locale that was requested. */
  locale?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  publishedVersion?: Maybe<Scalars['Int']['output']>;
  spaceId: Scalars['String']['output'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_exists?: InputMaybe<Scalars['Boolean']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

/**
 * Represents a taxonomy concept entity for finding and organizing content easily.
 *         Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-concepts
 */
export type TaxonomyConcept = {
  __typename?: 'TaxonomyConcept';
  id?: Maybe<Scalars['String']['output']>;
};

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/teamMember) */
export type TeamMember = Entry & _Node & {
  __typename?: 'TeamMember';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<TeamMemberLinkingCollections>;
  linkedinUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Asset>;
  role?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  twitterUrl?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/teamMember) */
export type TeamMemberLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/teamMember) */
export type TeamMemberLinkedinUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/teamMember) */
export type TeamMemberNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/teamMember) */
export type TeamMemberPhotoArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/teamMember) */
export type TeamMemberRoleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/teamMember) */
export type TeamMemberTwitterUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TeamMemberCollection = {
  __typename?: 'TeamMemberCollection';
  items: Array<Maybe<TeamMember>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type TeamMemberFilter = {
  AND?: InputMaybe<Array<InputMaybe<TeamMemberFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TeamMemberFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  linkedinUrl?: InputMaybe<Scalars['String']['input']>;
  linkedinUrl_contains?: InputMaybe<Scalars['String']['input']>;
  linkedinUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  linkedinUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  linkedinUrl_not?: InputMaybe<Scalars['String']['input']>;
  linkedinUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  linkedinUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  photo_exists?: InputMaybe<Scalars['Boolean']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  role_contains?: InputMaybe<Scalars['String']['input']>;
  role_exists?: InputMaybe<Scalars['Boolean']['input']>;
  role_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  role_not?: InputMaybe<Scalars['String']['input']>;
  role_not_contains?: InputMaybe<Scalars['String']['input']>;
  role_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  twitterUrl?: InputMaybe<Scalars['String']['input']>;
  twitterUrl_contains?: InputMaybe<Scalars['String']['input']>;
  twitterUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  twitterUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  twitterUrl_not?: InputMaybe<Scalars['String']['input']>;
  twitterUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  twitterUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type TeamMemberLinkingCollections = {
  __typename?: 'TeamMemberLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type TeamMemberLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum TeamMemberOrder {
  LinkedinUrlAsc = 'linkedinUrl_ASC',
  LinkedinUrlDesc = 'linkedinUrl_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
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
  TwitterUrlAsc = 'twitterUrl_ASC',
  TwitterUrlDesc = 'twitterUrl_DESC'
}

export type TimelineFilterInput = {
  /** Preview content starting from a given release date */
  release_lte?: InputMaybe<Scalars['String']['input']>;
  /** Preview content starting from a given timestamp */
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/tldrSummary) */
export type TldrSummary = Entry & _Node & {
  __typename?: 'TldrSummary';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  context?: Maybe<Scalars['String']['output']>;
  goal?: Maybe<Scalars['String']['output']>;
  impact?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  linkedFrom?: Maybe<TldrSummaryLinkingCollections>;
  role?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/tldrSummary) */
export type TldrSummaryContextArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/tldrSummary) */
export type TldrSummaryGoalArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/tldrSummary) */
export type TldrSummaryImpactArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/tldrSummary) */
export type TldrSummaryLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/tldrSummary) */
export type TldrSummaryRoleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TldrSummaryCollection = {
  __typename?: 'TldrSummaryCollection';
  items: Array<Maybe<TldrSummary>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type TldrSummaryFilter = {
  AND?: InputMaybe<Array<InputMaybe<TldrSummaryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TldrSummaryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  context?: InputMaybe<Scalars['String']['input']>;
  context_contains?: InputMaybe<Scalars['String']['input']>;
  context_exists?: InputMaybe<Scalars['Boolean']['input']>;
  context_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  context_not?: InputMaybe<Scalars['String']['input']>;
  context_not_contains?: InputMaybe<Scalars['String']['input']>;
  context_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  goal?: InputMaybe<Scalars['String']['input']>;
  goal_contains?: InputMaybe<Scalars['String']['input']>;
  goal_exists?: InputMaybe<Scalars['Boolean']['input']>;
  goal_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  goal_not?: InputMaybe<Scalars['String']['input']>;
  goal_not_contains?: InputMaybe<Scalars['String']['input']>;
  goal_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  impact_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  impact_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  impact_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  impact_exists?: InputMaybe<Scalars['Boolean']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  role_contains?: InputMaybe<Scalars['String']['input']>;
  role_exists?: InputMaybe<Scalars['Boolean']['input']>;
  role_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  role_not?: InputMaybe<Scalars['String']['input']>;
  role_not_contains?: InputMaybe<Scalars['String']['input']>;
  role_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type TldrSummaryLinkingCollections = {
  __typename?: 'TldrSummaryLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type TldrSummaryLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
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

/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/url-link) */
export type UrlLink = Entry & _Node & {
  __typename?: 'UrlLink';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  featuredImage?: Maybe<Asset>;
  linkedFrom?: Maybe<UrlLinkLinkingCollections>;
  publishDate?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/url-link) */
export type UrlLinkFeaturedImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/url-link) */
export type UrlLinkLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/url-link) */
export type UrlLinkPublishDateArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/url-link) */
export type UrlLinkSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/url-link) */
export type UrlLinkSubtitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/lx69lkfzk4yq/content_types/url-link) */
export type UrlLinkTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UrlLinkCollection = {
  __typename?: 'UrlLinkCollection';
  items: Array<Maybe<UrlLink>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type UrlLinkFilter = {
  AND?: InputMaybe<Array<InputMaybe<UrlLinkFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<UrlLinkFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  featuredImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishDate?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  subtitle_contains?: InputMaybe<Scalars['String']['input']>;
  subtitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  subtitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subtitle_not?: InputMaybe<Scalars['String']['input']>;
  subtitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  subtitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UrlLinkLinkingCollections = {
  __typename?: 'UrlLinkLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type UrlLinkLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
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
  _id: Scalars['ID']['output'];
};

export type CfComponentCaptionedImageNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfComponentCaptionedImageNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfComponentCaptionedImageNestedFilter>>>;
  caption_contains?: InputMaybe<Scalars['String']['input']>;
  caption_exists?: InputMaybe<Scalars['Boolean']['input']>;
  caption_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfComponentMetricNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfComponentMetricNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfComponentMetricNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  label?: InputMaybe<Scalars['String']['input']>;
  label_contains?: InputMaybe<Scalars['String']['input']>;
  label_exists?: InputMaybe<Scalars['Boolean']['input']>;
  label_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  label_not?: InputMaybe<Scalars['String']['input']>;
  label_not_contains?: InputMaybe<Scalars['String']['input']>;
  label_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  value?: InputMaybe<Scalars['String']['input']>;
  value_contains?: InputMaybe<Scalars['String']['input']>;
  value_exists?: InputMaybe<Scalars['Boolean']['input']>;
  value_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value_not?: InputMaybe<Scalars['String']['input']>;
  value_not_contains?: InputMaybe<Scalars['String']['input']>;
  value_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfComponentSeoNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfComponentSeoNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfComponentSeoNestedFilter>>>;
  canonicalUrl?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_contains?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  canonicalUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  canonicalUrl_not?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nofollow?: InputMaybe<Scalars['Boolean']['input']>;
  nofollow_exists?: InputMaybe<Scalars['Boolean']['input']>;
  nofollow_not?: InputMaybe<Scalars['Boolean']['input']>;
  noindex?: InputMaybe<Scalars['Boolean']['input']>;
  noindex_exists?: InputMaybe<Scalars['Boolean']['input']>;
  noindex_not?: InputMaybe<Scalars['Boolean']['input']>;
  pageDescription?: InputMaybe<Scalars['String']['input']>;
  pageDescription_contains?: InputMaybe<Scalars['String']['input']>;
  pageDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  pageDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pageDescription_not?: InputMaybe<Scalars['String']['input']>;
  pageDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  pageDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pageTitle?: InputMaybe<Scalars['String']['input']>;
  pageTitle_contains?: InputMaybe<Scalars['String']['input']>;
  pageTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  pageTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pageTitle_not?: InputMaybe<Scalars['String']['input']>;
  pageTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  pageTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  shareImagesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
};

export type CfPageBlogPostNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfPageBlogPostNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfPageBlogPostNestedFilter>>>;
  author_exists?: InputMaybe<Scalars['Boolean']['input']>;
  content_contains?: InputMaybe<Scalars['String']['input']>;
  content_exists?: InputMaybe<Scalars['Boolean']['input']>;
  content_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  featuredImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publishedDate?: InputMaybe<Scalars['DateTime']['input']>;
  publishedDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishedDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  relatedBlogPostsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoFields_exists?: InputMaybe<Scalars['Boolean']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  shortDescription_contains?: InputMaybe<Scalars['String']['input']>;
  shortDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  shortDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  shortDescription_not?: InputMaybe<Scalars['String']['input']>;
  shortDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  shortDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AuthorFieldsFragment = { __typename: 'ComponentAuthor', name?: string | null, sys: { __typename?: 'Sys', id: string }, avatar?: (
    { __typename?: 'Asset' }
    & ImageFieldsFragment
  ) | null };

export type HackathonCollectionQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<HackathonOrder>> | InputMaybe<HackathonOrder>>;
  where?: InputMaybe<HackathonFilter>;
}>;


export type HackathonCollectionQuery = { __typename?: 'Query', hackathonCollection?: { __typename?: 'HackathonCollection', items: Array<(
      { __typename?: 'Hackathon' }
      & HackathonFieldsFragment
    ) | null> } | null };

export type TeamMemberFieldsFragment = { __typename: 'TeamMember', name?: string | null, role?: string | null, linkedinUrl?: string | null, twitterUrl?: string | null, sys: { __typename?: 'Sys', id: string }, photo?: (
    { __typename?: 'Asset' }
    & ImageFieldsFragment
  ) | null };

export type HackathonFieldsFragment = { __typename: 'Hackathon', internalName?: string | null, name?: string | null, slug?: string | null, oneLiner?: string | null, eventName?: string | null, eventDate?: any | null, myRole?: string | null, outcome?: string | null, demoVideoUrl?: string | null, tags?: Array<string | null> | null, showcaseUrl?: string | null, demoUrl?: string | null, codeUrl?: string | null, sys: { __typename?: 'Sys', id: string, spaceId: string }, description?: { __typename?: 'HackathonDescription', json: any } | null, coverImage?: (
    { __typename?: 'Asset' }
    & ImageFieldsFragment
  ) | null, galleryCollection?: { __typename?: 'AssetCollection', items: Array<(
      { __typename?: 'Asset' }
      & ImageFieldsFragment
    ) | null> } | null, teamMembersCollection?: { __typename?: 'HackathonTeamMembersCollection', items: Array<
      | { __typename?: 'ComponentAuthor' }
      | { __typename?: 'ComponentCaptionedImage' }
      | { __typename?: 'ComponentFullWidthImage' }
      | { __typename?: 'ComponentImageGallery' }
      | { __typename?: 'ComponentImageGalleryWithCaptions' }
      | { __typename?: 'ComponentImpactMetrics' }
      | { __typename?: 'ComponentMetric' }
      | { __typename?: 'ComponentRichImage' }
      | { __typename?: 'ComponentSeo' }
      | { __typename?: 'ComponentTextImageSideBySide' }
      | { __typename?: 'Hackathon' }
      | { __typename?: 'PageBlogPost' }
      | { __typename?: 'PageLanding' }
      | { __typename?: 'ProjectDetails' }
      | (
        { __typename?: 'TeamMember' }
        & TeamMemberFieldsFragment
      )
      | { __typename?: 'TldrSummary' }
      | { __typename?: 'UrlLink' }
     | null> } | null, contentfulMetadata: { __typename?: 'ContentfulMetadata', tags: Array<{ __typename?: 'ContentfulTag', id?: string | null, name?: string | null } | null> } };

export type ImageFieldsFragment = { __typename: 'Asset', title?: string | null, description?: string | null, width?: number | null, height?: number | null, url?: string | null, contentType?: string | null, sys: { __typename?: 'Sys', id: string } };

export type ReferencePageBlogPostFieldsFragment = { __typename: 'PageBlogPost', slug?: string | null, publishedDate?: any | null, title?: string | null, shortDescription?: string | null, sys: { __typename?: 'Sys', id: string, spaceId: string }, author?:
    | (
      { __typename?: 'ComponentAuthor' }
      & AuthorFieldsFragment
    )
    | { __typename?: 'ComponentCaptionedImage' }
    | { __typename?: 'ComponentFullWidthImage' }
    | { __typename?: 'ComponentImageGallery' }
    | { __typename?: 'ComponentImageGalleryWithCaptions' }
    | { __typename?: 'ComponentImpactMetrics' }
    | { __typename?: 'ComponentMetric' }
    | { __typename?: 'ComponentRichImage' }
    | { __typename?: 'ComponentSeo' }
    | { __typename?: 'ComponentTextImageSideBySide' }
    | { __typename?: 'Hackathon' }
    | { __typename?: 'PageBlogPost' }
    | { __typename?: 'PageLanding' }
    | { __typename?: 'ProjectDetails' }
    | { __typename?: 'TeamMember' }
    | { __typename?: 'TldrSummary' }
    | { __typename?: 'UrlLink' }
   | null, featuredImage?: (
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
  ) | null, author?:
    | (
      { __typename?: 'ComponentAuthor' }
      & AuthorFieldsFragment
    )
    | { __typename?: 'ComponentCaptionedImage' }
    | { __typename?: 'ComponentFullWidthImage' }
    | { __typename?: 'ComponentImageGallery' }
    | { __typename?: 'ComponentImageGalleryWithCaptions' }
    | { __typename?: 'ComponentImpactMetrics' }
    | { __typename?: 'ComponentMetric' }
    | { __typename?: 'ComponentRichImage' }
    | { __typename?: 'ComponentSeo' }
    | { __typename?: 'ComponentTextImageSideBySide' }
    | { __typename?: 'Hackathon' }
    | { __typename?: 'PageBlogPost' }
    | { __typename?: 'PageLanding' }
    | { __typename?: 'ProjectDetails' }
    | { __typename?: 'TeamMember' }
    | { __typename?: 'TldrSummary' }
    | { __typename?: 'UrlLink' }
   | null, featuredImage?: (
    { __typename?: 'Asset' }
    & ImageFieldsFragment
  ) | null, content?: { __typename?: 'PageBlogPostContent', json: any, links: { __typename?: 'PageBlogPostContentLinks', entries: { __typename?: 'PageBlogPostContentEntries', block: Array<
          | { __typename?: 'ComponentAuthor' }
          | { __typename?: 'ComponentCaptionedImage' }
          | (
            { __typename?: 'ComponentFullWidthImage' }
            & ComponentFullWidthImageFragment
          )
          | (
            { __typename?: 'ComponentImageGallery' }
            & ComponentImageGalleryFragment
          )
          | (
            { __typename?: 'ComponentImageGalleryWithCaptions' }
            & ComponentImageGalleryWithCaptionsFragment
          )
          | (
            { __typename?: 'ComponentImpactMetrics' }
            & ComponentImpactMetricsFragment
          )
          | { __typename?: 'ComponentMetric' }
          | (
            { __typename?: 'ComponentRichImage' }
            & RichImageFieldsFragment
          )
          | { __typename?: 'ComponentSeo' }
          | (
            { __typename?: 'ComponentTextImageSideBySide' }
            & ComponentTextImageSideBySideFragment
          )
          | { __typename?: 'Hackathon' }
          | { __typename?: 'PageBlogPost' }
          | { __typename?: 'PageLanding' }
          | { __typename?: 'ProjectDetails' }
          | { __typename?: 'TeamMember' }
          | { __typename?: 'TldrSummary' }
          | { __typename?: 'UrlLink' }
         | null> } } } | null, relatedBlogPostsCollection?: { __typename?: 'PageBlogPostRelatedBlogPostsCollection', items: Array<(
      { __typename?: 'PageBlogPost' }
      & ReferencePageBlogPostFieldsFragment
    ) | null> } | null, contentfulMetadata: { __typename?: 'ContentfulMetadata', tags: Array<{ __typename?: 'ContentfulTag', id?: string | null, name?: string | null } | null> } };

export type PageBlogPostQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type PageBlogPostQuery = { __typename?: 'Query', pageBlogPostCollection?: { __typename?: 'PageBlogPostCollection', items: Array<(
      { __typename?: 'PageBlogPost' }
      & PageBlogPostFieldsFragment
    ) | null> } | null };

export type PageBlogPostCollectionQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
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
  ) | null, featuredBlogPost?:
    | { __typename?: 'ComponentAuthor' }
    | { __typename?: 'ComponentCaptionedImage' }
    | { __typename?: 'ComponentFullWidthImage' }
    | { __typename?: 'ComponentImageGallery' }
    | { __typename?: 'ComponentImageGalleryWithCaptions' }
    | { __typename?: 'ComponentImpactMetrics' }
    | { __typename?: 'ComponentMetric' }
    | { __typename?: 'ComponentRichImage' }
    | { __typename?: 'ComponentSeo' }
    | { __typename?: 'ComponentTextImageSideBySide' }
    | { __typename?: 'Hackathon' }
    | (
      { __typename?: 'PageBlogPost' }
      & ReferencePageBlogPostFieldsFragment
    )
    | { __typename?: 'PageLanding' }
    | { __typename?: 'ProjectDetails' }
    | { __typename?: 'TeamMember' }
    | { __typename?: 'TldrSummary' }
    | { __typename?: 'UrlLink' }
   | null };

export type PageLandingQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type PageLandingQuery = { __typename?: 'Query', pageLandingCollection?: { __typename?: 'PageLandingCollection', items: Array<(
      { __typename?: 'PageLanding' }
      & PageLandingFieldsFragment
    ) | null> } | null };

export type PageLandingCollectionQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
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
  locale: Scalars['String']['input'];
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
export const TeamMemberFieldsFragmentDoc = gql`
    fragment TeamMemberFields on TeamMember {
  __typename
  sys {
    id
  }
  name
  role
  linkedinUrl
  twitterUrl
  photo {
    ...ImageFields
  }
}
    `;
export const HackathonFieldsFragmentDoc = gql`
    fragment HackathonFields on Hackathon {
  __typename
  sys {
    id
    spaceId
  }
  internalName
  name
  slug
  oneLiner
  eventName
  eventDate
  myRole
  outcome
  description {
    json
  }
  coverImage {
    ...ImageFields
  }
  demoVideoUrl
  galleryCollection(limit: 12) {
    items {
      ...ImageFields
    }
  }
  tags
  showcaseUrl
  demoUrl
  codeUrl
  teamMembersCollection(limit: 10) {
    items {
      ...TeamMemberFields
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
export const HackathonCollectionDocument = gql`
    query hackathonCollection($locale: String, $preview: Boolean, $limit: Int, $order: [HackathonOrder], $where: HackathonFilter) {
  hackathonCollection(
    limit: $limit
    locale: $locale
    preview: $preview
    order: $order
    where: $where
  ) {
    items {
      ...HackathonFields
    }
  }
}
    ${HackathonFieldsFragmentDoc}
${ImageFieldsFragmentDoc}
${TeamMemberFieldsFragmentDoc}`;
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    hackathonCollection(variables?: HackathonCollectionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<HackathonCollectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HackathonCollectionQuery>({ document: HackathonCollectionDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'hackathonCollection', 'query', variables);
    },
    pageBlogPost(variables: PageBlogPostQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PageBlogPostQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PageBlogPostQuery>({ document: PageBlogPostDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'pageBlogPost', 'query', variables);
    },
    pageBlogPostCollection(variables?: PageBlogPostCollectionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PageBlogPostCollectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PageBlogPostCollectionQuery>({ document: PageBlogPostCollectionDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'pageBlogPostCollection', 'query', variables);
    },
    pageLanding(variables?: PageLandingQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PageLandingQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PageLandingQuery>({ document: PageLandingDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'pageLanding', 'query', variables);
    },
    pageLandingCollection(variables?: PageLandingCollectionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PageLandingCollectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PageLandingCollectionQuery>({ document: PageLandingCollectionDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'pageLandingCollection', 'query', variables);
    },
    sitemapPages(variables: SitemapPagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<SitemapPagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SitemapPagesQuery>({ document: SitemapPagesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'sitemapPages', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;