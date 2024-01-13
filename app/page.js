import Feed from '@components/Feed'

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className='head_text text-center'>
        Discover & Share
      <br className='max-md:hidden' />
      <span className='text-orange-600 text-center'>
        AI-Powered Prompts
      </span>
      </h1>
      <p className='desc text-center'>
        Promptopia is an open Source AI prompting toolfor modern world to discover, create and share creative prompts.
      </p>
      {/* Feed */}
      <Feed/>
    </section>
  )
}