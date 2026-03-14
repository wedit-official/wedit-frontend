"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Dropdown } from "./Dropdown";

const meta = {
  title: "Atoms/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "드롭다운 선택 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const regionOptions = [
  { value: "busan", label: "부산" },
  { value: "daegu", label: "대구" },
  { value: "gwangju", label: "광주" },
  { value: "daejeon", label: "대전" },
  { value: "ulsan", label: "울산" },
  { value: "sejong", label: "세종" },
  { value: "gangwon", label: "강원" },
  { value: "chungcheong", label: "충청" },
  { value: "gyeongsang", label: "경상" },
  { value: "jeolla", label: "전라" },
  { value: "jeju", label: "제주" },
];

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(args.value);
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    header: "비수도권",
    options: regionOptions,
  },
};