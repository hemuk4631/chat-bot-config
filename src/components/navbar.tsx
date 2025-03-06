import Link from 'next/link';
import React from 'react';

function navbar() {
  return (
    <ul>
      <li className={`p-4 shadow-md  w-full`}>
        <Link href="/">Home</Link>
      </li>
    </ul>
  );
}

export default navbar;
