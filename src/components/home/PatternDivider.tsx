'use client';
import Image from 'next/image';

interface Props {
  flip?: boolean;
}

export default function PatternDivider({ flip = false }: Props) {
  return (
    <div className={`w-full overflow-hidden ${flip ? 'rotate-180' : ''}`}>
      <Image
        src="/PatternDivider.png"
        alt="Pattern Divider"
        width={100}
        height={20}
        className="w-full"
      />
    </div>
  );
}
