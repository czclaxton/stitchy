import { createCurrentUserHook, createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-03-25',
  useCdn: process.env.NODE_ENV === 'production',
}

// Used to fetch info, make queries, etc
export const sanityClient = createClient(config)

// Helper fn for generate image urls
export const urlFor = source => createImageUrlBuilder(config).image(source)

// Helper fn for accessing the current logged in user
export const useCurrentUser = createCurrentUserHook(config)
