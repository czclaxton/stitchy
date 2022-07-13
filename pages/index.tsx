import Link from 'next/link'
import Head from 'next/head'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: [Post]
  children: Element
}

const Home = ({ posts }: Props) => {
  return (
    <div className='mx-auto'>
      <Head>
        <title>Stitchy Blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <div className=' bg-yellow-400 border-y border-black py-10 lg:py-0'>
        <div className='flex justify-between items-center max-w-7xl mx-auto'>
          <div className='px-10 space-y-5'>
            <h1 className='text-6xl max-w-xl font-serif'>
              <span className='underline decoration-black decoration-4'>
                Stitchy
              </span>{' '}
              is a place to write, read, and gain knowledge
            </h1>
            <h2>
              It's easy and free to post your thoughts on any topic of your
              choice. Try now and connect with millions of readers.
            </h2>
          </div>

          <div>
            <img
              className='hidden md:inline-flex h-32 lg:h-full'
              src='https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png'
              alt='logo'
            />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {posts?.map(post => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='border rounded group cursor-pointer overflow-hidden'>
              {post.mainImage && (
                <img
                  className='h-60 w-full object-cover rounded-t group-hover:scale-105 transition-transform duration 200 ease-in-out'
                  src={urlFor(post.mainImage).url()}
                  alt=''
                />
              )}
              <div className='flex justify-between p-5 bg-white'>
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className='text-xs'>
                    <span className='font-light'>{post.description} by</span>{' '}
                    <span className='text-green-500 font-medium'>
                      {post.author.name}
                    </span>
                  </p>
                </div>

                {post.author?.image && (
                  <img
                    className='h-12 w-12 rounded-full'
                    src={urlFor(post.author.image).url()}
                    alt='author image'
                  />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
    name, 
    image
  }, 
    description,
    mainImage,
    slug
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
