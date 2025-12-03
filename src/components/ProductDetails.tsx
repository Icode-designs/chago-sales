"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ProductSpecs,
  AnimatedContent,
  TabButton,
} from "@/styles/components/productDetails";
import { FlexBox } from "@/styles/components/ui.Styles";
import ProductRating from "./ProductRating";
import Product from "@/types/productsType";

interface Props {
  product: Product;
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

  const specs = product.specifications;

  const direction = activeTab === "description" ? "left" : "right";

  return (
    <section>
      <FlexBox
        $gap={40}
        $variant="secondary"
        $alignItems="flex-start"
        $width="100%"
      >
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
                        <h3>{spec.spec}</h3>
                        <p>{spec.detail}</p>
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
