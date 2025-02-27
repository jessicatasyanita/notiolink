/* eslint-disable @next/next/no-img-element */
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';

import { appName } from '@/lib/config';
import { getSocialTree } from '@/lib/notion';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import PrimaryLink from '@/components/links/PrimaryLink';
import TreeLink from '@/components/links/TreeLink';
import Seo from '@/components/Seo';

export default function IndexPage({
  links,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo />

      <main>
        <section className=''>
          <div className='flex flex-col items-center justify-center layout min-h-screen py-20'>
            <h1 className='text-5xl text-center md:text-7xl'>
              <Accent>{appName}</Accent>
            </h1>
            <div className='gap-4 grid max-w-sm mt-8 mx-auto text-center w-full'>
              {links.map((link) => (
                <TreeLink key={link.id} link={link} />
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

export const getStaticProps = async () => {
  return {
    props: { links: await getSocialTree() },
    revalidate: 5,
  };
};
