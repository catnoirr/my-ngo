"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules'; // Import Autoplay module
import Image from 'next/image';

const reviews = [
  {
    image: '/ritu.jpeg',
    username: 'Ritu Gupta',
    text: "The impact of our initiatives has been remarkable! Every contribution counts towards a better future.",
  },
  {
    image: '/sagar.jpg',
    username: 'Sagar Paswan',

    text: "Working with this NGO has opened my eyes to the challenges faced by our community and how we can help.",
  },
  {
    image: '/boy.png',
    username: 'Jatin',
    text: "I am proud to support this organization. Together, we are making a real difference in people's lives.",
  },
];


const Review = () => {
  return (
    <section className="review container mx-auto px-4 py-8 sm:w-10/12 md:w-8/12 lg:w-7/12" id="reviews">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Customer's Reviews</h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="review-box bg-yellow-100 p-6 sm:p-8 rounded-lg shadow-lg text-center min-h-72">
              <Image
                src={review.image}
                alt={review.username}
                width={96}  // Specify width
                height={96} // Specify height
                className="mx-auto mb-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full"
              />
              <h2 className="text-base sm:text-lg font-semibold">{review.username}</h2>
              <p className="text-gray-700 text-sm sm:text-base">{review.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Review;
