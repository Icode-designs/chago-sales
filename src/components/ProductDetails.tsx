"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ProductSpecs,
  AnimatedContent,
  TabButton,
} from "@/styles/components/productDetails";
import { FlexBox } from "@/styles/components/ui.Styles";
import { PRODUCTS } from "@/utils/data";
import ProductReview from "./ProductRating";
import ProductRating from "./ProductRating";

interface Props {
  product: (typeof PRODUCTS)[0];
}

const ProductDetails = ({ product }: Props) => {
  const [activeTab, setActiveTab] = useState<"specs" | "description">(
    "description"
  );

  const slideVariants = {
    initial: (direction: "left" | "right") => ({
      x: direction === "left" ? 100 : -100,
      opacity: 0,
    }),
    animate: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "left" ? -100 : 100,
      opacity: 0,
    }),
  };

  const specs = Object.entries(product.specifications);

  const direction = activeTab === "description" ? "left" : "right";

  return (
    <section>
      <FlexBox $gap={40} $variant="secondary" $alignItems="flex-start">
        <ProductSpecs>
          {/* Tabs */}
          <FlexBox $gap={24}>
            <TabButton
              $active={activeTab === "specs"}
              onClick={() => setActiveTab("specs")}
            >
              Specifications
            </TabButton>
            <TabButton
              $active={activeTab === "description"}
              onClick={() => setActiveTab("description")}
            >
              Description
            </TabButton>
          </FlexBox>

          {/* Animated content */}
          <AnimatedContent>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeTab}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={direction}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "description" ? (
                  <p>{product.description}</p>
                ) : (
                  <ul>
                    {specs.map((spec, index) => (
                      <li key={index}>
                        <h3>{spec[0]}</h3>
                        <p>{spec[1]}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </AnimatedContent>
        </ProductSpecs>
        <ProductRating product={product} />
      </FlexBox>
    </section>
  );
};

export default ProductDetails;
