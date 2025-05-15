import {ReactNode} from 'react';
import './globals.css';

type Props = {
  children: ReactNode;
};

// 由于我们在根路径有not-found.tsx页面，需要一个布局文件
// 即使它只是传递children
export default function RootLayout({children}: Props) {
  return children;
} 