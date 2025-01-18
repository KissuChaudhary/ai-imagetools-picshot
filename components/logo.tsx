import Image from 'next/image'

export function Logo() {
  return (
    <div className="relative h-8 w-8">
      <Image
        src="/logo.png"
        alt="Lexisotck AI Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}

