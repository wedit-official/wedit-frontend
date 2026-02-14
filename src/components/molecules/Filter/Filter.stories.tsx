"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Filter } from "./Filter";

const meta = {
  title: "Molecules/Filter",
  component: Filter,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "필터 컴포넌트입니다. 분류, 예산, 지역을 선택할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [category, setCategory] = useState<string | undefined>(args.selectedCategory);
    const [budget, setBudget] = useState<string | undefined>(args.selectedBudget);
    const [seoulRegion, setSeoulRegion] = useState<string | undefined>(args.selectedSeoulRegion);
    const [nonSeoulRegion, setNonSeoulRegion] = useState<string | undefined>(args.selectedNonSeoulRegion);

    const handleClearAll = () => {
      setCategory(undefined);
      setBudget(undefined);
      setSeoulRegion(undefined);
      setNonSeoulRegion(undefined);
      args.onClearAll?.();
    };

    return (
      <Filter
        {...args}
        selectedCategory={category}
        selectedBudget={budget}
        selectedSeoulRegion={seoulRegion}
        selectedNonSeoulRegion={nonSeoulRegion}
        onCategoryChange={setCategory}
        onBudgetChange={setBudget}
        onSeoulRegionChange={setSeoulRegion}
        onNonSeoulRegionChange={setNonSeoulRegion}
        onClearAll={handleClearAll}
      />
    );
  },
  args: {},
};

export const WithSelectedValues: Story = {
  render: (args) => {
    const [category, setCategory] = useState<string | undefined>(args.selectedCategory);
    const [budget, setBudget] = useState<string | undefined>(args.selectedBudget);
    const [seoulRegion, setSeoulRegion] = useState<string | undefined>(args.selectedSeoulRegion);
    const [nonSeoulRegion, setNonSeoulRegion] = useState<string | undefined>(args.selectedNonSeoulRegion);

    const handleClearAll = () => {
      setCategory(undefined);
      setBudget(undefined);
      setSeoulRegion(undefined);
      setNonSeoulRegion(undefined);
      args.onClearAll?.();
    };

    return (
      <Filter
        {...args}
        selectedCategory={category}
        selectedBudget={budget}
        selectedSeoulRegion={seoulRegion}
        selectedNonSeoulRegion={nonSeoulRegion}
        onCategoryChange={setCategory}
        onBudgetChange={setBudget}
        onSeoulRegionChange={setSeoulRegion}
        onNonSeoulRegionChange={setNonSeoulRegion}
        onClearAll={handleClearAll}
      />
    );
  },
  args: {
    selectedCategory: "wedding-hall",
    selectedBudget: "500k-1m",
    selectedSeoulRegion: "seoul",
  },
};

export const WithCustomBudget: Story = {
  render: (args) => {
    const [category, setCategory] = useState<string | undefined>(args.selectedCategory);
    const [budget, setBudget] = useState<string | undefined>(args.selectedBudget);
    const [seoulRegion, setSeoulRegion] = useState<string | undefined>(args.selectedSeoulRegion);
    const [nonSeoulRegion, setNonSeoulRegion] = useState<string | undefined>(args.selectedNonSeoulRegion);

    const handleClearAll = () => {
      setCategory(undefined);
      setBudget(undefined);
      setSeoulRegion(undefined);
      setNonSeoulRegion(undefined);
      args.onClearAll?.();
    };

    return (
      <Filter
        {...args}
        selectedCategory={category}
        selectedBudget={budget}
        selectedSeoulRegion={seoulRegion}
        selectedNonSeoulRegion={nonSeoulRegion}
        onCategoryChange={setCategory}
        onBudgetChange={setBudget}
        onSeoulRegionChange={setSeoulRegion}
        onNonSeoulRegionChange={setNonSeoulRegion}
        onClearAll={handleClearAll}
      />
    );
  },
  args: {
    selectedBudget: "custom",
    customBudgetMin: "500,000",
    customBudgetMax: "2,000,000",
  },
};

