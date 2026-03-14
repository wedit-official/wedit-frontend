"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Menu } from "./Menu";

const meta = {
  title: "Molecules/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "메뉴/탭 컴포넌트입니다. 선택된 항목은 검은색 텍스트와 밑줄이 표시됩니다.",
      },
      canvas: {
        sourceState: "shown",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: "magazine", label: "매거진" },
  { value: "invitation", label: "청첩장 제작" },
  { value: "dress", label: "드레스 기록" },
];

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(args.value);
    return (
      <Menu
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    options: defaultOptions,
  },
};

export const WithDefaultValue: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(args.value);
    return (
      <Menu
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    options: defaultOptions,
    value: "magazine",
  },
};

export const CustomOptions: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(args.value);
    return (
      <Menu
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    options: [
      { value: "option1", label: "옵션 1" },
      { value: "option2", label: "옵션 2" },
      { value: "option3", label: "옵션 3" },
    ],
  },
};

