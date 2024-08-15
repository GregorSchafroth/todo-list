import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

interface BackButtonProps {
  text: string;
  link: string;
}

import React from 'react';

const BackButton = ({ text, link }: BackButtonProps) => {
  return (
    <Link
      href={link}
      className='text-gray-500 hover:underline flex items-center gap-1'
    >
      <ArrowLeftCircle size={18} /> {text}
    </Link>
  );
};

export default BackButton;
