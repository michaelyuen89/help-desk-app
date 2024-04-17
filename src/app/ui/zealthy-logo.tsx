import Image from "next/image";

export default function ZealthyLogo() {
  return (
    <div className="flex flex-row items-center leading-none text-white">
      <Image
        src="/zealthy_logo.svg"
        width={500}
        height={400}
        alt="Zealthy Logo"
        priority={true}
      />
    </div>
  );
}
