import React from 'react';
import Container from './components/Container';
import SwiperCategory from './components/home/SwiperCategory';
import SwiperProduct from './components/home/SwiperProduct';
import { HomeProvider } from './context/home.context';
import SwiperBrand from './components/home/SwiperBrand';
import LoadingIndicator from './components/LoadingIndicator';
import dynamic from 'next/dynamic';

const LoadingComponent = dynamic(
  () => import('./components/LoadingPage'),
  {
    loading: () => <LoadingIndicator />,
  }
);

const Home: React.FC = () => {
  return (
    <>
      <HomeProvider>
        <LoadingComponent />
        {/* 1920x500 */}
        <SwiperCategory
          perView={1}
          delayView={6000}
          classNameImage='max-w-auto max-h-auto'
          params={{
            per_page: 3,
            page: 1,
            filters: '{"parent_category":"true","status":"enable"}',
          }}
        />
        <Container>
          <div className='py-5'>
            {/* 1920x500 */}
            <SwiperBrand
              perView={3}
              delayView={5000}
              classNameImage='rounded-md'
              params={{
                per_page: 6,
                page: 1,
                filters: '{"status":"enable"}',
              }}
            />
          </div>
          <div className='py-5'>
            {/* 560*560 */}
            <SwiperProduct
              perView={4}
              classNameImage='rounded-md h-80 w-80'
              type='คีย์บอร์ด'
              params={{
                per_page: 4,
                page: 1,
                filters: '{"category":"คีย์บอร์ด","status":"enable"}',
              }}
            />
          </div>
        </Container>
      </HomeProvider>
    </>
  );
};

export default Home;
