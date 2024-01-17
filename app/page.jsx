"use client"
import { useSpring, animated } from 'react-spring';
import Feed from "@components/Feed";

const Home = () => {
  const textSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(-100%)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { duration: 800 },
  });

  const subTextSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(100%)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 800 },
  });

  return (
    <section className='w-full flex-center flex-col'>
      <animated.h1 className='head_text text-center' style={textSpring}>
        <span>Discover & Share</span>
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'> AI-Powered Prompts</span>
      </animated.h1>
      <animated.p className='desc text-center' style={subTextSpring}>
        Promptopia is an open-source AI prompting tool for the modern world to
        discover, create and share creative prompts
      </animated.p>
      
      <Feed />
    </section>
  );
};

export default Home;
