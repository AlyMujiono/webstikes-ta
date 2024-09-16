import { Image } from "@nextui-org/react";
function Boxpasien({
  icon,
  angka,
  description,
}: {
  icon: any;
  angka: any;
  description: any;
}) {
  return (
    <div className="flex flex-col items-center justify-center border-2 bg-white py-3 px-5 rounded-md w-full">
      <Image
        radius="none"
        removeWrapper={true}
        width={"70"}
        src={icon}
        alt={description}
      />
      <div>{angka}</div>
      <div className="capitalize">{description}</div>
    </div>
  );
}

export default Boxpasien;
