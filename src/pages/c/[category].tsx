import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import * as React from 'react';

import { getAllLinkCategories, getCategoryUrls } from '@/lib/notion';

import Accent from '@/components/Accent';
import { getFaviconUrl } from '@/components/Favicon';
import Layout from '@/components/layout/Layout';
import PrimaryLink from '@/components/links/PrimaryLink';
import TreeLink from '@/components/links/TreeLink';
import Seo from '@/components/Seo';

export default function CPage({
  links,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo templateTitle={category} />

      <main>
        <section className=''>
          <div className='flex flex-col items-center justify-center layout min-h-screen py-20'>
            <h1 className='text-5xl text-center md:text-7xl'>
              <Accent>{category}</Accent>
            </h1>
            <div className='gap-4 grid max-w-sm mt-8 mx-auto text-center w-full'>
              {links.map((link) => (
                <TreeLink
                  key={link.pageId}
                  link={{
                    display: link.slug,
                    link: link.link!,
                    icon: {
                      type: 'external',
                      external: { url: getFaviconUrl(link.link!).url },
                    },
                  }}
                />
              ))}
            </div>
            {/* Thank you for not removing this as an attribution 🙏 */}
            <p className='dark:text-gray-300 mt-10'>
              Built using{' '}
              <PrimaryLink href='https://github.com/theodorusclarence/notiolink'>
                <Accent>Notiolink</Accent>
              </PrimaryLink>
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getAllLinkCategories();

  return {
    paths: categories.map((category) => ({ params: { category } })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const category = context.params?.category as string;
  return {
    props: { links: await getCategoryUrls(category), category },
    revalidate: 5,
  };
};
