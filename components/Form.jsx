import Link from "next/link";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [postError, setPostError] = useState("");
  const [tagError, setTagError] = useState("");

  const headerAnimation = useSpring({
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(-50px)" },
    delay: 200,
  });

  const descriptionAnimation = useSpring({
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(50px)" },
    delay: 400,
  });

  const formAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(50px)" },
    delay: 600,
  });

  const cancelButtonAnimation = useSpring({
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(50px)" },
    delay: 800,
  });

  const submitButtonAnimation = useSpring({
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(50px)" },
    delay: 800,
  });

  const handlePostChange = (e) => {
    const value = e.target.value;
    setPost({ ...post, prompt: value });
    if (value.length > 300) {
      setPostError("Character limit exceeded (max 300)");
    } else {
      setPostError("");
    }
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    setPost({ ...post, tag: value });
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      setTagError("Only alphanumeric characters are allowed");
    } else {
      setTagError("");
    }
  };

  const showToast = () => {
    toast.success("Post added successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <animated.section className='w-full max-w-full flex-start flex-col'>
      <animated.h1 style={headerAnimation} className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </animated.h1>
      <animated.p style={descriptionAnimation} className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </animated.p>

      <animated.form
        onSubmit={(e) => {
          handleSubmit(e);
          showToast();
        }}
        style={formAnimation}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={handlePostChange}
            placeholder='Write your post here'
            required
            className='form_textarea'
          />
          {postError && <p className='text-red-500 text-sm'>{postError}</p>}
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Field of Prompt{" "}
            <span className='font-normal'>(#product, #webdevelopment, #idea, etc.)</span>
          </span>
          <input
            value={post.tag}
            onChange={handleTagChange}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
          {tagError && <p className='text-red-500 text-sm'>{tagError}</p>}
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' style={cancelButtonAnimation} className='text-gray-500 text-sm'>
            <animated.a style={cancelButtonAnimation}>Cancel</animated.a>
          </Link>

          <animated.button
            type='submit'
            disabled={submitting || postError || tagError}
            style={submitButtonAnimation}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </animated.button>
        </div>
      </animated.form>
      <ToastContainer />
    </animated.section>
  );
};

export default Form;
