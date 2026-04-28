# CaseStudyDetails Content Type Migration

Since we need Management API credentials to programmatically create content types, you'll need to create this in the Contentful UI:

## Step 1: Create the CaseStudyDetails Content Type

1. Go to your Contentful Space: https://app.contentful.com/spaces/lx69lkfzk4yq
2. Click **Content Model** in the left sidebar
3. Click **Add content type** (or **Create content type**)
4. Fill in the details:
   - **Name**: Case Study Details
   - **API ID**: caseStudyDetails
   - **Description**: Metadata for case studies including role, team, and timeframe
   - **Display field**: role

## Step 2: Add Fields to CaseStudyDetails

Add three text fields:

### Field 1: Role
- **Field name**: Role
- **Field ID**: role
- **Type**: Short text (Symbol)
- **Required**: No
- **Localized**: No

### Field 2: Team
- **Field name**: Team
- **Field ID**: team
- **Type**: Short text (Symbol)
- **Required**: No
- **Localized**: No

### Field 3: Timeframe
- **Field name**: Timeframe
- **Field ID**: timeframe
- **Type**: Short text (Symbol)
- **Required**: No
- **Localized**: No

## Step 3: Publish the Content Type

Click the **Save** button at the top right.

## Step 4: Add Reference Field to PageBlogPost

1. Go to **Content Model** and find **PageBlogPost**
2. Click **Edit** (pencil icon)
3. Scroll down and click **Add field**
4. Fill in:
   - **Field name**: Case Study Details
   - **Field ID**: caseStudyDetails
   - **Type**: Reference (Link)
   - **Link type**: Entry
   - **Allowed entry types**: Check only "Case Study Details"
   - **Required**: No

5. Click **Create and configure**
6. Keep the defaults and click **Save**

## Step 5: Publish the Content Model

Click **Save** to publish the updated PageBlogPost model.

## Step 6: Regenerate GraphQL Types

After making changes in Contentful, regenerate the TypeScript types:

```bash
yarn graphql-codegen:generate
```

## Done!

Now you can:
- Create CaseStudyDetails entries in Contentful
- Link them from PageBlogPost entries via the `caseStudyDetails` field
- The React component will automatically display the role, team, and timeframe in the case study hero
