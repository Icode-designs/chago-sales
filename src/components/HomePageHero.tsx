"use client";
import { HeroBox } from "@/styles/components/hompage.styles";
import { CustomLink } from "@/styles/components/ui.Styles";
import { HERO_IMAGE_URL } from "@/utils/data";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { motion } from "framer-motion";

const HomePageHero = () => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setImageIndex((prevIndex) =>
        prevIndex === HERO_IMAGE_URL.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearTimeout(timeOut);
  }, [imageIndex]);

  function handleClick(index: number) {
    setImageIndex(index);
  }

  return (
    <HeroBox>
      <motion.img
        key={imageIndex}
        src={HERO_IMAGE_URL[imageIndex].src}
        alt="slider image"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0.5 }}
        exit={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />
      <article>
        <h1>Shop with ease</h1>
        <p>
          We are your one stop store for all things electronics, gadgets and
          more. Have fun shopping with us!
        </p>
        <CustomLink href={`/products/products-list/${"all-products"}`}>
          Shop Now
        </CustomLink>
      </article>

      <div>
        {HERO_IMAGE_URL.map((image, index) => (
          <button key={index} onClick={() => handleClick(index)}>
            <GoDotFill
              className={index === imageIndex ? "active" : undefined}
            />
          </button>
        ))}
      </div>
    </HeroBox>
  );
};

export default HomePageHero;
