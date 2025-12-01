// components/CategoryBar.tsx

export default function CategoryBar() {
  return (
    <div className="w-full bg-black text-white py-3 text-sm">
      <ul className="max-w-7xl mx-auto flex items-center justify-center gap-10">
        <li className="cursor-pointer hover:text-orange-400">Doors</li>
        <li className="cursor-pointer hover:text-orange-400">Smart Door Locks</li>
        <li className="cursor-pointer hover:text-orange-400">TV Console / Wall Panel</li>
        <li className="cursor-pointer hover:text-orange-400">Living Room Sofa</li>
        <li className="cursor-pointer hover:text-orange-400">Living Room</li>
        <li className="cursor-pointer hover:text-orange-400">Wallpapers</li>
      </ul>
    </div>
  );
}
