import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar";

const meta = {
  title: "Atoms/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
    viewport: { defaultViewport: "desktop" },
  },
  tags: ["autodocs"],
  argTypes: {
    focused: { control: "boolean" },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyWrapperStyle = { width: 962, minWidth: 962, flexShrink: 0 };
const searchBarWrapperStyle = { width: 922 };

export const Default: Story = {
  args: {
    placeholder: "관심있는 웨딩업체의 최저가를 빠르게 찾아보세요",
    focused: false,
  },
  render: (args) => (
    <div style={storyWrapperStyle} className="p-5 border border-grey-300 rounded-[5px]">
      <div style={searchBarWrapperStyle} className="w-full">
        <SearchBar {...args} />
      </div>
    </div>
  ),
};

export const Focused: Story = {
  args: {
    placeholder: "업체명만 입력하세요, 가격은 저희가 찾아올게요",
    focused: true,
  },
  render: (args) => (
    <div style={storyWrapperStyle} className="p-5 border border-grey-300 rounded-[5px]">
      <div style={searchBarWrapperStyle} className="w-full">
        <SearchBar {...args} />
      </div>
    </div>
  ),
};
