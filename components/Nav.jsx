"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useSpring, animated } from "react-spring";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const logoAnimationProps = useSpring({
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(-50px)" },
    config: { tension: 120, friction: 14 },
  });

  const signInButtonAnimationProps = useSpring({
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(50px)" },
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.nav style={logoAnimationProps} className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <animated.div style={logoAnimationProps}>
          <Image
            src='/assets/images/logo.svg'
            alt='logo'
            width={30}
            height={30}
            className='object-contain'
          />
        </animated.div>
        <animated.p style={logoAnimationProps} className='logo_text'>
          Promptopia
        </animated.p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              <animated.div style={signInButtonAnimationProps}>Create Post</animated.div>
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              <animated.div style={signInButtonAnimationProps}>Sign Out</animated.div>
            </button>

            <Link href='/profile'>
              <animated.div style={signInButtonAnimationProps}>
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                />
              </animated.div>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  <animated.div style={signInButtonAnimationProps}>Sign in</animated.div>
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <animated.div style={signInButtonAnimationProps}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                onClick={() => setToggleDropdown(!toggleDropdown)}
              />
            </animated.div>

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  <animated.div style={signInButtonAnimationProps}>Sign in</animated.div>
                </button>
              ))}
          </>
        )}
      </div>
    </animated.nav>
  );
};

export default Nav;
