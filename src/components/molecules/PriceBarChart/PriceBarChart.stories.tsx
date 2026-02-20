import type { Meta, StoryObj } from "@storybook/react";
import {
  PriceBarChart,
  createMonthlyData,
} from "./PriceBarChart";

const sampleValues = [
  280, 320, 310, 290, 300, 330, 315, 305, 340, 298, 285, 310,
];

const meta = {
  title: "Molecules/PriceBarChart",
  component: PriceBarChart,
  parameters: {
    layout: "centered",
    viewport: { defaultViewport: "desktop" },
  },
  tags: ["autodocs"],
  argTypes: {
    highlightedMonth: {
      control: { type: "number", min: 1, max: 12 },
      description: "Highlighted month (1–12). Omit for all bars coral.",
    },
  },
} satisfies Meta<typeof PriceBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllCoral: Story = {
  args: {
    data: createMonthlyData(sampleValues),
  },
  render: (args) => (
    <div style={{ width: 1114, padding: 20 }} className="border border-grey-300 rounded-[5px]">
      <PriceBarChart {...args} />
    </div>
  ),
};

export const HighlightedJune: Story = {
  args: {
    data: createMonthlyData(sampleValues),
    highlightedMonth: 6,
  },
  render: (args) => (
    <div style={{ width: 1114, padding: 20 }} className="border border-grey-300 rounded-[5px]">
      <PriceBarChart {...args} />
    </div>
  ),
};
