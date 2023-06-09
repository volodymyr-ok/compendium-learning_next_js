import Link from 'next/link';
import { useRouter } from 'next/router';
import cl from './post.module.css';

export default function Post({ post }) {
  const router = useRouter();

  return (
    <>
      <p>
        <Link href="/blog">
          <small>&laquo; back to all blog posts</small>
        </Link>
      </p>

      <h2 className={cl.title}>{post.title}</h2>

      <p>{post.content}</p>

      <button className={cl.button} onClick={() => router.push('/blog')}>
        Click me to programmatically navigate or redirect
      </button>
    </>
  );
}

export const getStaticPaths = async () => {
  const response = await fetch('https://learnwebcode.github.io/json-example/posts.json');
  const data = await response.json();

  const thePaths = data.posts.map(post => {
    return { params: { slug: post.slug } };
  });

  return {
    paths: thePaths,
    fallback: false,
  };
};

export const getStaticProps = async context => {
  const response = await fetch('https://learnwebcode.github.io/json-example/posts.json');
  const data = await response.json();
  const thePost = data.posts.filter(post => post.slug === context.params.slug)[0];

  return {
    props: {
      post: thePost,
      title: thePost.title,
    },
  };
};
