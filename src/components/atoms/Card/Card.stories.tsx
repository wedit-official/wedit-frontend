"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Card } from "./Card";

const meta = {
  title: "Atoms/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      canvas: {
        sourceState: "shown",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", minWidth: "966px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [isLiked, setIsLiked] = useState(args.isLiked || false);

    return (
      <Card
        {...args}
        isLiked={isLiked}
        onLike={() => {
          setIsLiked(!isLiked);
          args.onLike?.();
        }}
      />
    );
  },
  args: {
    title: "아펠가모 선릉",
    address: "서울특별시 강남구 테헤란로 322 24빌딩 4층",
    price: "7,700,000원~",
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
    imageAlt: "웨딩홀 내부",
    onShare: () => {
      console.log("공유하기");
    },
  },
};