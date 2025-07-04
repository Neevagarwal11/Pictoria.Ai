import { getImages } from '@/app/actions/image-action'
import GalleryComponent from '@/components/gallery/GalleryComponent'
import React from 'react'

const Gallery = async()=> {

  const {data: images} = await getImages()

  return (
    <section className='container mx-auto'>
      <h1 className='text-3xl font-semibold mb-2'>My Images</h1>
      <p className='text-muted-foreground mb-6'>Here you can find all the images you have generated.Click on an image to view details.</p>

    <GalleryComponent images={images?.results || []}/>

    </section>
  )
}

export default Gallery