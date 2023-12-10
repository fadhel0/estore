import React from 'react'
import { draftMode } from 'next/headers'

import { Category, Page } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Blocks } from '../../_components/Blocks'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import Filters from './Filters'

import classes from './index.module.scss'

const Products = async () => {
  const { isEnabled: isDraftMode } = draftMode()
  let page: Page | null = null
  let categories: Category[] | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'products',
      draft: isDraftMode,
    })

    categories = await fetchDocs<Category>('categories')
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    console.error(error)
  }

  return (
    <div className={classes.container}>
      <Gutter className={classes.products}>
        <Filters categories={categories} />
        <Blocks blocks={page.layout} disableTopPadding={true} />
      </Gutter>
      <HR />
    </div>
  )
}

export default Products
